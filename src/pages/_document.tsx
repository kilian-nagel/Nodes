import { Html, Head, Main, NextScript } from 'next/document';

const AUTH0_DOMAIN = process.env.AUTH0_DOMAIN as string;
const CLIENT_ID = process.env.CLIENT_ID as string;

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
