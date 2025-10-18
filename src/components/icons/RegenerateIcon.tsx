import { JSX } from 'solid-js/jsx-runtime';

export const RegenerateIcon = (props: JSX.SvgSVGAttributes<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    {...props}
  >
    <path d="M21.5 2v6h-6" />
    <path d="M2.5 22v-6h6" />
    <path d="M22 11.5A10 10 0 0 0 12 2C6.477 2 2 6.477 2 12a10 10 0 0 0 10 10c3.087 0 5.917-1.238 8-3.25" />
  </svg>
);