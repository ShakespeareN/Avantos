import "./Button.css";

interface ButtonProps {
  label: string;
  onClick: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
  className?: string;
}

export default function MainButton({
  label,
  onClick,
  type = "button",
  disabled = false,
  className = "",
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`main-button ${className}`}
    >
      {label}
    </button>
  );
}
