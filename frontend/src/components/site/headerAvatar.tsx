import Avatar from "@mui/material/Avatar";
import { GetInitials } from "./candidateProfile/candidateHelpers";
import { Stack, Typography } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import React from "react";
import { useRouter } from "next/navigation";

interface HeaderAvatarProps {
  first_name: string;
  last_name: string;
  preferred_name: string;
  display_name: string;
}

const settings = ["Logout"]; //add more options if needed

export const HeaderAvatar: React.FC<HeaderAvatarProps> = ({
  first_name,
  last_name,
  preferred_name,
  display_name,
}) => {
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null,
  );

  const router = useRouter();
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
    router.push('/login')
  };

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  return (
    <Stack direction="row">
      <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
        <Avatar
          sx={{
            bgcolor: "#14366F",
            width: "32px",
            height: "32px",
            fontSize: "16px",
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
      </IconButton>
      <Typography sx={{ lineHeight: "32px", pl: 1 }}>{display_name}</Typography>

      <Menu
        sx={{ mt: "45px" }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        {settings.map((setting) => (
          <MenuItem key={setting} onClick={handleCloseUserMenu}>
            <Typography textAlign="center">{setting}</Typography>
          </MenuItem>
        ))}
      </Menu>
    </Stack>
  );
};
