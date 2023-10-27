export const metadata = {
  title: "SHIFT - Association list of candidates",
  description: "Shift_Enter App - Association  Candidates list.",
};

export default function LayoutToFixServerSideRenderingIssuesWithClientSidePages({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
