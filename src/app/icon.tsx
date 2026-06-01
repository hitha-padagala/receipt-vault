export default function Icon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 64 64"
      fill="none"
    >
      <defs>
        <linearGradient id="iconGrad" x1="10" y1="8" x2="54" y2="56" gradientUnits="userSpaceOnUse">
          <stop stopColor="#4f46e5" />
          <stop offset="1" stopColor="#0ea5e9" />
        </linearGradient>
      </defs>
      <rect x="6" y="6" width="52" height="52" rx="16" fill="url(#iconGrad)" />
      <path
        d="M20 22.5C20 20.567 21.567 19 23.5 19H40.5C42.433 19 44 20.567 44 22.5V43.5C44 45.433 42.433 47 40.5 47H23.5C21.567 47 20 45.433 20 43.5V22.5Z"
        fill="white"
        fillOpacity="0.92"
      />
      <path d="M24 27H40" stroke="#0f172a" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M24 33H38" stroke="#0f172a" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M24 39H34" stroke="#0f172a" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="40" cy="39" r="2.25" fill="#0ea5e9" />
    </svg>
  );
}
