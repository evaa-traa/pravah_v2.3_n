import { JSX } from 'solid-js/jsx-runtime';
export const TickIcon = (props: JSX.SvgSVGAttributes<SVGSVGElement> & { color?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke={props.color ?? "currentColor"}
    stroke-width="3"
    stroke-linecap="round"
    stroke-linejoin="round"
    class="flex-shrink-0"
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);