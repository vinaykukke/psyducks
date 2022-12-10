import type { AppProps } from "next/app";
import Head from "next/head";
import { CacheProvider, EmotionCache } from "@emotion/react";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { EthProvider } from "src/contexts/EthContext";
import createEmotionCache from "src/emotion-cache/emotionCache";
import theme from "theme/createTheme";
import "../styles/globals.scss";

/** Client-side cache, shared for the whole session of the user in the browser */
const clientSideEmotionCache = createEmotionCache();

interface IProps extends AppProps {
  emotionCache?: EmotionCache;
}

export default function App(props: IProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <EthProvider>
          <Component {...pageProps} />
        </EthProvider>
      </ThemeProvider>
    </CacheProvider>
  );
}
