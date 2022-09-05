import "./App.css";
import Appbar from "./components/Appbar";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import {
  BrowserRouter as Router,
  NavLink,
  Route,
  Routes,
} from "react-router-dom";
import { ThemeProvider } from "@emotion/react";
import { useTheme } from "./context/ThemeContext";
import UserFavs from "./pages/UserFavs";
import UserContextProv from "./context/UserContext";
import Footer from "./components/Footer";
function App() {
  const modeTheme = useTheme();
  return (
    <ThemeProvider theme={modeTheme}>
      <UserContextProv>
        <Router>
          <div className="App">
            <Appbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/user" element={<UserFavs />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
            <Footer></Footer>
          </div>
        </Router>
      </UserContextProv>
    </ThemeProvider>
  );
}

export default App;
