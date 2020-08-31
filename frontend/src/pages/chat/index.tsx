import React from 'react';
import { useRouteMatch } from 'react-router';
import { List } from '@material-ui/core';
import { toast } from 'react-toastify';
import { useAuthContext } from '../../components/auth/context';
import { Page } from '../../components/base-page/page';
import { notifyError } from '../../utils';
import { Chat as ChatType, Message, User } from '../../types';
import { ChatMessage } from '../../components/styled/chat-message';
import { InputMessage } from '../../components/styled/input-message';
import { WSClient } from '../../components/websocket';

export const Chat: React.FunctionComponent = () => {
  const match = useRouteMatch<{ chatId: string }>();
  const [messages, setMessages] = React.useState<[Message]>();
  const [chat, setChat] = React.useState<ChatType>();
  const { api, user } = useAuthContext();

  const {
    params: { chatId = null },
  } = match;

  const filteredUser = React.useMemo(() => {
    if (chat) {
      return chat.chat_users.filter(({ user: { pk } }) => pk !== user?.pk);
    }
    return [];
  }, [chat, user]);

  const createNewMessage = React.useCallback(
    (newMessage: string) => {
      if (api && chat && user) {
        api
          .createMessage({
            chatId: chat.pk,
            author: user.pk,
            message: newMessage,
          })
          .then(({ data }) => {
            return data;
          })
          .catch(notifyError);
      }
    },
    [api, chat, user],
  );

  const getMessages = React.useCallback(() => {
    if (api && chatId) {
      api
        .getMessages(chatId)
        .then(({ data }) => {
          setMessages(data.results);
          return data;
        })
        .catch(notifyError);
    }
  }, [api, chatId]);

  const getChats = React.useCallback(() => {
    if (api && chatId) {
      api
        .getChat(chatId)
        .then(({ data }) => {
          setChat(data);
          return data;
        })
        .catch(notifyError);
    }
  }, [api, chatId]);

  React.useEffect(() => {
    getChats();
  }, [getChats]);

  React.useEffect(() => {
    getMessages();
  }, [getMessages]);

  React.useEffect(() => {
    function getMessageOnNew(): void {
      getMessages();
    }
    WSClient.addEventListener('message', getMessageOnNew);
    return () => {
      WSClient.removeEventListener('message', getMessageOnNew);
    };
  }, [getMessages]);

  return (
    <Page
      pageTitle={
        (chat?.is_one_to_one
          ? `${filteredUser[0].user.first_name} ${filteredUser[0].user.last_name}`
          : chat?.name) || ''
      }
    >
      <List>
        {messages
          ?.slice()
          .reverse()
          .map((message) => {
            const author =
              chat?.chat_users.find(({ user: { pk } }) => pk === message.author)?.user ||
              ({
                pk: message.pk,
                // eslint-disable-next-line @typescript-eslint/camelcase
                first_name: 'unknown',
                // eslint-disable-next-line @typescript-eslint/camelcase
                last_name: 'unknown',
                logo: '',
                username: '',
              } as User);
            return <ChatMessage key={message.pk} message={message} author={author} />;
          })}
      </List>
      <InputMessage onNewMessage={createNewMessage} />
    </Page>
  );
};
