/**
 * Book covers and movie posters live under /public (served as static assets).
 * Filenames are stable; replace the files in public/covers or public/posters to swap art.
 */
export type Book = {
  title: string;
  author: string;
  /** Path under site root, e.g. /covers/dune.jpg */
  cover: string;
  url?: string;
};

export type Movie = {
  title: string;
  year?: string;
  poster: string;
  url?: string;
};

export const books: Book[] = [
  {
    title: "Feluda",
    author: "Satyajit Ray",
    cover: "/covers/feluda.jpg",
  },
  {
    title: "So Long, and Thanks for All the Fish",
    author: "Douglas Adams",
    cover: "/covers/so-long-and-thanks-for-all-the-fish.jpg",
  },
  {
    title: "Dune",
    author: "Frank Herbert",
    cover: "/covers/dune.jpg",
  },
  {
    title: "No Longer Human",
    author: "Osamu Dazai",
    cover: "/covers/no-longer-human.jpg",
  },
  {
    title: "Blood Meridian",
    author: "Cormac McCarthy",
    cover: "/covers/blood-meridian.jpg",
  },
  {
    title: "Samskara",
    author: "U. R. Ananthamurthy",
    cover: "/covers/samskara.jpg",
  },
  {
    title: "The King in Yellow",
    author: "Robert W. Chambers",
    cover: "/covers/the-king-in-yellow.jpg",
  },
  {
    title: "The view from the Cheap Seats",
    author: "Neil Gaiman",
    cover: "/covers/the-view-from-the-cheap-seats.jpg",
  },
  {
    title: "The Dangers of Smoking in Bed",
    author: "Mariana Enríquez",
    cover: "/covers/the-dangers-of-smoking-in-bed.jpg",
  },
  {
    title: "Kafka on the Shore",
    author: "Haruki Murakami",
    cover: "/covers/kafka-on-the-shore.jpg",
  },
];

export const movies: Movie[] = [
  {
    title: "Das Boot",
    year: "1981",
    poster: "/posters/das-boot.jpg",
  },
  {
    title: "Pather Panchali",
    year: "1955",
    poster: "/posters/pather-panchali.jpg",
  },
  {
    title: "Stalker",
    year: "1979",
    poster: "/posters/stalker.webp",
  },
  {
    title:"Full Metal Jacket",
    year: "1987",
    poster: "/posters/full-metal-jacket.jpg",
  },
  {
    title:"La Haine",
    year: "1995",
    poster: "/posters/la-haine.jpg",
  },
  {
    title:"Wojnarowicz",
    year: "1987",
    poster: "/posters/wojnarowicz.jpg",
  },
  {
    title:"Agantuk",
    year: "1991",
    poster: "/posters/agantuk.jpg",
  },
  {
    title:"Mirror",
    year: "1975",
    poster: "/posters/mirror.jpg",
  },
  {
    title:"Devi",
    year: "1992",
    poster: "/posters/devi.jpg",
  },
  {
    title:"Awaara",
    year: "1951",
    poster: "/posters/awaara.jpg",
  },
];