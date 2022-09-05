import notfound from "../assets/not-found.png";
const NotFound = () => {
  return (
    <div>
      <h2>Page not found</h2>
      <img src={notfound} alt="Rick and Morty throw the portal"></img>
    </div>
  );
};

export default NotFound;
