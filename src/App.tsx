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
  const URL = process.env.REACT_APP_DB_URL || "";
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
    setBackgroundcolor(state.route === "/" ? "#F0E1F6" : "white")
    setDirection(state.lang === "he" ? "rtl" : "ltr")
  }, [state.lang, state.route])

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
            <Box width="100vw" display="flex"
              sx={{ justifyContent: "center", paddingLeft: "15%", paddingRight: "15%" }}>
              <Footer />
            </Box>
          </Router>
        </Box>
      </ThemeProvider>
    </StateContext.Provider>
  );
}

export default App;
