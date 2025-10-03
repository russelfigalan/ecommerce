// import { TriangleAlert } from "lucide-react";

interface FormSuccessProps {
  message?: string;
}

export const FormSuccess = ({ message }: FormSuccessProps) => {
  if (!message) return null;

  return <div className="text-[#0096FF]">{message}</div>;
};
