import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../app/hooks";

import SubtitleBox from "./SubtitleBox";
import { fetchSubtitle, selectSubtitles, Subtitle } from "./subtitleSlice";

function OriginalTranscript() {
  const dispatch = useAppDispatch();

  const subtitles = useAppSelector(selectSubtitles);

  useEffect(() => {
    dispatch(fetchSubtitle(""));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      {subtitles.map((subtitle: Subtitle, index) => {
        return (
          <SubtitleBox
            subtitle={subtitle}
            readOnly={false}
            index={index}
            key={index}
          />
        );
      })}
    </div>
  );
}

export default OriginalTranscript;
