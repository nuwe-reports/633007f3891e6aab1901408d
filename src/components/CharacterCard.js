import { useState } from "react";
import Link from "@mui/material/Link";
import { Card } from "./Card";
import CharInfo from "./CharInfo";
import { Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import FavBtn from "./btns/FavBtn";

function CharacterCard({
  item,
  openCharInf,
  setOpenCharInf,
  userFavs,
  favs,
  setFavs,
  savedFavs,
}) {
  const { empty } = useState({
    name: "",
    status: "",
    species: "",
    gender: "",
    origin: "",
    image: "",
  });
  const [charInfo, setCharInfo] = useState({
    ...empty,
  });
  //open close char card
  function toggleInfo() {
    setCharInfo({
      ...empty,
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
          ...empty,
        },
      ]);
      setCharInfo({
        ...empty,
      });
    }
  }

  return (
    <>
      {item.name === openCharInf[0].name ? (
        <Grid item xs="10" sm="8" md="6" lg="6" xl="6">
          <Card>
            <div className="itemBig">
              <div onClick={toggleInfo}>
                <img src={item.image} alt={item.name} />
              </div>
              <div className="info">
                <div onClick={toggleInfo}>
                  <CharInfo item={item}></CharInfo>
                </div>

                <Typography>
                  <Link
                    underline="hover"
                    color="inherit"
                    href={`/chars/${item.id}`}
                  >
                    See complete info...
                  </Link>
                </Typography>

                <FavBtn
                  favs={favs}
                  setFavs={setFavs}
                  item={item}
                  savedFavs={savedFavs}
                ></FavBtn>
              </div>
            </div>
          </Card>
        </Grid>
      ) : (
        <Grid item xs="auto">
          <Card>
            <div className="itemSmall" onClick={toggleInfo}>
              <div>
                <img src={item.image} alt={item.name} />
              </div>
            </div>
            <FavBtn
              favs={favs}
              setFavs={setFavs}
              item={item}
              savedFavs={savedFavs}
            ></FavBtn>
          </Card>
        </Grid>
      )}
    </>
  );
}

export default CharacterCard;
