export type PhotoCategory =
  | "street"
  | "landscape"
  | "travel"
  | "architecture";

export type Photo = {
  id: string;
  title: string;
  location?: string;
  year: number;
  src: string;
  alt: string;
  category: PhotoCategory;
  width: number;
  height: number;
  featured?: boolean;
};

export const photos: Photo[] = [
  {
    id: "1",
    title: "Fushimi Inari Shrine",
    location: "Kyoto, Japan",
    year: 2024,
    src: "/photos/Fushimi Inari Shrine.JPG",
    alt: "Thousands of vermillion torii gates winding up the mountain at Fushimi Inari Shrine",
    category: "architecture",
    width: 6048,
    height: 4392,
  },
  {
    id: "2",
    title: "Itsukushima Jinja",
    location: "Miyajima, Japan",
    year: 2024,
    src: "/photos/Itsukushima Jinja.JPG",
    alt: "The iconic floating torii gate of Itsukushima Shrine rising from the sea",
    category: "landscape",
    width: 6020,
    height: 3472,
  },
  {
    id: "3",
    title: "Izuku",
    location: "Japan",
    year: 2024,
    src: "/photos/Izuku.JPG",
    alt: "Quiet coastal scene in Izuku, Japan",
    category: "travel",
    width: 4118,
    height: 5088,
  },
  {
    id: "4",
    title: "Kyoto",
    location: "Kyoto, Japan",
    year: 2024,
    src: "/photos/Kyoto.JPG",
    alt: "Timeless alleyway in Kyoto, Japan",
    category: "travel",
    width: 4280,
    height: 5290,
  },
  {
    id: "5",
    title: "Mt Fuji",
    location: "Shizuoka, Japan",
    year: 2024,
    src: "/photos/Mt Fuji.JPG",
    alt: "The majestic silhouette of Mount Fuji rising above the horizon",
    category: "landscape",
    width: 4410,
    height: 5450,
  },
  {
    id: "6",
    title: "Okayama",
    location: "Okayama, Japan",
    year: 2024,
    src: "/photos/Okayama 1.JPG",
    alt: "A quiet moment on the streets of Okayama",
    category: "street",
    width: 2969,
    height: 3670,
  },
  {
    id: "7",
    title: "Okayama",
    location: "Okayama, Japan",
    year: 2024,
    src: "/photos/Okayama 2.JPG",
    alt: "Late afternoon light across Okayama",
    category: "street",
    width: 4410,
    height: 5450,
  },
  {
    id: "8",
    title: "Okayama Castle",
    location: "Okayama, Japan",
    year: 2024,
    src: "/photos/Okayama Castle.JPG",
    alt: "Okayama Castle, known as Crow Castle, under an open sky",
    category: "architecture",
    width: 6048,
    height: 4392,
  },
  {
    id: "9",
    title: "amanohashitade",
    year: 2024,
    src: "/photos/amanohashitade.JPG",
    alt: "amanohashitade",
    category: "travel",
    width: 5516,
    height: 4004,
  },
  {
    id: "10",
    title: "Blue hour Itsukushima Jinja",
    year: 2024,
    src: "/photos/Blue hour Itsukushima Jinja.JPG",
    alt: "Blue hour Itsukushima Jinja",
    category: "travel",
    width: 5731,
    height: 4161,
  },
  {
    id: "11",
    title: "mt fuji station",
    year: 2024,
    src: "/photos/mt fuji station.JPG",
    alt: "mt fuji station",
    category: "travel",
    width: 4764,
    height: 3459,
  },
  {
    id: "12",
    title: "okayama",
    year: 2024,
    src: "/photos/okayama.JPG",
    alt: "okayama",
    category: "travel",
    width: 3455,
    height: 2508,
  },
  {
    id: "13",
    title: "osaka aquarium 2",
    year: 2024,
    src: "/photos/osaka aquarium 2.JPG",
    alt: "osaka aquarium 2",
    category: "travel",
    width: 4080,
    height: 5042,
  },
  {
    id: "14",
    title: "osaka aquarium",
    year: 2024,
    src: "/photos/osaka aquarium.JPG",
    alt: "osaka aquarium",
    category: "travel",
    width: 3528,
    height: 4360,
  },
  {
    id: "15",
    title: "taisho pond",
    year: 2024,
    src: "/photos/taisho pond.JPG",
    alt: "taisho pond",
    category: "travel",
    width: 3528,
    height: 4360,
  },
];
