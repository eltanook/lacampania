"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Mail, Phone, MapPin, Facebook, Instagram, Twitter, Send } from "lucide-react"
import Image from "next/image"
import toast, { Toaster } from "react-hot-toast"

export default function ContactClientPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    const form = e.currentTarget
    const formData = new FormData(form)

    try {
      await fetch("https://formsubmit.co/ajax/info@lacampania.com.ar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: formData.get("name"),
          email: formData.get("email"),
          subject: formData.get("subject"),
          message: formData.get("message"),
        }),
      })

      toast.success("¡Mensaje enviado correctamente! Te responderemos pronto.", {
        duration: 4000,
        position: "top-center",
      })
      form.reset()
    } catch (error) {
      toast.error("Hubo un error al enviar el mensaje. Por favor, intenta nuevamente.", {
        duration: 4000,
        position: "top-center",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div>
      <Toaster />
      <section className="relative h-[300px] md:h-[400px] flex items-center justify-center">
        <div className="absolute inset-0">
          <Image src="/board-game-contact-support.jpg" alt="Contacto" fill className="object-cover" />
          <div className="absolute inset-0 bg-primary/70" />
        </div>
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold mb-4 font-[family-name:var(--font-playfair)]">
            Contacto
          </h1>
          <p className="text-lg md:text-xl text-white/90">Estamos aquí para ayudarte</p>
        </div>
      </section>

      {/* <CHANGE> Improved mobile responsiveness */}
      <section className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid lg:grid-cols-[2fr_1fr] gap-8 md:gap-12 max-w-6xl mx-auto">
          <div>
            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
              <div className="grid md:grid-cols-2 gap-4 md:gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm md:text-base">
                    Nombre completo *
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="Juan Pérez"
                    required
                    className="rounded-md"
                    disabled={isSubmitting}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm md:text-base">
                    Email *
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="juan@ejemplo.com"
                    required
                    className="rounded-md"
                    disabled={isSubmitting}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="subject" className="text-sm md:text-base">
                  Asunto *
                </Label>
                <Input
                  id="subject"
                  name="subject"
                  placeholder="¿En qué podemos ayudarte?"
                  required
                  className="rounded-md"
                  disabled={isSubmitting}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message" className="text-sm md:text-base">
                  Mensaje *
                </Label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder="Escribe tu mensaje aquí..."
                  rows={8}
                  required
                  className="rounded-md resize-none"
                  disabled={isSubmitting}
                />
              </div>

              <Button type="submit" size="lg" className="w-full rounded-md" disabled={isSubmitting}>
                <Send className="h-5 w-5 mr-2" />
                {isSubmitting ? "Enviando..." : "Enviar Mensaje"}
              </Button>

              <p className="text-xs md:text-sm text-muted-foreground">
                * Campos obligatorios. Tus datos serán tratados de forma confidencial.
              </p>
            </form>
          </div>

          <div>
            <div className="space-y-4 md:space-y-6">
              <div className="bg-card border border-border rounded-lg p-4 md:p-6 space-y-4">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-md bg-primary/10 text-primary">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm md:text-base font-medium text-foreground mb-1">Teléfono</p>
                    <a
                      href="tel:+5491137850259"
                      className="text-sm md:text-base text-muted-foreground hover:text-primary transition-colors"
                    >
                      +54 11 3785-0259
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-md bg-primary/10 text-primary">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm md:text-base font-medium text-foreground mb-1">Email</p>
                    <a
                      href="mailto:info@lacampania.com.ar"
                      className="text-sm md:text-base text-muted-foreground hover:text-primary transition-colors break-all"
                    >
                      info@lacampania.com.ar
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-md bg-primary/10 text-primary">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm md:text-base font-medium text-foreground mb-1">Ubicación</p>
                    <p className="text-sm md:text-base text-muted-foreground">Buenos Aires, Argentina</p>
                  </div>
                </div>
              </div>

              <div className="bg-primary text-primary-foreground rounded-lg p-4 md:p-6 text-center">
                <h3 className="text-base md:text-lg font-semibold mb-2">Seguinos en redes</h3>
                <p className="text-xs md:text-sm opacity-90 mb-4">Conectate con nosotros en nuestras redes sociales</p>
                <div className="flex gap-3 justify-center">
                  <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="h-10 w-10 md:h-12 md:w-12 rounded-md bg-primary-foreground/20 hover:bg-primary-foreground/30 flex items-center justify-center transition-colors"
                  >
                    <Facebook className="h-5 w-5 md:h-6 md:w-6" />
                  </a>
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="h-10 w-10 md:h-12 md:w-12 rounded-md bg-primary-foreground/20 hover:bg-primary-foreground/30 flex items-center justify-center transition-colors"
                  >
                    <Instagram className="h-5 w-5 md:h-6 md:w-6" />
                  </a>
                  <a
                    href="https://twitter.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="h-10 w-10 md:h-12 md:w-12 rounded-md bg-primary-foreground/20 hover:bg-primary-foreground/30 flex items-center justify-center transition-colors"
                  >
                    <Twitter className="h-5 w-5 md:h-6 md:w-6" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 pb-12 md:pb-16">
        <div className="w-full h-[300px] md:h-[450px] rounded-lg overflow-hidden border-2 border-primary/20 shadow-lg">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d210147.47497429356!2d-58.59811852343749!3d-34.61566584999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bcca3b4ef90cbd%3A0xa0b3812e88e88e87!2sBuenos%20Aires%2C%20Argentina!5e0!3m2!1ses!2sar!4v1234567890123!5m2!1ses!2sar"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Ubicación de La Campaña en Buenos Aires"
          />
        </div>
      </section>
    </div>
  )
}
