import notfound from "../assets/not-found.png";

const NotFound = () => {
  return (
    <div className="not-found">
      <h1>Oops!</h1>
      <h2>Page not found</h2>

      <img
        data-testid="not-found-img"
        src={notfound}
        alt="Rick and Morty throw the portal"
      ></img>
    </div>
  );
};

export default NotFound;
