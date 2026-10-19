# Movilnido v4 — instrucciones para Cursor

Este paquete tiene todo lo necesario para que Cursor pase a la web real el diseño **V4 · Ilustrada y animada**, el **onboarding conversacional con Pío** y el **PDF del pacto**.

## Cómo usarlo (para Luli)

1. En tu proyecto, crea la carpeta `docs/referencia-v4/` y copia dentro:
   - `Landing4.dc.html`
   - `Onboarding4.dc.html`
   - `ESTILO.md`
   - este archivo, `CURSOR-V4.md`
2. Abre Cursor en modo **Agent** y pega los prompts **de uno en uno**, en orden: Fase 1, Fase 2 y Fase 3. No pases a la siguiente fase hasta revisar la anterior en el navegador (`npm run dev`).
3. Si Cursor se salta algo, pégale la lista de comprobación de esa fase y pídele: "Revisa esta lista punto por punto y arregla lo que falte."

---

## Antes de empezar: cómo leer los archivos de referencia

Los archivos `.dc.html` son prototipos hechos en un canvas de diseño. **No hay que copiarlos tal cual**: hay que traducirlos a componentes React y Tailwind del proyecto. La sintaxis se traduce así:

| En el prototipo | En React |
|---|---|
| `{{variable}}` | `{variable}` |
| `<sc-if value="{{cond}}">…</sc-if>` | `{cond && (…)}` |
| `<sc-for list="{{items}}" as="x">…</sc-for>` | `{items.map(x => …)}` |
| `onClick="{{handler}}"` | `onClick={handler}` |
| `class Component extends DCLogic` con `state`, `setState` y `renderVals()` | Un componente con `useState`. Lo que devuelve `renderVals()` son valores derivados del estado. |
| `<helmet>` con `<style>` | Las `@keyframes` y clases van al CSS global (`index.css`). Los colores y fuentes, a `tailwind.config`. |
| `<a href="X.dc.html">` | Rutas de la app: Landing4 → `/`, Onboarding4 → `/crear`. |

Los textos, las ilustraciones SVG y las animaciones de los prototipos son **definitivos**: cópialos literalmente.

---

## FASE 1 — Prompt para la landing

```
Lee docs/referencia-v4/CURSOR-V4.md (sección "Antes de empezar"), docs/referencia-v4/ESTILO.md y docs/referencia-v4/Landing4.dc.html.

Quiero que la página de inicio (/) sea EXACTAMENTE la landing de Landing4.dc.html, traducida a React + Tailwind dentro de este proyecto. Sustituye la landing actual; no mezcles diseños.

Requisitos:
1. Estilo "Papel y terracota" de ESTILO.md:
   - Colores: papel #F6F1E9, hoja #FFFDF8, tinta #1E1A16, terracota #C8553D, terracota fuerte #B4472F, ocre #F1E3C8, texto ocre #765419.
   - Fuentes: Fraunces (con SOFT 100) para los titulares y Figtree para el texto, cargadas desde Google Fonts. Defínelos como tokens en tailwind.config.
2. Secciones, en este orden y con los textos literales del archivo:
   1. Hero: "Antes del primer móvil, un buen pacto.", con su ilustración animada y el CTA "Crear nuestro pacto gratis" junto a Pío pequeño y la línea "Os guía Pío, nuestro ayudante · 5 minutos · sin registro".
   2. "Conoce a Pío".
   3. "Todo lo que necesitas. Gratis.": 3 tarjetas blancas con ilustración (Pacto familiar, Guía para iPhone, Guía para Android).
      - Cada tarjeta lleva un checkbox arriba a la izquierda. El Pacto viene marcado por defecto.
      - Debajo, una línea que resume la selección. Copia la lógica de pacto/iphone/android y bundleText del archivo.
   4. "Cómo funciona".
   5. Ilustración de la mesa de la cocina con el texto "POR QUÉ UN PACTO / No se trata de controlar. Se trata de acompañar." y el párrafo que lo acompaña.
   6. Testimonios ("Lo que dicen las familias"). Son textos de ejemplo; déjalos marcados con un comentario TODO.
   7. FAQ "Lo que suelen preguntarnos":
      - Acordeón con las 7 preguntas, en el que solo hay una abierta a la vez.
      - Debajo, el enlace mailto:feedback@myfirstphoneagreement.com con el texto "Escríbele a Pío".
   8. CTA final "Pío os está esperando." y footer.
3. Ilustraciones:
   - Copia los SVG inline tal cual. Pon cada ilustración en su propio componente dentro de src/components/illustrations/.
   - No las sustituyas por iconos de librerías ni por imágenes.
4. Animaciones:
   - Copia las @keyframes del <style>: drift, bob, flap, sway, glow, blink, spin, toggle, write, pop, steam, hop, y sus clases .a-*.
   - Todas se desactivan con @media (prefers-reduced-motion: reduce).
5. Todos los CTA "Crear nuestro pacto gratis" llevan a /crear.
6. Responsive: móvil (360px), tablet (768px) y escritorio (1440px), sin scroll horizontal y con al menos 16px de margen lateral en móvil.
7. No uses componentes de shadcn con su estilo por defecto en la landing. Todo debe seguir ESTILO.md.

Cuando acabes, enséñame la lista de componentes creados y qué archivos has borrado o sustituido.
```

