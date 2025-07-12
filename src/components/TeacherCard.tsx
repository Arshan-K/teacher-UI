import { Teacher } from "@/types/teacher";
import Swal from "sweetalert2";

interface Props {
  teacher: Teacher;
  onDelete: (id: string) => Promise<void>;
}

const TeacherCard = ({ teacher, onDelete }: Props) => {
  const handleDelete = async () => {
    const result = await Swal.fire({
      title: `Delete ${teacher.name}?`,
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await onDelete(teacher.id);

        await Swal.fire({
          title: "Deleted!",
          text: `${teacher.name} has been deleted.`,
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        });
      } catch (err) {
        Swal.fire("Error", `Failed to delete teacher. ${err instanceof Error ? err.message : ''}`, "error")
      }
    }
  };

  return (
    <div className="bg-white shadow rounded p-4 flex justify-between items-center">
      <div>
        <h3 className="font-semibold text-lg">{teacher.name}</h3>
        <p className="text-sm text-gray-600">{teacher.subject}</p>
        <p className="text-sm">{teacher.email}</p>
        <p className="text-sm">{teacher.phone}</p>
      </div>
      <button
        onClick={handleDelete}
        className="text-sm text-red-600 hover:underline"
      >
        Delete
      </button>
    </div>
  );
};

export default TeacherCard;
