import { useEffect, useMemo, useState } from "react";
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
import "video.js/dist/video-js.css";
import { useVideoJS } from "react-hook-videojs";

import SubtitleToggle from "./SubtitleToggle";
import { selectVideoTime } from "./videoSlice";

function VideoPlayer() {
  const dispatch = useAppDispatch();
  const timeInMS = useAppSelector(selectVideoTime);
  const subtitles = useAppSelector(selectSubtitles);
  const transcript = useAppSelector(selectTranscript);
  const activeSubtitle = useAppSelector(selectActiveSubtitle);
  const whichSubToShow = useAppSelector(selectWhichSubToShow);

  const videoUrl = "/video.mp4";
  const className = "videoPlayer";
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

  useEffect(() => {
    if (ready) player!.currentTime(timeInMS);
  }, [player, ready, timeInMS]);

  if (ready)
    player?.on("timeupdate", () => {
      dispatch(setActiveSubtitle(player!.currentTime() * 1000));
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
