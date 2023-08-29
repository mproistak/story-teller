import {
  OpenAIChatCompletions,
  OpenAIChatCompletionsPayload,
} from '@/src/utils/OpenAIStream';

export const generateStory = async (prompt: string) => {
  const payload: OpenAIChatCompletionsPayload = {
    model: 'gpt-3.5-turbo',
    messages: [
      {
        role: 'user',
        content: prompt,
      },
    ],
    temperature: 0.77,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    max_tokens: 3000,
    n: 1,
  };

  const story = await OpenAIChatCompletions(payload);
  return story;
};
