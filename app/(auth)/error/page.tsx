import { errorCard } from "@/components/auth/error-card";

export const Error = () => {
  return (
    <>
      <section className="h-dvh flex items-center justify-center">
        {errorCard()}
      </section>
    </>
  );
};

export default Error;
