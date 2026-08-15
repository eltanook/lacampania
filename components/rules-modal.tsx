"use client"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Swords, Shield, Users, Target, Trophy, Zap, BookOpen } from "lucide-react"

export function RulesModal() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="inline-flex items-center justify-center gap-2 h-10 px-6 rounded-md bg-accent hover:bg-accent/90 text-accent-foreground font-semibold shadow-md hover:shadow-lg transition-all hover:scale-105 text-sm w-full sm:w-auto">
          <BookOpen className="h-5 w-5" />
          <span className="hidden sm:inline">Ver Reglas Completas</span>
          <span className="sm:hidden">Ver Reglas</span>
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-6xl w-[95vw] max-h-[90vh]">
        <ScrollArea className="h-[80vh] pr-4">
          <div className="mb-4">
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-primary mb-2">
              Reglas del Juego - La Campaña
            </h2>
          </div>
          <div className="space-y-4 md:space-y-6">
            {/* Objetivo del Juego */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Trophy className="h-5 w-5 md:h-6 md:w-6 text-primary" />
                <h3 className="text-base md:text-xl font-bold text-foreground">Objetivo del Juego</h3>
              </div>
              <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                Ser el último jugador en quedar con guerreros en pie o bien ser el primero en construir un castillo en cada batalla. El jugador o el equipo que consiga consagrarse victorioso en al menos 2 de 3 batallas ganará La Campaña.
              </p>
            </div>

            {/* Preparación */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 md:h-6 md:w-6 text-accent" />
                <h3 className="text-base md:text-xl font-bold text-foreground">Preparación</h3>
              </div>
              <ul className="list-disc list-inside space-y-1 text-xs md:text-sm text-muted-foreground">
                <li>Separar los 15 guerreros del resto del mazo</li>
                <li>Mezclar recursos y cartas especiales</li>
                <li>Repartir: 3 guerreros + 4 cartas del mazo general</li>
                <li>Cada jugador baja al menos un guerrero boca abajo y luego se dan vuelta simultáneamente</li>
              </ul>
            </div>

            {/* Estructura del Turno */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Target className="h-5 w-5 md:h-6 md:w-6 text-primary" />
                <h3 className="text-base md:text-xl font-bold text-foreground">Estructura del Turno</h3>
              </div>
              <div className="grid sm:grid-cols-2 gap-2 md:gap-3">
                <div className="bg-card border border-border rounded-lg p-3">
                  <h4 className="text-sm font-semibold text-foreground mb-1">1. Levantar carta</h4>
                  <p className="text-xs text-muted-foreground">
                    Toma una carta del mazo central. Máximo 7 cartas en mano.
                  </p>
                </div>
                <div className="bg-card border border-border rounded-lg p-3">
                  <h4 className="text-sm font-semibold text-foreground mb-1">2. Atacar</h4>
                  <p className="text-xs text-muted-foreground">
                    Usa el recurso correspondiente a tu guerrero. Solo un ataque por turno.
                  </p>
                </div>
                <div className="bg-card border border-border rounded-lg p-3">
                  <h4 className="text-sm font-semibold text-foreground mb-1">3. Sabotaje</h4>
                  <p className="text-xs text-muted-foreground">
                    Con la carta correspondiente un jugador puede robar o espiar.
                  </p>
                </div>
                <div className="bg-card border border-border rounded-lg p-3">
                  <h4 className="text-sm font-semibold text-foreground mb-1">4. Comerciar</h4>
                  <p className="text-xs text-muted-foreground">
                    Comprar cartas con dos monedas de oro o hacer un trueque con el mazo central entregando 3 cartas por una.
                  </p>
                </div>
                <div className="bg-card border border-border rounded-lg p-3">
                  <h4 className="text-sm font-semibold text-foreground mb-1">5. Construir</h4>
                  <p className="text-xs text-muted-foreground">
                    Consigue una reliquia y luego invierte tu oro para levantar tu castillo.
                  </p>
                </div>
                <div className="bg-card border border-border rounded-lg p-3">
                  <h4 className="text-sm font-semibold text-foreground mb-1">Reclutar</h4>
                  <p className="text-xs text-muted-foreground">
                    En cualquier momento de su turno, un jugador puede bajar un guerrero a su campo de batalla o al de un aliado sin superar los 5 guerreros en simultaneo.
                  </p>
                </div>
              </div>
            </div>

            {/* Tipos de Cartas */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Swords className="h-5 w-5 md:h-6 md:w-6 text-accent" />
                <h3 className="text-base md:text-xl font-bold text-foreground">Tipos de Cartas</h3>
              </div>
              <div className="grid sm:grid-cols-2 gap-2 md:gap-3">
                <div className="bg-primary/10 border border-primary/30 rounded-lg p-3">
                  <h4 className="text-sm font-semibold text-primary mb-1">Magos (Pociones)</h4>
                  <p className="text-xs text-muted-foreground">
                    Ventaja sobre Caballeros (daño puro). Daño impuro contra Magos y Arqueros.
                  </p>
                </div>
                <div className="bg-brand-azul/10 border border-brand-azul/30 rounded-lg p-3">
                  <h4 className="text-sm font-semibold text-brand-azul mb-1">Caballeros (Espadas)</h4>
                  <p className="text-xs text-muted-foreground">
                    Ventaja sobre Arqueros (daño puro). Daño impuro contra Caballeros y Magos.
                  </p>
                </div>
                <div className="bg-accent/10 border border-accent/30 rounded-lg p-3">
                  <h4 className="text-sm font-semibold text-accent mb-1">Arqueros (Flechas)</h4>
                  <p className="text-xs text-muted-foreground">
                    Ventaja sobre Magos (daño puro). Daño impuro contra Arqueros y Caballeros.
                  </p>
                </div>
                <div className="bg-brand-dragon/10 border border-brand-dragon/30 rounded-lg p-3">
                  <h4 className="text-sm font-semibold text-brand-dragon mb-1">Dragón</h4>
                  <p className="text-xs text-muted-foreground">
                    Súper guerrero que ataca con cualquier recurso. Solo recibe daño impuro.
                  </p>
                </div>
              </div>
            </div>

            {/* Combate */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 md:h-6 md:w-6 text-primary" />
                <h3 className="text-base md:text-xl font-bold text-foreground">Sistema de Combate</h3>
              </div>
              <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                Cada guerrero tiene 10 vidas. El daño puro se aplica completo (carta a 90°), el daño impuro se reduce a la mitad (carta debajo del guerrero). Los números impares se dividen a la mitad, por ejemplo un 5 es 2,5 de daño impuro. Los guerreros ejecutados van al cementerio.
              </p>
            </div>

            {/* Alianzas */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Zap className="h-5 w-5 md:h-6 md:w-6 text-accent" />
                <h3 className="text-base md:text-xl font-bold text-foreground">Alianzas Temporales</h3>
              </div>
              <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                En partidas de 4 jugadores se juega en parejas. Los aliados pueden enviar refuerzos entre sí y construir el mismo castillo. Las alianzas estratégicas son clave para la victoria.
              </p>
            </div>

            {/* Victoria */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Trophy className="h-5 w-5 md:h-6 md:w-6 text-primary" />
                <h3 className="text-base md:text-xl font-bold text-foreground">Condiciones de Victoria</h3>
              </div>
              <ul className="list-disc list-inside space-y-1 text-xs md:text-sm text-muted-foreground">
                <li>Ser el último jugador con guerreros en pie</li>
                <li>Construir un castillo completo (25 monedas en 2-3-5 jugadores, 30 en 4 jugadores)</li>
                <li>Ganar 2 de 3 batallas para consagrarse campeón de La Campaña</li>
              </ul>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}
