import { Typography } from "@mui/material";
import { nameSize, speciesIcon, statusIcon } from "../service/customCharInfo";

function CharInfo({ item }) {
  return (
    <>
      <div className="info">
        <Typography variant={nameSize(item.name)}>
          <b>{item.name}</b>
        </Typography>

        <p>
          {speciesIcon(item.species)}
          <br />
          {statusIcon(item.status)}
        </p>
      </div>
    </>
  );
}

export default CharInfo;
