import { Box, Container, CssBaseline } from "@material-ui/core";
import red from "@material-ui/core/colors/red";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import App from "next/app";
import Head from "next/head";
import router from "next/router";
import { SWRConfig } from "swr";
import NProgress from "nprogress";
import "../style/nprogress.css";
import { Nav } from "../components/Nav";

NProgress.configure({
  trickleRate: 0.1,
  trickleSpeed: 300,
  showSpinner: false,
});

router.events.on("routeChangeStart", () => {
  NProgress.start();
});

router.events.on("routeChangeComplete", () => {
  NProgress.done();
});

router.events.on("routeChangeError", () => {
  NProgress.done();
});

// Create a theme instance.
export const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#556cd6",
    },
    error: {
      main: red.A400,
    },
    background: {
      default: "#fff",
    },
  },
});

export default class MyApp extends App {
  componentDidMount() {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }

  render() {
    const { Component, pageProps } = this.props;

    return (
      <React.Fragment>
        <Head>
          <title>Car Trader</title>
          <meta
            name="viewport"
            content="minimum-scale=1, initial-scale=1, width=device-width"
          />
        </Head>
        <ThemeProvider theme={theme}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          <Nav />
          <SWRConfig
            value={{ fetcher: (url) => axios(url).then((r) => r.data) }}
          >
            <Container maxWidth={false}>
              <Box marginTop={2}>
                <Component {...pageProps} />
              </Box>
            </Container>
          </SWRConfig>
        </ThemeProvider>
      </React.Fragment>
    );
  }
}
