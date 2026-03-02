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
    title: "Kifune Shrine",
    location: "Kyoto",
    year: 2023,
    src: "/photos/Fushimi Inari Shrine.JPG",
    alt: "Thousands of vermillion torii gates winding up the mountain at Fushimi Inari Shrine",
    category: "architecture",
    width: 6048,
    height: 4392,
  },
  {
    id: "2",
    title: "Itsukushima Jinja",
    location: "Miyajima",
    year: 2023,
    src: "/photos/Itsukushima Jinja.JPG",
    alt: "The iconic floating torii gate of Itsukushima Shrine rising from the sea",
    category: "landscape",
    width: 6020,
    height: 3472,
  },
  {
    id: "3",
    title: "Kurashiki",
    location: "Kurashiki",
    year: 2023,
    src: "/photos/Izuku.JPG",
    alt: "Quiet coastal scene in Izuku",
    category: "travel",
    width: 4118,
    height: 5088,
  },
  {
    id: "4",
    title: "Early walk",
    location: "Kyoto",
    year: 2023,
    src: "/photos/Kyoto.JPG",
    alt: "Timeless alleyway in Kyoto",
    category: "travel",
    width: 4280,
    height: 5290,
  },
  {
    id: "5",
    title: "Crossings",
    location: "Mt Fuji",
    year: 2023,
    src: "/photos/Mt Fuji.JPG",
    alt: "The majestic silhouette of Mount Fuji rising above the horizon",
    category: "landscape",
    width: 4410,
    height: 5450,
    featured: true
  },
  {
    id: "7",
    title: "Abandonded Tractor",
    location: "Okayama",
    year: 2023,
    src: "/photos/Okayama 2.JPG",
    alt: "Late afternoon light across Okayama",
    category: "street",
    width: 4410,
    height: 5450,
  },
  {
    id: "8",
    title: "Okayama Castle",
    location: "Okayama",
    year: 2023,
    src: "/photos/Okayama Castle.JPG",
    alt: "Okayama Castle, known as Crow Castle, under an open sky",
    category: "architecture",
    width: 6048,
    height: 4392,
  },
  {
    id: "9",
    title: "Parallel Paths",
    location: "Amanohashidate",
    year: 2023,
    src: "/photos/amanohashitade.JPG",
    alt: "amanohashitade",
    category: "travel",
    width: 5516,
    height: 4004,
  },
  {
    id: "10",
    title: "Blue hour",
    location: "Miyajima Island",
    year: 2023,
    src: "/photos/Blue hour Itsukushima Jinja.JPG",
    alt: "Blue hour Itsukushima Jinja",
    category: "travel",
    width: 5731,
    height: 4161,
    featured: true,
  },

  {
    id: "6",
    title: "Beyond the infinite",
    location: "Okayama",
    year: 2023,
    src: "/photos/Okayama 1.JPG",
    alt: "A quiet moment on the streets of Okayama",
    category: "street",
    width: 2969,
    height: 3670,
    featured: true,
  },
  {
    id: "11",
    title: "Kawaguchiko Station",
    location: "Lake Kawaguchiko",
    year: 2023,
    src: "/photos/mt fuji station.JPG",
    alt: "mt fuji station",
    category: "travel",
    width: 4764,
    height: 3459,
  },
  {
    id: "12",
    title: "Portal",
    location: "Okayama",
    year: 2023,
    src: "/photos/okayama.JPG",
    alt: "okayama",
    category: "travel",
    width: 3455,
    height: 2508,
  },
  {
    id: "13",
    title: "Uzumaki",
    location: "Osaka",
    year: 2023,
    src: "/photos/osaka aquarium 2.JPG",
    alt: "osaka aquarium 2",
    category: "travel",
    width: 4080,
    height: 5042,
  },
  {
    id: "14",
    title: "Meeting Point",
    location: "Osaka",
    year: 2023,
    src: "/photos/osaka aquarium.JPG",
    alt: "osaka aquarium",
    category: "travel",
    width: 3528,
    height: 4360,
  },
  {
    id: "15",
    title: "Taisho Pond",
    location: "Kamikochi",
    year: 2023,
    src: "/photos/taisho pond.JPG",
    alt: "taisho pond",
    category: "travel",
    width: 3528,
    height: 4360,
  },
];
