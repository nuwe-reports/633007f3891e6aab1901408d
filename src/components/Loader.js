import faces from "../assets/faces.png";
function Loader() {
  return (
    <div className="loader">
      <div className="faces">
        <img
          src={faces}
          alt="Rick and Morty faces looking to each other"
          width="250px"
        ></img>
      </div>
    </div>
  );
}

export default Loader;
