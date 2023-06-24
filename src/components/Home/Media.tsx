import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Slider from "@mui/material/Slider";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import PauseRounded from "@mui/icons-material/PauseRounded";
import PlayArrowRounded from "@mui/icons-material/PlayArrowRounded";
import FastForwardRounded from "@mui/icons-material/FastForwardRounded";
import FastRewindRounded from "@mui/icons-material/FastRewindRounded";
import VolumeUpRounded from "@mui/icons-material/VolumeUpRounded";
import VolumeDownRounded from "@mui/icons-material/VolumeDownRounded";
import vinyl from "../../assets/vinyl.gif";
import audio from "../../assets/audio.mp3";
import { useEffect, useRef, useState } from "react";
import homeBg from "../../assets/homeBg.png";

const Widget = styled("div")(({ theme }) => ({
  padding: 16,
  borderRadius: 16,
  width: 500,
  maxWidth: "100%",
  margin: "auto",
  position: "relative",
  zIndex: 1,
  boxShadow: "0px 0px 20px 0px dimgray",
  background: 'radial-gradient(circle, rgba(238,174,202,1) 0%, rgba(148,187,233,1) 100%)',
  // backgroundColor:
  //   theme.palette.mode === "dark" ? "rgba(0,0,0,0.6)" : "rgba(255,255,255,0.4)",
  backdropFilter: "blur(40px)",
}));

