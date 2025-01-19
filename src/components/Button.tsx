import React from "react";
import Link from "next/link";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  as?: typeof Link | "button"; // Support `Link` or `button`
  href?: string; // Used when `as` is `Link`
  children: React.ReactNode;
  className?: string; // Additional styling
  variant?: "primary" | "secondary"; // DPA-specific variants
}

const Button: React.FC<ButtonProps> = ({
  as = "button",
  href,
  children,
  className = "",
  variant = "primary", // Default to primary (DPA green)
  ...props
}) => {
  const baseClass = "px-4 py-2 rounded transition duration-300";

  const variantClasses = {
    primary: "bg-[#29AFCA] text-white hover:bg-[#2497AF]", // DPA Blue
    secondary: "bg-[#E3FF00] text-gray-900 hover:bg-[#C5E500]", // DPA Green
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
