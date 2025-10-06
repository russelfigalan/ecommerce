import { TriangleAlert } from "lucide-react";

interface FormErrorProps {
  message?: string;
}

export const FormError = ({ message }: FormErrorProps) => {
  if (!message) return null;

  return (
    <div className="flex gap-2 text-red-600">
      <TriangleAlert />
      <p>{message}</p>
    </div>
  );
};
