import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { Button } from "@mui/material";
import { useEffect } from "react";
const FavBtn = ({ favs, setFavs, savedFavs, setSavedFavs, item }) => {
  function addToFavs() {
    setSavedFavs([...savedFavs, item]);
    setFavs([...savedFavs]);
  }

  function removeFromFavs() {
    setSavedFavs([...savedFavs.filter((fav) => fav.name !== item.name)]);
    setFavs([...savedFavs]);
  }

  useEffect(() => {
    //set the fav item
    const json = JSON.stringify(savedFavs);
    localStorage.setItem("favs", json);
  }, [favs]);

  return (
    <div data-testid="fav-btn">
      {savedFavs.some((x) => x.id === item.id) ? (
        <Button onClick={removeFromFavs}>
          <Favorite
            data-testid="favorite"
            sx={{
              color: "#FE0D13",
            }}
          ></Favorite>
        </Button>
      ) : (
        <Button color="secondary" onClick={addToFavs}>
          <FavoriteBorder data-testid="favorite-border"></FavoriteBorder>
        </Button>
      )}
    </div>
  );
};

export default FavBtn;
