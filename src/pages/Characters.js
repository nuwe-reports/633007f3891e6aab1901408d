import * as React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import CharacterCard from "../components/CharacterCard";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Loader from "../components/Loader";

import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

const Characters = () => {
  const [isLoading, setIsLoading] = useState(false);

  const [error, setError] = useState(false);

  const [characters, setCharacters] = useState([]);

  const [openCharInf, setOpenCharInf] = useState([
    { name: "", status: "", species: "", gender: "", origin: "", image: "" },
  ]);
  const [favs, setFavs] = useState([]);
  const [userFavs, setUserFavs] = useState([]);
  //pagination --------------------**********************
  const [page, setPage] = React.useState(1);
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };
  //----------**********-------------**************-----------
  useEffect(() => {
    const storedFavs = localStorage.getItem("favs");
    const storedJSON = JSON.parse(storedFavs);
    setUserFavs([...userFavs, ...storedJSON]);

    console.log("*******", userFavs);
  }, [favs]);

  useEffect(() => {
    setError(false);
    setIsLoading(true);
    axios
      .get(`https://rickandmortyapi.com/api/character/?page=${page}`)
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
  }, [page]);

  return (
    <div className="main">
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
                favs={favs}
                setFavs={setFavs}
                openCharInf={openCharInf}
                setOpenCharInf={setOpenCharInf}
              />
            ))}
          </Grid>
        )}
      </Box>
      <div className="btn">
        <Stack spacing={2}>
          <Pagination count={42} page={page} onChange={handleChange} />
        </Stack>
      </div>
    </div>
  );
};

export default Characters;
