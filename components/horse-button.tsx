"use client"

import type React from "react"

interface HorseButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  className?: string
  sparkles?: boolean
}

export function HorseButton({ children, className = "", sparkles = false, ...props }: HorseButtonProps) {
  const baseClasses = `
    western-button-text text-xl
    px-8 py-3 rounded-2xl border-4 border-amber-900
    shadow-[4px_4px_0px_0px_rgba(92,51,23,1)]
    transition-all duration-150 ease-in-out
    hover:shadow-[6px_6px_0px_0px_rgba(92,51,23,1)] hover:translate-x-[-2px] hover:translate-y-[-2px]
    active:shadow-[2px_2px_0px_0px_rgba(92,51,23,1)] active:translate-x-[2px] active:translate-y-[2px]
    relative overflow-hidden group
    bg-gradient-to-br from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600
    text-amber-900 font-black
  `

  return (
    <button className={`${baseClasses} ${className}`} {...props}>
      <span className="relative z-10 drop-shadow-sm">{children}</span>
      {sparkles && (
        <>
          <span className="absolute top-1 left-1 w-2 h-2 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-ping delay-100"></span>
          <span className="absolute bottom-1 right-1 w-3 h-3 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-ping delay-200"></span>
          <span className="absolute top-2 right-3 w-1.5 h-1.5 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-ping delay-300"></span>
        </>
      )}
    </button>
  )
}
