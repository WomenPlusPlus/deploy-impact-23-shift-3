export default async function getAssociations() {
  const rootUrl =
    "http://django-backend-shift-enter-u53fbnjraa-oe.a.run.app/api/";

  const response = await fetch(rootUrl + "associations");

  if (!response.ok) throw new Error("failed to fetch data");

  return response.json();
}
