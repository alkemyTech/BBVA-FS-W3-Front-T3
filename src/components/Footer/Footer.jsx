import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import { Facebook, GitHub, Instagram, Twitter } from "@mui/icons-material";
import { Box } from "@mui/material";

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "#1693a5",
        color: "white",
        textAlign: "center",
        position: "absolute",
        bottom: 0,
        left: 0,
        width: "100%",
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={5} sx={{ paddingTop: 2 }}>
          <Grid item xs={12} sm={4}>
            <Typography color="#c7ede8" gutterBottom>
              Información
            </Typography>
            <Typography sx={{ color: "#a0ded6", fontSize: "0.8rem" }}>
              Somos ViKatCode y empezamos con este proyecto en julio de 2023
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography color="#c7ede8" gutterBottom>
              Contacto
            </Typography>
            <Typography sx={{ color: "#a0ded6", fontSize: "0.8rem" }}>
              vikatcode@bbva.com.ar
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography
              color="#c7ede8"
              gutterBottom
              sx={{ fontSize: "1.1rem" }}
            >
              Redes Sociales
            </Typography>
            <Link
              href="https://www.facebook.com/bbva.argentina"
              color="inherit"
            >
              <Facebook />
            </Link>
            <Link
              href="https://www.instagram.com/bbva_argentina/?hl=es-la"
              color="inherit"
              sx={{ pl: 1, pr: 1 }}
            >
              <Instagram />
            </Link>
            <Link href="https://www.twitter.com/bbva" color="inherit">
              <Twitter />
            </Link>
            <Link
              href="https://github.com/alkemyTech/BBVA-FS-W3-Front-T3"
              color="inherit"
              sx={{ pl: 1 }}
            >
              <GitHub />
            </Link>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
