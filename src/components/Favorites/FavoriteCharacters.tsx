import Grid from "@mui/material/Grid";

import Box from "@mui/material/Box";

import useLoacalStorage from "../../services/useLoacalStorage";
import CharacterCard from "../Shared/CharacterCard";
import { CharacterResultsProp } from "../../redux/charactersSlice";
import { Button } from "@mui/material";
import NavBtn from "../Shared/NavBtn";

const FavoriteCharacters = () => {

  const [charactersLS, setCharactersLS] = useLoacalStorage("characters");

  const removeHandler = (character: CharacterResultsProp) => {
    setCharactersLS((prevState:CharacterResultsProp[]|[]) => {
      return prevState.filter((item) => item.id !== character.id);
    });
  };

  return (
    <Box sx={{ width: "100%", mt: "150px"}} >
      <Grid container spacing={2} sx={{
        justifyContent: 'center',
      }}>
        {charactersLS.map((character: CharacterResultsProp) => {
          return (
            <Grid item key={character.id} sx={{mb:'30px'}} data-testid="FavoriteCharacters-component">
              <h2>{character.name}</h2>
              <CharacterCard character={character}>
                <Button
                  variant="outlined"
                  color="error"
                  sx={{ mt: "15px" }}
                  onClick={() => removeHandler(character)}
                >
                  Remove
                </Button>
              </CharacterCard>
            </Grid>
          );
        })}
      </Grid>
      <NavBtn/>
    </Box>
  );
};
{/* <Grid container rowSpacing={4} columnSpacing={{ xs: 1, sm: 2, md: 3 }}> */}

export default FavoriteCharacters;
