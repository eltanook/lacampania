interface SectionHeaderProps {
  label: string
  title: string
  align?: "left" | "center" | "right"
}

export function SectionHeader({ label, title, align = "left" }: SectionHeaderProps) {
  return (
    <div className={`mb-8 md:mb-12 ${align === "center" ? "text-center" : align === "right" ? "text-right" : ""}`}>
      <p className="text-base font-semibold text-primary-foreground dark:text-foreground bg-primary dark:bg-primary/20 inline-block px-4 py-1.5 rounded-md mb-3">
        {label}
      </p>
      <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-4 text-balance font-[family-name:var(--font-playfair)]">
        {title}
      </h2>
      <hr
        className={`w-24 h-1.5 bg-primary border-0 rounded-full ${align === "right" ? "ml-auto" : align === "center" ? "mx-auto" : ""}`}
      />
    </div>
  )
}