### Comprobación de la Fase 1
- [ ] Fondo papel, titulares en Fraunces y texto en Figtree. No quedan restos de los colores de Lovable (verde o morado).
- [ ] Las 8 secciones están en orden y con los textos exactos.
- [ ] Las ilustraciones se mueven (nubes, Pío, interruptores, reloj…) y se paran con "reducir movimiento" activado.
- [ ] En las 3 tarjetas de producto los checkboxes funcionan y la línea de resumen cambia.
- [ ] En el FAQ se abre una pregunta y se cierra la anterior.
- [ ] Todos los CTA llevan a /crear.
- [ ] Se ve bien a 360px, 768px y 1440px.

---

## FASE 2 — Prompt para el onboarding con Pío

```
Lee docs/referencia-v4/CURSOR-V4.md y docs/referencia-v4/Onboarding4.dc.html.

Crea la ruta /crear con el onboarding conversacional de Onboarding4.dc.html, al estilo Lemonade: una pregunta por pantalla y Pío como guía. Sustituye el formulario o encuesta actual.

LÓGICA
- Copia la clase Component del archivo a un hook useOnboarding() (o a un reducer):
  - Copia literalmente fresh(), steps(a), buildPdf(a), fmt(), appList() e ill(): textos, opciones, edades mínimas, tips y respuestas de Pío.
  - Los datos de las respuestas viven en un solo objeto `a`.
- Son 14 pasos. Cada paso tiene una o varias "parts" (preguntas dentro de la misma pantalla). Tipos de part:
  - choice: una opción.
  - multi: varias opciones.
  - text: campo de texto.
  - add: campo con botón "+ Añadir" para escribir una app propia, que se añade a customApps.
  - stepper: edad con botones − y +.
  - slider: minutos de 15 a 180, de 15 en 15.
- Las parts con `cards: true` se muestran como tarjetas ilustradas. El resto, como filas.
- SIGUIENTE está desactivado hasta que todas las parts obligatorias tienen respuesta (ver filledPart).
- Si la edad es menor de 7, se muestra la pantalla de parada ("Para su edad, todavía es pronto.").
- Al terminar, se muestra la pantalla final con la vista previa del pacto (fase 3).
- Al cambiar la edad, si no se ha tocado el slider, el tiempo recomendado se ajusta solo (ageTime).
- Guarda el progreso en sessionStorage para que no se pierda al recargar. Nada se envía a ningún servidor.

DISEÑO (copiar del archivo)
- Siempre cabe en una pantalla:
  - El contenedor ocupa 100dvh, en tres zonas: cabecera, zona central con scroll propio y pie fijo.
  - El pie fijo lleva "‹ Anterior" y SIGUIENTE, y respeta env(safe-area-inset-bottom).
  - Los botones nunca se salen de la pantalla.
- Cabecera: flecha atrás, logo "Movilnido" (enlace a /), contador "6 de 14" y botón de reiniciar.
- Debajo, una línea fina gris que cruza la pantalla y se rellena de terracota según el progreso. Pío va en un círculo crema centrado encima de la línea, como el avatar de Maya en Lemonade.
- Pío tiene 4 expresiones según el paso: normal, consejo (con gafas), preocupado (cuando hay un aviso) y "habla con el niño". Copia los 4 SVG.
- La pregunta es un titular grande en Fraunces 400, centrado, con la frase de Pío delante en la misma línea. Por ejemplo: "Un pacto se firma entre todos. ¿Quién firma el pacto con Sofía?"
- Filas:
  - Fondo #F6F1E9, sin borde y con radio de 6px.
  - El texto corto (hasta 30 caracteres) va en mayúsculas.
  - Radio grande de 32px, que al elegirlo muestra un punto terracota con un pequeño rebote.
  - En las de opción múltiple, un checkbox que se rellena de terracota con un ✓ blanco.
- Tarjetas ilustradas:
  - SVG de línea; la parte de acento pasa de #EFE8DD a #C8553D al elegirla, con animación "pop".
  - Debajo, la etiqueta en mayúsculas y el radio o checkbox.
  - Las usan estos pasos: primer móvil o renovar, quién firma, momentos sin móvil, dónde duerme el móvil y cómo acompañáis.
- Tips: una línea con una bombilla y texto terracota debajo de la part, como en la referencia "💡 Recomendación para 10 años: 60 min/día".
- Burbuja de Pío:
  - Al responder, aparece debajo un mini Pío con una burbuja de chat. El texto es el `reply` de cada paso.
  - Si hay un aviso (apps por debajo de la edad mínima, o tiempo por encima del recomendado), la burbuja sale en rosado #FBEDE8 con el texto del aviso.
- SIGUIENTE: terracota #C8553D con sombra brillante cuando está activo y gris #EDE6DB cuando está desactivado.

ANIMACIONES (copiar las @keyframes del archivo)
- Al cambiar de paso: Pío da un saltito (hop), la pregunta sube con un fundido (q) y las opciones entran escalonadas, con 60ms de retraso entre cada una (o).
- Al elegir: el punto o el ✓ aparece con rebote (dot), la ilustración hace "pop" y la burbuja entra deslizando (b).
- Todo se desactiva con prefers-reduced-motion.

RESPONSIVE
- Escritorio:
  - Titular de hasta 42px y tarjetas de unos 156px.
  - Si la pantalla es baja (max-height 780px), se compacta: Pío más pequeño y menos espacio.
- Móvil (hasta 640px):
  - Pío a 72px.
  - Las tarjetas van de 3 en 3.
  - Las filas en 2 columnas pasan a 1 columna.
  - El botón "Anterior" se queda solo con la flecha.
- Usa clamp() como en el archivo (clases .h1q, .card, .bignum, .g1/.g2/.g3).

ACCESIBILIDAD
- Las opciones son <button> con aria-pressed.
- Los grupos llevan role="group" y aria-label.
- Los inputs tienen aria-label.
- El foco debe ser visible.
- Las tarjetas y las filas se pueden usar con el teclado.
```

