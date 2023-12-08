import { Html, Head, Main, NextScript } from 'next/document';
import { UserProvider } from '@auth0/nextjs-auth0/client';

export default function Document() {

  return (
    <Html lang="en">
      <Head />
      <body>
        <UserProvider>
          <Main />
          <NextScript />
        </UserProvider>
      </body>
    </Html>
  )
}
