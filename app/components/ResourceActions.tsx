import EditButton from "./EditButton";
import DeleteButton from "./DeleteButton";

export default function ResourceActions({
  editTo,
  deleteTo,
}: {
  editTo: string;
  deleteTo: string;
}) {
  return (
    <div className="flex justify-end space-x-2">
      <EditButton to={editTo} />
      <DeleteButton to={deleteTo} />
    </div>
  );
}
