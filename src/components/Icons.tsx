import type { SVGProps } from 'react'

export type IconName =
  | 'dumbbell'
  | 'barbell'
  | 'heart'
  | 'shield'
  | 'lotus'
  | 'music'
  | 'bolt'
  | 'scale'
  | 'user'
  | 'biceps'
  | 'target'
  | 'clock'
  | 'award'
  | 'mapPin'
  | 'phone'
  | 'mail'
  | 'instagram'
  | 'facebook'
  | 'youtube'
  | 'x'
  | 'whatsapp'
  | 'check'
  | 'chevronRight'
  | 'chevronDown'
  | 'arrowRight'
  | 'arrowUp'
  | 'search'
  | 'menu'
  | 'close'
  | 'globe'
  | 'calendar'
  | 'star'
  | 'droplet'
  | 'car'
  | 'shower'
  | 'lock'
  | 'users'
  | 'play'
  | 'filter'
  | 'info'
  | 'sparkles'
  | 'sun'
  | 'moon'
  | 'quote'
  | 'timer'
  | 'flame'

const PATHS: Record<IconName, string> = {
  dumbbell: 'M6.5 6.5v11M17.5 6.5v11M3 9v6M21 9v6M6.5 12h11',
  barbell: 'M4 9v6M7 6v12M17 6v12M20 9v6M7 12h10',
  heart:
    'M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z',
  shield: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z',
  lotus: 'M12 4c2.8 2.8 2.8 6.6 0 9.4C9.2 10.6 9.2 6.8 12 4zM3.5 12.5c3.4-.4 6 1.6 7.2 4.4-3.4.5-6-1.2-7.2-4.4zM20.5 12.5c-3.4-.4-6 1.6-7.2 4.4 3.4.5 6-1.2 7.2-4.4zM4 19c5 2.4 11 2.4 16 0',
  music: 'M9 18V5l12-2v13M9 18a3 3 0 1 1-6 0 3 3 0 0 1 6 0zM21 16a3 3 0 1 1-6 0 3 3 0 0 1 6 0z',
  bolt: 'M13 2 3 14h9l-1 8 10-12h-9l1-8z',
  scale: 'M4 5h16v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2zM8 9a4 4 0 0 1 8 0',
  user: 'M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M16 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0z',
  biceps: 'M5 19V9a3 3 0 0 1 6 0v3h2.5a4.5 4.5 0 0 1 4.5 4.5V19M8 19v-5',
  target: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM12 17a5 5 0 1 0 0-10 5 5 0 0 0 0 10zM12 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2z',
  clock: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM12 7v5l3 2',
  award: 'M12 15a6 6 0 1 0 0-12 6 6 0 0 0 0 12zM8.2 13.9 7 22l5-3 5 3-1.2-8.1',
  mapPin: 'M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0zM15 10a3 3 0 1 1-6 0 3 3 0 0 1 6 0z',
  phone:
    'M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z',
  mail: 'M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zM22 6l-10 7L2 6',
  instagram: 'M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zM16 11.37a4 4 0 1 1-7.75 1.26 4 4 0 0 1 7.75-1.26zM17.5 6.5h.01',
  facebook: 'M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z',
  youtube: 'M22.54 6.42a2.78 2.78 0 0 0-1.95-2C18.88 4 12 4 12 4s-6.88 0-8.59.42a2.78 2.78 0 0 0-1.95 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.41 19c1.71.42 8.59.42 8.59.42s6.88 0 8.59-.42a2.78 2.78 0 0 0 1.95-1.95 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33zM9.75 15.02V8.48l5.75 3.27z',
  x: 'M18 3h3l-7.5 8.6L22 21h-6.6l-4.6-6-5.3 6H2.5l8-9.2L2 3h6.8l4.2 5.6z',
  whatsapp: 'M21 11.5a8.5 8.5 0 0 1-12.3 7.6L3 21l1.9-5.4A8.5 8.5 0 1 1 21 11.5zM8.5 8.5c0 4 3 7 7 7l1-2-2-1-1 1c-1.5-.5-3-2-3.5-3.5l1-1-1-2z',
  check: 'M20 6 9 17l-5-5',
  chevronRight: 'm9 18 6-6-6-6',
  chevronDown: 'm6 9 6 6 6-6',
  arrowRight: 'M5 12h14M12 5l7 7-7 7',
  arrowUp: 'M12 19V5M5 12l7-7 7 7',
  search: 'M21 21l-4.3-4.3M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16z',
  menu: 'M4 6h16M4 12h16M4 18h16',
  close: 'M18 6 6 18M6 6l12 12',
  globe:
    'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM3 12h18M12 3a15 15 0 0 1 4 9 15 15 0 0 1-4 9 15 15 0 0 1-4-9 15 15 0 0 1 4-9z',
  calendar: 'M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z',
  star: 'M12 17.3 6.2 20.6l1.6-6.6L2.9 9.5l6.8-.6L12 2.7l2.3 6.2 6.8.6-4.9 4.5 1.6 6.6z',
  droplet: 'M12 2.7 6.6 9.3a7 7 0 1 0 10.8 0z',
  car: 'M5 17h14M3 17V9l3-4h12l3 4v8M7 17a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zM17 17a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z',
  shower: 'M9 4h9a2 2 0 0 1 2 2v3M12 3V1.5M7 13l-1 2M11 13l-1 2M15 13l-1 2M19 13l-1 2',
  lock: 'M5 11h14a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2zM8 11V7a4 4 0 0 1 8 0v4',
  users:
    'M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M13 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0zM23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75',
  play: 'M6 4l14 8-14 8z',
  filter: 'M22 3H2l8 9.5V19l4 2v-8.5z',
  info: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM12 16v-5M12 8h.01',
  sparkles: 'M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9zM19 15l.9 2.1L22 18l-2.1.9L19 21l-.9-2.1L16 18l2.1-.9z',
  sun: 'M12 17a5 5 0 1 0 0-10 5 5 0 0 0 0 10zM12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4',
  moon: 'M21 12.8A9 9 0 1 1 11.2 3 7 7 0 0 0 21 12.8z',
  quote: 'M3 21c3.7 0 7-2.6 7-8V5H4v8h4c0 4-2.4 6-5 6v2zM14 21c3.7 0 7-2.6 7-8V5h-6v8h4c0 4-2.4 6-5 6v2z',
  timer: 'M12 21a8 8 0 1 0 0-16 8 8 0 0 0 0 16zM12 9v4l2.5 1.5M9 2h6',
  flame: 'M12 22c4 0 7-2.8 7-7 0-3-2-5.5-3.5-7-.4 2-1.5 3-2.5 3.5.5-3.5-1-7-3-9-1 4-4 6.5-4 11 0 4.5 2.5 8.5 6 8.5z',
}

