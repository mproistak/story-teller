import React, { useEffect, useState } from 'react';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { sendMessage } from '@utils/helpers';
import { auth, db } from '../../../firebase';

type SendMessageProps = {
  scroll: React.RefObject<HTMLSpanElement>;
};

type OpenAiUser = {
  name: string;
  photoUrl: string;
  uid: string;
};

const SendMessage = ({ scroll }: SendMessageProps) => {
  const [message, setMessage] = useState('');
  const systemUser: OpenAiUser = {
    name: 'Ghost',
    photoUrl: process.env.NEXT_PUBLIC_FIREBASE_OPENAI_PHOTO_URL ?? '',
    uid: process.env.NEXT_PUBLIC_FIREBASE_OPENAI_USERID ?? '',
  };

  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: 'instant' });
  }, [scroll.current]);

  const sendUserMessage = async (event: any) => {
    event.preventDefault();
    if (message.trim() === '') {
      alert('Enter valid message');
      return;
    }

    if (!auth.currentUser) return;

    const { uid, displayName, photoURL } = auth.currentUser;
    await addDoc(collection(db, 'messages'), {
      text: message,
      name: displayName,
      avatar: photoURL,
      createdAt: serverTimestamp(),
      uid,
    });

    scroll.current?.scrollIntoView({ behavior: 'smooth' });

    await sendOpenAIResponseMessage(message);

    scroll.current?.scrollIntoView({ behavior: 'smooth' });
    setMessage('');
  };

  const sendOpenAIResponseMessage = async (messageForReply: string) => {
    if (message.trim() === '') {
      alert('Enter valid message');
      return;
    }

    const reply = await sendMessage([
      {
        content: 'You are a rude ghost',
        role: 'system',
      },
      { content: messageForReply, role: 'user' },
    ]);

    await addDoc(collection(db, 'messages'), {
      text: reply,
      name: systemUser.name,
      avatar: systemUser.photoUrl,
      createdAt: serverTimestamp(),
      uid: systemUser.uid,
    });
  };

  return (
    <form onSubmit={(event) => sendUserMessage(event)} className="send-message">
      <label htmlFor="messageInput" hidden>
        Enter Message
      </label>
      <input
        id="messageInput"
        name="messageInput"
        type="text"
        className="form-input__input"
        placeholder="type message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button type="submit">Send</button>
    </form>
  );
};

export default SendMessage;
