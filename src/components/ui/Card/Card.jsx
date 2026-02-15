import "./card.scss";

export default function Card({
  children,
  padding = "md",
  hover = false,
  className = "",
}) {
  return (
    <div
      className={`card card-${padding} ${
        hover ? "card-hover" : ""
      } ${className}`}
    >
      {children}
    </div>
  );
}
