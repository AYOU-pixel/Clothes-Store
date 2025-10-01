// components/UserAvatar.tsx
"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface UserAvatarProps {
  src?: string | null
  name?: string | null
  className?: string
  fallbackClassName?: string
}

export function UserAvatar({ src, name, className, fallbackClassName }: UserAvatarProps) {
  // Get initials from name
  const getInitials = (name?: string | null) => {
    if (!name) return "U"
    
    const parts = name.trim().split(/\s+/)
    if (parts.length === 1) {
      return parts[0].charAt(0).toUpperCase()
    }
    
    return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase()
  }

  const initials = getInitials(name)

  return (
    <Avatar className={className}>
      <AvatarImage src={src || undefined} alt={name || "User"} />
      <AvatarFallback 
        className={fallbackClassName || "bg-gradient-to-br from-gray-700 to-gray-900 text-white font-medium"}
      >
        {initials}
      </AvatarFallback>
    </Avatar>
  )
}