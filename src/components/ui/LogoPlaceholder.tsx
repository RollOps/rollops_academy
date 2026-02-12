interface LogoPlaceholderProps {
  name: string
  color: string
  size?: number
}

export function LogoPlaceholder({ name, color, size = 32 }: LogoPlaceholderProps) {
  const initials = name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()

  return (
    <div
      className="flex shrink-0 items-center justify-center rounded-full font-bold text-white"
      style={{
        backgroundColor: color,
        width: size,
        height: size,
        fontSize: size * 0.4,
      }}
    >
      {initials}
    </div>
  )
}
