import React from "react";
import PremiumArticlesPage from "./PremiumArticlesPage";

const articles = [
  {
    id: 1,
    title: "Exclusive Guide to React",
    image: "https://via.placeholder.com/400x200",
    publisher: "React Weekly",
    description: "Learn advanced React concepts in this premium guide.",
    isPremium: true,
  },
  {
    id: 2,
    title: "Understanding JavaScript Closures",
    image: "https://via.placeholder.com/400x200",
    publisher: "JS Magazine",
    description: "Deep dive into closures with examples and use cases.",
    isPremium: false,
  },
  {
    id: 3,
    title: "CSS Tricks for Responsive Design",
    image: "https://via.placeholder.com/400x200",
    publisher: "CSS Tricks",
    description: "Master responsive design with this exclusive article.",
    isPremium: true,
  },
];

const PremiumArticlesContainer = () => {
  return <PremiumArticlesPage articles={articles} />;
};

export default PremiumArticlesContainer;
