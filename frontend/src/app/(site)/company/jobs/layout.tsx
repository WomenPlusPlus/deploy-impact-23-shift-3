export const metadata = {
  title: "SHIFT - Company Posted Jobs",
  description: "Shift_Enter App - Company can enlist Posted Jobs.",
};

export default function LayoutToFixServerSideRenderingIssuesWithClientSidePages({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
