// Datos y lógica del onboarding. Una pregunta por pantalla.
export function fresh(): any {
  return { step: 0, mode: 'flow', picks: 0, a: {
    first: '', name: '', gender: '', age: 10, signers: [], signerNames: '', twoHomes: '', guides: [], phone: '',
    weekday: 60, weekend: 90, timeTouched: false, moments: [], off: '', sleep: '',
    apps: [], customApps: [], appDraft: '', newApps: '', social: '',
    safety: ['datos', 'desconocidos', 'malestar'], extras: [], games: '', supervision: [], breaks: '',
    parentsC: ['tiempos', 'mesa', 'escuchar', 'escondidas', 'flexibles', 'honestidad'],
    kidC: ['respetar', 'cuidar', 'ayuda', 'responsabilidad'], review: '', finalMsg: ''
  } };
}
export function C(cx: any, cy: any, r: any): any { return 'M' + (cx - r) + ' ' + cy + ' a' + r + ' ' + r + ' 0 1 0 ' + (2 * r) + ' 0 a' + r + ' ' + r + ' 0 1 0 ' + (-2 * r) + ' 0 Z '; }
export function R(x: any, y: any, w: any, h: any, r: any): any { return 'M' + (x + r) + ' ' + y + ' h' + (w - 2 * r) + ' a' + r + ' ' + r + ' 0 0 1 ' + r + ' ' + r + ' v' + (h - 2 * r) + ' a' + r + ' ' + r + ' 0 0 1 ' + (-r) + ' ' + r + ' h' + (-(w - 2 * r)) + ' a' + r + ' ' + r + ' 0 0 1 ' + (-r) + ' ' + (-r) + ' v' + (-(h - 2 * r)) + ' a' + r + ' ' + r + ' 0 0 1 ' + r + ' ' + (-r) + ' Z '; }
export function torso(cx: any, w: any): any { return 'M' + (cx - w) + ' 94 c0 -20 ' + (w * 0.45) + ' -30 ' + w + ' -30 c' + (w * 0.55) + ' 0 ' + w + ' 10 ' + w + ' 30 Z '; }
export function ill(k: any): any {
const T = torso;
const I: any = {
first: { w: R(41, 12, 38, 74, 8), a: R(47, 22, 26, 50, 3) + 'M60 12 c-6 -11 -18 -6 -9 1 Z M60 12 c6 -11 18 -6 9 1 Z', l: 'M56 79 h8 M22 30 v10 M17 35 h10 M96 56 v10 M91 61 h10 M53 46 l5 5 9 -10' },
renew: { w: R(41, 12, 38, 74, 8), a: R(47, 22, 26, 50, 3), l: 'M56 79 h8 M53 45 a7 7 0 0 1 12 -5 M67 49 a7 7 0 0 1 -12 5 M65 36 v5 h-5 M55 58 v-5 h5 M20 40 a40 40 0 0 1 14 -20 M100 60 a40 40 0 0 1 -14 20' },
mama: { w: C(60, 40, 14), a: T(60, 24), l: 'M46 40 c-3 14 0 22 -6 27 M74 40 c3 14 0 22 6 27 M46 38 c2 -16 26 -16 28 0 M55 41 h0 M65 41 h0 M56 47 c2 2 6 2 8 0' },
papa: { w: C(60, 40, 14), a: T(60, 24), l: 'M47 34 c4 -12 22 -12 26 0 M50 44 c2 11 18 11 20 0 M55 40 h0 M65 40 h0' },
otro: { w: C(60, 40, 14), a: T(60, 24), l: 'M46 33 h28 M48 32 c0 -14 24 -14 24 0 M74 33 h10 M55 41 h0 M65 41 h0 M56 47 c2 2 6 2 8 0' },
abuelos: { w: C(40, 44, 12) + C(80, 44, 12), a: T(40, 18) + T(80, 18), l: C(35, 44, 3.5) + C(45, 44, 3.5) + C(75, 44, 3.5) + C(85, 44, 3.5) + 'M38.5 44 h3 M78.5 44 h3 M30 36 c3 -8 17 -8 20 0 M70 36 c3 -8 17 -8 20 0' },
cocina: { w: R(12, 62, 96, 30, 2) + R(22, 46, 14, 16, 2), a: R(54, 30, 18, 30, 3), l: 'M12 72 h96 M44 72 v20 M80 72 v20 M36 50 c6 0 6 8 0 8 M63 60 v2 M63 62 c0 6 18 2 22 0 M60 54 h6' },
salon: { w: R(24, 36, 72, 24, 8) + R(14, 54, 92, 28, 6), a: R(46, 46, 28, 10, 3), l: 'M22 82 v8 M98 82 v8 M60 38 v8 M14 62 h92' },
padres: { w: R(8, 40, 10, 44, 2) + R(8, 60, 76, 20, 2) + R(22, 50, 22, 10, 5) + R(88, 58, 24, 22, 2), a: R(93, 42, 14, 16, 3), l: 'M8 84 v6 M84 80 v10 M88 69 h24 M50 60 c10 -6 24 -6 34 0' },
nose: { w: C(60, 50, 30), a: '', l: 'M51 42 c0 -12 18 -14 18 0 c0 8 -9 8 -9 14 ' + C(60, 66, 1.6) },
ubicacion: { w: R(16, 32, 88, 56, 4), a: 'M60 16 c-12 0 -19 9 -19 18 c0 13 19 30 19 30 c0 0 19 -17 19 -30 c0 -9 -7 -18 -19 -18 Z', l: C(60, 34, 6) + 'M44 32 v-0 M40 88 v-56 M80 88 v-56 M16 70 h24 M80 66 h24' },
control: { w: R(40, 10, 40, 80, 8), a: R(47, 26, 26, 14, 7) + R(47, 50, 26, 14, 7), l: C(66, 33, 4) + C(54, 57, 4) + 'M55 81 h10' },
juntos: { w: C(38, 40, 13) + C(82, 40, 13), a: R(49, 56, 22, 34, 4), l: 'M14 94 c0 -18 9 -28 24 -28 M106 94 c0 -18 -9 -28 -24 -28 M56 84 h8 M34 40 h0 M42 40 h0 M78 40 h0 M86 40 h0' },
confianza: { w: '', a: 'M60 86 C 18 60, 20 22, 46 24 C 53 25, 58 30, 60 35 C 62 30, 67 25, 74 24 C 100 22, 102 60, 60 86 Z', l: 'M20 22 v10 M15 27 h10 M100 70 v10 M95 75 h10 M44 38 c-4 2 -6 6 -6 10' },
comidas: { w: C(60, 54, 28), a: C(60, 54, 16), l: 'M20 30 v52 M15 30 v12 c0 5 10 5 10 0 v-12 M100 30 c-8 8 -8 22 0 24 v28' },
deberes: { w: 'M16 34 c15 -7 30 -7 44 2 c14 -9 29 -9 44 -2 v50 c-15 -7 -30 -7 -44 2 c-14 -9 -29 -9 -44 -2 Z', a: 'M86 10 l9 9 -32 32 -12 3 3 -12 Z', l: 'M60 36 v50 M24 48 h24 M24 58 h24 M24 68 h18 M70 64 h22 M70 74 h18' },
familia: { w: 'M22 50 L60 20 L98 50 V90 H22 Z', a: R(52, 62, 16, 28, 2) + 'M60 46 c-3 -5 -11 -2 -7 4 l7 6 l7 -6 c4 -6 -4 -9 -7 -4 Z', l: 'M30 60 h14 v12 h-14 Z M76 60 h14 v12 h-14 Z M14 56 L60 18 L106 56' },
cole: { w: R(32, 28, 56, 62, 14), a: R(40, 58, 40, 24, 6), l: 'M48 28 c0 -16 24 -16 24 0 M40 68 h40 M56 64 v8' },
coche: { w: 'M12 72 v-12 c0 -5 5 -7 10 -8 l12 -18 h48 l14 18 c7 1 12 3 12 8 v12 Z' + C(34, 74, 10) + C(86, 74, 10), a: 'M38 38 h18 v13 h-28 Z M62 38 h17 l10 13 h-27 Z', l: C(34, 74, 3) + C(86, 74, 3) + 'M104 62 h4 M12 62 h4' },
visitas: { w: 'M22 48 h30 v24 c0 9 -6 14 -15 14 c-9 0 -15 -5 -15 -14 Z M68 48 h30 v24 c0 9 -6 14 -15 14 c-9 0 -15 -5 -15 -14 Z', a: 'M60 34 c-4 -7 -14 -3 -9 5 l9 8 l9 -8 c5 -8 -5 -12 -9 -5 Z', l: 'M52 54 c9 0 9 14 0 14 M98 54 c9 0 9 14 0 14 M32 40 c-4 -6 4 -8 0 -14 M80 40 c-4 -6 4 -8 0 -14 M12 92 h96' },
cargado: { w: R(40, 10, 40, 80, 8), a: R(50, 30, 20, 34, 3), l: 'M56 26 h8 M62 36 l-6 10 h8 l-6 10 M55 81 h10' }
};
return I[k] || { w: '', a: '', l: '' };
}

