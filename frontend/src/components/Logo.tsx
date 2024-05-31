interface Props {
  className?: string;
  width?: number;
  height?: number;
}

export default function Logo({ className, width, height }: Props) {
  return (
    <svg
      className={className}
      width={width}
      height={height}
      viewBox="0 0 393 62"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M20.88 0.559998H61.84V21.04H41.36V62H0.4V41.52H20.88C20.88 31.408 20.88 10.8 20.88 0.559998ZM136.09 62C122.65 62 87.578 62 74.65 62V0.559998H95.13V21.04H115.61V0.559998H136.09V62ZM169.38 62H148.9V21.04H169.38V62ZM189.86 21.04H169.38V0.559998H189.86V21.04ZM210.34 62H189.86V21.04H210.34V62ZM264.11 21.04H284.59V62H223.15V0.559998H243.63V41.52H264.11V21.04ZM338.36 21.04H358.84V62H297.4V0.559998H317.88V41.52H338.36V21.04ZM371.65 0.559998H392.13V62H371.65C371.65 48.944 371.65 14.256 371.65 0.559998Z"
        fill="currentColor"
      />
    </svg>
  );
}
