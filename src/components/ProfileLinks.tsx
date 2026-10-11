export const profiles = [
  {
    id: 'linkedin' as const,
    href: 'https://www.linkedin.com/in/donovan-a-83b7ba3a2/',
  },
  {
    id: 'github' as const,
    href: 'https://github.com/Donovan-Nudrak/',
  },
  {
    id: 'portfolio' as const,
    href: 'https://nudrak.dev',
  },
]

export function ProfileIcon({
  id,
  className,
}: {
  id: (typeof profiles)[number]['id']
  className?: string
}) {
  if (id === 'linkedin') {
    return (
      <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
        <path
          fill="currentColor"
          d="M4.7 3.4a1.8 1.8 0 1 0 .02 3.6 1.8 1.8 0 0 0-.02-3.6zM3.1 8.7h3.2V20.7H3.1V8.7zm5.2 0h3.1v1.6h.1c.4-.8 1.5-1.7 3.1-1.7 3.3 0 3.9 2.2 3.9 5v7.1h-3.2v-6.3c0-1.5 0-3.4-2.1-3.4s-2.4 1.6-2.4 3.3v6.4H8.3V8.7z"
        />
      </svg>
    )
  }

  if (id === 'github') {
    return (
      <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
        <path
          fill="currentColor"
          d="M12 2C6.5 2 2 6.6 2 12.3c0 4.5 2.9 8.4 6.9 9.7.5.1.7-.2.7-.5v-1.7c-2.8.6-3.4-1.2-3.4-1.2-.4-1.2-1.1-1.5-1.1-1.5-.9-.6.1-.6.1-.6 1 .1 1.6 1.1 1.6 1.1.9 1.6 2.4 1.1 3 .9.1-.7.4-1.1.6-1.4-2.2-.3-4.6-1.1-4.6-5.1 0-1.1.4-2 1-2.8-.1-.3-.4-1.3.1-2.7 0 0 .8-.3 2.8 1.1a9.4 9.4 0 0 1 5 0c1.9-1.3 2.8-1.1 2.8-1.1.5 1.4.2 2.4.1 2.7.6.7 1 1.6 1 2.8 0 4-2.3 4.8-4.6 5.1.4.3.7 1 .7 1.9v2.8c0 .3.2.6.7.5 4-1.4 6.9-5.2 6.9-9.8C22 6.6 17.5 2 12 2z"
        />
      </svg>
    )
  }

  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <rect
        x="3.5"
        y="4.5"
        width="17"
        height="15"
        rx="1.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <path
        d="M3.5 8.5h17M8 4.5v4"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  )
}
