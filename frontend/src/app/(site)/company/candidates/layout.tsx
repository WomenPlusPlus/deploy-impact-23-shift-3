export const metadata = {
  title: "SHIFT - Company list of candidates",
  description:
    "Shift_Enter App - Company can enlist Candidates matched for the open job position.",
};

export default function LayoutToFixServerSideRenderingIssuesWithClientSidePages({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
