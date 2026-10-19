# Guía de estilo — "Papel y terracota"

Esta es la guía visual oficial del proyecto. Aplícala de forma estricta: no inventes colores, tipografías, sombras ni efectos que no estén aquí. Si algo no está definido, elige la opción más sobria dentro de este sistema y avísame.

**Concepto:** cálido, editorial y de papel. Como una carta familiar bien impresa o un objeto bonito para pegar en la nevera. Nada de estética SaaS.

---

## 1. Colores

| Token | Hex | Uso |
|---|---|---|
| `--paper` | `#F6F1E9` | Fondo general de la web |
| `--sheet` | `#FFFDF8` | Superficies: tarjetas, paso de la encuesta, hoja del acuerdo |
| `--ink` | `#1E1A16` | Texto principal, botón oscuro, líneas de firma |
| `--ink-soft` | `#5F574E` | Párrafos secundarios (subtítulos) |
| `--muted` | `#6B635A` | Metadatos, etiquetas, pies |
| `--line` | `rgba(30,26,22,0.14)` | Bordes de 1px y separadores |
| `--track` | `#E8DFD1` | Fondo de barras de progreso y sliders |
| `--terracotta` | `#C8553D` | Acento decorativo: subrayado del titular, números de las normas, iconos, foco |
| `--terracotta-strong` | `#B4472F` | Fondo del botón principal y barra de progreso (contraste AA con texto claro) |
| `--terracotta-hover` | `#963A26` | Hover/active del botón principal |
| `--link` | `#A8432D` | Enlaces de texto (hover `#7E2F1E`) |
| `--ochre` | `#F1E3C8` | Fondo de destacados: infotips de fuentes, franja "recomendado", fecha de revisión |
| `--ochre-ink` | `#765419` | Texto e iconos sobre `--ochre` y etiqueta "RECOMENDADO" |
| `--ochre-line` | `#B88A3E` | Borde discontinuo de la franja recomendada |

Reglas:
- **Un solo acento: terracota.** Nada de violeta, azul ni verde en ningún sitio, incluido el acuerdo.
- **Cero degradados.** Ni en botones, textos, iconos ni fondos.
- El texto claro sobre terracota usa siempre `--terracotta-strong`, nunca `--terracotta`, por contraste.
- Todo el texto debe cumplir contraste WCAG AA.

## 2. Tipografía

Google Fonts:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght,SOFT@9..144,400..700,0..100&family=Figtree:wght@400;500;600;700&display=swap" rel="stylesheet">
```

- **Fraunces** (serif, títulos): siempre con `font-variation-settings: 'SOFT' 100` para un aire suave y cálido. Se usa para titulares, títulos de pasos, números grandes, nombre del niño y números de las normas.
- **Figtree** (sans, texto): para todo lo demás: párrafos, botones, inputs, etiquetas. No usar Inter.

Escala (desktop → móvil):

| Rol | Fuente | Tamaño | Peso | Interlineado | Tracking |
|---|---|---|---|---|---|
| Display (hero) | Fraunces | 66px → 40px | 600 | 1.02 | -0.02em |
| H2 sección | Fraunces | 40px → 30px | 600 | 1.1 | -0.01em |
| H3 / pregunta del paso | Fraunces | 28px → 24px | 600 | 1.15 | 0 |
| Número grande (slider) | Fraunces | 52px → 44px | 700 | 1 | 0 |
| Nombre en el acuerdo | Fraunces | 56px → 40px | 700 | 1 | 0 |
| Lead (subtítulo) | Figtree | 19px → 17px | 400 | 1.5 | 0 |
| Cuerpo | Figtree | 16px | 400 | 1.5 | 0 |
| Botón | Figtree | 17px | 600 | 1 | 0 |
| Meta / pie | Figtree | 13–14px | 400 | 1.4 | 0 |
| Etiqueta (eyebrow) | Figtree | 12px | 600 | 1 | 0.14em, MAYÚSCULAS |

## 3. Forma, espacio y profundidad

- **Radios:** 6px (botones, inputs, infotips), 8px (tarjetas). Nunca píldoras ni radios grandes.
- **Bordes:** 1px `--line`. Botón secundario: 1px `rgba(30,26,22,0.35)`.
- **Sombras:** prácticamente ninguna. Como máximo `0 2px 0 rgba(30,26,22,0.06)` en la hoja del acuerdo para que parezca papel.
- **Espaciado:** base de 4px. Separación habitual 12 / 16 / 24 / 28 / 48px. Secciones de la landing con 96–120px de padding vertical en desktop y 64px en móvil.
- **Ancho máximo** del contenido: 1120px. Texto corrido: máximo 640px.
- **Animaciones:** solo transiciones de 150–200ms en hover y foco. Nada de animaciones de entrada al hacer scroll. Respetar `prefers-reduced-motion`.
- **Única animación permitida: la cinta de fuentes, lenta, pausable y desactivada con reduced-motion.**

## 4. Componentes

**Botón principal**
Fondo `--terracotta-strong`, texto `#FFF8EF`, Figtree 17px/600, padding 16px 26px, radio 6px, sin borde ni sombra. Hover `--terracotta-hover`. Foco: anillo de 2px `--terracotta` con 2px de separación.

