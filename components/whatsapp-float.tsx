"use client"

import { FaWhatsapp } from "react-icons/fa"

export function WhatsAppFloat() {
  return (
    <a
      href="https://wa.me/5491137850259?text=Hola!%20Me%20gustaría%20hacer%20una%20consulta"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex items-center justify-center h-12 w-12 sm:h-14 sm:w-14 rounded-full bg-primary shadow-lg hover:shadow-xl transition-all hover:scale-110"
      aria-label="Contactar por WhatsApp"
    >
      <FaWhatsapp className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
    </a>
  )
}
