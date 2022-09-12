import "./App.scss";
import Appbar from "./components/Appbar";
import Home from "./pages/Home";
import Characters from "./pages/Characters";
import NotFound from "./pages/NotFound";
import {
  BrowserRouter as Router,
  NavLink,
  Route,
  Routes,
} from "react-router-dom";
import Paper from "@mui/material/Paper";
import { ThemeProvider } from "@emotion/react";
import { useTheme } from "./context/ThemeContext";
import Details from "./pages/Details";
import RequireAuth from "./context/RequireAuth";
import Footer from "./components/Footer";

function App() {
  const modeTheme = useTheme();
  return (
    <Paper>
      <Router>
        <div className="App">
          <Appbar />
          <Routes>
            <Route path="/" element={<Home />} />

            <Route
              path="/chars"
              element={
                <RequireAuth>
                  <Characters />
                </RequireAuth>
              }
            />
            <Route
              path="/chars/:id"
              element={
                <RequireAuth>
                  <Details />
                </RequireAuth>
              }
            />

            <Route path="*" element={<NotFound />} />
          </Routes>
          <Footer></Footer>
        </div>
      </Router>
    </Paper>
  );
}

export default App;
