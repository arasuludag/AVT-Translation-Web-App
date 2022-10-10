import { useEffect, useState } from "react";

import SubtitleBox from "./SubtitleBox";

function OriginalTranscript() {
  interface Subtitle {
    start_time: string;
    end_time: string;
    text: string;
  }

  const [subtitles, setSubtitles] = useState<Subtitle[]>([]);

  useEffect(() => {
    fetch("/subtitle.json")
      .then((response) => response.json())
      .then((data) => setSubtitles(data));
  }, []);

  console.log(subtitles);

  return (
    <div>
      {subtitles.map((subtitle: Subtitle, index) => {
        return <SubtitleBox subtitle={subtitle} readOnly={true} key={index} />;
      })}
    </div>
  );
}

export default OriginalTranscript;
