import { useContext, useRef, useState } from "react";
import {
  NavLink as RouterLink,
  matchPath,
  useLocation,
} from "react-router-dom";
import ReactNiceAvatar, { genConfig } from "react-nice-avatar";
import homeFill from "@iconify/icons-eva/home-fill";
import personFill from "@iconify/icons-eva/person-fill";
import settings2Fill from "@iconify/icons-eva/settings-2-fill";
// material
import { alpha } from "@mui/material/styles";
import {
  Button,
  Box,
  Divider,
  Typography,
  IconButton,
  MenuItem,
} from "@mui/material";
// components
import { Icon } from "@iconify/react";
import logoutIcon from "@iconify/icons-eva/log-out-fill";
import MenuPopover from "../../components/MenuPopover";
import settingsVoice from "@iconify/icons-ic/settings-voice";
//
// import account from '../../_mocks_/account';
import { AuthContext } from "../../context/AuthContext";

// ----------------------------------------------------------------------

const MENU_OPTIONS = [
  {
    label: "Home",
    icon: homeFill,
    linkTo: "/",
  },
  {
    label: "nfts",
    icon: settingsVoice,
    linkTo: "/dashboard/nfts",
  },
];

// ----------------------------------------------------------------------

export default function AccountPopover() {
  const authContext = useContext(AuthContext);
  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);

  const config = {
    sex: "man",
    faceColor: "#AC6651",
    earSize: "small",
    eyeStyle: "oval",
    noseStyle: "long",
    mouthStyle: "peace",
    shirtStyle: "polo",
    glassesStyle: "none",
    hairColor: "#77311D",
    hairStyle: "normal",
    hatStyle: "none",
    hatColor: "#000",
    eyeBrowStyle: "up",
    shirtColor: "#6BD9E9",
    bgColor: "linear-gradient(45deg, #3e1ccd 0%, #ff6871 100%)",
  };

  const myConfig = genConfig(config);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Box ref={anchorRef} onClick={handleOpen}>
        <ReactNiceAvatar
          style={{
            cursor: "pointer",
            width: 44,
            height: 44,
            ...(open && {
              "&:before": {
                zIndex: 1,
                content: "''",
                width: "100%",
                height: "100%",
                borderRadius: "50%",
                position: "absolute",
                bgcolor: (theme) => alpha(theme.palette.grey[900], 0.72),
              },
            }),
          }}
          {...myConfig}
        />
      </Box>
      {/* <IconButton
        sx={{
          padding: 0,
          width: 44,
          height: 44
        }}
      >

      </IconButton> */}

      <MenuPopover
        open={open}
        onClose={handleClose}
        anchorEl={anchorRef.current}
        sx={{ width: 220 }}
      >
        <Box sx={{ my: 1.5, px: 2.5 }}>
          <Typography variant="subtitle1" noWrap>
            {authContext.authState?.userInfo?.firstName} &nbsp;{" "}
            {authContext.authState?.userInfo?.lastName}
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }} noWrap>
            {authContext.authState?.userInfo?.email}
          </Typography>
        </Box>

        <Divider sx={{ my: 1 }} />

        {MENU_OPTIONS.map((option) => (
          <MenuItem
            key={option.label}
            to={option.linkTo}
            component={RouterLink}
            onClick={handleClose}
            sx={{ typography: "body2", py: 1, px: 2.5 }}
          >
            <Box
              component={Icon}
              icon={option.icon}
              sx={{
                mr: 2,
                width: 24,
                height: 24,
              }}
            />

            {option.label}
          </MenuItem>
        ))}

        <Box sx={{ p: 2, pt: 1.5 }}>
          <Button
            onClick={authContext.logout}
            fullWidth
            color="inherit"
            variant="outlined"
          >
            <Icon icon={logoutIcon} width={22} height={22} />
            Logout
          </Button>
        </Box>
      </MenuPopover>
    </>
  );
}
