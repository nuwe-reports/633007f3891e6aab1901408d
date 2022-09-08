import { Typography } from "@mui/material";

function CharInfo({ item }) {
  return (
    <>
      <div className="info">
        <Typography variant="h5">{item.name}</Typography>

        <div></div>
        <p>
          👤 {item.species} <br />
          <i>{item.status}</i>
        </p>
      </div>
    </>
  );
}

export default CharInfo;
