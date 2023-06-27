import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";

import { FC, ReactElement, useRef, useState } from "react";
import { AppDispatch, RootState } from "../../redux/store";
import { CharacterResultsProp } from "../../redux/charactersSlice";

import { fetchCharactersAsync } from "../../redux/charactersSlice";
import { useDispatch } from "react-redux";

import { updateState } from "../../redux/charactersSlice";
import { updateInputState } from "../../redux/inputSlice";

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
  
  const [open, setOpen] = useState<boolean>(false);
  const [inputData, setInputData] = useState<string>("");
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const dispatch = useDispatch<AppDispatch>();

  const handleSearchBtn = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    dispatch(updateInputState(inputData));
    dispatch(updateState({ info: { pages: 0, count: 0 }, results: [] }));
    dispatch(fetchCharactersAsync({ page: 1, name: inputData }));
    handleClose();
  };
  const handleSearchInput = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      dispatch(updateInputState(inputData));
      dispatch(updateState({ info: { pages: 0, count: 0 }, results: [] }));
      dispatch(fetchCharactersAsync({ page: 1, name: inputData }));
      handleClose();
    }
  };

  return (
    <Box>
      <Button
        onClick={handleOpen}
        sx={{
          color: "white",
          "&:hover": {
            backgroundColor: "transparent",
          },
        }}
      >
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
              label="Type a character name"
              variant="outlined"
              value={inputData}
              onKeyDown={handleSearchInput}
              onChange={(e) => setInputData(e.target.value)}
            />

            <Button
              variant="contained"
              size="small"
              onClick={handleSearchBtn}
              sx={{
                maxWidth: "80px",
                color:'#404040',
                background:
                  "radial-gradient(circle, rgba(238,174,202,1) 0%, rgba(148,187,233,1) 100%)",
              }}
            >
              Search
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default ModalSearch;
