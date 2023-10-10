import {
  createParser,
  ParsedEvent,
  ReconnectInterval,
} from 'eventsource-parser';
import OpenAI from 'openai';

type Messages = {
  role: 'user' | 'system' | 'assistant';
  content: string;
};

// Uses the chat completions API. https://platform.openai.com/docs/api-reference/chat/create
// It takes too long to respond with long texts, which times out on the server during page generation in the build.
// Breaks the build.
export interface OpenAIChatCompletionsPayload {
  model: string;
  messages: Messages[];
  temperature: number;
  top_p: number;
  frequency_penalty: number;
  presence_penalty: number;
  max_tokens: number;
  n: number;
}

export async function OpenAIChatCompletions(
  payload: OpenAIChatCompletionsPayload
) {
  try {
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY_VILLAIN,
    });
    const completion = await openai.chat.completions.create(payload);
    return completion.choices[0].message.content;
  } catch (e) {
    console.log('There is an error', e);
  }
}

// Uses the legacy completions API. https://platform.openai.com/docs/api-reference/completions/create.
// Gives a faster response on the build during page generation.
export interface OpenAICompletionsPayload {
  model: string;
  prompt: string;
  frequency_penalty: number;
  presence_penalty: number;
  temperature: number;
  top_p: number;
  max_tokens: number;
}

export async function OpenAICompletions(payload: OpenAICompletionsPayload) {
  try {
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY_VILLAIN,
    });
    const completion = await openai.completions.create(payload);
    return completion.choices[0].text;
  } catch (e) {
    console.log('There is an error', e);
  }
}

export interface OpenAIStreamPayload {
  model: string;
  prompt: string;
  temperature: number;
  top_p: number;
  frequency_penalty: number;
  presence_penalty: number;
  max_tokens: number;
  stream: boolean;
  n: number;
}

export async function OpenAIStream(payload: OpenAIStreamPayload) {
  const encoder = new TextEncoder();
  const decoder = new TextDecoder();

  let counter = 0;
  try {
    const res = await fetch('https://api.openai.com/v1/completions', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.OPENAI_API_KEY_VILLAIN ?? ''}`,
      },
      method: 'POST',
      body: JSON.stringify(payload),
    });

    if (res.status === 200) {
      const stream = new ReadableStream({
        async start(controller) {
          // callback
          function onParse(event: ParsedEvent | ReconnectInterval) {
            if (event.type === 'event') {
              const data = event.data;
              // https://beta.openai.com/docs/api-reference/completions/create#completions/create-stream
              if (data === '[DONE]') {
                controller.close();
                return;
              }
              try {
                const json = JSON.parse(data);
                const text = json.choices[0].text;
                if (counter < 2 && (text.match(/\n/) || []).length) {
                  // this is a prefix character (i.e., "\n\n"), do nothing
                  return;
                }
                const queue = encoder.encode(text);
                controller.enqueue(queue);
                counter++;
              } catch (e) {
                // maybe parse error
                controller.error(e);
              }
            }
          }

          // stream response (SSE) from OpenAI may be fragmented into multiple chunks
          // this ensures we properly read chunks and invoke an event for each SSE event stream
          const parser = createParser(onParse);
          // https://web.dev/streams/#asynchronous-iteration
          for await (const chunk of res.body as any) {
            parser.feed(decoder.decode(chunk));
          }
        },
      });
      return stream;
    }
  } catch (e) {
    console.log('There is an error', e);
  }
}
