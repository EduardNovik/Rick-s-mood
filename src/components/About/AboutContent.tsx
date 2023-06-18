import { Box, Paper, Typography, styled } from "@mui/material";
import aboutPhoto from "../../assets/aboutPhoto.png";

const AboutContent = () => {
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: "start",
    color: theme.palette.text.secondary,
  }));

  return (
    <Box
      sx={{
        backgroundImage: `url(${aboutPhoto})`,
        // position:'fixed',
        // top:'0',
        // left:'0',
        // height: '100%',
        // overflow: 'hidden',
        // backgroundSize: "cover",

        backgroundSize: "cover",
        backgroundRepeat: 'no-repeat',
        height: "90vh",
        width: "100vw",
        pt:'100px',
        backgroundPosition: "center center",
        maskImage:
          "linear-gradient(to top, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 15%)",
      }}
    >
      <Item
        id="aboutTextBlock"
        sx={{
          width: "65%",
          borderRadius: "10px",
          m: "0 auto",
          textAlign: "left",
        }}
      >
        <Typography sx={{ pb: "30px", fontSize: {xs:'8px', sm:'12px', md:'15px'} }}>
          Welcome to my website, where I have created a platform dedicated to
          Rick and Morty characters. Here, you can explore a vast collection of
          characters from the popular animated series, accompanied by brief
          descriptions that provide insights into each character's personality
          and role in the show.
        </Typography>
        <Typography sx={{ pb: "30px", fontSize: {xs:'8px', sm:'12px', md:'15px'}  }}>
          I have incorporated several cutting-edge technologies to enhance your
          browsing experience. By leveraging GraphQL, I ensure efficient
          retrieval and display of character data, enabling you to quickly find
          the information you're looking for. Additionally, I make use of
          LocalStorage to store your favorite characters locally on your device,
          allowing you to retrieve them effortlessly whenever you visit my site.
        </Typography>
        <Typography sx={{ pb: "30px", fontSize: {xs:'8px', sm:'12px', md:'15px'}  }}>
          To provide a seamless and endless browsing experience, I have
          implemented the infinite scroll API. As you scroll down the page, more
          captivating characters are dynamically loaded, guaranteeing an
          unlimited exploration of the Rick and Morty universe.
        </Typography>
        <Typography sx={{ pb: "30px", fontSize: {xs:'8px', sm:'12px', md:'15px'}  }}>
          Managing the application state and ensuring smooth data flow is made
          possible through Redux Toolkit, a powerful state management solution.
          With Redux Toolkit, I maintain a consistent and predictable state,
          ensuring a seamless browsing experience across my website.
        </Typography>
        <Typography sx={{ pb: "30px", fontSize: {xs:'8px', sm:'12px', md:'15px'}  }}>
          To facilitate easy navigation between different sections of my site, I
          have integrated React Router. This allows you to effortlessly switch
          between pages, such as character details and your favorites, without
          the need for full page refreshes.
        </Typography>
        <Typography sx={{ pb: "30px", fontSize: {xs:'8px', sm:'12px', md:'15px'}  }}>
          Embark on an exciting adventure through the captivating world of Rick
          and Morty, where you can explore a vast array of characters and curate
          your own favorites page.
        </Typography>
      </Item>
    </Box>
  );
};
export default AboutContent;
