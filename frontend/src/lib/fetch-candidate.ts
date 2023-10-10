"use client";
const fetchCandidate = async (id?: string) => {
  const response = await fetch(
    `https://django-backend-shift-enter-u53fbnjraa-oe.a.run.app/api/candidates/`,
  );
  const jsonData = await response.json();

  // @ts-ignore - will be resolved after consultation with Gui
  return jsonData[0];
  // return fetch(
  //   `https://django-backend-shift-enter-u53fbnjraa-oe.a.run.app/api/candidates/${id}/`,
  // );
};

export { fetchCandidate };
