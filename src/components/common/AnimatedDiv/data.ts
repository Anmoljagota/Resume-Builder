export const RightToLeftAnimate = {
  from: { x: 500 },
  to: { x: 0 },
  config: { duration: 1000 }, // Adjust the duration as needed
};
export const LeftToRightAnimate = {
  from: { x: -200, y: 0, opacity: 0 },
  to: { x: 0, y: 0, opacity: 1 },
  config: { duration: 300 },
  // Adjust the duration as needed
};
export const TopToBottomAnimate = {
  from: { height: 0 },
  to: { height: 300 },
  config: { duration: 500 },
  // Adjust the duration as needed
};
