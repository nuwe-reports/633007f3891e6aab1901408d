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
    <div>
      {savedFavs.some((x) => x.id === item.id) ? (
        <Button onClick={removeFromFavs}>
          <Favorite
            sx={{
              color: "#FE0D13",
            }}
          ></Favorite>
        </Button>
      ) : (
        <Button color="secondary" onClick={addToFavs}>
          <FavoriteBorder></FavoriteBorder>
        </Button>
      )}
    </div>
  );
};

export default FavBtn;
