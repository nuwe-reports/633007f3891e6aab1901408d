import { useState, useEffect } from "react";
import CharacterCard from "../components/CharacterCard";
import FavCharCard from "../components/FavCharCard";
const UserFavs = () => {
  const [favs, setFavs] = useState([]);

  useEffect(() => {
    const json = localStorage.getItem("favs");
    const favs = JSON.parse(json);
    if (favs) {
      setFavs([...favs]);
    }
  }, []);

  return (
    <div className="main">
      <h2>fav user movies</h2>
      {favs.length > 0 ? (
        <>
          {favs.map((item) => (
            <FavCharCard
              key={item.id}
              item={item}
              favs={favs}
              setFavs={setFavs}
            />
          ))}
        </>
      ) : (
        <h3>no favs added yet</h3>
      )}
    </div>
  );
};
export default UserFavs;
