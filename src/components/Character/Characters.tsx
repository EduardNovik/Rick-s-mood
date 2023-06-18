import { Grid, GridTypeMap, Stack } from "@mui/material";
import Box from "@mui/material/Box";

import { useSelector } from "react-redux/es/exports";
import CharacterCard from "../Shared/CharacterCard";

import useLoacalStorage from "../../services/useLoacalStorage";
import { CharacterResultsProp } from "../../redux/charactersSlice";
import { fetchCharactersAsync } from "../../redux/charactersSlice";
import { useDispatch } from "react-redux";
import { useEffect, useRef, useCallback, ReactNode, useState } from "react";
import { AppDispatch, RootState } from "../../redux/store";

import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import IconButton from "@mui/material/IconButton";
import Checkbox from "@mui/material/Checkbox";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import Loader from "../Shared/Loader";
import NavBtn from "../Shared/NavBtn";
// type SetCharactersLSProp = React.Dispatch<React.SetStateAction<CharacterResultsProp[]|[]>>;

const Characters = () => {
  const [charactersLS, setCharactersLS] = useLoacalStorage("characters");
  const [page, setPage] = useState(1);

  const characters = useSelector<any, CharacterResultsProp[] | []>(
    (state) => state.characters.data.results
  );
  const pageData = useSelector<any, number>((state) => state.characters.data);
  const loading = useSelector<RootState, boolean>(
    (state) => state.characters.loading
  );
  const dispatch = useDispatch<AppDispatch>();

  console.log(pageData);
  console.log(loading);

  useEffect(() => {
    dispatch(fetchCharactersAsync({ page: page, name: "" }));
  }, [page]);

  useEffect(() => {
    dispatch(fetchCharactersAsync({ page: 2, name: "" }));
  }, []);

  const observer: React.MutableRefObject<undefined> = useRef();
  const lastCharacter = useCallback(
    (node: HTMLDivElement) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          console.log("visible");
          setPage((prevPage) => prevPage + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading]
  );

  const characterCheckedHandler = (character: CharacterResultsProp) => {
    setCharactersLS((prevState: CharacterResultsProp[] | []) => {
      const characterExist = prevState.some((item) => item.id === character.id);
      if (characterExist) {
        return prevState;
      } else {
        return [...prevState, character];
      }
    });
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        mt: "100px",
        p: "24px",
        textAlign: "center",
        // justifyContent:'center'
      }}
    >
      <Grid container rowSpacing={7} columnSpacing={{ xs: 1, sm: 1, md: 1 }}>
        {characters &&
          characters.map((character: CharacterResultsProp, index: number) => {
            if (index === characters.length - 1) {
              return (
                <Grid
                  item
                  key={character.id}
                  xs={4}
                  onChange={() => {}}
                  ref={lastCharacter}
                >
                  <CharacterCard character={character}>
                    <Checkbox
                      icon={<FavoriteBorder />}
                      name={character.id}
                      onClick={() => {
                        characterCheckedHandler(character);
                      }}
                      checkedIcon={<Favorite sx={{ color: "red" }} />}
                    />
                  </CharacterCard>
                </Grid>
              );
            } else {
              return (
                <Grid item key={character.id} xs={4}>
                  <CharacterCard character={character}>
                    <Checkbox
                      icon={<FavoriteBorder />}
                      name={character.id}
                      onClick={() => {
                        characterCheckedHandler(character);
                      }}
                      checkedIcon={<Favorite sx={{ color: "red" }} />}
                    />
                  </CharacterCard>
                </Grid>
              );
            }
          })}
      </Grid>
      <NavBtn/>
      {loading && <Loader />}
    </Box>
  );
};
export default Characters;
















// import { Grid, GridTypeMap, Stack } from "@mui/material";
// import Box from "@mui/material/Box";

// import { useSelector } from "react-redux/es/exports";
// import CharacterCard from "../Shared/CharacterCard";

// import useLoacalStorage from "../../services/useLoacalStorage";
// import { CharacterResultsProp } from "../../redux/charactersSlice";
// import { fetchCharactersAsync } from "../../redux/charactersSlice";
// import { useDispatch } from "react-redux";
// import { useEffect, useRef, useCallback, ReactNode, useState } from "react";
// import { AppDispatch, RootState } from "../../redux/store";

