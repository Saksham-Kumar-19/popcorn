interface StarItemProps {
  onStarRating: (rating: number) => void;
  isFull: boolean;
  rating: number;
  onHoverIn: () => void;
  onHoverOut: () => void;
  color: string;
  size: number;
}

// Always recommended to place the object for the style outside of the component so that the object is not recreated on every render. This is a performance optimization.
/*
const starStyle = {
  width: "48px",
  height: "48px",
  display: "block",
  cursor: "pointer",
};
*/

// onClick={() => onStarRating(rating)} Explanation:
/* 
The Original Problem:
    Your issue stemmed from a type mismatch between what React expects for an onClick event handler and what your custom function expected:

    React's onClick Handler: In React, an onClick event handler is expected to be a function that receives an event object (MouseEvent) as its argument. This event object contains information about the click event, such as which element was clicked, the coordinates of the click, and more.

    Your Custom onStarRating Function: Your function expected a single argument of type number, representing the star rating. This is a custom requirement, unrelated to the default event object that React's onClick provides.

    When you tried to directly assign your onStarRating function (which expects a number) to the onClick event handler (which provides a MouseEvent), TypeScript flagged this as an error. TypeScript is helping ensure type safety, preventing runtime errors that could occur if your function tries to operate on an event object as if it were a number.

The Solution Explained:
    The solution involves creating a bridge between React's expected MouseEvent and your requirement for a numerical rating. Here's how the solution addresses the core issues:

Introduction of a rating Prop in StarItem: 
    By adding a rating prop to each StarItem, we explicitly define what each star represents numerically. This prop is used to pass down the star's rating from the parent (StarRating) to each child (StarItem).

Using an Anonymous Function for onClick: 
    For the onClick handler in StarItem, we use an anonymous function (() => onStarRating(rating)). This function does not take any arguments itself, meaning it doesn't directly deal with the MouseEvent. Instead, it calls onStarRating with the rating prop when clicked.

Why This Works: 
    This approach effectively decouples the MouseEvent from your custom logic. The anonymous function serves as an intermediary, allowing you to ignore the event object and directly use the numerical rating you're interested in. This pattern is common in React for handling events that need to trigger custom logic with specific data.

Maintaining React and TypeScript Conventions: 
    By adhering to the expected types for event handlers (functions that can handle or ignore MouseEvent), and by passing custom data (the rating) through props, the solution remains within the best practices of React development. It ensures type safety, promotes component reusability, and maintains clarity in data flow and event handling.

Key Takeaways:
    Event Handlers and Custom Logic: When React's built-in event handling doesn't directly match your requirements, you can use intermediary functions to adapt the event handling to your needs.

    Props for Communication: Props are not just for static data. They can also be used to pass down functions or specific instructions (like the rating) that child components can act upon.

    Type Safety with TypeScript: TypeScript's type checking helps prevent runtime errors by ensuring that functions receive the correct types of arguments, as seen with the resolution of the initial error.
*/

function StarItem({
  onStarRating,
  isFull,
  rating,
  onHoverIn,
  onHoverOut,
  color,
  size,
}: StarItemProps) {
  const starStyle = {
    width: `${size}px`,
    height: `${size}px`,
    display: "block",
    cursor: "pointer",
  };

  return (
    <span
      role="button"
      style={starStyle}
      onClick={() => onStarRating(rating)}
      onMouseEnter={onHoverIn}
      onMouseLeave={onHoverOut}
    >
      {isFull ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill={color}
          stroke={color}
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke={color}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="{2}"
            d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
          />
        </svg>
      )}
    </span>
  );
}

export default StarItem;
