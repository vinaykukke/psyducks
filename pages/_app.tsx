import type { AppProps } from "next/app";
import { EthProvider } from "src/contexts/EthContext";
import "../styles/globals.scss";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <EthProvider>
      <Component {...pageProps} />
    </EthProvider>
  );
}
