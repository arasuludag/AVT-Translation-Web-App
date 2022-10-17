import { useAppDispatch } from "../../../app/hooks";
import FormDialog from "./FormDialog";
import { insertToSubtitle } from "../subtitleSlice";
import { useState } from "react";

export default function AddNote(props: { index: number; note: string }) {
  const dispatch = useAppDispatch();
  const [displayedNote, setDisplayedNote] = useState(props.note);

  return (
    <div>
      <FormDialog
        buttonName={displayedNote ? "Edit Note" : "Add Note"}
        text={displayedNote}
        onSubmit={(note) => {
          dispatch(
            insertToSubtitle({
              subtitle: {
                note: note,
              },
              index: props.index,
            })
          );
          setDisplayedNote(note);
        }}
      />
    </div>
  );
}
