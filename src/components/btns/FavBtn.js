import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { Button } from "@mui/material";
const FavBtn = ({ favs, setFavs, item }) => {
  function addToFavs() {
    setFavs([...favs, item]);

    const json = JSON.stringify(favs);
    localStorage.setItem("favs", json);
  }

  function removeFromFavs(event) {
    setFavs([...favs.filter((i) => i.name !== item.name)]);
    const json = JSON.stringify(favs);

    localStorage.setItem("favs", json);
  }
  return (
    <div>
      {favs.some((x) => x.name === item.name) ? (
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
  );
};

export default FavBtn;
