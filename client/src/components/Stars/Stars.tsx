import { FaStarHalfAlt, FaStar } from "react-icons/fa";
import { FiStar } from "react-icons/fi";

interface StarsProps {
  stars: number;
}

export default function Stars({ stars }: StarsProps) {
  const starRating = Array.from({ length: 5 }, (elem, index) => {
    const number = index + 0.5;
    return (
      <span key={index}>
        {stars >= index + 1 ? (
          <FaStar title="Ratings" />
        ) : stars >= number ? (
          <FaStarHalfAlt title="Ratings" />
        ) : (
          <FiStar title="Ratings" />
        )}
      </span>
    );
  });

  return (
    <div className="flex text-orange-400 items-center gap-1">{starRating}</div>
  );
}
