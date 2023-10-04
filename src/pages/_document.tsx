import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta property="og:title" content="Your daily horror story" />
        <meta property="og:type" content="article" />
        <meta
          property="og:url"
          content="https://story-teller-henna.vercel.app/"
        />
        <meta
          property="og:image"
          content="https://story-teller-henna.vercel.app/header-image.jpg"
        />
        <meta property="og:description" content="Your daily dosage of horror" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
