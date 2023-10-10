import { OpenAIStream, OpenAIStreamPayload } from '@utils/OpenAIStream';

if (!process.env.OPENAI_API_KEY_VILLAIN) {
  throw new Error('Missing env var from OpenAI');
}

const handler = async (req: Request): Promise<Response> => {
  const { prompt } = (await req.json()) as {
    prompt?: string;
  };

  if (!prompt) {
    return new Response('No prompt in the request', { status: 400 });
  }

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

  return new Response(stream);
};

export default handler;
