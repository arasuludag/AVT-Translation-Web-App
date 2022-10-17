import { useEffect, useRef } from "react";
import { Player } from "react-tuby";
import "react-tuby/css/main.css";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  selectActiveSubtitle,
  selectSubtitles,
  selectTranscript,
  selectWhichSubToShow,
  setActiveSubtitle,
} from "../subtitleSection/subtitleSlice";
import parse from "html-react-parser";
import "./videoPlayer.css";

import SubtitleToggle from "./SubtitleToggle";
import { selectVideoTime } from "./videoSlice";

function VideoPlayer() {
  const dispatch = useAppDispatch();
  const videoTime = useAppSelector(selectVideoTime);
  const subtitles = useAppSelector(selectSubtitles);
  const transcript = useAppSelector(selectTranscript);
  const activeSubtitle = useAppSelector(selectActiveSubtitle);
  const whichSubToShow = useAppSelector(selectWhichSubToShow);

  const player = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (player.current) player.current.currentTime = videoTime.seconds;
  }, [player, videoTime]);

  function subtitleText() {
    if (whichSubToShow === "original")
      return parse(transcript[activeSubtitle]?.text || "");
    else return parse(subtitles[activeSubtitle]?.text || "");
  }

  useEffect(() => {
    player.current?.addEventListener("timeupdate", () => {
      dispatch(setActiveSubtitle((player.current?.currentTime || 0) * 1000));
    });
  }, [dispatch]);

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
      <div className="subtitle">{subtitleText()}</div>
      <SubtitleToggle />
    </div>
  );
}

export default VideoPlayer;
