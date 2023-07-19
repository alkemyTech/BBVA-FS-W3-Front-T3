import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import { Facebook, GitHub, Instagram, Twitter } from "@mui/icons-material";
import { Box } from "@mui/material";

export default function Footer() {
  return (
    <Box
      sx={{
        backgroundColor: (theme) => theme.palette.mode === "light" ? theme.palette.primary.darker : theme.palette.grey[800],
        position: "relative",
        bottom: 0,
        width: "100%",
        marginTop: "auto",
        textAlign:'center'
    }}
    >
        <Grid container spacing={3} sx={{ placeItems: 'center' }} >
          <Grid item sm={2}/>
          <Grid item sm={2}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Información
            </Typography>
            <Typography variant="body2" sx={{ color: "white" }}>
              Somos ViKatCode y empezamos con este proyecto en julio de 2023
            </Typography>
          </Grid>
          <Grid item sm={4} >
            <Typography variant="h6" color="text.primary" gutterBottom>
              Contactos
            </Typography>
            <Typography variant="body2" sx={{ color: "white" }}>
              Torre BBVA Buenos Aires Argentina
            </Typography>
            <Typography variant="body2" sx={{ color: "white" }}>
              Email: ViKatCode@bbva.com
            </Typography>
            <Typography variant="body2" sx={{ color: "white" }}>
              Tel: 45 7656 2131
            </Typography>
          </Grid>
          <Grid item sm={2}>
            <Typography variant="h6" color="text.primary" gutterBottom>
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
          <Grid item sm={1}/>
          <Grid item sm={12} >
            <Typography variant="body" color="text.secondary" align="center">
              {"Copyright © "}
              <Link color="inherit" href="https://BBVA.com/">
                BBVA
              </Link>{" "}
              {new Date().getFullYear()}
              {"."}
            </Typography>
          </Grid>
        </Grid>
    </Box>
  );
}
