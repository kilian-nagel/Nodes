import type { AppProps } from 'next/app';
import { UserProvider } from '@auth0/nextjs-auth0/client';  
import "../styles/rules/normalize.css";
import "../styles/rules/global.css";
import "../styles/rules/reset.css";
import "../styles/components/navbar.css";
import "../styles/components/footer.css";
import "../styles/components/utility.css";
import "../styles/pages/index.css";
import "../styles/pages/home.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <Component {...pageProps} />
    </UserProvider>
  )
}
