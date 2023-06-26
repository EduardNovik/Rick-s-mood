import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const DetailsCard = () => {
  const characterDetails = useSelector<RootState, Record<string, any>>(
    (state) => state.characterDetails.data
  );

  console.log('characterDetails', characterDetails);
  
  return (
    <Box sx={{ display: "flex", justifyContent: "center", mt: "150px" }}>
      <Card sx={{ maxWidth: 345 }}>
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
           <b>Dimension:</b> {characterDetails.location.dimension}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <b>Location type:</b> {characterDetails.location.type}
          </Typography>
        </CardContent>
        {/* <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions> */}
      </Card>
    </Box>
  );
};
export default DetailsCard;
