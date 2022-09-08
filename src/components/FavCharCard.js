import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "./Card";
import CharInfo from "./CharInfo";
import { Button, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";

import { Favorite, FavoriteBorder } from "@mui/icons-material";

function FavCharCard({ item, favs, setFavs }) {
  const navigate = useNavigate();

  function removeFromFavs(event) {}
  return (
    <>
      <Grid item xs="10" sm="9" md="6" lg="6" xl="6">
        <Card>
          <div>
            <div>
              <img src={item.image} alt={item.name} />
            </div>

            <div>
              <CharInfo item={item}></CharInfo>
              <div>
                <Button onClick={removeFromFavs}>
                  <Favorite
                    sx={{
                      color: "#FE0D13",
                    }}
                  ></Favorite>
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </Grid>
    </>
  );
}

export default FavCharCard;
