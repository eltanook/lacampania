"use client"

import { MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

export function WhatsAppButton() {
  const phoneNumber = "5491137850259"
  const message = "Hola! Me interesa conocer más sobre La Campaña."

  const handleClick = () => {
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
    window.open(url, "_blank")
  }

  return (
    <Button
      onClick={handleClick}
      size="icon"
      className="fixed bottom-6 right-6 h-14 w-14 rounded-full bg-accent hover:bg-accent/90 text-accent-foreground shadow-xl hover:shadow-2xl hover:scale-110 transition-all z-50 border-2 border-accent-foreground/20"
    >
      <MessageCircle className="h-6 w-6" />
      <span className="sr-only">Contactar por WhatsApp</span>
    </Button>
  )
}
