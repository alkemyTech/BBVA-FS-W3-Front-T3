import Card from "@mui/material/Card";
import {CardActionArea, CardHeader, CardMedia} from "@mui/material";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import {useSelector} from "react-redux";

export default function UserCard() {
    const user = useSelector((state) => state.user);

    return (
        <Card sx={{ maxWidth: 400 }}>
            <CardHeader title="Tu Informacion" sx={{ textAlign: "center", color:"white", backgroundColor: "#1693a5"}} />
            <CardActionArea>
                <CardMedia component="img" />
                <CardContent>
                    <Typography
                        gutterBottom
                        sx={{ fontSize: "1.5rem", textAlign: "left", color: "white", backgroundColor:"#1693a5" }}
                    >
                        Nombre:
                    </Typography>
                    <Typography
                        sx={{ fontSize: "1.5rem", textAlign: "center", color: "black" }}
                    >
                        {user.name.split(" ")[0]}
                    </Typography>
                    <Typography
                        gutterBottom
                        sx={{ fontSize: "1.5rem", textAlign: "left", color: "white", backgroundColor:"#1693a5" }}
                    >
                        Apellido:
                    </Typography>
                    <Typography
                        sx={{ fontSize: "1.5rem", textAlign: "center", color: "black" }}
                    >
                        {user.name.split(" ")[1]}
                    </Typography>
                    <Typography
                        gutterBottom
                        sx={{ fontSize: "1.5rem", textAlign: "left", color: "white", backgroundColor:"#1693a5" }}
                    >
                        Mail:
                    </Typography>
                    <Typography
                        sx={{ fontSize: "1.5rem", textAlign: "center", color: "black" }}
                    >
                        {user.email}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}
