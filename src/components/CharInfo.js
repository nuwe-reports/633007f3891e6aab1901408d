import { Typography } from "@mui/material";

function CharInfo({ item }) {
  return (
    <>
      <div className="info">
        {item.name.length > 8 ? (
          <>
            {item.name.length > 20 ? (
              <Typography variant="h5">{item.name}</Typography>
            ) : (
              <Typography variant="h4">{item.name}</Typography>
            )}
          </>
        ) : (
          <Typography variant="h3">{item.name}</Typography>
        )}

        <p>
          👤 {item.species} <br />
          <i>{item.status}</i>
        </p>
      </div>
    </>
  );
}

export default CharInfo;
