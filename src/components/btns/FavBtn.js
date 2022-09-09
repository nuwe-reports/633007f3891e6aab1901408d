import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { Button } from "@mui/material";

const FavBtn = ({ userFavs, favs, setFavs, item }) => {
  function addToFavs(e) {
    e.preventDefault();
    setFavs([...favs, item]);

    console.log("user", userFavs);
    const json = JSON.stringify(favs);
    localStorage.setItem("favs", json);
  }

  function removeFromFavs(e) {
    e.preventDefault();
    setFavs([...favs.filter((i) => i.name !== item.name)]);

    const json = JSON.stringify(favs);

    localStorage.setItem("favs", json);
  }

  return (
    <div>
      {userFavs.some((x) => x.id === item.id) ? (
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
