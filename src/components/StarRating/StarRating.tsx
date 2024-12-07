import StarItem from "./StarItem";
import useMovieDetails from "../../hooks/useMovieDetails";

interface StarRatingProps {
  maxRating: number;
  size?: number;
  color?: string;
  className?: string;
  messages?: string[];
  defaultStarRating?: number;
}

const containerStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "16px",
};

const starContainerStyle = {
  display: "flex",
};

// Always recommended to place the object for the style outside of the component so that the object is not recreated on every render. This is a performance optimization.
/*
const textStyle = {
  lineHeight: "1",
  margin: "0",
};
*/

function StarRating({
  maxRating,
  color = "#fcc419",
  size = 48,
  className,
  messages = [],
}: StarRatingProps) {
  const textStyle = {
    lineHeight: "1",
    margin: "0",
    color,
    fontSize: `${size / 1.5}px`,
  };

  const {
    starRating,
    tempRating,
    handleSetStarRating,
    handleSetStarTempRating,
  } = useMovieDetails();

  return (
    <div className={className} style={containerStyle}>
      <div style={starContainerStyle}>
        {Array.from({ length: maxRating }).map((_, i) => (
          <StarItem
            key={i}
            onStarRating={(rating) => handleSetStarRating(rating)}
            isFull={tempRating > i || starRating > i}
            rating={i + 1}
            onHoverIn={() => handleSetStarTempRating(i + 1)}
            onHoverOut={() => handleSetStarTempRating(0)}
            color={color}
            size={size}
          />
        ))}
      </div>

      <p style={textStyle}>
        {messages.length === maxRating
          ? messages[tempRating ? tempRating - 1 : starRating - 1]
          : tempRating || starRating || ""}
      </p>
    </div>
  );
}

export default StarRating;
