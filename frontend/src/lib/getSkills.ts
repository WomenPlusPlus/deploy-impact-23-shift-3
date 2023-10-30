export default async function getSkills() {
  const rootUrl =
    "http://django-backend-shift-enter-u53fbnjraa-oe.a.run.app/api/";

  //should add params - to not duplicate code
  const response = await fetch(rootUrl + "skills");

  if (!response.ok) throw new Error("failed to fetch data");

  return response.json();
}
