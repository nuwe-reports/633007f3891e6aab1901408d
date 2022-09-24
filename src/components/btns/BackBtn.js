import Button from "@mui/material/Button";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { useNavigate } from "react-router-dom";

const BackBtn = () => {
  const navigate = useNavigate();

  const back = () => {
    navigate("/chars");
  };
  return (
    <Button
      variant="outlined"
      onClick={back}
      color="inherit"
      data-testid="back-btn"
    >
      <ArrowBackIosIcon></ArrowBackIosIcon>
      Back
    </Button>
  );
};

export default BackBtn;
