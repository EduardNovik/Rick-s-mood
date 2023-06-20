import { FC, ReactElement } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import Grid from "@mui/material/Grid";

import { CharacterResultsProp } from "../../redux/charactersSlice";

type CharacterCardProp = {
  character: CharacterResultsProp;
  children: ReactElement;
};

const CharacterCard: FC<CharacterCardProp> = ({
  character,
  children,
}): ReactElement => {

  return (
    <Grid
      item
      sx={{
        minWidth: { xs: "100px", md: "250px" },
      }}
    >
      <Card
        sx={{
          maxWidth: 345,
          m:'0 auto',
          textAlign: "center",
          transition: "all 0.20s",
          "&:hover": {
            boxShadow: "0px 0px 20px 6px pink",
            transform: "scale(95%)",
          },
        }}
      >
        <CardActionArea>
          <CardMedia
            component="img"
            height="340"
            image={character.image}
            alt="Rick&Morty characters"
            sx={{ objectFit: "cover" }}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {character.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {character.location.name}
            </Typography>
            {children}
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  );
};

export default CharacterCard;