import { useMemo } from "react";
import { useAppSelector } from "../../app/hooks";

import SubtitleBox from "./subtitleBox/SubtitleBox";
import { selectSubtitleChangeFlag, Subtitle } from "./subtitleSlice";

function OriginalTranscript(props: {
  subtitles: Subtitle[];
  readOnly: boolean;
}) {
  const subtitleChangeFlag = useAppSelector(selectSubtitleChangeFlag);

  const optimizedBoxes = useMemo(
    () =>
      props.subtitles.map((subtitle: Subtitle, index: number) => {
        return (
          <SubtitleBox
            subtitle={subtitle}
            readOnly={props.readOnly}
            key={subtitle.id}
          />
        );
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [subtitleChangeFlag, props.subtitles.length]
  );

  return <div>{optimizedBoxes}</div>;
}

export default OriginalTranscript;
