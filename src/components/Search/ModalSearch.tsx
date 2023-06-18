import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";

import { FC, ReactElement, useState } from "react";
import { AppDispatch, RootState } from "../../redux/store";
import { CharacterResultsProp } from "../../redux/charactersSlice";

import { fetchCharactersAsync } from "../../redux/charactersSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux/es/exports";
import { updateState } from "../../redux/charactersSlice";

const style = {
  // eslint-disable-next-line @typescript-eslint/prefer-as-const
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: "10px",
};

const ModalSearch: FC = (): ReactElement => {
  const [open, setOpen] = React.useState<boolean>(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [inputData, setInputData] = useState<string>("");
  const dispatch = useDispatch<AppDispatch>();
  const characters = useSelector<any, CharacterResultsProp[]>(
    (state) => state.characters.data.results
  );
  console.log(characters);

  const handleSearchBtn = (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      dispatch(updateState({ info: { pages: 0 }, results: [] }));
      dispatch(fetchCharactersAsync({ page: 1, name: inputData }));
      handleClose();
   
  };
  const handleSearchInput = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      dispatch(updateState({ info: { pages: 0 }, results: [] }));
      dispatch(fetchCharactersAsync({ page: 1, name: inputData }));
      handleClose();
    }
  };

  return (
    <Box>
      <Button onClick={handleOpen}>
        <SearchIcon sx={{ color: { xs: "black", md: "white" } }} />
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box
            id="modal-modal-title"
            component="form"
            sx={{
              display: "flex",
              "& > :not(style)": { m: 1, width: "25ch" },
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              id="outlined-basic"
              label="Outlined"
              variant="outlined"
              value={inputData}
              onKeyDown={handleSearchInput}
              onChange={(e) => setInputData(e.target.value)}
            />
            <Button variant="outlined" size="small" onClick={handleSearchBtn}>
              Search
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default ModalSearch;
