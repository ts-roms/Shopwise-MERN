const productTypes = [
  "Organic",
  "Natural",
  "Handmade",
  "Artisanal",
  "Vegan",
  "Gluten-Free",
  "Non-Toxic",
  "Eco-Friendly",
  "Zero Waste",
];
const productAdjectives = [
  "Luxurious",
  "Premium",
  "Sustainable",
  "Ethical",
  "Healthy",
  "Wholesome",
  "Innovative",
  "Unique",
  "Customizable",
];
const productNouns = [
  "Soap",
  "Candle",
  "Tea",
  "Chocolate",
  "Jewelry",
  "Clothing",
  "Accessories",
  "Furniture",
  "Art",
];

export default function generateProductName() {
  const randomType =
    productTypes[Math.floor(Math.random() * productTypes.length)];
  const randomAdjective =
    productAdjectives[Math.floor(Math.random() * productAdjectives.length)];
  const randomNoun =
    productNouns[Math.floor(Math.random() * productNouns.length)];

  return `${randomType} ${randomAdjective} ${randomNoun}`;
}
