import Button from "@mui/material/Button";
import { FC, ReactElement } from "react";
import ReplyIcon from "@mui/icons-material/Reply";

const NavBtn: FC = (): ReactElement => {
  return (
    <Button
      sx={{
        right: "45px",
        bottom: "20px",
        position: "fixed",
        zIndex: "1",
        borderRadius: "20px",
        backroundColor: "transparent",
        backdropFilter: "blur(1.5rem)",
        border: "1px solid gray",
        "&:hover": {
          boxShadow: "0px 0px 20px 10px pink",
        },
      }}
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
    >
      <ReplyIcon
        sx={{
          transform: "rotate(90deg)",
          backgroundColor: "transparent",
          color: "gray",
        }}
      />
    </Button>
  );
};

export default NavBtn;
