import * as React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import CharacterCard from "../components/CharacterCard";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Loader from "../components/Loader";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

const Characters = ({
  favs,
  setFavs,
  savedFavs,
  setSavedFavs,
  isLoading,
  setIsLoading,
  logoutError,
}) => {
  //error getting data
  const [error, setError] = useState(false);

  //data
  const [characters, setCharacters] = useState([]);
  //char card open
  const [openCharInf, setOpenCharInf] = useState([
    { name: "", status: "", species: "", gender: "", origin: "", image: "" },
  ]);

  //pagination --------------------**********************
  const [page, setPage] = React.useState(1);
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };
  const [totalPages, setTotalPages] = useState(0);

  //---get data-------**********-------------**************-----------

  useEffect(() => {
    setError(false);
    setIsLoading(true);

    axios
      .get(`https://rickandmortyapi.com/api/character/?page=${page}`)
      .then((response) => {
        const characters = [...response.data.results];
        setCharacters([...characters]);

        setTotalPages(response.data.info.pages);
      })
      .catch((error) => {
        setError(true);
      })
      .finally(() => {
        setIsLoading(false);
        setError(false);
      });
  }, [page]);

  // set favs in local storage
  useEffect(() => {
    if (favs.length) {
      const json = JSON.stringify(favs);
      localStorage.setItem("favs", json);
    }
  }, [favs]);

  //  get favs from local storage
  useEffect(() => {
    if (favs.length) {
      const localFavs = localStorage.getItem("favs");
      const parsedFavs = JSON.parse(localFavs);
      setSavedFavs([...parsedFavs]);
    } else {
      setSavedFavs([]);
    }
  }, [favs]);

  // get stored favs on page load
  useEffect(() => {
    const localFavs = localStorage.getItem("favs");
    const parsedFavs = () => {
      if (localFavs.length !== 0) JSON.parse(localFavs);
    };

    if (parsedFavs.length) {
      setSavedFavs([...parsedFavs]);
      setFavs([...parsedFavs]);
    }
  }, []);

  return (
    <div className="main">
      {isLoading && <Loader data-testid="loader"></Loader>}
      <Box sx={{ flexGrow: 1 }}>
        {error && <h3>Sorry an error happen getting the data</h3>}
        {logoutError && (
          <h3>An error happen when ending your session, please try again</h3>
        )}
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
                savedFavs={savedFavs}
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
          <Pagination count={totalPages} page={page} onChange={handleChange} />
        </Stack>
      </div>
    </div>
  );
};

export default Characters;
