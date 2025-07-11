// src/components/Toast.tsx
interface ToastProps {
  type: "success" | "error";
  message: string;
}

const Toast = ({ type, message }: ToastProps) => {
  return (
    <div
      className={`p-3 text-white rounded ${
        type === "success" ? "bg-green-600" : "bg-red-600"
      }`}
    >
      {message}
    </div>
  );
};

export default Toast;
