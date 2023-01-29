import React, { ReactElement, FC, useState, useEffect, useReducer } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { useTranslation } from "react-i18next";

import { Box, CssBaseline } from "@mui/material"
import { ThemeProvider } from '@mui/styles'

import { theme } from "./theme"
import { routes as appRoutes } from "./routes"
import { initialState, reducer } from './store';
import StateContext from './context/StateContext';

import Navbar from './components/Navbar';
import Footer from "./components/Footer";

const App: FC<any> = (): ReactElement => {
  const { i18n } = useTranslation(['main'])
  const [state, dispatch] = useReducer(reducer, initialState)

  const providerState = {
    state,
    dispatch,
  }

  const [backgroundColor, setBackgroundcolor] = useState("#F0E1F6")
  const [direction, setDirection] = useState("ltr")

  useEffect(() => {
    i18n.changeLanguage(state.lang)
    setBackgroundcolor(window.location.pathname === "/" ? "#F0E1F6" : "white")
    setDirection(state.lang === "he" ? "rtl" : "ltr")
  }, [state.lang, i18n])

  return (
    <StateContext.Provider value={providerState}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box height="100vh" display="flex" flexDirection="column"
          sx={{ fontFamily: "Montserrat", backgroundColor: `${backgroundColor}`, direction }}>
          <Router>
            <Navbar />
            <Routes>
              {appRoutes.map((route) => (
                <Route
                  key={route.key}
                  path={route.path}
                  element={<route.component />}
                />
              ))}
            </Routes>
            <Footer />
          </Router>
        </Box>
      </ThemeProvider>
    </StateContext.Provider>
  );
}

export default App;
