import { useUserContext } from "../context/UserContext";
import Character from "../components/Character";
const UserFavs = () => {
  const userFavs = useUserContext();

  return (
    <>
      <h2>fav user movies</h2>
      {userFavs.favChars.map((item) => {
        <Character key={item.id} item={item} />;
      })}
    </>
  );
};
export default UserFavs;
