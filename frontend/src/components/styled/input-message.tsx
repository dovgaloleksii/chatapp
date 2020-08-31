import React from 'react';
import { TextField } from '@material-ui/core';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import SendIcon from '@material-ui/icons/Send';

export const InputMessage: React.FunctionComponent<{
  onNewMessage: (message: string) => void;
}> = ({ onNewMessage }) => {
  const [message, setMessage] = React.useState<string>('');
  return (
    <TextField
      fullWidth
      id="filled-multiline-flexible"
      value={message}
      onChange={(event) => setMessage(event.target.value)}
      rowsMax={4}
      placeholder="New message"
      multiline
      variant="filled"
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={() => {
                onNewMessage(message);
                setMessage('');
              }}
            >
              <SendIcon />
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};
