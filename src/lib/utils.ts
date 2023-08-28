import { OpenAIStream, OpenAIStreamPayload } from '../utils/OpenAIStream';

export const generateStory = async (prompt: string) => {
  const payload: OpenAIStreamPayload = {
    model: 'text-davinci-003',
    prompt,
    temperature: 0.77,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    max_tokens: 3000,
    stream: true,
    n: 1,
  };

  const stream = await OpenAIStream(payload);

  // This data is a ReadableStream
  if (!stream) {
    return;
  }
  const reader = stream.getReader();
  const decoder = new TextDecoder();
  let done = false;
  let story = '';
  while (!done) {
    const { value, done: doneReading } = await reader.read();
    done = doneReading;
    const chunkValue = decoder.decode(value);
    story += chunkValue;
  }

  return story;
};
