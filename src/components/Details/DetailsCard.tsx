import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

import * as React from "react";
import { styled } from "@mui/material/styles";
import Collapse from "@mui/material/Collapse";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { FC, ReactElement } from "react";
import NavBtn from "../Shared/NavBtn";

type ItemEpisodeProp = {
  id: string
  name: string;
  episode: string;
};

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

const DetailsCard: FC = (): ReactElement => {
  const characterDetails = useSelector<RootState, Record<string, any>>(
    (state) => state.characterDetails.data
  );

  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center", pt: "150px" }}>
      <Card
        sx={{
          width: 345,
          ml: "10px",
          mr: "10px",
          mb:'50px',
          background:
            "radial-gradient(circle, rgba(238,174,202,1) 0%, rgba(148,187,233,1) 100%)",
          boxShadow: "0px 0px 20px 0px dimgray",
        }}
      >
        <CardMedia
          sx={{ height: 340, objectFit: "cover" }}
          image={characterDetails.image}
          title={`${characterDetails.name} image`}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {characterDetails.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <b>Gender:</b> {characterDetails.gender}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <b>Status:</b> {characterDetails.status}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <b>Species:</b> {characterDetails.species}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <b>Location type:</b> {characterDetails.location.type}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <b>Location name:</b> {characterDetails.location.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <b>Dimension:</b> {characterDetails.location.dimension}
          </Typography>
        </CardContent>
        <CardActions sx={{ p: "16px" }}>
          <Typography variant="body2" color="text.secondary">
            Show list of episodes:
          </Typography>
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </ExpandMore>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            {characterDetails.episode.map((item: ItemEpisodeProp) => {
              return (
                <Typography
                  variant="body2"
                  color="text.secondary"
                  key={item.id}
                >
                  <b>Episode:</b> {item.episode}, {item.name}
                </Typography>
              );
            })}
          </CardContent>
        </Collapse>
      </Card>
      <NavBtn/>
    </Box>
  );
};
export default DetailsCard;
