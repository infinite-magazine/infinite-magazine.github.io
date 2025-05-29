export interface TeamMember {
  name: string;
  position: string;
  image: string;  // path to regular image
  asciiImage: string;  // path to ASCII version
  initialBox: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  initialRotation: number;
  tapeStyle: 'default' | 'style1' | 'style2' | 'style3';
  className?: string;
} 

export type BlankSlot = "blank"

export type TeamMemberEntry = TeamMember | BlankSlot;

export const teamMembers: TeamMemberEntry[] = [
  {
    name: "Aimee Wang",
    position: "Internal Relations Director",
    image: "/members/aimee.webp",
    asciiImage: "/members/aimee-ascii.webp",
    initialBox: { x: 45, y: 15, width: 190, height: 165 },
    initialRotation: 5,
    tapeStyle: "default",
    className: "xl:translate-y-10"
  },
  {
    name: "Chase Vanias",
    position: "Editor in Chief",
    image: "/members/chase.webp",
    asciiImage: "/members/chase-ascii.webp",
    initialBox: { x: 10, y: 40, width: 155, height: 175 },
    initialRotation: -8,
    tapeStyle: "style1"
  },
  {
    name: "Eliana Shin",
    position: "Social Media Director",
    image: "/members/eliana.webp",
    asciiImage: "/members/eliana-ascii.webp",
    initialBox: { x: 50, y: 10, width: 145, height: 155 },
    initialRotation: 12,
    tapeStyle: "style2",
    className: "xl:translate-y-10"
  },
  {
    name: "Eri-ife Olayinka",
    position: "Photography Director",
    image: "/members/eri-ife.webp",
    asciiImage: "/members/eri-ife-ascii.webp",
    initialBox: { x: 20, y: 25, width: 180, height: 180 },
    initialRotation: -5,
    tapeStyle: "style1",
    className: "xl:-translate-y-12"
  },
  {
    name: "Ivy Zheng",
    position: "Managing Director",
    image: "/members/ivy.webp",
    asciiImage: "/members/ivy-ascii.webp",
    initialBox: { x: 80, y: 50, width: 170, height: 200 },
    initialRotation: -7,
    tapeStyle: "style1",
    className: "xl:translate-y-10"
  },
  {
    name: "Mateo Stagg",
    position: "Photography Director",
    image: "/members/mateo.webp",
    asciiImage: "/members/mateo-ascii.webp",
    initialBox: { x: 15, y: 30, width: 185, height: 170 },
    initialRotation: 8,
    tapeStyle: "style2",
    className: "xl:translate-x-10 xl:translate-y-4"
  },
  "blank",
  {
    name: "Niko Odhiambo",
    position: "Creative Director",
    image: "/members/niko.webp",
    asciiImage: "/members/niko-ascii.webp",
    initialBox: { x: 55, y: 25, width: 150, height: 165 },
    initialRotation: 20,
    tapeStyle: "style3",
    className: "xl:translate-y-20"
  },
  {
    name: "Christina Lee",
    position: "Web & Outreach Directo",
    image: "/members/christina.webp",
    asciiImage: "/members/christina-ascii.webp",
    initialBox: { x: 10, y: 20, width: 195, height: 175 },
    initialRotation: 7,
    tapeStyle: "default",
    className: "xl:translate-y-10"
  },
  {
    name: "Selena Qiao",
    position: "Visual Design Director",
    image: "/members/selena.webp",
    asciiImage: "/members/selena-ascii.webp",
    initialBox: { x: 40, y: 40, width: 195, height: 175 },
    initialRotation: -7,
    tapeStyle: "default",
    className: "xl:translate-y-10"
  },
  {
    name: "Vieyiti Kouadio",
    position: "Event Operations Director",
    image: "/members/vieyiti.webp",
    asciiImage: "/members/vieyiti-ascii.webp",
    initialBox: { x: 35, y: 40, width: 165, height: 170 },
    initialRotation: 9,
    tapeStyle: "style1",
    className: ""
  },
];
