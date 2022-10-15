import { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectSubtitles, Subtitle } from "../subtitleSection/subtitleSlice";
import { selectVideo, videoProgress } from "./videoSlice";
import parse from "html-react-parser";
import "./videoPlayer.css";

function VideoPlayer() {
  const [activeSubtitle, setActiveSubtitle] = useState<Subtitle>({
    text: "",
    start_time: 0,
    end_time: 0,
    note: "",
    position: 1,
  });
  const dispatch = useAppDispatch();
  const subtitles = useAppSelector(selectSubtitles);
  const progress = useAppSelector(selectVideo);

  useEffect(() => {
    setActiveSubtitle(
      subtitles.find(
        (subtitle) =>
          subtitle.start_time <= progress.playedSeconds * 1000 &&
          subtitle.end_time > progress.playedSeconds * 1000
      ) || { text: "", start_time: 0, end_time: 0, note: "", position: 1 }
    );
  }, [progress, subtitles]);

  return (
    <div className="container">
      <ReactPlayer
        url="/video.mp4"
        width="100%"
        height="100%"
        controls={true}
        onProgress={(progress) => {
          dispatch(videoProgress(progress));
        }}
      />
      <div className="subtitle">{parse(activeSubtitle.text)}</div>
    </div>
  );
}

export default VideoPlayer;
