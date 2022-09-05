function CharInfo({ item }) {
  return (
    <>
      <div>
        <h2>{item.name}</h2>
      </div>
      <div>
        <p>{item.genre}</p>
      </div>
      <div>
        <p>{item.species}</p>
        <p>
          <i>{item.status}</i>
        </p>
      </div>
    </>
  );
}

export default CharInfo;
