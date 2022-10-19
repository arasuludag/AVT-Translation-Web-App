import { useAppSelector } from "../../app/hooks";
import {
  selectActiveSubtitle,
  selectSubtitles,
  selectTranscript,
} from "../subtitleSection/subtitleSlice";
import parse from "html-react-parser";

export default function ShowSubtitle() {
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
    if (activeSubtitle.whichOne === "original")
      return transcript[activeSubtitle.index];
    else return subtitle[activeSubtitle.index];
  };

  return (
    <div
      className="subtitle"
      style={{
        top: scale(showSubtitle()?.position || 1, 1, 10, 80, 10) + "%",
      }}
    >
      {parse(showSubtitle()?.text || "")}
    </div>
  );
}
