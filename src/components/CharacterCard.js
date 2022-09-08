import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "./Card";
import CharInfo from "./CharInfo";
import { Button, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import { Favorite, FavoriteBorder } from "@mui/icons-material";

function CharacterCard({
  item,
  openCharInf,
  setOpenCharInf,
  userFavs,
  setUserFavs,
}) {
  const [charInfo, setCharInfo] = useState({
    name: "",
    status: "",
    species: "",
    gender: "",
    origin: "",
    image: "",
  });
  function toggleInfo() {
    setCharInfo({
      name: "",
      status: "",
      species: "",
      gender: "",
      origin: "",
      image: "",
    });
    if (openCharInf.length < 1 || item.name !== openCharInf[0].name) {
      setCharInfo({
        name: item.name,
        status: item.status,
        species: item.species,
        gender: item.gender,
        origin: item.origin.name,
        image: item.image,
      });
      setOpenCharInf([item]);
    } else {
      setOpenCharInf([
        {
          name: "",
          status: "",
          species: "",
          gender: "",
          origin: "",
          image: "",
        },
      ]);
      setCharInfo({
        name: "",
        status: "",
        species: "",
        gender: "",
        origin: "",
        image: "",
      });
    }
  }
  function addToFavs(event) {
    console.log(userFavs, "1");
    setUserFavs([...userFavs, item]);
    console.log(userFavs, "2");
    const json = JSON.stringify(userFavs);
    localStorage.setItem("favs", json);
  }

  function removeFromFavs(event) {
    console.log(userFavs, "1");
    setUserFavs([...userFavs.filter((i) => i.name !== item.name)]);
    console.log(userFavs, "2");
    const json = JSON.stringify(userFavs);
    localStorage.setItem("favs", []);
    localStorage.setItem("favs", json);
  }

  return (
    <>
      {item.name === openCharInf[0].name ? (
        <Grid item xs="10" sm="9" md="6" lg="6" xl="6">
          <Card>
            <div>
              <Button onClick={toggleInfo}>
                <div>
                  <img src={item.image} alt={item.name} />
                </div>
              </Button>

              <div>
                <CharInfo item={item}></CharInfo>
                <div>
                  {userFavs.some((x) => x.name === item.name) ? (
                    <>
                      <Button onClick={removeFromFavs}>
                        <Favorite
                          sx={{
                            color: "#FE0D13",
                          }}
                        ></Favorite>
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button color="secondary" onClick={addToFavs}>
                        <FavoriteBorder></FavoriteBorder>
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </Card>
        </Grid>
      ) : (
        <Grid item xs="auto">
          <Card>
            <div>
              <Button onClick={toggleInfo}>
                <div>
                  <Typography>{item.name}</Typography>
                  <img src={item.image} alt={item.name} />
                </div>
              </Button>

              <div>
                {userFavs.some((x) => x.name === item.name) ? (
                  <Button onClick={removeFromFavs}>
                    {" "}
                    <Favorite
                      sx={{
                        color: "#FE0D13",
                      }}
                    ></Favorite>{" "}
                  </Button>
                ) : (
                  <Button color="secondary" onClick={addToFavs}>
                    {" "}
                    <FavoriteBorder></FavoriteBorder>{" "}
                  </Button>
                )}{" "}
              </div>
            </div>
          </Card>
        </Grid>
      )}
    </>
  );
}

export default CharacterCard;
