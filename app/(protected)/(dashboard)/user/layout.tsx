import SideBar from "../_components/SideBar";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SideBar children={children} />
    </>
  );
}
