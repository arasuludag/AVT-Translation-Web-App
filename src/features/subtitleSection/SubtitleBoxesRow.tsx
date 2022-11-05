import { useMemo } from "react";

import SubtitleBox from "./subtitleBox/SubtitleBox";
import { Subtitle } from "./subtitleSlice";

function OriginalTranscript(props: {
  subtitles: Subtitle[];
  readOnly: boolean;
}) {
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
    [props.subtitles.length]
  );

  return <div>{optimizedBoxes}</div>;
}

export default OriginalTranscript;
