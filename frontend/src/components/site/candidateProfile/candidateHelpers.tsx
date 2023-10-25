import React from "react";
import Tooltip, { TooltipProps, tooltipClasses } from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import PersonRemoveAlt1Icon from "@mui/icons-material/PersonRemoveAlt1";
import Avatar from "@mui/material/Avatar";

// drop shadow on chips
export const shadow =
  "0px 1px 3px 1px rgba(0, 0, 0, 0.15), 0px 1px 2px 0px rgba(0, 0, 0, 0.30)";

// amount of blur on hidden fields
export const blurSize = "4px";

// styling of tooltips
export const HtmlTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "#F2F5FA",
    color: "#45494F",
    maxWidth: 312,
    borderRadius: "10px",
    boxShadow: shadow,
    padding: "10px",
  },
}));

export const proceedButtons = [
  <Button
    key="one"
    sx={{ textTransform: "none" }}
    startIcon={<PersonRemoveAlt1Icon />}
  >
    Don't proceed
  </Button>,
  <Button
    key="two"
    sx={{ textTransform: "none" }}
    startIcon={<PersonAddAlt1Icon />}
  >
    Assign job
  </Button>,
];

interface GetInitialsProps {
  preferred_name?: string;
  first_name?: string;
  last_name?: string;
}
interface ProfileAvatarProps {
  preferred_name?: string;
  first_name?: string;
  last_name?: string;
}

export const GetInitials: React.FC<GetInitialsProps> = ({
  preferred_name,
  first_name,
  last_name,
}) => {
  if (preferred_name) {
    const names = preferred_name.split(" ");

    if (names.length > 1) {
      let initials = "";
      names.forEach((n) => {
        initials += n[0];
      });
      if (initials.length > 2) {
        initials = initials.substring(0, 2);
      }
      return initials.toUpperCase();
    } else {
      const initials = preferred_name[0];
      return initials.toUpperCase();
    }
  } else if (first_name && last_name) {
    return first_name[0].toUpperCase() + last_name[0].toUpperCase();
  }
};

export const ProfileAvatar: React.FC<ProfileAvatarProps> = ({
  preferred_name,
  first_name,
  last_name,
}) => {
  return (
    <Avatar
      sx={{
        bgcolor: "#63E5C5",
        width: "142px",
        height: "142px",
        fontSize: "60px",
        color: "#14366F",
      }}
      // alt="Candidate image"
      // src={`${missingDetails.candidate_img}`}
    >
      <GetInitials
        first_name={first_name}
        last_name={last_name}
        preferred_name={preferred_name}
      />
    </Avatar>
  );
};
