export const metadata = {
  title: "SHIFT - User agreement, Privacy policy and Cookie Policy",
  description:
    "Shift_Enter App - User agreement, Privacy policy and Cookie Policy",
};

export default function LayoutToFixServerSideRenderingIssuesWithClientSidePages({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
