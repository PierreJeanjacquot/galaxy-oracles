interface Props {
  className?: string;
  width?: number;
  height?: number;
}

export default function Logo({ width, height }: Props) {
  return <img src="/logo.png" alt="Logo" width={width} height={height} />;
}
