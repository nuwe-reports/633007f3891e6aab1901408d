import * as React from "react";
import { useContext } from "react";
import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@mui/material/styles";
import { useState } from "react";

export const ColorModeContext = React.createContext({
  toggleColorMode: () => {},
});

export const ToggleColorModeProv = ({ children }) => {
  const [mode, setMode] = useState(
    window.localStorage.getItem("theme") || "light"
  );

  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevmode) => (prevmode === "light" ? "dark" : "light"));
        if (mode === "light") window.localStorage.setItem("theme", "dark");
        else window.localStorage.setItem("theme", "light");
      },
    }),
    [mode]
  );

  const modeTheme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          ...(mode === "light"
            ? {
                // palette values for light mode
                primary: {
                  main: "#ffffff",

                  divider: "#0f0c29",
                  action: "#ffffff",
                },
                secondary: {
                  main: "#4D4D4C",
                  hover: "#757F9A",
                },
                background: {
                  default: "#FFFFFF",
                  paper: "#ECE9E6",
                },
                text: {
                  primary: "#4D4D4C",
                },
              }
            : {
                // palette values for dark mode
                primary: {
                  main: "#24243e",
                  action: "#ffffff",
                },
                secondary: {
                  main: "#ffffff",
                  hover: "#ECE9E6",
                },
                background: {
                  default: "#0f0c29",
                  paper: "#0f0c29",
                },
                text: {
                  primary: "#ECE9E6",
                },
              }),
        },
        breakpoints: {
          values: {
            xs: 0,
            sm: 400,
            md: 900,
            lg: 1200,
            xl: 1536,
          },
        },
        components: {
          MuiButton: {
            defaultProps: {
              disableElevation: true,
            },
            styleOverrides: {
              root: {
                borderRadius: 10, // square corners
                textTransform: "none", // removes uppercase transformatio
              },
              containedPrimary: {
                borderRadius: 10, // square corners
                textTransform: "uppercase",
              },
            },
          },
          MuiTextField: {
            styleOverrides: {
              root: {
                borderRadius: 10,
              },
            },
          },
          MuiDialog: {
            styleOverrides: {
              root: {
                padding: 10,
              },
              container: {
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              },
            },
          },

          MuiInputBase: {
            defaultProps: {
              disableUnderline: true,
            },
          },
          MuiOutlinedInput: {
            defaultProps: {
              disableUnderline: true,
              //autoFocus: true,
            },
            styleOverrides: {},
          },
          MuiPaper: {
            styleOverrides: {
              elevation0: {
                width: "100%",

                textAlign: "center",
                marginTop: "2rem",
                padding: "3rem",
              },
            },
          },
        },
      }),
    [mode]
  );

  return (
    <ColorModeContext.Provider value={{ colorMode, mode }}>
      <ThemeProvider theme={modeTheme}>{children}</ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export const useTheme = () => useContext(ColorModeContext);

export default ToggleColorModeProv;
