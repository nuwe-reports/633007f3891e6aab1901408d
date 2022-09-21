import React from "react";
import { screen, render, cleanup, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import CharacterCard from "../../components/CharacterCard";

const character = {
  id: 1,
  name: "Rick Sanchez",
  status: "Alive",
  species: "Human",
  type: "",
  gender: "Male",
  origin: {
    name: "Earth (C-137)",
    url: "https://rickandmortyapi.com/api/location/1",
  },
  location: {
    name: "Citadel of Ricks",
    url: "https://rickandmortyapi.com/api/location/3",
  },
  image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
  episode: [
    "https://rickandmortyapi.com/api/episode/1",
    "https://rickandmortyapi.com/api/episode/2",
    "https://rickandmortyapi.com/api/episode/3",
    "https://rickandmortyapi.com/api/episode/4",
    "https://rickandmortyapi.com/api/episode/5",
    "https://rickandmortyapi.com/api/episode/6",
    "https://rickandmortyapi.com/api/episode/7",
    "https://rickandmortyapi.com/api/episode/8",
    "https://rickandmortyapi.com/api/episode/9",
    "https://rickandmortyapi.com/api/episode/10",
    "https://rickandmortyapi.com/api/episode/11",
    "https://rickandmortyapi.com/api/episode/12",
    "https://rickandmortyapi.com/api/episode/13",
    "https://rickandmortyapi.com/api/episode/14",
    "https://rickandmortyapi.com/api/episode/15",
    "https://rickandmortyapi.com/api/episode/16",
    "https://rickandmortyapi.com/api/episode/17",
    "https://rickandmortyapi.com/api/episode/18",
    "https://rickandmortyapi.com/api/episode/19",
    "https://rickandmortyapi.com/api/episode/20",
    "https://rickandmortyapi.com/api/episode/21",
    "https://rickandmortyapi.com/api/episode/22",
    "https://rickandmortyapi.com/api/episode/23",
    "https://rickandmortyapi.com/api/episode/24",
    "https://rickandmortyapi.com/api/episode/25",
    "https://rickandmortyapi.com/api/episode/26",
    "https://rickandmortyapi.com/api/episode/27",
    "https://rickandmortyapi.com/api/episode/28",
    "https://rickandmortyapi.com/api/episode/29",
    "https://rickandmortyapi.com/api/episode/30",
    "https://rickandmortyapi.com/api/episode/31",
    "https://rickandmortyapi.com/api/episode/32",
    "https://rickandmortyapi.com/api/episode/33",
    "https://rickandmortyapi.com/api/episode/34",
    "https://rickandmortyapi.com/api/episode/35",
    "https://rickandmortyapi.com/api/episode/36",
    "https://rickandmortyapi.com/api/episode/37",
    "https://rickandmortyapi.com/api/episode/38",
    "https://rickandmortyapi.com/api/episode/39",
    "https://rickandmortyapi.com/api/episode/40",
    "https://rickandmortyapi.com/api/episode/41",
    "https://rickandmortyapi.com/api/episode/42",
    "https://rickandmortyapi.com/api/episode/43",
    "https://rickandmortyapi.com/api/episode/44",
    "https://rickandmortyapi.com/api/episode/45",
    "https://rickandmortyapi.com/api/episode/46",
    "https://rickandmortyapi.com/api/episode/47",
    "https://rickandmortyapi.com/api/episode/48",
    "https://rickandmortyapi.com/api/episode/49",
    "https://rickandmortyapi.com/api/episode/50",
    "https://rickandmortyapi.com/api/episode/51",
  ],
  url: "https://rickandmortyapi.com/api/character/1",
  created: "2017-11-04T18:48:46.250Z",
};
const empty = {
  name: "",
  status: "",
  species: "",
  gender: "",
  origin: "",
  image: "",
};

afterEach(cleanup);

describe("CharacterCard", () => {
  test("should render char item small", () => {
    render(
      <CharacterCard
        openCharInf={[{ ...empty }]}
        item={character}
        setOpenCharInf={{}}
        favs={[]}
        setFavs={(favs) => (favs = favs.push(item))}
        savedFavs={[]}
      ></CharacterCard>
    );
    expect(screen.queryByText("See complete info...")).not.toBeInTheDocument();
    expect(screen.getByTestId("img-item-small")).toBeInTheDocument();
    expect(screen.getByTestId("favorite-border")).toBeInTheDocument();
  });

  test("should render char item big", () => {
    render(
      <CharacterCard
        openCharInf={[{ ...character }]}
        item={character}
        setOpenCharInf={{}}
        favs={[]}
        setFavs={(favs) => (favs = favs.push(item))}
        savedFavs={[]}
      ></CharacterCard>
    );
    expect(screen.getByText("See complete info...")).toBeInTheDocument();
    expect(screen.getByTestId("img-item-big")).toBeInTheDocument();
    expect(screen.getByTestId("favorite-border")).toBeInTheDocument();
  });
});