**Botón secundario**
Fondo transparente, borde 1px `rgba(30,26,22,0.35)`, texto `--ink`, Figtree 17px/500, padding 15px 24px, radio 6px. Hover: fondo `rgba(30,26,22,0.04)`.

**Botón "Siguiente" del onboarding**
Fondo `--ink`, texto `--paper`, Figtree 16px/600, padding 13px 22px, radio 6px. Deshabilitado: opacidad 40%.

**Input de texto**
Fondo `--sheet`, borde 1px `--line`, radio 6px, padding 14px 16px, Figtree 17px. Foco: borde `--terracotta` y anillo de 3px `rgba(200,85,61,0.18)`. Etiqueta visible encima, no solo placeholder.

**Opción seleccionable (checkbox/radio en tarjeta)**
Fondo `--sheet`, borde 1px `--line`, radio 6px, padding 14px 16px. Seleccionada: borde 1.5px `--terracotta` y check en terracota. Sin fondos de color ni emojis; si hace falta icono, de línea fina en `--ink`.

**Barra de progreso**
Altura 4px, fondo `--track`, relleno `--terracotta-strong`, radio 2px. Encima, en 13px `--muted`: "Tu pacto" a la izquierda y "Paso X de Y" a la derecha.

**Slider con franja recomendada**
Pista 6px `--track`. Franja recomendada: rectángulo de 14px de alto con fondo `--ochre` y borde 1px discontinuo `--ochre-line`, con la etiqueta "RECOMENDADO" encima (11px, 600, `--ochre-ink`). Tirador: círculo de 22px en `--terracotta-strong` con borde de 3px `--sheet`. Valores de escala debajo en 12px `--muted`.

**Infotip de fuente**
Fondo `--ochre`, radio 6px, padding 14px 16px, Figtree 14px, icono "i" de línea en `--ochre-ink`. Texto tipo: "Recomendación de la Asociación Española de Pediatría para su edad. Ver fuente · revisado en 2026", con el enlace en `--link`.

**Tarjeta / superficie**
Fondo `--sheet`, borde 1px `--line`, radio 8px, padding 28px. Sin sombra.

**Titular con subrayado a mano**
Una palabra clave del titular (por ejemplo "pacto.") lleva debajo un trazo SVG inline, curvo e irregular, en `--terracotta`, de 4px y con extremos redondeados. Solo uno por página.

**Logotipo provisional**
Círculo de 28px con borde de 2px terracota y una "p" en Fraunces 700 terracota, más el nombre en Figtree 16px/600.

**Iconos**
Lucide de línea, trazo de 1.75px, en `--ink` o `--terracotta`. Nunca emojis como iconos, ni iconos dentro de cuadrados con fondo de color.

## 5. El acuerdo (vista y PDF)

- Hoja `--sheet`, borde 1px `--line`, sombra mínima, padding 40px 48px. En la landing, la vista previa del acuerdo se puede girar -1.2° para que parezca un papel apoyado.
- Arriba: etiqueta "PACTO FAMILIAR DEL PRIMER MÓVIL" en eyebrow; nombre del niño en Fraunces 56px/700 a la izquierda y fecha en 14px `--muted` a la derecha.
- Títulos de sección ("Nuestras normas", "Nos comprometemos", "Me comprometo") en Fraunces 22px/600. Sin emojis.
- Normas numeradas: número en Fraunces 700 `--terracotta` (columna de 18px) y texto en Figtree 16px.
- Fecha de revisión en un recuadro `--ochre`.
- Recuadro vacío con borde discontinuo `--line`: "Espacio para un dibujo o una pegatina de [nombre]".
- Firmas: dos columnas, línea superior de 1.5px `--ink`, y debajo el nombre en 13px `--muted`.
- Pie discreto con la URL en 11px `--muted`.
- El PDF es A4, idéntico a la vista en pantalla, sin cortar bloques entre páginas.

## 6. Prohibido

- Degradados de cualquier tipo.
- Violeta, morado, azul eléctrico o verde.
- Inter, Roboto o Arial.
- Emojis como iconos.
- Sombras grandes y difusas, glassmorphism, blur.
- Píldoras con borde de color tipo "badge".
- Divisores ondulados entre secciones.
- Tarjetas con borde izquierdo de color.
- Iconos dentro de cuadrados de color.
- Fotos de stock o generadas con IA de niños o familias.
- Animaciones de entrada al hacer scroll.
- Cintas u otras animaciones decorativas, salvo la excepción de la cinta de fuentes (lenta, pausable y desactivada con reduced-motion).
