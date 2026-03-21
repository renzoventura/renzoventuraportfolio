import React from "react";

type Props = {
  href: string;
  children: React.ReactNode;
  className?: string;
  "aria-label"?: string;
};

export default function Link({ href, children, ...rest }: Props) {
  return (
    <a href={href} {...rest}>
      {children}
    </a>
  );
}
