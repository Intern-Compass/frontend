import localFont from "next/font/local";

export const mtnBrighterSans = localFont({
  src: [
    {
      path: "../public/assets/fonts/MTNBrighterSans-ExtraLight.otf",
      weight: "200",
      style: "normal",
    },
    {
      path: "../public/assets/fonts/MTNBrighterSans-ExtraLightItalic.otf",
      weight: "200",
      style: "italic",
    },
    {
      path: "../public/assets/fonts/MTNBrighterSans-Light.otf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../public/assets/fonts/MTNBrighterSans-LightItalic.otf",
      weight: "300",
      style: "italic",
    },
    {
      path: "../public/assets/fonts/MTNBrighterSans-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/assets/fonts/MTNBrighterSans-RegularItalic.otf",
      weight: "400",
      style: "italic",
    },
    {
      path: "../public/assets/fonts/MTNBrighterSans-Medium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/assets/fonts/MTNBrighterSans-MediumItalic.otf",
      weight: "500",
      style: "italic",
    },
    {
      path: "../public/assets/fonts/MTNBrighterSans-Bold.otf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/assets/fonts/MTNBrighterSans-BoldItalic.otf",
      weight: "700",
      style: "italic",
    },
    {
      path: "../public/assets/fonts/MTNBrighterSans-ExtraBold.otf",
      weight: "800",
      style: "normal",
    },
    {
      path: "../public/assets/fonts/MTNBrighterSans-ExtraBoldItalic.otf",
      weight: "800",
      style: "italic",
    },
  ],
  fallback: ["system-ui", "arial"],
  variable: "--font-mtn-brighter-sans",
});
