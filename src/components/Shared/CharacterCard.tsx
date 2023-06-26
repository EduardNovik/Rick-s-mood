import { FC, ReactElement } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import Grid from "@mui/material/Grid";
import { updateCharacterDetailsState } from "../../redux/characterDetailsSlice";

import { CharacterResultsProp } from "../../redux/charactersSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

type CharacterCardProp = {
  character: CharacterResultsProp;
  children: ReactElement;
};

const CharacterCard: FC<CharacterCardProp> = ({
  character,
  children,
}): ReactElement => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const navigateToDetails = (character: CharacterResultsProp) => {
    dispatch(updateCharacterDetailsState(character))
    navigate("/details")
  };

  return (
    <Grid
      data-testid="CharacterCard-component"
      item
      sx={{
        minWidth: { xs: "100px", md: "250px" },
      }}
    >
      <Card
        data-testid="CharacterCard Card-component"
        sx={{
          maxWidth: 345,
          m: "0 auto",
          textAlign: "center",
          transition: "all 0.20s",
          "&:hover": {
            boxShadow: "0px 0px 20px 6px pink",
            transform: "scale(95%)",
          },
        }}
      >
        <CardActionArea onClick={() => navigateToDetails(character)}>
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
          </CardContent>
        </CardActionArea>
        {children}
      </Card>
    </Grid>
  );
};

export default CharacterCard;
