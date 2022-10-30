import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  selectActiveSubtitle,
  selectSubtitles,
  selectTranscript,
  setSubtitleToScrollInto,
} from "../subtitleSection/subtitleSlice";
import parse from "html-react-parser";

interface ShownSubtitle {
  playerWidth: number;
}

export default function ShowSubtitle(props: ShownSubtitle) {
  const dispatch = useAppDispatch();
  const activeSubtitle = useAppSelector(selectActiveSubtitle);
  const subtitle = useAppSelector(selectSubtitles);
  const transcript = useAppSelector(selectTranscript);

  function scale(
    number: number,
    inMin: number,
    inMax: number,
    outMin: number,
    outMax: number
  ) {
    return ((number - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
  }

  const showSubtitle = () => {
    if (!activeSubtitle.isWorkingOn)
      return transcript[
        transcript.findIndex((subtitle) => subtitle.id === activeSubtitle.id)
      ];
    else
      return subtitle[
        subtitle.findIndex((subtitle) => subtitle.id === activeSubtitle.id)
      ];
  };

  return (
    <div
      className="subtitle"
      style={{
        top: scale(showSubtitle()?.position || 1, 1, 10, 80, 10) + "%",
        fontSize: props.playerWidth / 30,
      }}
      onClick={() => {
        dispatch(setSubtitleToScrollInto(activeSubtitle));
      }}
      title="Scroll to box"
    >
      {parse(showSubtitle()?.text || "")}
    </div>
  );
}
