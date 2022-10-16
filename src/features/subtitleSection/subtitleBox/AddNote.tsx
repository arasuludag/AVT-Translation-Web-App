import { useAppDispatch } from "../../../app/hooks";
import FormDialog from "./FormDialog";
import { insertToSubtitle } from "../subtitleSlice";

export default function AddNote(props: { index: number; note: string }) {
  const dispatch = useAppDispatch();

  return (
    <div>
      <FormDialog
        buttonName={props.note ? "Edit Note" : "Add Note"}
        text={props.note}
        onSubmit={(note) =>
          dispatch(
            insertToSubtitle({
              subtitle: {
                note: note,
              },
              index: props.index,
            })
          )
        }
      />
    </div>
  );
}
