export const metadata = {
  title: "SHIFT - Candidate - profile",
  description: "Shift_Enter App - Candidate - Profile",
};

export default function LayoutToFixServerSideRenderingIssuesWithClientSidePages({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
