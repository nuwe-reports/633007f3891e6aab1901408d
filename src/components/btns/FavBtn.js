import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { Button } from "@mui/material";

const FavBtn = ({ savedFavs, favs, setFavs, item }) => {
  function addToFavs() {
    setFavs([...favs, item]);
  }

  function removeFromFavs() {
    setFavs([...favs.filter((fav) => fav.name !== item.name)]);
  }

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
