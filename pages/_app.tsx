import { useMemo } from "react";
import type { AppProps } from "next/app";
import Head from "next/head";
import useMediaQuery from "@mui/material/useMediaQuery";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CacheProvider, EmotionCache } from "@emotion/react";
import CssBaseline from "@mui/material/CssBaseline";
import { EthProvider } from "src/contexts/EthContext";
import createEmotionCache from "src/emotion-cache/emotionCache";
import "../styles/globals.scss";

/** Client-side cache, shared for the whole session of the user in the browser */
const clientSideEmotionCache = createEmotionCache();

interface IProps extends AppProps {
  emotionCache?: EmotionCache;
}

export default function App(props: IProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? "dark" : "light",
        },
      }),
    [prefersDarkMode]
  );

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
