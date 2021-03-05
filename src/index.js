import 'react-hot-loader'
import React from 'react';
import ReactDOM from 'react-dom';
import './assets/fonts/nunito/style.css';
import './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';
import { BrowserRouter } from "react-router-dom";

import { ChakraProvider } from "@chakra-ui/react"
import { createMuiTheme, ThemeProvider as ThemeProviderMaterial } from '@material-ui/core/styles';
import { ToastContainer } from 'react-toastify';
import { PersistGate } from 'redux-persist/integration/react';

import { store, persistor } from './store';

// import { configureRootTheme } from "@yandex/ui/Theme";
// import { theme as YandexUITheme } from "./theme/default";

// configureRootTheme({ theme: YandexUITheme });

const themeMaterial = createMuiTheme({
  palette: {
    primary: {
      // light: will be calculated from palette.primary.main,
      main: '#0E6FE2',
      // dark: will be calculated from palette.primary.main,
      // contrastText: will be calculated to contrast with palette.primary.main
    },
    secondary: {
      light: '#000',
      main: '#0E6FE2',
      // dark: will be calculated from palette.secondary.main,
      contrastText: '#000',
    },
    // Used by `getContrastText()` to maximize the contrast between
    // the background and the text.
    contrastThreshold: 3,
    // Used by the functions below to shift a color's luminance by approximately
    // two indexes within its tonal palette.
    // E.g., shift from Red 500 to Red 300 or Red 700.
    tonalOffset: 0.2,
  },
});

ReactDOM.render(
  <AppContainer>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
          <ChakraProvider>
            <ThemeProviderMaterial theme={themeMaterial}>
              <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable={false}
                pauseOnHover
                closeButton={false}
              />
              <App />
            </ThemeProviderMaterial>
          </ChakraProvider>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </AppContainer>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
