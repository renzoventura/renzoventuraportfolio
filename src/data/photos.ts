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
};

export const photos: Photo[] = [
  {
    id: "1",
    title: "Fushimi Inari Shrine",
    location: "Kyoto, Japan",
    year: 2024,
    src: "/photos/fushimi-inari-shrine.jpg",
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
    src: "/photos/itsukushima-jinja.jpg",
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
    src: "/photos/izuku.jpg",
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
    src: "/photos/kyoto.jpg",
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
    src: "/photos/mt-fuji.jpg",
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
    src: "/photos/okayama-1.jpg",
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
    src: "/photos/okayama-2.jpg",
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
    src: "/photos/okayama-castle.jpg",
    alt: "Okayama Castle, known as Crow Castle, under an open sky",
    category: "architecture",
    width: 6048,
    height: 4392,
  },
];
