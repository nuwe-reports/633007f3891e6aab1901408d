import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";

export const Card = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#24213C" : "#FFFFFF",
  ...theme.typography.body2,
  padding: 0,
  textAlign: "center",

  color: theme.palette.text.primary,
}));
