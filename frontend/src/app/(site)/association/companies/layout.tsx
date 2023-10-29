export const metadata = {
  title: "SHIFT - Association list of companies",
  description: "Shift_Enter App - Association Companies list.",
};

export default function LayoutToFixServerSideRenderingIssuesWithClientSidePages({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