### Los 14 pasos (para revisar)
1. **¿Es su primer smartphone?** Tarjetas: "Sí, su primer móvil" o "Ya tiene: renovamos el pacto".
2. **¿Cómo se llama tu peque?** Nombre, y niña, niño o prefiero no decirlo.
3. **Edad.** Stepper con el tip de recomendación de la AEP según la edad. Si es menor de 7, pantalla de parada.
4. **Quién firma.** Tarjetas (Mamá, Papá, Otro adulto, Abuelos) y vuestros nombres (opcional).
5. **Tiempo de pantalla.** Dos sliders (entre semana y fin de semana), un tip, y un aviso si se supera lo recomendado.
6. **Momentos sin móvil.** Tarjetas: comidas, deberes, planes en familia, colegio, coche y visitas.
7. **Por la noche.** Hora de apagado (6 opciones) y dónde duerme el móvil (tarjetas), cada una con su tip.
8. **Apps.**
   - 11 apps sin juegos: WhatsApp, YouTube Kids, YouTube, Spotify, Maps, Classroom, Duolingo, Netflix/Disney+, Instagram, TikTok y Snapchat.
   - Etiqueta "Desde X años" cuando la edad mínima supera la del niño.
   - Opción "+ Añadir" para escribir otras apps.
   - Tip: "Mejor sin juegos en su primer móvil…".
9. **¿Y las apps nuevas y las compras?** Con el tip sobre las redes (14 años en España, ley en debate para 16).
10. **Seguridad.** 5 opciones.
11. **Acompañamiento.** Tarjetas (ubicación, control parental, revisarlo juntos, confianza) y qué pasa si una norma no se cumple.
12. **Compromisos de los adultos.** 6 opciones, marcadas por defecto.
13. **Compromisos del niño**, con el mensaje "ahora te toca a ti". 4 opciones.
14. **Para terminar.** Cuándo revisaréis el pacto y un mensaje final (opcional).

