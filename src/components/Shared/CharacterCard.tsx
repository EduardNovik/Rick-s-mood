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
            boxShadow: "0px 0px 20px 0px dimgray",
            transform: "scale(95%)",
          },
        }}
      >
        <CardActionArea>
          <CardMedia
            component="img"
            height="340"
            image={character.image}
            alt="green iguana"
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











// import { FC, ReactElement } from "react";
// import Card from "@mui/material/Card";
// import CardContent from "@mui/material/CardContent";
// import CardMedia from "@mui/material/CardMedia";
// import Typography from "@mui/material/Typography";
// import { CardActionArea } from "@mui/material";
// import Grid from "@mui/material/Grid";

// import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
// import Favorite from "@mui/icons-material/Favorite";
// import IconButton from "@mui/material/IconButton";
// import Checkbox from "@mui/material/Checkbox";

// import { CharacterResultsProp } from '../../redux/charactersSlice'

// type SetCharactersLSProp = React.Dispatch<React.SetStateAction<CharacterResultsProp[]|[]>>;

// type CharacterCardProp = {
//   character: CharacterResultsProp;
//   setCharactersLS: SetCharactersLSProp;
// };

// const CharacterCard: FC<CharacterCardProp> = ({
//   character,
//   setCharactersLS,
// }): ReactElement => {

//   const characterCheckedHandler = (character: CharacterResultsProp) => {
//     setCharactersLS((prevState) => {
//       const characterExist = prevState.some((item) => item.id === character.id);
//       if (characterExist) {
//         return prevState;
//       } else {
//         return [...prevState, character];
//       }
//     });
//   };

//   return (
//     <Grid
//       item
//       key={character.id}
//       sx={{
//         minWidth: { xs: "100px", md: "400px" },
//       }}
//     >
//       {/* <Item> */}
//       <Card
//         sx={{
//           maxWidth: 345,
//           textAlign: "center",
//           transition: "all 0.20s",
//           "&:hover": {
//             boxShadow: "0px 0px 20px 0px dimgray",
//             transform: "scale(95%)",
//           },
//         }}
//       >
//         <CardActionArea>
//           <CardMedia
//             component="img"
//             height="340"
//             image={character.image}
//             alt="green iguana"
//             sx={{ objectFit: "cover" }}
//           />
//           <CardContent>
//             <Typography gutterBottom variant="h5" component="div">
//               {character.name}
//             </Typography>
//             <Typography variant="body2" color="text.secondary">
//               {character.location.name}
//             </Typography>
//             <IconButton
//               aria-label="add to favorites"
//               onClick={() => {
//                 characterCheckedHandler(character);
//               }}
//             >
//               <Checkbox
//                 icon={<FavoriteBorder />}
//                 name={character.id}
//                 checkedIcon={<Favorite sx={{ color: "red" }} />}
//               />
//             </IconButton>
//           </CardContent>
//         </CardActionArea>
//       </Card>
//       {/* </Item> */}
//     </Grid>
//   );
// };

// export default CharacterCard;