interface IconProps extends SVGProps<SVGSVGElement> {
  name: IconName
  size?: number
}

export function Icon({ name, size = 24, strokeWidth = 1.6, ...rest }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...rest}
    >
      <path d={PATHS[name]} />
    </svg>
  )
}

/* ------------------------------------------------------------------ */
/* Brand mark                                                          */
/* ------------------------------------------------------------------ */

export function Logo({ size = 40 }: { size?: number }) {
  return (
    <svg
      viewBox="0 0 64 64"
      width={size}
      height={size}
      role="img"
      aria-label="FORGE Fitness Centre"
      className="logo-mark"
    >
      <defs>
        <linearGradient id="forge-g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#FF8A3D" />
          <stop offset="1" stopColor="#FF4A0E" />
        </linearGradient>
      </defs>
      <rect width="64" height="64" rx="18" fill="url(#forge-g)" />
      <g fill="#0A0A0B">
        <rect x="9" y="26" width="4" height="12" rx="2" />
        <rect x="15" y="21" width="6" height="22" rx="2.5" />
        <rect x="43" y="21" width="6" height="22" rx="2.5" />
        <rect x="51" y="26" width="4" height="12" rx="2" />
        <rect x="19" y="30" width="26" height="4" rx="2" />
      </g>
    </svg>
  )
}
