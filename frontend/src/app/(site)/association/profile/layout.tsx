export const metadata = {
  title: "SHIFT - Association Profile",
  description: "Shift_Enter App - Association's Profile.",
};

export default function LayoutToFixServerSideRenderingIssuesWithClientSidePages({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
