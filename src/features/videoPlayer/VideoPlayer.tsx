import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  selectActiveSubtitle,
  selectSubtitles,
  selectTranscript,
  selectWhichSubToShow,
  setActiveSubtitle,
} from "../subtitleSection/subtitleSlice";
import { selectVideoCurrentTime, setVideoCurrentTime } from "./videoSlice";
import parse from "html-react-parser";
import "./videoPlayer.css";
import "video.js/dist/video-js.css";
import { useVideoJS } from "react-hook-videojs";

import SubtitleToggle from "./SubtitleToggle";

function VideoPlayer() {
  const dispatch = useAppDispatch();
  const currentTime = useAppSelector(selectVideoCurrentTime);
  const subtitles = useAppSelector(selectSubtitles);
  const transcript = useAppSelector(selectTranscript);
  const activeSubtitle = useAppSelector(selectActiveSubtitle);
  const whichSubToShow = useAppSelector(selectWhichSubToShow);

  useEffect(() => {
    dispatch(setActiveSubtitle(currentTime));
  }, [currentTime, dispatch]);

  const videoUrl = "/video.mp4";
  const className = "my-class";
  const { Video, player, ready } = useVideoJS(
    {
      sources: [{ src: videoUrl }],
      controls: true,
      fluid: true,
      userActions: { hotkeys: true },
      controlBar: {
        fullscreenToggle: false,
        pictureInPictureToggle: false,
        remainingTimeDisplay: true,
        volumePanel: true,
        currentTimeDisplay: true,
        timeDivider: true,
        durationDisplay: true,
      },
    },
    className // optional
  );

  if (ready)
    player?.on("timeupdate", () => {
      dispatch(
        setVideoCurrentTime(Math.round(player!.currentTime() * 10) / 10)
      );
    });

  function subtitleText() {
    if (whichSubToShow === "original")
      return parse(transcript[activeSubtitle]?.text || "");
    else return parse(subtitles[activeSubtitle]?.text || "");
  }

  return (
    <div className="container">
      <Video />
      <div className="subtitle">{subtitleText()}</div>
      <SubtitleToggle />
    </div>
  );
}

export default VideoPlayer;
