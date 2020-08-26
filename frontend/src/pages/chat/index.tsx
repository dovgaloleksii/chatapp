import React from 'react';
import Typography from '@material-ui/core/Typography';
import { useRouteMatch } from 'react-router';
import { useAuthContext } from '../../components/auth/context';
import { Page } from '../../components/base-page/page';

interface ChatParams {
  chatId: string;
}

export const Chat: React.FunctionComponent = () => {
  const match = useRouteMatch<ChatParams>();
  const { token } = useAuthContext();

  const {
    params: { chatId = '' },
  } = match;

  return (
    <Page pageTitle="Chat list">
      <Typography>Chats</Typography>
      {chatId}
    </Page>
  );
};