const CoverImage = styled("div")({
  width: 100,
  height: 100,
  objectFit: "cover",
  overflow: "hidden",
  flexShrink: 0,
  borderRadius: 8,
  backgroundColor: "rgba(0,0,0,0.08)",
  "& > img": {
    width: "100%",
    height: "100%",
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
});

const TinyText = styled(Typography)({
  fontSize: "0.75rem",
  opacity: 0.38,
  fontWeight: 500,
  letterSpacing: 0.2,
});

const MusicPlayerSlider = () => {
  const theme = useTheme();
  const [position, setPosition] = useState(0);
  const [paused, setPaused] = useState(true);

  // -----------------------
  const [volume, setVolume] = useState(100);
  const [duration, setDuration] = useState(0);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handleVolumeChange = (event: any, newValue: number|number[]) => {
    if (audioRef.current) {
      if(Array.isArray(newValue)){
      audioRef.current.volume = newValue[0] / 100;
      setVolume(newValue[0]);

      }else{
        audioRef.current.volume = newValue / 100;
        setVolume(newValue);
      }
    }
  };

  const handlePlayPause = () => {
    const audioElement = audioRef.current;
    if (audioElement) {
      if (paused) {
        audioElement.play();
      } else {
        audioElement.pause();
      }
      setPaused(!paused);
    }
  };

  const handlePositionChange = (event: any, newValue: number| number[]) => {
    const audioElement = audioRef.current;
    console.log(audioRef.current)
    console.log(newValue);
    console.log('are you working?');
    if (audioElement) {
      if(Array.isArray(newValue)){
        audioElement.currentTime = newValue[newValue.length-1];
        setPosition(newValue[newValue.length-1]);
        console.log(newValue[newValue.length-1], 'hey array');
      }else{
        console.log('hey gay');
        console.log(event.target.value);
        audioElement.currentTime = newValue;
        setPosition(newValue);     
      }
    }
  };

  console.log(position);


  useEffect(() => {
    const audioElement = audioRef.current;
    if (audioElement) {
      audioElement.addEventListener("loadedmetadata", () => {
        setDuration(Math.floor(audioElement.duration));
      });

      // for changing dot position in slider element
      audioElement.addEventListener("timeupdate", () => {
        setPosition(audioElement.currentTime);
      });
      audioElement.volume = volume / 100;
    }
  }, []);

  // -----------------------

  function formatDuration(value: number) {
    const minutes = Math.floor(value / 60);
    const seconds = Math.floor(value % 60);
    return `${minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
  }
  const mainIconColor = theme.palette.mode === "dark" ? "#fff" : "#000";
  const lightIconColor =
    theme.palette.mode === "dark" ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.4)";

  return (
    <Box
      sx={{
        width: "100%",
        overflow: "hidden",
        pb: "100px",
        pt: "200px",
        pl: "10px",
        pr: "10px",
        backgroundImage: `url(${homeBg})`,
        backgroundPosition: "bottom right",
        backgroundRepeat:'no-repeat',
        backgroundSize:'30%'
      }}
    >
      <Typography
        sx={{
          pb: "20px",
          textAlign: "center",
          fontSize: "50px",
          fontFamily: "Roboto",
          fontWeight: "200",
        }}
      >
        Rick's mood
      </Typography>
      <Widget>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <CoverImage>
            <img alt="Vinyl" src={vinyl} />
          </CoverImage>
          <Box sx={{ ml: 1.5, minWidth: 0 }}>
            <Typography
              variant="caption"
              color="text.secondary"
              fontWeight={500}
            >
              Feewet Trap Remix
            </Typography>
            <Typography noWrap>
              <b>Evil Morty Theme Song</b>
            </Typography>
            <Typography noWrap letterSpacing={-0.25}>
              Rick and Morty &mdash; for the demage coda
            </Typography>
          </Box>
        </Box>
        <Slider
          aria-label="time-indicator"
          size="small"
          value={position}
          min={0}
          step={1}
          max={duration}
          onChange={handlePositionChange}
          sx={{
            color: theme.palette.mode === "dark" ? "#fff" : "rgba(0,0,0,0.87)",
            height: 4,
            "& .MuiSlider-thumb": {
              width: 8,
              height: 8,
              transition: "0.3s cubic-bezier(.47,1.64,.41,.8)",
              "&:before": {
                boxShadow: "0 2px 12px 0 rgba(0,0,0,0.4)",
              },
              "&:hover, &.Mui-focusVisible": {
                boxShadow: `0px 0px 0px 8px ${
                  theme.palette.mode === "dark"
                    ? "rgb(255 255 255 / 16%)"
                    : "rgb(0 0 0 / 16%)"
                }`,
              },
              "&.Mui-active": {
                width: 20,
                height: 20,
              },
            },
            "& .MuiSlider-rail": {
              opacity: 0.28,
            },
          }}
        />
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mt: -2,
          }}
        >
          <TinyText>{formatDuration(position)}</TinyText>
          <TinyText>-{formatDuration(duration - position)}</TinyText>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mt: -1,
          }}
        >
          <audio ref={audioRef} src={audio} />
          <IconButton aria-label="previous song">
            <FastRewindRounded fontSize="large" htmlColor={mainIconColor} />
          </IconButton>
          <IconButton
            // onClick={() => setPaused(!paused)}
            onClick={handlePlayPause}
            aria-label={paused ? "play" : "pause"}
          >
            {paused ? (
              <PlayArrowRounded
                sx={{ fontSize: "3rem" }}
                htmlColor={mainIconColor}
              />
            ) : (
              <PauseRounded
                sx={{ fontSize: "3rem" }}
                htmlColor={mainIconColor}
              />
            )}
          </IconButton>
          <IconButton aria-label="next song">
            <FastForwardRounded fontSize="large" htmlColor={mainIconColor} />
          </IconButton>
        </Box>
        <Stack
          spacing={2}
          direction="row"
          sx={{ mb: 1, px: 1 }}
          alignItems="center"
        >
          <VolumeDownRounded htmlColor={lightIconColor} />
          <Slider
            aria-label="Volume"
            defaultValue={100}
            onChange={(event, newValue) => handleVolumeChange(event, newValue)}
            sx={{
              color:
                theme.palette.mode === "dark" ? "#fff" : "rgba(0,0,0,0.87)",
              "& .MuiSlider-track": {
                border: "none",
              },
              "& .MuiSlider-thumb": {
                width: 24,
                height: 24,
                backgroundColor: "#fff",
                "&:before": {
                  boxShadow: "0 4px 8px rgba(0,0,0,0.4)",
                },
                "&:hover, &.Mui-focusVisible, &.Mui-active": {
                  boxShadow: "none",
                },
              },
            }}
          />
          <VolumeUpRounded htmlColor={lightIconColor} />
        </Stack>
      </Widget>
    </Box>
  );
};

export default MusicPlayerSlider;





  // useEffect(() => {
  //   const audioElement = audioRef.current;
  //   if (audioElement) {
  //     audioElement.addEventListener("timeupdate", () => {
  //       setPosition(audioElement.currentTime);
  //     });
  //   }
  // }, []);