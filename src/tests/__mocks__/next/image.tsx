import React from "react";

type Props = {
  src: string | { src: string };
  alt: string;
  width?: number;
  height?: number;
  fill?: boolean;
  priority?: boolean;
  className?: string;
  style?: React.CSSProperties;
  sizes?: string;
  quality?: number;
  onLoad?: () => void;
  draggable?: boolean;
  title?: string;
};

export default function Image({ src, alt, onLoad, ...rest }: Props) {
  const resolvedSrc = typeof src === "object" ? src.src : src;
  return (
    <img
      src={resolvedSrc}
      alt={alt}
      {...rest}
      onLoad={onLoad}
      data-testid="next-image"
    />
  );
}
