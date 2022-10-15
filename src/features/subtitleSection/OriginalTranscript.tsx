import { useEffect, useState } from "react";

import SubtitleBox from "./SubtitleBox";
import { Subtitle } from "./subtitleSlice";

function OriginalTranscript() {
  const [subtitles, setSubtitles] = useState<Subtitle[]>([]);

  useEffect(() => {
    fetch("/subtitle.json")
      .then((response) => response.json())
      .then((data) => setSubtitles(data));
  }, []);

  // console.log(subtitles);

  return (
    <div>
      {subtitles.map((subtitle: Subtitle, index) => {
        return <SubtitleBox subtitle={subtitle} readOnly={true} key={index} />;
      })}
    </div>
  );
}

export default OriginalTranscript;
