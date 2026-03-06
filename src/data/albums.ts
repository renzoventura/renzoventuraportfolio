export type Album = {
  id: string;
  title: string;
  subtitle: string;
  href: string;
  thumbnail: string;
  width: number;
  height: number;
};

export const albums: Album[] = [
  {
    id: "japan23",
    title: "Japan",
    subtitle: "2023",
    href: "/photo/japan23",
    thumbnail: "/japan23/THUMBNAIL.JPEG",
    width: 4410,
    height: 5450,
  },
  {
    id: "eu22",
    title: "Europe",
    subtitle: "2022",
    href: "/photo/eu22",
    thumbnail: "/eu22/THUMBNAIL.JPEG",
    width: 1740,
    height: 2150,
  },
  {
    id: "eu25",
    title: "Europe",
    subtitle: "2025",
    href: "/photo/eu25",
    thumbnail: "/eu25/THUMBNAIL.JPEG",
    width: 1740,
    height: 2150,
  },
];
