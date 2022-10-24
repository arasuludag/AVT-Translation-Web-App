import { useEffect, useMemo } from "react";
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

  const optimizedSubtitleMap = useMemo(
    () =>
      subtitles.map((subtitle: Subtitle, index: number) => {
        return (
          <SubtitleBox subtitle={subtitle} readOnly={true} key={subtitle.id} />
        );
      }),
    [subtitles]
  );

  return <div>{optimizedSubtitleMap}</div>;
}

export default OriginalTranscript;