// import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
// import Favorite from "@mui/icons-material/Favorite";
// import IconButton from "@mui/material/IconButton";
// import Checkbox from "@mui/material/Checkbox";
// import { OverridableComponent } from "@mui/material/OverridableComponent";
// import Loader from "../Shared/Loader";

// // type SetCharactersLSProp = React.Dispatch<React.SetStateAction<CharacterResultsProp[]|[]>>;

// const Characters = () => {
//   const [charactersLS, setCharactersLS] = useLoacalStorage("characters");
//   const [page, setPage] = useState(1);

//   const characters = useSelector<any, CharacterResultsProp[] | []>(
//     (state) => state.characters.data.results
//   );
//   const pageData = useSelector<any, number>((state) => state.characters.data);
//   const loading = useSelector<RootState, boolean>(
//     (state) => state.characters.loading
//   );
//   const dispatch = useDispatch<AppDispatch>();

//   console.log(pageData);
//   console.log(loading);

//   useEffect(() => {
//     dispatch(fetchCharactersAsync({ page: page, name: "" }));
//   }, [page]);

//   useEffect(() => {
//     dispatch(fetchCharactersAsync({ page: 2, name: "" }));
//   }, []);

//   const observer: React.MutableRefObject<undefined> = useRef();
//   const lastCharacter = useCallback(
//     (node: HTMLDivElement) => {
//       if (loading) return;
//       if (observer.current) observer.current.disconnect();
//       observer.current = new IntersectionObserver((entries) => {
//         if (entries[0].isIntersecting) {
//           console.log("visible");
//           setPage((prevPage) => prevPage + 1);
//         }
//       });
//       if (node) observer.current.observe(node);
//     },
//     [loading]
//   );

//   const characterCheckedHandler = (character: CharacterResultsProp) => {
//     setCharactersLS((prevState: CharacterResultsProp[] | []) => {
//       const characterExist = prevState.some((item) => item.id === character.id);
//       if (characterExist) {
//         return prevState;
//       } else {
//         return [...prevState, character];
//       }
//     });
//   };

//   return (
//     <Box
//       sx={{
//         flexGrow: 1,
//         mt: "100px",
//         p: "24px",
//         textAlign: "center",
//         // justifyContent: "center",
//         // alignItems: "center",
//       }}
//     >

//       <Grid container rowSpacing={7} columnSpacing={{ xs: 1, sm: 1, md: 1 }}>
//         {/* <Box
//         sx={{
//           overflowX: "scroll",
//           flexDirection: "row",
//           alignItems: "center",
//           p: "20px",
//         }}
//       > */}

//         {characters &&
//           characters.map((character: CharacterResultsProp, index: number) => {
//             if (index === characters.length - 1) {
//               return (
//                 <Grid
//                   item
//                   key={character.id}
//                   xs={4}
//                   onChange={() => {}}
//                   ref={lastCharacter}
//                 >
//                   <CharacterCard character={character}>
//                     {/* <IconButton
//                       aria-label="add to favorites"
//                       onClick={() => {
//                         characterCheckedHandler(character);
//                       }}
//                     > */}
//                     <Checkbox
//                       icon={<FavoriteBorder />}
//                       name={character.id}
//                       onClick={() => {
//                         characterCheckedHandler(character);
//                       }}
//                       checkedIcon={<Favorite sx={{ color: "red" }} />}
//                     />
//                     {/* </IconButton> */}
//                   </CharacterCard>
//                 </Grid>
//               );
//             } else {
//               return (
//                 <Grid item key={character.id} xs={4}>
//                   <CharacterCard character={character}>
//                     <Checkbox
//                       icon={<FavoriteBorder />}
//                       name={character.id}
//                       onClick={() => {
//                         characterCheckedHandler(character);
//                       }}
//                       checkedIcon={<Favorite sx={{ color: "red" }} />}
//                     />
//                   </CharacterCard>
//                 </Grid>
//               );
//             }
//           })}
//         {/* </Box> */}
//       </Grid>
//       {loading && <Loader />}
//     </Box>
//   );
// };
// export default Characters;