### Comprobación de la Fase 2
- [ ] Son 14 pasos y el contador lo dice bien.
- [ ] SIGUIENTE se desactiva hasta responder.
- [ ] "Anterior" funciona y no se pierden las respuestas.
- [ ] En un iPhone SE (375×667) SIGUIENTE siempre se ve, también en el paso de las apps.
- [ ] Las tarjetas se colorean al elegirlas.
- [ ] La burbuja de Pío aparece al responder.
- [ ] Al poner edad 10 y marcar Instagram aparece "Desde 13 años" y el aviso rosado.
- [ ] Una app añadida a mano aparece marcada y se puede quitar.
- [ ] Con edad 5 se muestra la pantalla de parada, y "Cambiar la edad" vuelve al paso 3.
- [ ] Al recargar la página no se pierde el progreso.

---

## FASE 3 — Prompt para el PDF del pacto

```
Lee la sección isDone de docs/referencia-v4/Onboarding4.dc.html y la función buildPdf(a).

1. Pantalla final (/crear, al terminar):
   - Pío celebrando y el título "¡El pacto de {nombre} está listo!".
   - Botones "Descargar PDF" y "Cambiar respuestas" (vuelve al paso 1 sin borrar las respuestas).
   - Debajo, la vista previa del pacto como una hoja blanca. Es exactamente el mismo contenido que el PDF.

2. PDF en A4, generado en el navegador (sin servidor). Usa @react-pdf/renderer para que el texto sea seleccionable y nítido. Si ya hay una librería de PDF en el proyecto, dime cuál y la usamos.
   Contenido, en este orden y con los textos de buildPdf():
   a. Kicker: "PACTO FAMILIAR DEL PRIMER MÓVIL", o "RENOVAMOS NUESTRO PACTO DEL MÓVIL" si es una renovación.
   b. Nombre del niño grande en Fraunces 700, con Pío a la derecha. Debajo, una línea negra.
   c. Introducción: "Este pacto es entre {nombre} ({edad} años) y {firmantes}…".
   d. "Nuestras normas": lista numerada en terracota. Incluye tiempo entre semana y fin de semana, momentos sin móvil, la noche (hora y dónde duerme), apps permitidas (incluidas las añadidas a mano), apps nuevas y compras, y seguridad.
   e. "Cómo nos acompañamos": lista con guiones.
   f. "Si algo no sale bien": recuadro ocre (#F7EEDC).
   g. "Nos comprometemos" (adultos), con ✓.
   h. "Me comprometo" (niño), con ★.
   i. Mensaje final en cursiva, con una línea terracota a la izquierda.
   j. Recuadro ocre con cuándo revisaréis el pacto.
   k. Firmas: una línea por cada firmante con su nombre y rol, y la última es la del niño. Los nombres salen de lo escrito en el paso 4; si está vacío, se usa Mamá, Papá…
   l. Pie: "Recomendaciones basadas en la Asociación Española de Pediatría. Herramienta orientativa: no sustituye el consejo profesional." y "movilnido.com".
   NO incluir: fecha, hueco para dibujo o pegatina, ni la norma del niño.

3. Estilo del PDF:
   - Fondo blanco y márgenes de unos 18mm.
   - Fraunces para los títulos y Figtree para el texto. Registra las fuentes en react-pdf.
   - Colores de ESTILO.md.
   - Si no cabe en una página, salta a una segunda sin cortar una sección por la mitad. Las firmas nunca van solas en una página.

4. Nombre del archivo: pacto-movil-{nombre}.pdf (en minúsculas, sin tildes).
```

### Comprobación de la Fase 3
- [ ] La vista previa y el PDF muestran el mismo contenido.
- [ ] Todas las respuestas del onboarding aparecen en el PDF.
- [ ] Sin fecha y sin hueco para el dibujo.
- [ ] Las firmas llevan los nombres escritos.
- [ ] Imprime bien en A4 en blanco y negro (los recuadros ocre siguen siendo legibles).
- [ ] El archivo se llama pacto-movil-sofia.pdf.

---

## Si algo sale mal en Cursor

- **Si mezcla estilos viejos y nuevos:** "Elimina todo lo que no esté en Landing4.dc.html / Onboarding4.dc.html. No conserves componentes de la versión anterior."
- **Si inventa textos:** "Usa exactamente los textos de los archivos de referencia; no los reescribas."
- **Si cambia las ilustraciones por iconos:** "Usa los SVG inline del archivo; no uses lucide ni imágenes."
- **Si los botones se salen de la pantalla en el móvil:** "Revisa la estructura: el contenedor de 100dvh con flex en columna, el main con flex:1, min-height:0 y overflow-y:auto, y el footer con flex:none."
