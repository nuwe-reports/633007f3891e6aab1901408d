import * as React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import Character from "../components/Character";

const Home = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [characters, setCharacters] = useState([]);
  const [openCharInf, setOpenCharInf] = useState([
    { name: "", status: "", species: "", gender: "", origin: "", image: "" },
  ]);
  useEffect(() => {
    setError(false);
    setIsLoading(true);
    axios
      .get("https://rickandmortyapi.com/api/character")
      .then((response) => {
        console.log("hello", characters);
        const characters = response.results;
        setCharacters([...characters]);
        console.log("hello", characters);
      })
      .catch((error) => {
        setError(true);
      })
      .finally(() => {
        setIsLoading(false);
        console.log("bye", characters);
      });
  }, []);
  return (
    <div className="main">
      {error && <h3>Sorry an error happen when getting the data</h3>}
      {/* {characters.length > 0 && (
        <>
          {characters.map((item) => (
            <Character
              key={item.id}
              item={item}
              openCharInf={openCharInf}
              setOpenCharInf={setOpenCharInf}
            />
          ))}
        </>
      )} */}
      {characters.map((item) => (
        <p>item.name</p>
      ))}
    </div>
  );
};

export default Home;
