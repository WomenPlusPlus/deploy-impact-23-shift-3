export const metadata = {
  title: "SHIFT - Association Settings",
  description: "Shift_Enter App - Association has Admin rights.",
};

export default function LayoutToFixServerSideRenderingIssuesWithClientSidePages({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
