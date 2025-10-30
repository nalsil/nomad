"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { LucideIcon } from "lucide-react"

interface FilterDropdownProps<T extends string> {
  icon: LucideIcon
  label: string
  options: readonly T[]
  value: T | null
  onChange: (value: T) => void
  size?: "sm" | "default"
  className?: string
}

export function FilterDropdown<T extends string>({
  icon: Icon,
  label,
  options,
  value,
  onChange,
  size = "sm",
  className = ""
}: FilterDropdownProps<T>) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // 외부 클릭 감지하여 드롭다운 닫기
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside)
      return () => {
        document.removeEventListener("mousedown", handleClickOutside)
      }
    }
  }, [isOpen])

  const handleSelect = (option: T) => {
    onChange(option)
    setIsOpen(false)
  }

  return (
    <div ref={dropdownRef} className={`relative ${className}`}>
      <Button
        variant="outline"
        size={size}
        className="gap-2"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Icon className="h-4 w-4" />
        <span>{value || label}</span>
      </Button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-48 bg-background border rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto">
          {options.map((option) => (
            <button
              key={option}
              onClick={() => handleSelect(option)}
              className={`w-full text-left px-4 py-2 text-sm hover:bg-accent transition-colors ${
                value === option ? "bg-accent font-medium" : ""
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
