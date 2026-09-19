import type { CSSProperties, ReactNode } from "react";
import { Link, type LinkProps } from "@tanstack/react-router";

const base: CSSProperties = { textDecoration: "none", color: "inherit" };

const AppLink = ({
  style,
  children,
  ...props
}: LinkProps & { style?: CSSProperties; children?: ReactNode }) => (
  <Link {...props} style={{ ...base, ...style }}>
    {children}
  </Link>
);

export { AppLink };
