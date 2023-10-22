export default async function getLanguages() {
  const rootUrl =
    "https://django-backend-shift-enter-u53fbnjraa-oe.a.run.app/api/";

  //should add params - to not duplicate code
  const response = await fetch(rootUrl + "languages/");

  if (!response.ok) throw new Error("failed to fetch data");

  return response.json();
}
