import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";

export const Card = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#150E10" : "#E8E8E8",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));
