import {
  Avatar,
  Card,
  CardActionArea,
  CardHeader,
  IconButton,
  Typography,
} from "@mui/material";
import CardContent from "@mui/material/CardContent";

export default function TranscationCard() {
  return (
    <Card
      sx={{
        marginTop: "10px",
        width: "100%",
      }}
    >
      <CardActionArea>
        <CardContent>
          <Typography
            gutterBottom
            align="center"
            color="green"
            variant="h6"
            sx={{ letterSpacing: "0.4rem" }}
          >
            $1.200
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