function tx(lang: string | undefined, es: string, en: string): string {
  return lang === 'en' ? en : es;
}
export function fmt(m: any, lang?: string): any {
m = Number(m);
const en = lang === 'en';
if (m < 60) return m + (en ? ' minutes' : ' minutos');
const h = Math.floor(m / 60), r = m % 60;
const hs = h === 1 ? (en ? '1 hour' : '1 hora') : h + (en ? ' hours' : ' horas');
return r ? hs + (en ? ' and ' : ' y ') + r + (en ? ' minutes' : ' minutos') : hs;
}
export function appList(lang?: string): any {
const en = lang === 'en';
return [['whatsapp', 'WhatsApp', 13], ['youtube', en ? 'YouTube (own account)' : 'YouTube (cuenta propia)', 14], ['spotify', 'Spotify', 0], ['maps', 'Google Maps', 0], ['classroom', en ? 'School apps' : 'Apps del cole', 0], ['duolingo', 'Duolingo', 0], ['netflix', en ? 'Netflix or Disney+ (kids profile)' : 'Netflix o Disney+ (perfil infantil)', 0]];
}
export function gameChoice(a: any): string {
  if (a.games === 'no' || a.games === 'algunos') return a.games;
  if ((!a.games || a.games === '') && Array.isArray(a.extras) && a.extras.indexOf('nojuegos') >= 0) return 'no';
  return '';
}
export function steps(a: any, lang?: string): any {
const en = lang === 'en';
const n = a.name || (en ? 'your child' : 'tu peque');
const kid = a.age <= 12;
const tipAge = tx(lang, 'Recomendación para ' + a.age + ' años: ' + (kid ? 'menos de 60 min al día' : 'menos de 2 horas al día') + ', contando cole y deberes (AEP).', 'Recommendation for age ' + a.age + ': ' + (kid ? 'under 60 min a day' : 'under 2 hours a day') + ', including school and homework (AEP).');
const limit = kid ? 60 : 120;
const apps = appList(lang);
const young = apps.filter(o => o[2] && o[2] > a.age && a.apps.indexOf(o[0]) >= 0).map(o => o[1] + (en ? ' (from ' : ' (desde ') + o[2] + ')');
const games = gameChoice(a);
return [
{ id: 'first', reply: a.first === 'first' ? tx(lang, '¡Qué ilusión! Lo vamos a preparar bien 🙂', 'How exciting! We are going to set it up well 🙂') : a.first === 'renew' ? tx(lang, 'Genial. Revisar el pacto también es parte del pacto 🙂', 'Great. Reviewing the pact is part of the pact too 🙂') : '', echo: tx(lang, '¡Hola! Soy Pío.', 'Hi! I am Pío.'), q: tx(lang, '¿Es su primer smartphone?', 'Is this their first smartphone?'), parts: [{ id: 'first', type: 'choice', cards: true, opts: [['first', tx(lang, 'Sí, su primer móvil', 'Yes, their first phone')], ['renew', tx(lang, 'Ya tiene: renovamos el pacto', 'They already have one: we renew the pact')]] }] },
{ id: 'name', reply: a.name ? tx(lang, '¡Hola, ' + a.name + '! 👋', 'Hi, ' + a.name + '! 👋') : '', echo: a.first === 'renew' ? tx(lang, 'Buena idea revisarlo juntos.', 'Good idea to review it together.') : tx(lang, 'Qué momento tan especial.', 'What a special moment.'), q: tx(lang, '¿Cómo se llama tu peque?', 'What is your child called?'), parts: [
{ id: 'name', type: 'text', ph: tx(lang, 'Ej.: Sofía', 'E.g. Sofía'), label: '' }] },
{ id: 'gender', reply: a.gender ? tx(lang, '¡Hola, ' + (a.name || n) + '! 👋 Encantado de conocerte.', 'Hi, ' + (a.name || n) + '! 👋 Lovely to meet you.') : '', echo: '', q: tx(lang, 'Para escribir bien el pacto, ' + n + ' es…', 'So the pact reads well, ' + n + ' is…'), parts: [
{ id: 'gender', type: 'choice', opts: [['nina', tx(lang, 'Niña', 'Girl')], ['nino', tx(lang, 'Niño', 'Boy')], ['neutro', tx(lang, 'Prefiero no decirlo', 'I would rather not say')]] }] },
{ id: 'age', advice: true, echo: '', q: tx(lang, '¿Cuántos años tiene ' + n + '?', 'How old is ' + n + '?'), parts: [{ id: 'age', type: 'stepper', tip: a.age >= 7 ? tipAge : '' }] },
...((Array.isArray(a.guides) ? a.guides : []).length === 0 ? [{ id: 'phone', echo: tx(lang, 'Una cosa más para ayudaros después.', 'One more thing so we can help you later.'), q: tx(lang, '¿Qué móvil va a tener ' + n + '?', 'What phone will ' + n + ' have?'), reply: a.phone === 'iphone' || a.phone === 'android' ? tx(lang, '¡Perfecto! Al final os doy la guía para configurarlo 🙂', 'Perfect! At the end I will give you the guide to set it up 🙂') : (a.phone === 'nose' ? tx(lang, 'Sin problema, os dejo las dos guías.', 'No problem, I will leave you both guides.') : ''), parts: [{ id: 'phone', type: 'choice', cols: 3, opts: [['iphone', 'iPhone'], ['android', 'Android'], ['nose', tx(lang, 'Aún no lo sé', 'Not sure yet')]] }] }] : []),
{ id: 'signers', reply: a.signers.length ? tx(lang, 'Perfecto: lo firmaréis entre ' + (a.signers.length + 1) + ', con ' + n + ' 🙂', 'Perfect: ' + (a.signers.length + 1) + ' of you will sign it, including ' + n + ' 🙂') : '', echo: tx(lang, 'Un pacto se firma entre todos.', 'A pact is signed by everyone.'), q: tx(lang, '¿Quién firma el pacto con ' + n + '?', 'Who signs the pact with ' + n + '?'), parts: [
{ id: 'signers', type: 'multi', cards: true, opts: [['mama', tx(lang, 'Mamá', 'Mom')], ['papa', tx(lang, 'Papá', 'Dad')], ['otro', tx(lang, 'Otro adulto', 'Another adult')], ['abuelos', tx(lang, 'Abuelos', 'Grandparents')]] }] },
{ id: 'twoHomes', reply: a.twoHomes === 'dos' ? tx(lang, 'Las mismas normas en las dos casas 🙂', 'The same rules in both homes 🙂') : (a.twoHomes === 'una' ? tx(lang, 'Un pacto para toda la casa 🙂', 'One pact for the whole home 🙂') : ''), echo: '', q: tx(lang, '¿Vivís en una casa o en dos?', 'Do you live in one home or two?'), parts: [
{ id: 'twoHomes', type: 'choice', optional: true, opts: [['una', tx(lang, 'Una casa', 'One home')], ['dos', tx(lang, 'Dos casas', 'Two homes')]] }] },
{ id: 'time', reply: Number(a.weekday) <= limit ? tx(lang, '¡Bien! Está dentro de lo que recomiendan los pediatras 🙂', 'Nice! That is within what pediatricians recommend 🙂') : '', advice: true, echo: tx(lang, 'Ahora, el tiempo.', 'Now, screen time.'), q: tx(lang, '¿Cuánto tiempo de pantalla al día?', 'How much screen time a day?'), parts: [
{ id: 'weekday', type: 'slider', label: tx(lang, 'Entre semana', 'Weekdays'), tip: tipAge, warn: Number(a.weekday) > limit ? tx(lang, 'Es más de lo que recomiendan los pediatras para su edad. ¿Lo probáis así y lo revisáis en un mes?', 'That is more than pediatricians recommend for their age. Want to try it this way and review it in a month?') : '' },
{ id: 'weekend', type: 'slider', label: tx(lang, '¿Y los fines de semana?', 'And on weekends?') }] },
{ id: 'moments', reply: a.moments.length >= 3 ? tx(lang, '¡Muy buena idea! Menos pantallas, más conversación 🙂', 'Great idea! Fewer screens, more conversation 🙂') : '', echo: tx(lang, 'Hay momentos que son para estar juntos.', 'Some moments are for being together.'), q: tx(lang, '¿Cuándo descansa el móvil?', 'When does the phone rest?'), parts: [
{ id: 'moments', type: 'multi', cards: true, opts: [['comidas', tx(lang, 'Comidas', 'Meals')], ['deberes', tx(lang, 'Deberes', 'Homework')], ['familia', tx(lang, 'Planes en familia', 'Family plans')], ['cole', tx(lang, 'Colegio', 'School')], ['coche', tx(lang, 'En el coche', 'In the car')], ['visitas', tx(lang, 'Visitas', 'Visits')]], tip: tx(lang, 'Las comidas sin pantallas funcionan mejor si los adultos también lo cumplen.', 'Meals without screens work better when adults do it too.') }] },
{ id: 'off', reply: a.off ? tx(lang, 'Apagarlo con tiempo ayuda a descansar 🌙', 'Turning it off with time to spare helps everyone rest 🌙') : '', advice: true, echo: tx(lang, 'Dormir bien es lo primero.', 'Sleeping well comes first.'), q: tx(lang, '¿A qué hora se apaga el móvil?', 'What time does the phone turn off?'), parts: [
{ id: 'off', type: 'choice', cols: 3, opts: [['20:00', '20:00'], ['20:30', '20:30'], ['21:00', '21:00'], ['21:30', '21:30'], ['22:00', '22:00'], ['22:30', '22:30']], tip: tx(lang, 'Apagarlo al menos 1 hora antes de dormir ayuda a descansar mejor.', 'Turning it off at least 1 hour before bed helps you rest better.') }] },
{ id: 'sleep', reply: a.sleep === 'nose' ? tx(lang, 'La AEP aconseja que los dispositivos duerman fuera del dormitorio.', 'The AEP advises that devices sleep outside the bedroom.') : (a.sleep ? tx(lang, 'Así descansa todo el mundo 🌙', 'That way everyone rests 🌙') : ''), advice: true, echo: '', q: tx(lang, '¿Dónde duerme el móvil?', 'Where does the phone sleep?'), parts: [
{ id: 'sleep', type: 'choice', cards: true, opts: [['cocina', tx(lang, 'En la cocina', 'In the kitchen')], ['salon', tx(lang, 'En el salón', 'In the living room')], ['padres', tx(lang, 'Cuarto de adultos', 'Adults\' room')], ['nose', tx(lang, 'Todavía no lo sé', 'I don\'t know yet')]], tip: tx(lang, 'La AEP aconseja que los dispositivos duerman fuera del dormitorio.', 'The AEP advises that devices sleep outside the bedroom.') }] },
{ id: 'apps', reply: (a.apps.length + a.customApps.length) ? tx(lang, '¡Anotado! Siempre podéis cambiarlo más adelante.', 'Noted! You can always change it later.') : '', echo: '', q: tx(lang, '¿Qué apps podrá usar ' + n + '?', 'Which apps can ' + n + ' use?'), helper: tx(lang, 'Elige todas las que quieras o añade otras.', 'Choose as many as you like, or add others.'), parts: [
{ id: 'apps', type: 'multi', cols: 2, opts: apps, custom: true, tip: tx(lang, 'Mejor sin juegos en su primer móvil: suelen ser lo que más tiempo engancha. Si queréis jugar, mejor en un dispositivo compartido de casa y con tiempo pactado.', 'Better without games on their first phone: they are usually what takes the most time. If you want to play, a shared device at home with agreed time works better.'), warn: young.length ? tx(lang, 'Ojo: ' + young.join(', ') + ' tiene una edad mínima oficial mayor que la de ' + n + '. Vosotros decidís, pero conviene saberlo.', 'Heads up: ' + young.join(', ') + ' has an official minimum age higher than ' + n + "'s. You decide, but it helps to know.") : '' },
{ id: 'appDraft', type: 'add', optional: true }] },
{ id: 'games', reply: games === 'no' ? tx(lang, 'Mejor así: los juegos son lo que más engancha 🙂', 'Better that way: games are what takes the most time 🙂') : (games === 'algunos' ? tx(lang, 'Solo los que aprobéis juntos 🙂', 'Only the ones you approve together 🙂') : ''), echo: '', q: tx(lang, '¿Y los juegos?', 'And games?'), parts: [
{ id: 'games', type: 'choice', opts: [['no', tx(lang, 'Sin juegos en el móvil', 'No games on the phone')], ['algunos', tx(lang, 'Solo juegos que aprobemos', 'Only games we approve')]] }] },
{ id: 'newApps', reply: a.newApps === 'hablar' ? tx(lang, '¡Perfecto! Hablarlo antes es la mejor costumbre 🙂', 'Perfect! Talking it through first is the best habit 🙂') : (a.newApps === 'gratis' ? tx(lang, 'Pedir permiso antes de comprar es un buen acuerdo 🙂', 'Asking before buying is a good agreement 🙂') : (a.newApps === 'nocompras' ? tx(lang, 'Sin compras dentro de las apps. ¡Anotado! 🙂', 'No in-app purchases. Noted! 🙂') : '')), advice: true, echo: '', q: tx(lang, '¿Y las apps nuevas y las compras?', 'And new apps and purchases?'), parts: [
{ id: 'newApps', type: 'choice', opts: [['hablar', tx(lang, 'Cualquier app nueva, la hablamos antes', 'Any new app, we talk first')], ['gratis', tx(lang, 'Gratis con permiso; compras, nunca solo', 'Free with permission; purchases, never alone')], ['nocompras', tx(lang, 'Nada de compras en las apps', 'No purchases in apps')]], tip: tx(lang, 'En España, la cuenta propia en redes es desde los 14 años. Hay una ley en debate para subirlo a 16.', 'In Spain, a personal social media account is from age 14. A law under debate would raise that to 16.') }] },
{ id: 'safety', reply: a.safety.indexOf('malestar') >= 0 ? tx(lang, 'Lo más importante: que os lo cuente sin miedo 💛', 'The most important thing: that they can tell you without fear 💛') : '', echo: tx(lang, 'Ahora, cuidarse en internet.', 'Now, staying safe online.'), q: tx(lang, '¿Qué acordáis sobre seguridad?', 'What do you agree about safety?'), parts: [
{ id: 'safety', type: 'multi', opts: [['datos', tx(lang, 'No compartir datos personales', 'Don\'t share personal details')], ['desconocidos', tx(lang, 'No hablar con desconocidos', 'Don\'t talk to strangers')], ['fotos', tx(lang, 'Pedir permiso para fotos de otros', 'Ask before photos of others')], ['claves', tx(lang, 'Contraseñas conocidas en casa', 'Passwords known at home')], ['malestar', tx(lang, 'Si algo le hace sentir mal, lo cuenta', 'If something feels bad, they tell us')]] }] },
{ id: 'supervision', echo: '', q: tx(lang, '¿Cómo vais a acompañar a ' + n + '?', 'How will you stay with ' + n + '?'), parts: [
{ id: 'supervision', type: 'multi', cards: true, opts: [['ubicacion', tx(lang, 'Ubicación compartida', 'Shared location')], ['control', tx(lang, 'Control parental', 'Parental controls')], ['juntos', tx(lang, 'Lo revisamos juntos', 'We review it together')], ['confianza', tx(lang, 'Confianza', 'Trust')], ['cargado', tx(lang, 'Cargado al salir de casa', 'Charged when leaving home')]], tip: tx(lang, 'Funciona mejor si es transparente y lo acordáis con ' + n + '.', 'It works better when it is transparent and you agree it with ' + n + '.') }] },
{ id: 'breaks', reply: a.breaks === 'hablar' ? tx(lang, 'Hablarlo con calma es lo que mejor funciona 🙂', 'Talking it through calmly is what works best 🙂') : (a.breaks === 'menos' ? tx(lang, 'Al día siguiente, menos tiempo. Queda claro 🙂', 'The next day, less time. That is clear 🙂') : (a.breaks === 'pausa' ? tx(lang, 'Un día de descanso para volver a empezar 🙂', 'A day of rest, then a fresh start 🙂') : '')), echo: '', q: tx(lang, 'Si una norma no se cumple…', 'If a rule is not kept…'), parts: [
{ id: 'breaks', type: 'choice', opts: [['hablar', tx(lang, 'Lo hablamos y ajustamos el pacto', 'We talk and adjust the pact')], ['menos', tx(lang, 'Al día siguiente, menos tiempo', 'The next day, less time')], ['pausa', tx(lang, 'Un día de descanso sin móvil', 'A day off the phone')]] }] },
{ id: 'parentsC', reply: a.parentsC.length >= 4 ? tx(lang, '¡Dar ejemplo es lo que mejor funciona! 🙂', 'Setting the example is what works best! 🙂') : '', echo: tx(lang, 'Los adultos también nos comprometemos.', 'Adults commit too.'), q: tx(lang, '¿A qué os comprometéis vosotros?', 'What do you commit to?'), parts: [
{ id: 'parentsC', type: 'multi', opts: [['tiempos', tx(lang, 'Respetar los tiempos acordados', 'Respect the agreed times')], ['mesa', tx(lang, 'Guardar también nuestro móvil', 'Put our phones away too')], ['escuchar', tx(lang, 'Escuchar sin juzgar', 'Listen without judging')], ['escondidas', tx(lang, 'No revisar su móvil a escondidas', 'Don\'t check their phone in secret')], ['flexibles', tx(lang, 'Ser flexibles y ajustar el pacto', 'Be flexible and adjust the pact')], ['honestidad', tx(lang, 'No quitárselo por decir la verdad', 'Don\'t take it away for telling the truth')]] }] },
{ id: 'kidC', reply: a.kidC.length ? tx(lang, '¡Genial, ' + n + '! 🙂', 'Great, ' + n + '! 🙂') : '', kidTurn: true, echo: tx(lang, n + ', ahora te toca a ti.', n + ', now it is your turn.'), q: tx(lang, '¿A qué te comprometes?', 'What do you commit to?'), parts: [
{ id: 'kidC', type: 'multi', opts: [['respetar', tx(lang, 'Respetar tiempos y lugares', 'Respect times and places')], ['cuidar', tx(lang, 'Cuidar el móvil', 'Take care of the phone')], ['ayuda', tx(lang, 'Pedir ayuda si algo me preocupa', 'Ask for help if something worries me')], ['responsabilidad', tx(lang, 'Entender que es una responsabilidad', 'Understand it is a responsibility')]] }] },
];
}
export function buildPdf(a: any, lang?: string): any {
const en = lang === 'en';
const n = a.name || tx(lang, 'Nuestro peque', 'Our child');
const rules: { text: string; emoji: string }[] = [];
rules.push({ text: tx(lang, 'Usaré el móvil como máximo ' + fmt(a.weekday, lang) + ' al día entre semana.', 'I will use the phone for at most ' + fmt(a.weekday, lang) + ' a day on weekdays.'), emoji: '⏱️' });
rules.push({ text: Number(a.weekend) === Number(a.weekday) ? tx(lang, 'Los fines de semana, el mismo tiempo que entre semana.', 'On weekends, the same time as on weekdays.') : tx(lang, 'Los fines de semana, como máximo ' + fmt(a.weekend, lang) + ' al día.', 'On weekends, at most ' + fmt(a.weekend, lang) + ' a day.'), emoji: '📅' });
if (a.twoHomes === 'dos') rules.push({ text: tx(lang, 'Estas normas valen igual en las dos casas.', 'These rules apply the same in both homes.'), emoji: '🏡' });
const mom: any = {
  comidas: tx(lang, 'En las comidas, el móvil se queda fuera de la mesa. También el de los adultos.', 'At meals, the phone stays off the table. The adults\' phones too.'),
  deberes: tx(lang, 'Mientras hago los deberes, el móvil está en silencio y fuera de la vista.', 'While I do homework, the phone is on silent and out of sight.'),
  familia: tx(lang, 'En los planes en familia, todos guardamos el móvil.', 'During family plans, we all put the phone away.'),
  cole: tx(lang, 'En el colegio, el móvil sigue las normas del colegio.', 'At school, the phone follows the school rules.'),
  coche: tx(lang, 'En los trayectos en coche, hablamos o escuchamos música juntos.', 'On car rides, we talk or listen to music together.'),
  visitas: tx(lang, 'Cuando hay visitas, el móvil se guarda.', 'When we have visitors, the phone is put away.'),
};
const momEmoji: any = { comidas: '🍽️', deberes: '📚', familia: '👪', cole: '🏫', coche: '🚗', visitas: '👋' };
a.moments.forEach(m => { if (mom[m]) rules.push({ text: mom[m], emoji: momEmoji[m] }); });
const where: any = {
  cocina: tx(lang, 'cargando en la cocina', 'charging in the kitchen'),
  salon: tx(lang, 'en el salón', 'in the living room'),
  padres: tx(lang, 'en la habitación de los adultos', 'in the adults\' room'),
};
if (a.sleep === 'nose') {
  if (a.off) rules.push({ text: (en ? 'At night, at ' : 'Por la noche, a las ') + a.off + (en ? ', the phone turns off.' : ', el móvil se apaga.'), emoji: '🌙' });
} else if (a.off || a.sleep) rules.push({ text: (en ? 'At night' : 'Por la noche') + (a.off ? (en ? ', at ' : ', a las ') + a.off + ',' : '') + (en ? ' the phone turns off and sleeps ' : ' el móvil se apaga y duerme ') + (where[a.sleep] || tx(lang, 'fuera de mi habitación', 'outside my room')) + '.', emoji: '🌙' });
const names: any = {}; appList(lang).forEach(o => { names[o[0]] = o[1]; });
const appLabels = a.apps.map(x => names[x]).filter(Boolean).concat(a.customApps);
if (appLabels.length) rules.push({ text: tx(lang, 'Apps permitidas: ', 'Allowed apps: ') + appLabels.join(', ') + '.', emoji: '📱' });
const na: any = {
  hablar: tx(lang, 'Cualquier app nueva la hablamos antes de descargarla.', 'We talk about any new app before downloading it.'),
  gratis: tx(lang, 'Puedo descargar apps gratis con permiso; las compras, nunca sin preguntar.', 'I can download free apps with permission; purchases, never without asking.'),
  nocompras: tx(lang, 'No haré compras dentro de las apps.', 'I will not make in-app purchases.'),
};
if (a.newApps) rules.push({ text: na[a.newApps], emoji: '🛍️' });
const pickedGame = gameChoice(a);
const gameLine: any = {
  no: tx(lang, 'En el móvil no hay juegos.', 'There are no games on the phone.'),
  algunos: tx(lang, 'Solo juegos que hayamos aprobado juntos.', 'Only games we have approved together.'),
};
if (gameLine[pickedGame]) rules.push({ text: gameLine[pickedGame], emoji: '🚫' });
const so: any = {
  no: tx(lang, 'Todavía no tendré redes sociales.', 'I will not have social media yet.'),
  '14': tx(lang, 'Hablaremos de las redes sociales cuando cumpla 14 años.', 'We will talk about social media when I turn 14.'),
  si: tx(lang, 'Si uso redes sociales, será con cuenta privada y acompañamiento.', 'If I use social media, it will be with a private account and someone with me.'),
};
if (a.social) rules.push({ text: so[a.social], emoji: '💬' });
const sf: any = {
  datos: tx(lang, 'No compartiré mi dirección, mi colegio ni fotos privadas.', 'I will not share my address, my school, or private photos.'),
  desconocidos: tx(lang, 'No hablaré con personas que no conozco.', 'I will not talk to people I do not know.'),
  fotos: tx(lang, 'Pediré permiso antes de subir fotos de otras personas.', 'I will ask permission before posting photos of other people.'),
  claves: tx(lang, 'Mis contraseñas las conocen en casa.', 'People at home know my passwords.'),
  malestar: tx(lang, 'Si algo en el móvil me hace sentir mal, se lo contaré a mis padres sin miedo.', 'If something on the phone makes me feel bad, I will tell my parents without being afraid.'),
};
const sfEmoji: any = { datos: '🏠', desconocidos: '🚫', fotos: '📷', claves: '🔑', malestar: '💛' };
a.safety.forEach(s => { if (sf[s]) rules.push({ text: sf[s], emoji: sfEmoji[s] }); });
rules.push({ text: tx(lang, 'Un adulto puede hacer excepciones puntuales, por ejemplo escuchar un audiolibro antes de dormir.', 'An adult can make occasional exceptions, for example listening to an audiobook before bed.'), emoji: '🎧' });
const sections: any[] = [{ id: 'rules', title: tx(lang, 'Nuestras normas', 'Our rules'), isList: true, isBox: false, items: rules.map((t, i) => ({ mark: String(i + 1), emoji: t.emoji, text: t.text })) }];
const sup: any = {
  ubicacion: tx(lang, 'Compartimos la ubicación para estar tranquilos.', 'We share location so we can feel at ease.'),
  control: tx(lang, 'Usamos el control parental del móvil, y sabemos cómo está configurado.', 'We use the phone\'s parental controls, and we know how they are set up.'),
  juntos: tx(lang, 'De vez en cuando revisamos el móvil juntos, nunca a escondidas.', 'From time to time we look at the phone together, never in secret.'),
  confianza: tx(lang, 'Nos basamos en la confianza: sin revisiones.', 'We rely on trust: no checks.'),
  cargado: tx(lang, 'Cuando salgo de casa, el móvil va cargado y encendido para que podamos localizarnos.', 'When I leave home, the phone is charged and on so we can find each other.'),
};
const supEmoji: any = { ubicacion: '📍', control: '🛡️', juntos: '👀', confianza: '🤝', cargado: '🔋' };
if (a.supervision.length) sections.push({ title: tx(lang, 'Cómo nos acompañamos', 'How we stay with each other'), isList: true, isBox: false, items: a.supervision.map(s => ({ mark: '—', emoji: supEmoji[s] || '•', text: sup[s] })) });
const br: any = {
  hablar: tx(lang, 'Si una norma no se cumple, lo hablamos con calma y ajustamos el pacto.', 'If a rule is not kept, we talk it through calmly and adjust the pact.'),
  menos: tx(lang, 'Si una norma no se cumple, al día siguiente habrá menos tiempo de móvil.', 'If a rule is not kept, the next day there will be less phone time.'),
  pausa: tx(lang, 'Si una norma no se cumple, el móvil descansa un día.', 'If a rule is not kept, the phone rests for a day.'),
};
if (a.breaks) sections.push({ title: tx(lang, 'Si algo no sale bien', 'If something does not go well'), isList: false, isBox: true, text: br[a.breaks] });
const pc: any = {
  tiempos: tx(lang, 'Respetaremos los tiempos acordados.', 'We will respect the agreed times.'),
  mesa: tx(lang, 'En las comidas y en los planes en familia, también guardaremos el móvil.', 'At meals and during family plans, we will put our phones away too.'),
  escuchar: tx(lang, 'Te escucharemos sin juzgar si nos cuentas algo que viste o viviste en el móvil.', 'We will listen without judging if you tell us something you saw or went through on the phone.'),
  escondidas: tx(lang, 'No revisaremos tu móvil a escondidas. Si hace falta, lo haremos juntos.', 'We will not check your phone in secret. If we need to, we will do it together.'),
  flexibles: tx(lang, 'Seremos flexibles: si algo no funciona, ajustaremos el pacto.', 'We will be flexible: if something does not work, we will adjust the pact.'),
  honestidad: tx(lang, 'Nunca perderás el móvil por contarnos la verdad. La honestidad importa más que la perfección.', 'You will never lose the phone for telling us the truth. Honesty matters more than perfection.'),
};
const pcEmoji: any = { tiempos: '⏳', mesa: '🍽️', escuchar: '👂', escondidas: '🤝', flexibles: '🔄', honestidad: '💛' };
if (a.parentsC.length) sections.push({ title: tx(lang, 'Nos comprometemos', 'We commit'), isList: true, isBox: false, items: a.parentsC.map(c => ({ mark: '✓', emoji: pcEmoji[c] || '💛', text: pc[c] })) });
const kc: any = {
  respetar: tx(lang, 'Respetaré los tiempos y lugares acordados.', 'I will respect the agreed times and places.'),
  cuidar: tx(lang, 'Cuidaré el móvil como algo valioso.', 'I will take care of the phone as something valuable.'),
  ayuda: tx(lang, 'Pediré ayuda si algo me preocupa o no lo entiendo.', 'I will ask for help if something worries me or I do not understand it.'),
  responsabilidad: tx(lang, 'Entiendo que tener móvil es una responsabilidad y un paso importante.', 'I understand that having a phone is a responsibility and an important step.'),
};
const kcEmoji: any = { respetar: '✅', cuidar: '💎', ayuda: '🙋', responsabilidad: '⭐' };
if (a.kidC.length) sections.push({ title: tx(lang, 'Me comprometo', 'I commit'), isList: true, isBox: false, items: a.kidC.map(c => ({ mark: '★', emoji: kcEmoji[c] || '⭐', text: kc[c] })) });
const roles: any = en
  ? { mama: 'Mom', papa: 'Dad', otro: 'Adult', abuelos: 'Grandparent' }
  : { mama: 'Mamá', papa: 'Papá', otro: 'Persona adulta', abuelos: 'Abuela o abuelo' };
const typed = a.signerNames ? a.signerNames.split(/,| y | and /).map(x => x.trim()).filter(Boolean) : [];
const signLabel = en ? 'Signature of ' : 'Firma de ';
const signers = (a.signers.length ? a.signers : ['mama', 'papa']).map((r, i) => ({ name: typed[i] || roles[r], role: signLabel + roles[r].toLowerCase() }));
signers.push({ name: n, role: signLabel + n });
const rv: any = {
  '1m': tx(lang, 'Revisaremos este pacto juntos dentro de un mes, para ajustarlo a lo que vayamos aprendiendo.', 'We will review this pact together in a month, to adjust it to what we learn.'),
  '3m': tx(lang, 'Revisaremos este pacto juntos dentro de tres meses, para ajustarlo a lo que vayamos aprendiendo.', 'We will review this pact together in three months, to adjust it to what we learn.'),
  cumple: tx(lang, 'Revisaremos este pacto juntos cuando ' + n + ' cumpla ' + (a.age + 1) + ' años.', 'We will review this pact together when ' + n + ' turns ' + (a.age + 1) + '.'),
};
const adults = signers.slice(0, -1).map(s => s.name).join(en ? ' and ' : ' y ');
return {
kicker: a.first === 'renew' ? tx(lang, 'RENOVAMOS NUESTRO PACTO DEL MÓVIL', 'WE ARE RENEWING OUR PHONE PACT') : tx(lang, 'PACTO FAMILIAR DEL PRIMER MÓVIL', 'FAMILY PACT FOR THE FIRST PHONE'),
intro: tx(lang,
  'Este pacto es entre ' + n + ' (' + a.age + ' años) y ' + adults + '. ' + (a.first === 'renew' ? 'Ya tenemos experiencia con el móvil, y queremos que siga siendo algo bueno para todos.' : 'Tener un móvil es emocionante, y juntos vamos a aprender a usarlo bien.') + ' Este pacto nos ayuda a cuidarnos y a confiar.',
  'This pact is between ' + n + ' (' + a.age + ' years old) and ' + adults + '. ' + (a.first === 'renew' ? 'We already have experience with the phone, and we want it to keep being something good for everyone.' : 'Having a phone is exciting, and together we are going to learn to use it well.') + ' This pact helps us look after each other and trust each other.'),
sections: sections, signers: signers,
finalMsg: a.finalMsg || tx(lang,
  'Firmamos este pacto porque nos queremos y nos cuidamos. No se trata de controlar, sino de acompañarnos. ' + n + ', confiamos en ti.',
  'We sign this pact because we love each other and look after each other. It is not about control. It is about being there together. ' + n + ', we trust you.'),
review: rv[a.review] || rv['3m'],
foot: tx(lang, 'Recomendaciones basadas en la Asociación Española de Pediatría. Herramienta orientativa: no sustituye el consejo profesional.', 'Recommendations based on the Spanish Association of Pediatrics. A guide only: it does not replace professional advice.')
};
}
export function ageTime(a: any, age: any): any {
const patch: any = { age: age };
if (!a.timeTouched) { const r = age <= 12 ? 60 : 120; patch.weekday = r; patch.weekend = r + 30; }
return patch;
}
export function filledPart(p: any, a: any): any {
const v = a[p.id];
if (p.optional || p.type === 'stepper' || p.type === 'slider') return true;
if (p.type === 'text') return !!(v && v.trim().length);
if (p.type === 'multi') return v.length > 0 || (p.custom && a.customApps.length > 0);
return !!v;
}
