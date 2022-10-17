import { useEffect, useMemo } from "react";
import { shallowEqual } from "react-redux";
import { useAppSelector, useAppDispatch } from "../../app/hooks";

import SubtitleBox from "./subtitleBox/SubtitleBox";
import { fetchSubtitle, selectSubtitles, Subtitle } from "./subtitleSlice";

function OriginalTranscript() {
  const dispatch = useAppDispatch();

  const subtitles = useAppSelector(selectSubtitles, shallowEqual);

  useEffect(() => {
    dispatch(fetchSubtitle(""));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Boxes get rerendered every time subtitles change. This is better.
  const optimizedSubtitleMap = useMemo(
    () =>
      subtitles.map((subtitle: Subtitle, index: number) => {
        return (
          <SubtitleBox
            subtitle={subtitle}
            readOnly={false}
            index={index}
            subtitleCount={subtitles.length}
            key={subtitle.id}
          />
        );
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [subtitles.length]
  );

  return <div>{optimizedSubtitleMap}</div>;
}

export default OriginalTranscript;
