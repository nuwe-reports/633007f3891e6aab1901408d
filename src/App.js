import "./App.scss";
import { useState } from "react";
import Appbar from "./components/Appbar";
import Home from "./pages/Home";
import Characters from "./pages/Characters";
import NotFound from "./pages/NotFound";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Paper from "@mui/material/Paper";

import Details from "./pages/Details";
import RequireAuth from "./context/RequireAuth";
import Footer from "./components/Footer";

function App() {
  // fav characters
  const [favs, setFavs] = useState([]);

  const [savedFavs, setSavedFavs] = useState([]);

  return (
    <Paper>
      <Router>
        <div className="app">
          <Appbar />
          <Routes>
            <Route path="/" element={<Home />} />

            <Route
              path="/chars"
              element={
                <RequireAuth>
                  <Characters
                    favs={favs}
                    setFavs={setFavs}
                    savedFavs={savedFavs}
                    setSavedFavs={setSavedFavs}
                  />
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
