import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Message } from 'src/types';
import { auth } from '../../../firebase';

type MessageComponentProps = {
  message: Message;
};

const MessageComponent = ({ message }: MessageComponentProps) => {
  const [user] = useAuthState(auth);
  return (
    <div className={`chat-bubble ${message.uid === user?.uid ? 'right' : ''}`}>
      <img
        className="chat-bubble__left"
        src={message.avatar}
        alt="user avatar"
      />
      <div className="chat-bubble__right">
        <p className="user-name">{message.name}</p>
        <p className="user-message">{message.text}</p>
      </div>
    </div>
  );
};

export default MessageComponent;
