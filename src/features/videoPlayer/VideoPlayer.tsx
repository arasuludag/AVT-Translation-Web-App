import ReactPlayer from "react-player";

function VideoPlayer() {
  return (
    <ReactPlayer url="video.mp4" width="100%" height="100%" controls={true} />
  );
}

export default VideoPlayer;
