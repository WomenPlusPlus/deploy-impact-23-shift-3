import React from "react";
import Chip from "@mui/material/Chip";
import { shadow } from "./candidateHelpers";

interface SkillsChipsProps {
  skills?: string[];
}

export const SkillsChips: React.FC<SkillsChipsProps> = ({ skills }) => {
  // Check if skills data is available
  if (!skills || skills.length === 0) {
    return null; // Don't render anything if there are no skills
  }

  return (
    <div>
      {skills.map((skill, index) => (
        <Chip
          key={index}
          label={skill}
          sx={{
            mr: 1,
            mb: 2,
            borderRadius: "10px",
            backgroundColor: "#F6F7FB",
            boxShadow: shadow,
          }}
        />
      ))}
    </div>
  );
};
