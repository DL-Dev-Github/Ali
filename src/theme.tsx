import * as React from "react";
import {
  Link as RouterLink,
  LinkProps as RouterLinkProps,
} from "react-router-dom";
import { createTheme, PaletteColor } from "@mui/material/styles";
import { LinkProps } from "@mui/material/Link";

declare module "@mui/material/styles" {
  interface Palette {
    upcoming: PaletteColor;
  }
  interface PaletteOptions {
    upcoming: PaletteColor;
  }
}

declare module "@mui/material/Chip" {
  interface ChipPropsColorOverrides {
    upcoming: true;
  }
}

const LinkBehavior = React.forwardRef<
  any,
  Omit<RouterLinkProps, "to"> & { href: RouterLinkProps["to"] }
>((props, ref) => {
  const { href, ...other } = props;
  // Map href (MUI) -> to (react-router)
  return <RouterLink ref={ref} to={href} {...other} />;
});

const { palette } = createTheme();

const theme = createTheme({
  palette: {
    background: {
      default: '#000000', // Set the background color to black
    },
    primary: {
      
      main: "#d0112b",
      dark: "#d0112b",
      light: "#FFFFFF",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#BDBDBD",
      dark: "#8C8D8E",
      light: "#d0112b",
    },
    success: {
      main: "#d0112b",
    },
    error: {
      main: "#d0112b",
    },
    upcoming: palette.augmentColor({
      color: {
        main: "#d0112b",
      },
    }),
  },
  typography: {
    fontFamily: [
      "prohibition",
  
      "brandon-grotesque",
      "requiem",

    ].join(","),
  },
  components: {
    MuiLink: {
      defaultProps: {
        component: LinkBehavior,
      } as LinkProps,
    },
    MuiButtonBase: {
      defaultProps: {
        LinkComponent: LinkBehavior,
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          
          color: "#ffffff",
          fontFamily: "brandon-grotesque",
          fontWeight: 600,
          borderRadius: "10px",
        },
      },
    },
  },
});

theme.typography.h1 = {
  fontFamily: "prohibition",
  fontWeight: 400,
  fontSize: "12vh",
  color: "#ffffff",
};
theme.typography.h2 = {
  fontFamily: "brandon-grotesque",
  
  fontWeight: "bold",
  fontSize: "3vh",
  color: "#ffffff",
};
theme.typography.h3 = {
  fontFamily: "prohibition",
  fontWeight: 400,
  fontSize: "32px",
  color: "#000000",
};
theme.typography.h4 = {
  fontFamily: "brandon-grotesque",
  fontWeight: 600,
  fontSize: "3vh",
  color: "#ffffff",
};
theme.typography.h5 = {
  fontFamily: "brandon-grotesque",
  fontWeight: 600,
  fontSize: "3vh",
  color: "#ffffff",
};
theme.typography.body1 = {
  fontFamily: "brandon-grotesque",
  fontWeight: "400",
  fontSize: "2.0vh",
  color: "#ffffff",
};

export default theme;
