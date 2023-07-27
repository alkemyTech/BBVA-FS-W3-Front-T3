import {
  Box,
  Card,
  CardActionArea,
  Typography,
} from "@mui/material";
import CardContent from "@mui/material/CardContent";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';
export default function TranscationCard() {
  return (
    <Card
      sx={{
        marginTop: "10px",
        width: "100%",
        borderBox: "green",
      }}
    >
      <CardActionArea>
        <Box sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems:"center",
          pl: 1,
            pr: 1,
        }}>
            <AddCircleIcon fontSize="large" sx={{
              color:"green"
            }}/>
        <CardContent
          sx={{width:"100%"}}
        >
          <Typography
            align="center"
            color="green"
            sx={{ letterSpacing: "0.4rem" }}
          >
            $1.200
          </Typography>
        </CardContent>
          <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
              }}
          >
            <div style={{ color: "red"}} >2022-02-02</div>
          </Box>
        </Box>
      </CardActionArea>
    </Card>
  );
}
