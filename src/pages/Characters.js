import * as React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import CharacterCard from "../components/CharacterCard";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Loader from "../components/Loader";

const Characters = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [characters, setCharacters] = useState([]);
  const [openCharInf, setOpenCharInf] = useState([
    { name: "", status: "", species: "", gender: "", origin: "", image: "" },
  ]);
  const [userFavs, setUserFavs] = useState([]);
  useEffect(() => {
    setError(false);
    setIsLoading(true);
    axios
      .get("https://rickandmortyapi.com/api/character/?page=1")
      .then((response) => {
        const characters = [...response.data.results];
        setCharacters([...characters]);
      })
      .catch((error) => {
        setError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  // useEffect(() => {
  //   const json = JSON.stringify(userFavs);
  //   localStorage.setItem("favs", json);
  // }, [userFavs]);

  return (
    <Box sx={{ flexGrow: 1 }}>
      {isLoading && <Loader></Loader>}
      {error && <h3>Sorry an error happen when getting the data</h3>}
      {characters.length > 0 && (
        <Grid
          container
          direction="row"
          justifyContent="space-evenly"
          alignItems="center"
          spacing={3}
        >
          {/* <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }} > */}
          {characters.map((item) => (
            <CharacterCard
              key={item.id}
              item={item}
              userFavs={userFavs}
              setUserFavs={setUserFavs}
              openCharInf={openCharInf}
              setOpenCharInf={setOpenCharInf}
            />
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default Characters;
