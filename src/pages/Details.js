import * as React from "react";
import Chip from "@mui/material/Chip";
import { Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import { Card } from "../components/Card";
import BackBtn from "../components/btns/BackBtn";
const Details = () => {
  const { id } = useParams();
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
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
  useEffect(() => {
    setError(false);
    setIsLoading(true);
    axios
      .get(`https://rickandmortyapi.com/api/character/${id}`)
      .then((response) => {
        const data = { ...response.data };
        setChar({ ...data });
        console.log(char.episode);
      })
      .catch((error) => {
        setError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const getNum = (e) => e.split("/")[5];

  return (
    <div className="main">
      <Box>
        <Card className="det">
          <div className="details">
            <div className="info">
              <Typography variant="h3">{char.name}</Typography>
            </div>
            <img src={char.image} alt={char.name}></img>
            <div className="info">
              <Typography variant="h5">
                👤 {char.species}, {char.gender}
              </Typography>
              <Typography>
                <i>{char.status}</i>
              </Typography>
            </div>

            <Typography>
              🛸 Comes from <i>{char.origin.name}</i>
            </Typography>
            <div className="info">
              <Typography variant="h5">🎬 Episodes: </Typography>
              <Box sx={{ maxWidth: "80%" }}>
                {char.episode.map((e) => (
                  <Chip
                    label={getNum(e)}
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
