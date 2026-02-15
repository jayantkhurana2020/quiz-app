import "./button.scss";

export default function Button({
  children,
  variant = "primary",
  onClick,
  disabled,
  type = "button",
  fullWidth = false,
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled = {disabled}
      className={`btn btn-${variant} ${fullWidth ? "btn-full" : ""}`}
    >
      {children}
    </button>
  );
}
