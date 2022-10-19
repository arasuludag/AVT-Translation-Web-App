import { useEffect, useRef, useState } from "react";
import { Player } from "react-tuby";
import "react-tuby/css/main.css";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { setActiveSubtitle } from "../subtitleSection/subtitleSlice";

import "./videoPlayer.css";

import SubtitleToggle from "./SubtitleToggle";
import SeekBackOrForward from "./SeekBackOrForwardButtons";
import ShowCurrentTime from "./ShowCurrentTime";
import { selectVideoTime } from "./videoSlice";
import { Box } from "@mui/material";
import Subtitle from "./Subtitle";
import Settings from "../settings/Settings";

function VideoPlayer() {
  const dispatch = useAppDispatch();
  const videoTime = useAppSelector(selectVideoTime);

  const player = useRef<HTMLVideoElement>(null);

  // Set video time if VideoTime updates.
  useEffect(() => {
    if (player.current) player.current.currentTime = videoTime.seconds;
  }, [player, videoTime]);

  const [currentTime, setCurrentTime] = useState<number>(0);

  useEffect(() => {
    // Updates when video is progressing.
    player.current?.addEventListener("timeupdate", () => {
      setCurrentTime(Math.round(player.current!.currentTime * 1000));
    });

    // Prevent right click.
    // document.addEventListener("contextmenu", (e) => {
    //   e.preventDefault();
    // });
  }, []);

  useEffect(() => {
    dispatch(setActiveSubtitle(currentTime));
  }, [currentTime, dispatch]);

  // Forward or backward time.
  function onSeek(direction: boolean, howMuch: number) {
    if (player.current) {
      direction
        ? (player.current.currentTime += howMuch)
        : (player.current.currentTime -= howMuch);
    }
  }

  return (
    <div className="container">
      <Player
        src="/video.mp4"
        playerRef={player}
        pictureInPicture={false}
        primaryColor={"#2196f3"}
        seekDuration={0.03}
        keyboardShortcut={false}
      />
      <Subtitle />
      <Box
        sx={{
          position: "absolute",
          bottom: "90%",
          left: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          "& > *": {
            m: 1,
          },
        }}
      >
        <Settings />
      </Box>
      <Box
        sx={{
          position: "absolute",
          top: "60%",
          right: "0%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          "& > *": {
            m: 1,
          },
        }}
      >
        <SubtitleToggle currentTime={currentTime} />
        <SeekBackOrForward
          onSeek={(direction, howMuch) => onSeek(direction, howMuch)}
        />
        <ShowCurrentTime currentTime={currentTime} />
      </Box>
    </div>
  );
}

export default VideoPlayer;
