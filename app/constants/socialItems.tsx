import {SiLinkedin, SiGithub, SiGmail} from "react-icons/si";
const contactIconStyles =
  "text-whiteLight hover:cursor-pointer hover:text-sky sm:md:text-4xl";
export const socialItems = [
  {
    href: "https://www.linkedin.com/in/lakan-santos",
    icon: <SiLinkedin />,
    target: "_blank",
    className: contactIconStyles,
  },
  {
    href: "https://github.com/lakansantos",
    icon: <SiGithub />,
    target: "_blank",
    className: contactIconStyles,
  },
  {
    href: "mailto:lakancsantos@gmail.com",
    icon: <SiGmail />,
    className: contactIconStyles,
  },
];
