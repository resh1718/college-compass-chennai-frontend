import heroImage from "@assets/generated_images/modern_university_campus_chennai.png";
import stock1 from "@assets/stock_images/university_campus_bu_9227a853.jpg";
import stock2 from "@assets/stock_images/university_campus_bu_893de469.jpg";
import stock3 from "@assets/stock_images/university_campus_bu_7c763172.jpg";
import stock4 from "@assets/stock_images/university_campus_bu_aa6953e7.jpg";

export interface College {
  id: string;
  name: string;
  type: "Government" | "Private";
  location: string;
  distanceFromChennai: number;
  fees: number;
  cutoff: number;
  rating: number;
  placementRate: number;
  hostelRating: number;
  foodRating: number;
  courses: string[];
  image: string;
  description: string;
  accreditation: string;
  established: number;
  officialWebsite: string;
}

export const colleges: College[] = [
  {
    id: "1",
    name: "Indian Institute of Technology (IIT) Madras",
    type: "Government",
    location: "Chennai",
    distanceFromChennai: 0,
    fees: 250000,
    cutoff: 98,
    rating: 4.9,
    placementRate: 95,
    hostelRating: 4.5,
    foodRating: 4.2,
    courses: ["B.Tech CSE", "B.Tech EEE", "B.Tech Mechanical", "M.Tech"],
    image: heroImage,
    description: "Premier engineering institute in India.",
    accreditation: "IoE",
    established: 1959,
    officialWebsite: "https://www.iitm.ac.in",
  },
  {
    id: "2",
    name: "Anna University (CEG Campus)",
    type: "Government",
    location: "Chennai",
    distanceFromChennai: 0,
    fees: 50000,
    cutoff: 198,
    rating: 4.7,
    placementRate: 90,
    hostelRating: 4.0,
    foodRating: 3.8,
    courses: ["B.E. CSE", "B.E. ECE", "B.E. Civil"],
    image: stock1,
    description: "Oldest technical institution in India.",
    accreditation: "NAAC A++",
    established: 1794,
    officialWebsite: "https://www.annauniv.edu",
  },
  {
    id: "3",
    name: "Sathyabama Institute of Science and Technology",
    type: "Private",
    location: "Chennai",
    distanceFromChennai: 20,
    fees: 120000,
    cutoff: 150,
    rating: 4.0,
    placementRate: 88,
    hostelRating: 3.8,
    foodRating: 4.0,
    courses: ["B.E. CSE", "B.Tech IT", "MBA"],
    image: stock2,
    description: "Deemed university with strong placements.",
    accreditation: "NAAC A+",
    established: 1987,
    officialWebsite: "https://www.sathyabama.ac.in",
  },
  {
    id: "4",
    name: "SRM Institute of Science and Technology",
    type: "Private",
    location: "Kattankulathur",
    distanceFromChennai: 40,
    fees: 350000,
    cutoff: 85,
    rating: 4.3,
    placementRate: 88,
    hostelRating: 4.4,
    foodRating: 4.3,
    courses: ["B.Tech CSE", "B.Tech IT", "MBBS"],
    image: stock3,
    description: "Large private university with modern campus.",
    accreditation: "NAAC A++",
    established: 1985,
    officialWebsite: "https://www.srmist.edu.in",
  },
  {
    id: "5",
    name: "VIT Chennai",
    type: "Private",
    location: "Vandalur",
    distanceFromChennai: 35,
    fees: 290000,
    cutoff: 88,
    rating: 4.4,
    placementRate: 94,
    hostelRating: 4.7,
    foodRating: 4.4,
    courses: ["B.Tech CSE", "B.Tech ECE"],
    image: stock4,
    description: "Top private engineering campus.",
    accreditation: "NAAC A++",
    established: 2010,
    officialWebsite: "https://chennai.vit.ac.in",
  },
];
