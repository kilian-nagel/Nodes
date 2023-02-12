import type { AppProps } from 'next/app';
import { UserProvider } from '@auth0/nextjs-auth0/client';  
import "../styles/normalize.css";
import "../styles/index.css";
import "../styles/navbar.css";
import "../styles/global.css";
import "../styles/reset.css";
import "../styles/utility.css";
import "../styles/footer.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <Component {...pageProps} />
    </UserProvider>
  )
}
