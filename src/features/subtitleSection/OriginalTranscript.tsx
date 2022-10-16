import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";

import SubtitleBox from "./subtitleBox/SubtitleBox";
import {
  fetchOriginalTranscript,
  selectTranscript,
  Subtitle,
} from "./subtitleSlice";

function OriginalTranscript() {
  const dispatch = useAppDispatch();

  const subtitles = useAppSelector(selectTranscript);

  useEffect(() => {
    dispatch(fetchOriginalTranscript(""));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      {subtitles.map((subtitle: Subtitle) => {
        return (
          <SubtitleBox
            subtitle={subtitle}
            readOnly={true}
            index={subtitle.id}
            subtitleCount={subtitles.length}
            key={subtitle.id}
          />
        );
      })}
    </div>
  );
}

export default OriginalTranscript;
