import type { AppProps } from 'next/app';
import "../styles/normalize.css";
import "../styles/index.css";
import "../styles/navbar.css";
import "../styles/global.css";
import "../styles/reset.css";
import "../styles/utility.css";
import "../styles/footer.css";

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
