export type Message = {
  uid: string;
  avatar: string;
  createdAt: string;
  name: string;
  text: string;
  role: 'user' | 'system' | 'assistant' | 'function';
};
