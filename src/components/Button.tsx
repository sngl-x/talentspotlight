import React from "react";
import Link from "next/link";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  as?: typeof Link | "button"; // Support `Link` or `button`
  href?: string; // Used when `as` is `Link`
  children: React.ReactNode;
  className?: string; // Additional styling
  variant?: "primary" | "secondary"; // Button variants
}

const Button: React.FC<ButtonProps> = ({
  as = "button",
  href,
  children,
  className = "",
  variant = "primary",
  ...props
}) => {
  const baseClass = "px-4 py-2 rounded transition duration-300 font-nunito";

  const variantClasses = {
    primary: "bg-primary text-secondary hover:bg-secondary hover:text-primary",
    secondary: "bg-secondary text-primary hover:bg-primary hover:text-secondary",
  };

  const combinedClass = `${baseClass} ${variantClasses[variant]} ${className}`;

  if (as === Link) {
    return (
      <Link href={href || "#"} className={combinedClass}>
        {children}
      </Link>
    );
  }

  return (
    <button className={combinedClass} {...props}>
      {children}
    </button>
  );
};

export default Button;
