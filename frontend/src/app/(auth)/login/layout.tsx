export const metadata = {
  title: "SHIFT - Log in",
  description:
    "Shift_Enter App - Any user with valid credentials can log into the app",
};

export default function LayoutToFixServerSideRenderingIssuesWithClientSidePages({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
