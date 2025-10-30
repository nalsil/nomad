import { LucideIcon } from "lucide-react"

interface FilterInfoItemProps {
  icon: LucideIcon
  label: string
  value: string
}

export function FilterInfoItem({ icon: Icon, label, value }: FilterInfoItemProps) {
  return (
    <div className="flex items-center justify-between py-2 border-b last:border-b-0">
      <div className="flex items-center gap-2 text-muted-foreground text-sm">
        <Icon className="h-4 w-4" />
        <span>{label}</span>
      </div>
      <span className="text-sm font-medium">{value}</span>
    </div>
  )
}
