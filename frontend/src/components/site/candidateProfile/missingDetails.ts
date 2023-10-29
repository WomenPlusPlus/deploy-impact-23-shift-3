// Missing fields from api call
export const missingDetails = {
  current_position: "Frontend Developer",
  candidate_img: "link/to/img",
  website: "www.test.com",
  file_cv: "link/to/cv",
  pronoun: "She/Her",
  gender: "female", //gender displays pronoun
  phone_number_region: 123, 
  phone_number: 12345, 
  street_address: "sun street", 
  house_number: "56", 
  postal_code: "123", 
  country: "Switzerland", 
  strengths: [
    "Adaptability",
    "Collaboration",
    "Detail Oriented",
    "Honesty",
    "Innovation",
    "Learning",
    "Teamwork",
  ],
  languages: [
    { name: "English", level: "Proficient" },
    { name: "German", level: "Fluent" },
    { name: "French", level: "Conversational" },
  ],
  skills: ["HTML", "JavaScript", "React"], // do not need this
  initiative_badges: ["name 1", "name 2"],
  invited_by: "Women++",
  start_date: "06/11/2023",
  experience: [{ role: "job role", info: "text about what i did etc." }],
  education: [
    {
      institution: "University of bla",
      subject: "Watercolor painting",
      date: "01/03/2010",
      location: "Germany",
    },
    {
      institution: "University of Zurich",
      subject: "Scuba Diving",
      date: "01/03/2015",
      location: "Zurich",
    },
  ],
};
