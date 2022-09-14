import * as React from "react";
import Chip from "@mui/material/Chip";
import { Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import { Card } from "../components/Card";
import Loader from "../components/Loader";
import BackBtn from "../components/btns/BackBtn";
import { Favorite } from "@mui/icons-material";
import { speciesIcon, statusIcon } from "../service/customCharInfo";
const Details = () => {
  const { id } = useParams();
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [favChars, setFavChars] = useState([]);
  const [char, setChar] = useState({
    id: 0,
    name: "",
    status: "",
    species: "",

    gender: "",
    origin: {
      name: "",
      url: "",
    },
    location: {
      name: "",
    },
    image: "",
    episode: [],
  });
  const [firstSeen, setFirstSeen] = useState("");
  const [lastSeen, setLastSeen] = useState("");
  const [episodesNums, setEpisodesNum] = useState([]);
  const getNum = (e) => e.split("/")[5];

  useEffect(() => {
    setError(false);
    setIsLoading(true);
    axios
      .get(`https://rickandmortyapi.com/api/character/${id}`)
      .then((response) => {
        const data = { ...response.data };
        setChar({ ...data });
      })

      .catch((error) => {
        setError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    setEpisodesNum(char.episode.map((e) => getNum(e)));
  }, [char]);

  useEffect(() => {
    axios
      .get(`https://rickandmortyapi.com/api/episode/${episodesNums[0]}`)
      .then((response) => {
        const data = { ...response.data };
        setFirstSeen(data.name);
      })

      .catch((error) => {
        setFirstSeen("Unknown");
      });
  }, [char]);
  useEffect(() => {
    const localFavs = localStorage.getItem("favs");
    if (localFavs.length) {
      const parsedFavs = JSON.parse(localFavs);
      setFavChars([...parsedFavs]);
    }
  }, []);

  return (
    <div className="main">
      {isLoading && <Loader></Loader>}
      <Box>
        <Card className="det">
          <div className="details">
            <div className="info">
              <Typography variant="h3">
                {char.name}{" "}
                {favChars.some((i) => i.id === char.id) && (
                  <Favorite
                    sx={{
                      color: "#FE0D13",
                    }}
                  ></Favorite>
                )}
              </Typography>
            </div>
            <img src={char.image} alt={char.name}></img>
            <div className="info">
              <Typography variant="h5">
                {speciesIcon(char.species)}, {char.gender}
              </Typography>
              <Typography variant="h6">
                <i>{statusIcon(char.status)}</i>
              </Typography>
            </div>
            <div>
              <Typography variant="h6">
                🛸 Comes from <i>{char.origin.name}</i>
              </Typography>
            </div>
            <div className="info">
              <Typography variant="h6">🎬 First seen at:</Typography>{" "}
              <Chip
                label={`${episodesNums[0]}. ${firstSeen}`}
                sx={{ margin: "2px" }}
              />
              <Typography>🎬 Seen also at episodes: </Typography>
              <Box sx={{ maxWidth: "80%" }}>
                {episodesNums.map((e) => (
                  <Chip
                    size="small"
                    label={e}
                    variant="outlined"
                    sx={{ margin: "2px" }}
                  />
                ))}
              </Box>
            </div>
          </div>
        </Card>
      </Box>
      <div className="btn">
        <BackBtn></BackBtn>
      </div>
    </div>
  );
};

export default Details;
