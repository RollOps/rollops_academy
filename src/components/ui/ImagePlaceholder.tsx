interface ImagePlaceholderProps {
  label?: string
  color: string
  secondaryColor?: string
  height?: string
  className?: string
}

export function ImagePlaceholder({ label = 'Photo', color, secondaryColor, height = '200px', className = '' }: ImagePlaceholderProps) {
  return (
    <div
      className={`flex items-center justify-center rounded-xl ${className}`}
      style={{
        height,
        background: secondaryColor
          ? `linear-gradient(135deg, ${color}33 0%, ${secondaryColor}33 100%)`
          : `${color}22`,
      }}
    >
      <div className="text-center">
        <svg className="mx-auto mb-2 h-8 w-8 opacity-40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0z" />
        </svg>
        <span className="text-xs opacity-40">{label}</span>
      </div>
    </div>
  )
}
