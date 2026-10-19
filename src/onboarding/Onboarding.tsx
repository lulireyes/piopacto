// Onboarding conversacional con Pío (14 pasos) + vista previa del pacto.
// Traducción directa del prototipo Onboarding4. Ruta sugerida: /crear
import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties, type PointerEvent as ReactPointerEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './onboarding.css';
import BrandMark, { PactSeal } from '@/components/BrandMark';
import LanguageSelector from '@/components/LanguageSelector';
import { useLanguage } from '@/contexts/LanguageContext';
import { fresh, steps as buildSteps, buildPdf, ill, ageTime, filledPart } from './onboardingData';

const STORE = 'movilnido-onboarding-v4';
const STORE_SAVED = 'movilnido-onboarding-saved-v4';
const DEFAULT_LOOK = { color: 'terracota', type: 'editorial', marks: 'icon' };

function guidesFromSearch(): string[] | null {
  const params = new URLSearchParams(window.location.search);
  if (!params.has('guias')) return null;
  const ok = ['iphone', 'android'];
  const out: string[] = [];
  (params.get('guias') || '').split(',').forEach((part) => {
    const id = part.trim();
    if (ok.indexOf(id) >= 0 && out.indexOf(id) < 0) out.push(id);
  });
  return out;
}

function normalizeSt(st: any): any {
  if (!st || !st.a) st = fresh();
  if (!Array.isArray(st.a.guides)) st.a.guides = [];
  if (typeof st.a.phone !== 'string') st.a.phone = '';
  if (typeof st.a.twoHomes !== 'string') st.a.twoHomes = '';
  if (!Array.isArray(st.a.extras)) st.a.extras = [];
  if (typeof st.a.games !== 'string') st.a.games = '';
  if (!st.a.games && st.a.extras.indexOf('nojuegos') >= 0) st.a.games = 'no';
  const fromUrl = guidesFromSearch();
  if (fromUrl !== null) st.a.guides = fromUrl;
  return st;
}

function parseBundle(raw: string | null): any {
  if (!raw) return null;
  const parsed = JSON.parse(raw);
  if (!parsed) return null;
  if (parsed.st) return parsed;
  if (parsed.a) return { st: parsed };
  return null;
}

function loadBundle(): any {
  let bundle: any = null;
  // Prefer this session so a leftover saved draft cannot jump the user ahead.
  try { bundle = parseBundle(sessionStorage.getItem(STORE)); } catch (e) { /* ignorar */ }
  if (!bundle) {
    try { bundle = parseBundle(localStorage.getItem(STORE_SAVED)); } catch (e) { /* ignorar */ }
  }
  const st = normalizeSt(bundle?.st || fresh());
  const listLen = buildSteps(st.a).length;
  if (typeof st.step !== 'number' || st.step < 0) st.step = 0;
  if (st.step > listLen - 1) st.step = Math.max(0, listLen - 1);
  if (st.mode !== 'flow' && st.mode !== 'stop' && st.mode !== 'done') st.mode = 'flow';
  return {
    st,
    look: bundle?.look || DEFAULT_LOOK,
    edits: bundle?.edits || {},
    signs: bundle?.signs || {},
    extraRules: Array.isArray(bundle?.extraRules) ? bundle.extraRules : [],
  };
}

function clearAllStores() {
  try { sessionStorage.removeItem(STORE); } catch (e) { /* ignorar */ }
  try { localStorage.removeItem(STORE_SAVED); } catch (e) { /* ignorar */ }
}

/* ---------- Pío ---------- */
const PioNormal = ({ size = 72, label = 'Pío' }: { size?: number; label?: string }) => (
  <svg role="img" aria-label={label} width={size} height={size} viewBox="0 0 64 64"><path d="M28 13 q2 -6 6 -2" fill="none" stroke="#1E1A16" strokeWidth="1.6" strokeLinecap="round" /><circle cx="32" cy="34" r="20" fill="#C8553D" /><ellipse cx="32" cy="41" rx="11" ry="9" fill="#F1E3C8" /><circle cx="26" cy="28" r="2.8" fill="#1E1A16" /><circle cx="38" cy="28" r="2.8" fill="#1E1A16" /><circle cx="26.9" cy="27.1" r="0.9" fill="#FFFDF8" /><circle cx="38.9" cy="27.1" r="0.9" fill="#FFFDF8" /><path d="M29.5 32.5 L32 37 L34.5 32.5 Z" fill="#E9A23B" /></svg>
);
const PioAdvice = ({ label = 'Pío aconseja' }: { label?: string }) => (
  <svg role="img" aria-label={label} width="72" height="72" viewBox="0 0 64 64"><path d="M28 13 q2 -6 6 -2" fill="none" stroke="#1E1A16" strokeWidth="1.6" strokeLinecap="round" /><circle cx="32" cy="34" r="20" fill="#C8553D" /><ellipse cx="32" cy="41" rx="11" ry="9" fill="#F1E3C8" /><path d="M48 36 C 56 34, 62 32, 62 29 C 58 29, 52 30, 47 31 Z" fill="#A8432D" /><circle cx="26" cy="28" r="4.6" fill="none" stroke="#1E1A16" strokeWidth="1.2" /><circle cx="38" cy="28" r="4.6" fill="none" stroke="#1E1A16" strokeWidth="1.2" /><path d="M30.6 28 H33.4" stroke="#1E1A16" strokeWidth="1.2" /><circle cx="26" cy="28" r="2.4" fill="#1E1A16" /><circle cx="38" cy="28" r="2.4" fill="#1E1A16" /><path d="M29.5 33 L32 37.5 L34.5 33 Z" fill="#E9A23B" /></svg>
);
const PioWorried = ({ size = 72, label = 'Pío preocupado' }: { size?: number; label?: string }) => (
  <svg role="img" aria-label={label} width={size} height={size} viewBox="0 0 64 64"><path d="M28 13 q2 -6 6 -2" fill="none" stroke="#1E1A16" strokeWidth="1.6" strokeLinecap="round" /><circle cx="32" cy="34" r="20" fill="#C8553D" /><ellipse cx="32" cy="41" rx="11" ry="9" fill="#F1E3C8" /><path d="M22 44 C 24 49, 29 50, 31 46 C 28 45, 25 44, 22 44 Z M42 44 C 40 49, 35 50, 33 46 C 36 45, 39 44, 42 44 Z" fill="#A8432D" /><path d="M22 22 L29 24 M42 22 L35 24" stroke="#1E1A16" strokeWidth="1.4" strokeLinecap="round" /><circle cx="26" cy="29" r="3.4" fill="#1E1A16" /><circle cx="38" cy="29" r="3.4" fill="#1E1A16" /><circle cx="27" cy="28" r="1.1" fill="#FFFDF8" /><circle cx="39" cy="28" r="1.1" fill="#FFFDF8" /><path d="M30 34 L32 37.5 L34 34 Z" fill="#E9A23B" /></svg>
);
const PioKid = ({ label = 'Pío habla con el niño' }: { label?: string }) => (
  <svg role="img" aria-label={label} width="72" height="72" viewBox="0 0 64 64"><path d="M28 21 q2 -6 6 -2" fill="none" stroke="#1E1A16" strokeWidth="1.6" strokeLinecap="round" /><ellipse cx="32" cy="40" rx="20" ry="17" fill="#C8553D" /><ellipse cx="32" cy="46" rx="11" ry="8" fill="#F1E3C8" /><circle cx="21" cy="40" r="2.6" fill="#E9A23B" opacity="0.45" /><circle cx="43" cy="40" r="2.6" fill="#E9A23B" opacity="0.45" /><circle cx="26" cy="36" r="2.6" fill="#1E1A16" /><circle cx="38" cy="36" r="2.6" fill="#1E1A16" /><path d="M29.5 40 L32 44 L34.5 40 Z" fill="#E9A23B" /></svg>
);
const PioParty = ({ size = 88, label = 'Pío celebra' }: { size?: number; label?: string }) => (
  <svg role="img" aria-label={label} width={size} height={size} viewBox="0 0 64 64"><path d="M28 7 q2 -6 6 -2" fill="none" stroke="#1E1A16" strokeWidth="1.6" strokeLinecap="round" /><circle cx="32" cy="28" r="20" fill="#C8553D" /><ellipse cx="32" cy="35" rx="11" ry="9" fill="#F1E3C8" /><path d="M14 24 C 6 18, 6 8, 12 8 C 13 14, 15 19, 18 22 Z M50 24 C 58 18, 58 8, 52 8 C 51 14, 49 19, 46 22 Z" fill="#A8432D" /><path d="M23 23 q3 -3.5 6 0 M35 23 q3 -3.5 6 0" fill="none" stroke="#1E1A16" strokeWidth="1.8" strokeLinecap="round" /><path d="M29.5 27 L32 31.5 L34.5 27 Z" fill="#E9A23B" /></svg>
);

const PDF_COLORS = [
  { id: 'terracota', name: 'Terracota', accent: '#C8553D', ink: '#1E1A16', muted: '#6B635A', body: '#3B3530', box: '#F7EEDC', boxInk: '#5C4113', line: '#1E1A16', rule: '#E5DCCD' },
  { id: 'tinta', name: 'Tinta', accent: '#1E1A16', ink: '#1E1A16', muted: '#5F574E', body: '#1E1A16', box: '#F3F0EA', boxInk: '#3B3530', line: '#1E1A16', rule: '#D9D2C8' },
  { id: 'salvia', name: 'Salvia', accent: '#2F6B4F', ink: '#1A2E24', muted: '#4E6558', body: '#24382E', box: '#E5F0E8', boxInk: '#1E3D2C', line: '#1A2E24', rule: '#D5E4DA' },
  { id: 'marino', name: 'Marino', accent: '#2C4A6E', ink: '#1A2433', muted: '#5A6573', body: '#243044', box: '#E6EEF6', boxInk: '#1A3050', line: '#1A2433', rule: '#D5DEE8' },
  { id: 'uva', name: 'Uva', accent: '#6B3A5D', ink: '#2A1A24', muted: '#6B5A64', body: '#3A2832', box: '#F6E8F0', boxInk: '#4A2840', line: '#2A1A24', rule: '#E6D4DE' },
];
const PDF_TYPES = [
  { id: 'editorial', name: 'Editorial', display: "'Fraunces', serif", body: "'Figtree', sans-serif" },
  { id: 'clasica', name: 'Clásica', display: "'Fraunces', serif", body: "'Fraunces', serif" },
  { id: 'limpia', name: 'Limpia', display: "'Figtree', sans-serif", body: "'Figtree', sans-serif" },
];

function Editable({ value, onChange, as = 'span', className, style, autoFocus, editing = true, label }: { value: string; onChange: (v: string) => void; as?: 'span' | 'p' | 'h2' | 'div'; className?: string; style?: CSSProperties; autoFocus?: boolean; editing?: boolean; label?: string }) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (el && document.activeElement !== el && el.textContent !== value) el.textContent = value;
  }, [value]);
  useEffect(() => {
    if (!editing || !autoFocus || !ref.current) return;
    const el = ref.current;
    el.focus();
    const range = document.createRange();
    range.selectNodeContents(el);
    range.collapse(false);
    const sel = window.getSelection();
    if (!sel) return;
    sel.removeAllRanges();
    sel.addRange(range);
  }, [autoFocus, editing]);
  const Tag = as as any;
  return <Tag ref={ref} className={className} style={style} contentEditable={editing} suppressContentEditableWarning spellCheck={false} role={editing ? 'textbox' : undefined} aria-multiline={editing && (as === 'p' || as === 'div' || as === 'h2') ? true : undefined} aria-label={editing ? label : undefined} tabIndex={editing ? 0 : undefined} onInput={(e: any) => { if (editing) onChange(e.currentTarget.textContent || ''); }} onBlur={(e: any) => { if (editing) onChange(e.currentTarget.textContent || ''); }} />;
}

function SignPad({ title, onSave, onCancel, hint = 'Dibújala aquí, encima de la línea, con el dedo o el ratón. Si no puedes dibujar, el nombre ya queda escrito debajo. Pulsa Escape para cancelar.', clearLabel = 'Borrar', useLabel = 'Usar esta firma', cancelLabel = 'Cancelar', areaLabel }: { title: string; onSave: (url: string) => void; onCancel: () => void; hint?: string; clearLabel?: string; useLabel?: string; cancelLabel?: string; areaLabel?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const box = useRef<HTMLDivElement>(null);
  const drawing = useRef(false);
  useEffect(() => {
    const c = ref.current!;
    const dpr = window.devicePixelRatio || 1;
    c.width = c.clientWidth * dpr;
    c.height = c.clientHeight * dpr;
    const g = c.getContext('2d')!;
    g.setTransform(dpr, 0, 0, dpr, 0, 0);
    g.lineWidth = 2.4;
    g.lineCap = 'round';
    g.lineJoin = 'round';
    g.strokeStyle = '#1E1A16';
    box.current?.focus();
  }, []);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onCancel(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onCancel]);
  const point = (e: ReactPointerEvent<HTMLCanvasElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    return { x: e.clientX - r.left, y: e.clientY - r.top };
  };
  return (
    <div ref={box} tabIndex={-1} role="region" aria-labelledby="sign-pad-title" className="mn-noprint" style={{ width: '100%', background: '#FFFDF8', border: '1px solid #E5DCCD', borderRadius: 8, padding: 16, display: 'flex', flexDirection: 'column', gap: 10, outline: 'none' }}>
      <p id="sign-pad-title" style={{ margin: 0, fontWeight: 700, color: '#1E1A16' }}>{title}</p>
      <p style={{ margin: 0, fontSize: 14, color: '#5F574E' }}>{hint}</p>
      <canvas
        ref={ref}
        role="img"
        aria-label={areaLabel || ('Área para dibujar la ' + title + '. Opcional.')}
        style={{ width: '100%', height: 140, background: '#FFFFFF', border: '1px dashed #C9BBA8', borderRadius: 6, touchAction: 'none', cursor: 'crosshair' }}
        onPointerDown={(e) => { drawing.current = true; try { e.currentTarget.setPointerCapture(e.pointerId); } catch (err) { /* el navegador no siempre deja capturar el puntero */ } const p = point(e); const g = ref.current!.getContext('2d')!; g.beginPath(); g.moveTo(p.x, p.y); }}
        onPointerMove={(e) => { if (!drawing.current) return; const p = point(e); const g = ref.current!.getContext('2d')!; g.lineTo(p.x, p.y); g.stroke(); }}
        onPointerUp={() => { drawing.current = false; }}
      />
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        <button type="button" onClick={() => { const c = ref.current!; const g = c.getContext('2d')!; g.save(); g.setTransform(1, 0, 0, 1, 0, 0); g.clearRect(0, 0, c.width, c.height); g.restore(); }} style={{ minHeight: 44, border: '1px solid rgba(30,26,22,0.35)', background: 'transparent', borderRadius: 6, padding: '10px 14px', cursor: 'pointer' }}>{clearLabel}</button>
        <button type="button" onClick={() => onSave(ref.current!.toDataURL('image/png'))} style={{ minHeight: 44, border: 0, background: '#B4472F', color: '#FFF8EF', borderRadius: 6, padding: '10px 14px', fontWeight: 700, cursor: 'pointer' }}>{useLabel}</button>
        <button type="button" onClick={onCancel} style={{ minHeight: 44, border: 0, background: 'transparent', color: '#5F574E', cursor: 'pointer' }}>{cancelLabel}</button>
      </div>
    </div>
  );
}

const Check = () => (
  <svg className="a-dot" aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12l5 5 9-10" /></svg>
);
const IconPencil = () => (
  <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9" /><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z" /></svg>
);
const IconCheckSmall = () => (
  <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12l5 5 9-10" /></svg>
);
const IconPalette = () => (
  <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3a9 9 0 1 0 0 18h.5a2.5 2.5 0 0 0 2-4 2 2 0 0 1 2-2h1.5A9 9 0 0 0 12 3z" /><circle cx="7.5" cy="10.5" r="1" fill="currentColor" stroke="none" /><circle cx="10.5" cy="7.5" r="1" fill="currentColor" stroke="none" /><circle cx="14.5" cy="7.8" r="1" fill="currentColor" stroke="none" /><circle cx="7.8" cy="14" r="1" fill="currentColor" stroke="none" /></svg>
);
const Mark = ({ on, multi }: { on: boolean; multi: boolean }) => (
  <span style={{ flex: 'none', width: 32, height: 32, borderRadius: multi ? 8 : '50%', border: `2px solid ${on ? '#C8553D' : '#E0D7CA'}`, background: on && multi ? '#C8553D' : '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all .2s' }}>
    {on && !multi && <span className="a-dot" style={{ width: 16, height: 16, borderRadius: '50%', background: '#C8553D' }} />}
    {on && multi && <Check />}
  </span>
);

export default function Onboarding() {
  const navigate = useNavigate();
  const { lang } = useLanguage();
  const en = lang === 'en';
  const [boot] = useState(loadBundle);
  const [st, setSt] = useState<any>(() => boot.st);
  useEffect(() => {
    try { sessionStorage.setItem(STORE, JSON.stringify(st)); } catch (e) { /* ignorar */ }
  }, [st]);

  const a = st.a;
  const [look, setLook] = useState(() => boot.look);
  const [edits, setEdits] = useState<Record<string, string>>(() => boot.edits);
  const [signs, setSigns] = useState<Record<number, string>>(() => boot.signs);
  const [signing, setSigning] = useState<number | null>(null);
  const [extraRules, setExtraRules] = useState<string[]>(() => boot.extraRules);
  const [focusRule, setFocusRule] = useState<number | null>(null);
  const [editing, setEditing] = useState(false);
  const [styleOpen, setStyleOpen] = useState(false);
  const [toastOn, setToastOn] = useState(false);
  const [hideFor, setHideFor] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const sigsRef = useRef<HTMLDivElement>(null);
  const toastRef = useRef<number | null>(null);
  const warnedRef = useRef('');
  const desktopStyleRef = useRef<HTMLButtonElement>(null);
  const mobileStyleRef = useRef<HTMLButtonElement>(null);
  const pdfColor = PDF_COLORS.find((c) => c.id === look.color) || PDF_COLORS[0];
  const pdfType = PDF_TYPES.find((t) => t.id === look.type) || PDF_TYPES[0];
  const textOf = (key: string, fallback: string) => edits[key] ?? fallback;
  const setText = (key: string) => (v: string) => setEdits((prev) => ({ ...prev, [key]: v }));
  const setA = (patch: any, pick?: boolean) =>
    setSt((prev: any) => ({ ...prev, a: { ...prev.a, ...patch }, picks: pick ? (prev.picks || 0) + 1 : prev.picks }));

  const steps = buildSteps(a, lang);
  const s = steps[Math.min(st.step, steps.length - 1)];
  useEffect(() => {
    const prev = document.title;
    const who = a.name || (en ? 'your child' : 'vuestro peque');
    if (st.mode === 'done') document.title = (en ? who + "'s pact is ready" : 'El pacto de ' + who + ' está listo') + ' · PioPacto';
    else if (st.mode === 'stop') document.title = (en ? 'Still too soon' : 'Todavía es pronto') + ' · PioPacto';
    else document.title = (en ? 'Create the pact' : 'Crear el pacto') + ' · PioPacto';
    return () => { document.title = prev; };
  }, [st.mode, st.step, a.name, steps.length, en]);
  const filled = s.parts.every((p: any) => filledPart(p, a));
  const warns = s.parts.filter((p: any) => p.warn).map((p: any) => p.warn);
  const anyWarn = warns.length > 0;
  const bubble = anyWarn ? warns[0] : (s.reply || '');
  const ageIdx = steps.findIndex((x: any) => x.id === 'age');
  const odd = st.step % 2 === 1;
  const pdf = buildPdf(a, lang);
  const name = a.name || (en ? 'your child' : 'vuestro peque');
  const pickedGuides: string[] = (Array.isArray(a.guides) ? a.guides : []).filter((g: string) => g === 'iphone' || g === 'android');
  const kitGuides: string[] = pickedGuides.length
    ? pickedGuides
    : a.phone === 'iphone' ? ['iphone']
    : a.phone === 'android' ? ['android']
    : a.phone === 'nose' ? ['iphone', 'android']
    : [];
  const guideCopy: Record<string, { title: string; desc: string; href: string }> = {
    iphone: { title: en ? 'iPhone guide' : 'Guía para iPhone', desc: en ? 'Screen time, limits, purchases and privacy' : 'Tiempo de uso, límites, compras y privacidad', href: `${import.meta.env.BASE_URL}tech-guide?platform=iphone&download=1` },
    android: { title: en ? 'Android guide' : 'Guía para Android', desc: en ? 'Family Link, limits and parental controls' : 'Family Link, límites y control parental', href: `${import.meta.env.BASE_URL}tech-guide?platform=android&download=1` },
  };
  const kitExtra = kitGuides.length === 1
    ? (kitGuides[0] === 'iphone'
      ? { href: guideCopy.android.href, label: en ? 'Do you also need the Android guide?' : '¿También necesitáis la guía para Android?' }
      : { href: guideCopy.iphone.href, label: en ? 'Do you also need the iPhone guide?' : '¿También necesitáis la guía para iPhone?' })
    : null;
  const singleGuide = kitGuides.length === 1 ? kitGuides[0] : null;
  const toastHref = singleGuide ? `${import.meta.env.BASE_URL}tech-guide?platform=${singleGuide}` : `${import.meta.env.BASE_URL}tech-guide`;
  const toastDevice = singleGuide === 'iphone' ? 'iPhone' : singleGuide === 'android' ? 'Android' : (en ? 'phone' : 'móvil');

  useEffect(() => () => { if (toastRef.current != null) window.clearTimeout(toastRef.current); }, []);

  const goNext = () => {
    if (!filled) return;
    if (s.id === 'age' && a.age < 7) { setSt({ ...st, mode: 'stop' }); return; }
    if (st.step >= steps.length - 1) { setSt({ ...st, mode: 'done' }); return; }
    setSt({ ...st, step: st.step + 1 });
  };
  const goBack = () => {
    if (st.mode !== 'flow') { setSt({ ...st, mode: 'flow' }); return; }
    if (st.step > 0) setSt({ ...st, step: st.step - 1 });
  };
  const restart = () => { setSt(fresh()); };

  const stepTip = (s.parts.map((p: any) => p.tip).find(Boolean) || '') as string;
  const hideTip = hideFor === s.id && !!bubble && !!stepTip;
  const showTip = !!stepTip && !hideTip;
  const showHelper = !!s.helper && !stepTip;
  const combinedTitle = (s.echo ? s.echo + ' ' : '') + s.q;
  const title = combinedTitle.length > 78 ? s.q : combinedTitle;
  const nextLabel = st.step === steps.length - 1 ? (en ? 'Create the pact' : 'Crear el pacto') : (en ? 'Next' : 'Siguiente');

  useLayoutEffect(() => {
    if (st.mode !== 'flow') return;
    const el = scrollRef.current;
    if (!el) return;
    const run = () => {
      const overflows = el.scrollHeight > el.clientHeight + 1;
      if (!overflows) return;
      const hasTip = !!el.querySelector('.steptip');
      const hasBub = !!el.querySelector('.stepbub');
      if (hasTip && hasBub && hideFor !== s.id) {
        setHideFor(s.id);
        return;
      }
      if (import.meta.env.DEV && warnedRef.current !== s.id) {
        warnedRef.current = s.id;
        console.warn('⚠️ Paso ' + s.id + ' necesita scroll');
      }
    };
    run();
    const ro = new ResizeObserver(run);
    ro.observe(el);
    return () => ro.disconnect();
  }, [st.step, st.mode, hideFor, bubble, s.id, showTip]);

  const [popAt, setPopAt] = useState<{ top: number; left: number } | null>(null);
  useEffect(() => {
    if (!styleOpen) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setStyleOpen(false); };
    const place = () => {
      const desk = desktopStyleRef.current?.getBoundingClientRect();
      const mob = mobileStyleRef.current?.getBoundingClientRect();
      const r = desk && desk.width > 0 ? desk : mob;
      if (!r) return;
      setPopAt({ top: r.bottom + 8, left: Math.min(Math.max(12, r.left), window.innerWidth - 372) });
    };
    place();
    requestAnimationFrame(() => {
      const pop = document.getElementById('estilo-pacto');
      const first = pop?.querySelector('button') as HTMLButtonElement | null;
      first?.focus();
    });
    window.addEventListener('keydown', onKey);
    window.addEventListener('resize', place);
    window.addEventListener('scroll', place, true);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('resize', place);
      window.removeEventListener('scroll', place, true);
    };
  }, [styleOpen]);

  const scrollToSigns = () => {
    requestAnimationFrame(() => {
      sigsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
  };
  const toggleEditing = () => {
    setEditing((v) => {
      const next = !v;
      if (next) scrollToSigns();
      else setSigning(null);
      return next;
    });
  };
  const startSigning = (i: number) => {
    setSigning(i);
    requestAnimationFrame(() => {
      document.getElementById('sig-slot-' + i)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
  };

  const downloadPact = () => {
    window.print();
    setToastOn(true);
    if (toastRef.current != null) window.clearTimeout(toastRef.current);
    toastRef.current = window.setTimeout(() => setToastOn(false), 6000);
  };
  const shareFamily = async () => {
    const named = 'https://piopacto.com';
    const local = /localhost|127\.0\.0\.1/.test(window.location.hostname);
    const link = local ? window.location.origin : named;
    const text = en
      ? (local
        ? 'We made the first phone pact with Pío. It is free at piopacto.com 👉 ' + link
        : 'We made the first phone pact with Pío. It is free 👉 ' + named)
      : (local
        ? 'Hemos hecho el pacto del primer móvil con Pío. Es gratis en piopacto.com 👉 ' + link
        : 'Hemos hecho el pacto del primer móvil con Pío. Es gratis 👉 ' + named);
    const nav = navigator as Navigator & { share?: (data: { text?: string }) => Promise<void> };
    if (typeof nav.share === 'function') {
      try { await nav.share({ text }); return; } catch (err: any) {
        if (err && err.name === 'AbortError') return;
      }
    }
    window.open('https://wa.me/?text=' + encodeURIComponent(text), '_blank', 'noopener');
  };

  const renderOptions = (p: any) => {
    const multi = p.type === 'multi';
    const raw = a[p.id];
    const val = multi && !Array.isArray(raw) ? [] : raw;
    const list: any[] = p.opts.map((o: any) => {
      const on = multi ? val.indexOf(o[0]) >= 0 : val === o[0];
      const tooYoung = o[2] && o[2] > a.age;
      return {
        key: o[0], label: o[1], on, tag: tooYoung ? (en ? 'From age ' + o[2] : 'Desde ' + o[2] + ' años') : (o[3] || ''), tagColor: tooYoung ? '#A8432D' : '#8A8178',
        pick: () => {
          if (multi) { setA({ [p.id]: on ? val.filter((x: any) => x !== o[0]) : val.concat([o[0]]) }, true); return; }
          setA({ [p.id]: o[0] }, true);
        }
      };
    });
    if (p.custom) a.customApps.forEach((c: string) => list.push({ key: 'custom-' + c, label: c, on: true, tag: en ? 'Added' : 'Añadida', tagColor: '#8A8178', pick: () => setA({ customApps: a.customApps.filter((x: string) => x !== c) }, true) }));

    if (p.cards) {
      return (
        <div role={multi ? 'group' : 'radiogroup'} aria-label={p.label || s.q} className={'opt-cards' + (s.id === 'moments' ? ' momentcards' : '')}>
          {list.map((o, i) => {
            const art = ill(o.key);
            return (
              <button key={o.key} type="button" className={'card ' + (odd ? 'a-o1' : 'a-o2')} onClick={o.pick} role={multi ? 'checkbox' : 'radio'} aria-checked={o.on} style={{ border: 0, background: 'transparent', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, padding: '4px 2px 8px', cursor: 'pointer', color: '#3B3530', animationDelay: 120 + i * 60 + 'ms' }}>
                <svg className={o.on ? 'a-pop' : ''} aria-hidden="true" viewBox="0 0 120 100" style={{ color: o.on ? '#C8553D' : '#EFE8DD' }}>
                  <g stroke="#4A433C" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                    <path d={art.w} fill="#FFFFFF" /><path d={art.a} fill="currentColor" /><path d={art.l} fill="none" />
                  </g>
                </svg>
                <span className="cardlbl" style={{ fontSize: 13, fontWeight: 800, letterSpacing: '0.05em', textTransform: 'uppercase', textAlign: 'center', lineHeight: 1.25, minHeight: 34, display: 'flex', alignItems: 'center' }}>{o.label}</span>
                <Mark on={o.on} multi={multi} />
              </button>
            );
          })}
        </div>
      );
    }
    const box = (p.cols && p.cols > 1) ? 'opt-grid' : 'opt-rows';
    return (
      <div role={multi ? 'group' : 'radiogroup'} aria-label={p.label || s.q} className={box + ' g' + (p.cols || 1)}>
        {list.map((o, i) => {
          const short = o.label.length <= 42;
          return (
            <button key={o.key} type="button" className={'row' + (short ? ' is-short' : '') + ' ' + (odd ? 'a-o1' : 'a-o2')} onClick={o.pick} role={multi ? 'checkbox' : 'radio'} aria-checked={o.on} style={{ animationDelay: 120 + i * 60 + 'ms' }}>
              <Mark on={o.on} multi={multi} />
              <span style={{ flex: 1, lineHeight: 1.3 }}>{o.label}</span>
              {o.tag && <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: 0, textTransform: 'none', color: o.tagColor, textAlign: 'right' }}>{o.tag}</span>}
            </button>
          );
        })}
      </div>
    );
  };

  const renderPart = (p: any) => {
    const isOpts = p.type === 'choice' || p.type === 'multi';
    const field = p.type === 'slider' ? 'timesel opt-field' : (p.type === 'text' || p.type === 'add' || p.type === 'stepper') ? 'opt-field' : '';
    const val = a[p.id];
    return (
      <div key={p.id} className={field || undefined}>
        {p.label && <div className="serif partlbl">{p.label}</div>}

        {isOpts && renderOptions(p)}

        {p.type === 'text' && (
          <input type="text" className="inp" aria-label={p.label || p.ph || (en ? 'Answer' : 'Respuesta')} value={val} onChange={(e) => setA({ [p.id]: e.target.value })} placeholder={p.ph || ''} style={{ width: '100%', border: '2px solid #E5DCCD', borderRadius: 6, background: '#FFFFFF', padding: '20px 22px', fontFamily: 'inherit', fontSize: 19, fontWeight: 600, color: '#1E1A16', outline: 'none' }} />
        )}

        {p.type === 'add' && (
          <form className="addapp" style={{ display: 'flex', flexDirection: 'column', gap: 8 }} onSubmit={(e) => {
            e.preventDefault();
            const v = (a.appDraft || '').trim();
            if (!v || a.customApps.indexOf(v) >= 0) { setA({ appDraft: '' }); return; }
            setA({ customApps: a.customApps.concat([v]), appDraft: '' }, true);
          }}>
            <label className="addlbl" htmlFor="add-app">{en ? 'Missing one? Type it here' : '¿Falta alguna? Escríbela aquí'}</label>
            <div style={{ display: 'flex', gap: 8 }}>
              <input id="add-app" type="text" className="inp" aria-label={en ? 'Add another app' : 'Añadir otra app'} value={val} onChange={(e) => setA({ appDraft: e.target.value })} placeholder={en ? 'App name' : 'Nombre de la app'} style={{ flex: 1, minWidth: 0, border: '2px dashed #C8553D', borderRadius: 6, background: '#FFFFFF', padding: '12px 14px', fontFamily: 'inherit', fontSize: 16, fontWeight: 600, color: '#1E1A16', outline: 'none' }} />
              <button type="submit" style={{ flex: 'none', border: '2px solid #C8553D', background: 'transparent', color: '#B4472F', borderRadius: 6, padding: '0 16px', fontSize: 14, fontWeight: 800, letterSpacing: '0.06em', textTransform: 'uppercase', cursor: 'pointer' }}>{en ? '+ Add' : '+ Añadir'}</button>
            </div>
          </form>
        )}

        {p.type === 'stepper' && (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 32, padding: '4px 0' }}>
            <button type="button" className="row" aria-label={en ? 'Lower age' : 'Bajar edad'} onClick={() => setA(ageTime(a, Math.max(4, a.age - 1)))} style={{ width: 64, height: 64, borderRadius: '50%', border: 0, background: '#F6F1E9', fontSize: 30, color: '#1E1A16', cursor: 'pointer' }}>−</button>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: 120 }} aria-live="polite" aria-atomic="true">
              <span key={a.age} className="serif bignum a-dot" style={{ fontWeight: 600, fontSize: 92, lineHeight: 1, color: '#3B3530' }}>{a.age}</span>
              <span style={{ fontSize: 14, fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#8A8178' }}>{en ? 'years' : 'años'}</span>
            </div>
            <button type="button" className="row" aria-label={en ? 'Raise age' : 'Subir edad'} onClick={() => setA(ageTime(a, Math.min(17, a.age + 1)))} style={{ width: 64, height: 64, borderRadius: '50%', border: 0, background: '#F6F1E9', fontSize: 30, color: '#1E1A16', cursor: 'pointer' }}>+</button>
          </div>
        )}

        {p.type === 'slider' && (
          <div className="timevals" style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center', gap: 8 }}>
              <span className="serif bignum" style={{ fontWeight: 600, fontSize: 52, lineHeight: 1, color: '#3B3530' }}>{val}</span>
              <span style={{ fontSize: 13, fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#8A8178' }}>{en ? 'min a day' : 'min al día'}</span>
            </div>
            <input type="range" min={15} max={180} step={15} value={val} onChange={(e) => setA({ [p.id]: Number(e.target.value), timeTouched: true })} aria-label={p.label} aria-valuemin={15} aria-valuemax={180} aria-valuenow={val} aria-valuetext={val + (en ? ' minutes a day' : ' minutos al día')} style={{ width: '100%', height: 22, cursor: 'pointer' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, fontWeight: 600, color: '#8A8178' }}><span>15</span><span>60</span><span>120</span><span>180</span></div>
          </div>
        )}
      </div>
    );
  };

  const tipNode = showTip ? (
    <div className="steptip">
      <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="#F1E3C8" stroke="#B4472F" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18h6M10 21h4" /><path d="M12 3a6 6 0 0 0-3.5 10.9c.6.5 1 1.2 1 2.1h5c0-.9.4-1.6 1-2.1A6 6 0 0 0 12 3z" /></svg>
      <span>{stepTip}</span>
    </div>
  ) : null;

  const progress = st.mode === 'done' ? '100%' : Math.round(((st.step + 1) / steps.length) * 100) + '%';
  const face = anyWarn ? <PioWorried label={en ? 'Pío worried' : 'Pío preocupado'} /> : s.kidTurn ? <PioKid label={en ? 'Pío talks with the child' : 'Pío habla con el niño'} /> : s.advice ? <PioAdvice label={en ? 'Pío gives advice' : 'Pío aconseja'} /> : <PioNormal label="Pío" />;

  const canGoBack = st.mode !== 'flow' || st.step > 0;
  const goHome = () => navigate('/');
  const goToQuestions = () => setSt({ ...st, mode: 'flow', step: Math.max(0, steps.length - 1) });

  return (
    <div className="mn-onb">
      <a href={st.mode === 'done' ? '#pacto-preview' : '#pregunta'} className="skip-link">{en ? 'Skip to content' : 'Saltar al contenido'}</a>
      {st.mode !== 'done' && (
      <header className="flowhead">
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <button type="button" aria-label={canGoBack ? (en ? 'Previous question' : 'Pregunta anterior') : (en ? 'Exit to home' : 'Salir al inicio')} onClick={() => { if (!canGoBack) { goHome(); return; } goBack(); }} style={{ width: 44, height: 44, border: 0, background: 'transparent', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1E1A16" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 6l-6 6 6 6" /></svg>
          </button>
          <Link to="/" className="no-underline" aria-label="PioPacto"><BrandMark compact /></Link>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <LanguageSelector pill />
          <Link to="/" className="exit-link">{en ? 'Exit' : 'Salir'}</Link>
          <button type="button" aria-label={en ? 'Start over' : 'Empezar de nuevo'} onClick={restart} style={{ width: 44, height: 44, border: 0, background: 'transparent', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#5F574E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12a8 8 0 1 0 2.3-5.6" /><path d="M4 4v4h4" /></svg>
          </button>
        </div>
      </header>
      )}

      {st.mode === 'flow' && (
        <>
          <div className="avrow" style={{ flex: 'none', position: 'relative', marginTop: 2 }}>
            <div className="avline" role="progressbar" aria-label={en ? 'Pact progress' : 'Progreso del pacto'} aria-valuemin={0} aria-valuemax={100} aria-valuenow={parseInt(progress, 10) || 0} style={{ position: 'absolute', left: 0, right: 0, top: 47, height: 2, background: '#EDE6DB' }}>
              <div style={{ width: progress, height: 2, background: '#C8553D', transition: 'width .5s ease' }} />
            </div>
            <div className={'av ' + (odd ? 'a-hop1' : 'a-hop2')} style={{ position: 'absolute', left: '50%', top: 0, borderRadius: '50%', background: '#F6F1E9', border: '5px solid #FFFDF8', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 10px 24px -16px rgba(30,26,22,0.5)' }}>
              <div className="a-bob" style={{ display: 'flex' }} aria-hidden="true">{face}</div>
            </div>
          </div>

          <div className="scroll" ref={scrollRef}>
            <main id="pregunta" data-step={s.id} className={'stage' + (s.id === 'time' ? ' timestep' : s.id === 'moments' ? ' momentstep' : s.id === 'apps' ? ' appstep' : s.id === 'supervision' ? ' supstep' : '')}>
              <h1 key={'q' + st.step} className={'serif h1q ' + (odd ? 'a-q1' : 'a-q2')}>{title}</h1>
              {showHelper && <p className="helper">{s.helper}</p>}
              <div key={'p' + st.step} className={'parts' + (s.id === 'time' ? ' timeparts' : s.id === 'apps' ? ' appparts' : '')}>
                {s.parts.map(renderPart)}
              </div>
              {tipNode}
              {bubble && (
                <div key={'b' + st.picks} className={'stepbub ' + ((st.picks || 0) % 2 ? 'a-b1' : 'a-b2')} role="status">
                  <div className="bubpio"><PioNormal size={38} label="Pío" /></div>
                  <div className="bubtxt" style={{ background: anyWarn ? '#FBEDE8' : '#F6F1E9', color: anyWarn ? '#6E2A1B' : '#3B3530' }}>{bubble}</div>
                </div>
              )}
            </main>
          </div>

          <footer className="flowfoot">
            <div className="footbar">
              <button type="button" className="backbtn" onClick={goBack} aria-label={en ? 'Previous question' : 'Pregunta anterior'} disabled={st.step <= 0} aria-hidden={st.step <= 0} tabIndex={st.step <= 0 ? -1 : undefined} style={{ visibility: st.step > 0 ? 'visible' : 'hidden' }}>
                <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#3B3530" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 6l-6 6 6 6" /></svg>
                <span className="backtxt">{en ? 'Previous' : 'Anterior'}</span>
              </button>
              <button type="button" className="next" onClick={goNext} disabled={!filled} aria-disabled={!filled} style={{ background: filled ? '#B4472F' : '#EDE6DB', color: filled ? '#FFF8EF' : '#6B635A', boxShadow: filled ? '0 16px 34px -12px rgba(180,71,47,0.6)' : 'none', cursor: filled ? 'pointer' : 'not-allowed' }}>
                {nextLabel}
              </button>
            </div>
          </footer>
        </>
      )}

      {st.mode === 'stop' && (
        <div className="scroll">
          <main className="a-in" style={{ width: '100%', maxWidth: 560, margin: 'auto', padding: '56px 20px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20, textAlign: 'center' }}>
            <PioWorried size={96} label={en ? 'Pío worried' : 'Pío preocupado'} />
            <h1 className="serif" style={{ margin: 0, fontWeight: 500, fontSize: 30, lineHeight: 1.2 }}>{en ? 'For their age, it is still too soon.' : 'Para su edad, todavía es pronto.'}</h1>
            <p style={{ margin: 0, fontSize: 17, lineHeight: 1.6, color: '#5F574E' }}>{en ? 'The Spanish Association of Pediatrics recommends no screens before age 7, except a short, accompanied contact, such as a video call with family. I will be here when the time comes.' : 'La Asociación Española de Pediatría recomienda no usar pantallas antes de los 7 años, salvo un contacto breve y acompañado, como una videollamada con la familia. Os espero aquí cuando llegue el momento.'}</p>
            <button type="button" onClick={() => setSt({ ...st, mode: 'flow', step: ageIdx })} style={{ border: '2px solid #B4472F', background: 'transparent', color: '#B4472F', borderRadius: 10, padding: '14px 24px', fontSize: 15, fontWeight: 700, cursor: 'pointer' }}>{en ? 'Change the age' : 'Cambiar la edad'}</button>
          </main>
        </div>
      )}

      {st.mode === 'done' && (
        <div className="scroll done-scroll">
          <header className="done-bar mn-noprint">
            <Link to="/" className="done-logo" aria-label="PioPacto"><BrandMark compact /></Link>
            <nav className="done-nav" aria-label={en ? 'Leave the pact' : 'Salir del pacto'}>
              <LanguageSelector pill />
              <button type="button" className="done-nav-btn" onClick={goToQuestions}>{en ? 'Back to the questions' : 'Volver a las preguntas'}</button>
              <Link to="/" className="done-nav-btn done-nav-exit">{en ? 'Exit to home' : 'Salir al inicio'}</Link>
            </nav>
          </header>
          <div className="done-head mn-noprint">
            <div className="done-head-line">
              <PioParty size={64} label={en ? 'Pío celebrates' : 'Pío celebra'} />
              <h1 className="serif">{en ? name + "'s pact is ready!" : '¡El pacto de ' + name + ' está listo!'}</h1>
            </div>
            <p>{en ? 'Look it over, sign it together, and put it where you can see it.' : 'Revisadlo, firmadlo juntos y ponedlo a la vista.'}</p>
          </div>
          <div className="done-cols">
            <div className="done-main">
              <div className="done-tools mn-noprint">
                <div className="done-tools-left">
                  <button type="button" className="tool-btn" aria-pressed={editing} onClick={() => toggleEditing()}>{editing ? <><IconCheckSmall /> {en ? 'Done' : 'Listo'}</> : <><IconPencil /> {en ? 'Edit' : 'Editar'}</>}</button>
                  <button type="button" className="tool-btn" ref={desktopStyleRef} aria-expanded={styleOpen} aria-controls="estilo-pacto" onClick={() => setStyleOpen((v) => !v)}><IconPalette /> {en ? 'Style' : 'Estilo'}</button>
                </div>
                <button type="button" className="tool-dl" onClick={downloadPact}>{en ? 'Download PDF' : 'Descargar PDF'}</button>
              </div>
              <article id="pacto-preview" className={'mn-pdf pdfsheet' + (editing ? ' is-editing' : '')} style={{ ['--pdf-display' as any]: pdfType.display, ['--pdf-body' as any]: pdfType.body, width: '100%', background: '#FFFFFF', border: '1px solid #E5DCCD', fontFamily: pdfType.body, color: pdfColor.ink }} aria-label={(en ? 'Preview of the pact for ' : 'Vista previa del pacto de ') + name}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 20 }}>
                <BrandMark compact />
                <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.16em', color: pdfColor.muted, paddingTop: 6 }}>{en ? 'FAMILY PACT' : 'PACTO FAMILIAR'}</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.18em', color: pdfColor.muted }}>{pdf.kicker}</div>
                <Editable editing={editing} as="div" className="serif pdfname" label={en ? 'Name' : 'Nombre'} value={textOf('name', name)} onChange={setText('name')} style={{ fontWeight: 700, fontSize: 60, lineHeight: 0.95, fontFamily: pdfType.display }} />
              </div>
              <div style={{ height: 1.5, background: pdfColor.line }} />
              <Editable editing={editing} as="p" label={en ? 'Pact introduction' : 'Introducción del pacto'} value={textOf('intro', pdf.intro)} onChange={setText('intro')} style={{ margin: 0, fontSize: 16, lineHeight: 1.65, color: pdfColor.body }} />

              {pdf.sections.map((sec: any, si: number) => (
                <section key={si} className="pdf-sec" style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  <Editable editing={editing} as="h2" className="serif" label={en ? 'Section title' : 'Título de sección'} value={textOf('sec-' + si, sec.title)} onChange={setText('sec-' + si)} style={{ margin: 0, fontWeight: 600, fontSize: 24, fontFamily: pdfType.display }} />
                  {sec.isBox && <Editable editing={editing} label={sec.title} value={textOf('box-' + si, sec.text)} onChange={setText('box-' + si)} style={{ background: pdfColor.box, borderRadius: 6, padding: '18px 22px', fontSize: 16, lineHeight: 1.6, color: pdfColor.boxInk }} />}
                  {sec.isList && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                      {sec.items.map((it: any, i: number) => (
                        <div key={i} style={{ display: 'flex', gap: 14, fontSize: 16, lineHeight: 1.55 }}>
                          {look.marks !== 'none' && (
                            <span className={look.marks === 'emoji' ? undefined : 'serif'} aria-hidden="true" style={{ flex: 'none', width: look.marks === 'emoji' ? 28 : 22, fontWeight: 700, fontSize: look.marks === 'emoji' ? 18 : 15, lineHeight: 1.3, color: pdfColor.accent, fontFamily: look.marks === 'emoji' ? 'inherit' : pdfType.display }}>{look.marks === 'emoji' ? (it.emoji || it.mark) : it.mark}</span>
                          )}
                          <Editable editing={editing} label={(en ? 'Rule ' : 'Norma ') + (i + 1)} value={textOf('item-' + si + '-' + i, it.text)} onChange={setText('item-' + si + '-' + i)} style={{ flex: 1 }} />
                        </div>
                      ))}
                      {sec.id === 'rules' && extraRules.map((rule, i) => (editing || rule.trim()) ? (
                        <div key={'extra-' + i} className={rule.trim() ? undefined : 'mn-empty-rule'} style={{ display: 'flex', gap: 14, fontSize: 15, lineHeight: 1.5, alignItems: 'flex-start' }}>
                          {look.marks !== 'none' && (
                            <span className="serif" aria-hidden="true" style={{ flex: 'none', width: 22, fontWeight: 700, fontSize: 15, lineHeight: 1.3, color: pdfColor.accent, fontFamily: pdfType.display }}>{String(sec.items.length + i + 1)}</span>
                          )}
                          <Editable editing={editing} autoFocus={focusRule === i} label={(en ? 'Added rule ' : 'Norma añadida ') + (i + 1)} value={rule} onChange={(v) => setExtraRules((prev) => prev.map((item, idx) => idx === i ? v : item))} style={{ flex: 1, minHeight: 22 }} />
                          {editing && <button type="button" className="mn-noprint" aria-label={en ? 'Delete rule' : 'Borrar norma'} onClick={() => { setExtraRules((prev) => prev.filter((_, idx) => idx !== i)); setFocusRule(null); }} style={{ flex: 'none', border: 0, background: 'transparent', color: '#6B635A', fontSize: 16, lineHeight: 1, cursor: 'pointer', padding: 0 }}>×</button>}
                        </div>
                      ) : null)}
                      {editing && sec.id === 'rules' && (
                        <button type="button" className="mn-noprint" onClick={() => { setFocusRule(extraRules.length); setExtraRules((prev) => prev.concat([''])); }} style={{ alignSelf: 'flex-start', border: '2px dashed #E5DCCD', background: 'transparent', color: '#B4472F', borderRadius: 6, padding: '10px 14px', fontSize: 15, fontWeight: 700, cursor: 'pointer' }}>{en ? '+ Add a rule' : '+ Añadir una norma'}</button>
                      )}
                    </div>
                  )}
                </section>
              ))}

              <Editable editing={editing} label={en ? 'Closing message' : 'Mensaje final'} value={textOf('final', pdf.finalMsg)} onChange={setText('final')} style={{ fontSize: 16, lineHeight: 1.7, fontStyle: 'italic', color: pdfColor.body, borderLeft: '3px solid ' + pdfColor.accent, paddingLeft: 20 }} />
              <Editable editing={editing} label={en ? 'When the pact is reviewed' : 'Cuándo se revisa el pacto'} value={textOf('review', pdf.review)} onChange={setText('review')} style={{ background: pdfColor.box, borderRadius: 6, padding: '18px 22px', fontSize: 15, lineHeight: 1.55, color: pdfColor.boxInk }} />

              <div ref={sigsRef} className="sigs" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 32, marginTop: 12 }}>
                {pdf.signers.map((sg: any, i: number) => (
                  <div
                    id={'sig-slot-' + i}
                    key={i}
                    style={{ display: 'flex', flexDirection: 'column', gap: 6, gridColumn: signing === i ? '1 / -1' : undefined }}
                  >
                    {editing && signing === i ? (
                      <SignPad
                        title={(en ? 'Signature of ' : 'Firma de ') + textOf('sig-' + i, sg.name)}
                        hint={en ? 'Draw it here, over the line, with a finger or the mouse. If you cannot draw, the name is already written below. Press Escape to cancel.' : undefined}
                        clearLabel={en ? 'Clear' : undefined}
                        useLabel={en ? 'Use this signature' : undefined}
                        cancelLabel={en ? 'Cancel' : undefined}
                        areaLabel={en ? 'Area to draw the signature of ' + textOf('sig-' + i, sg.name) + '. Optional.' : undefined}
                        onCancel={() => setSigning(null)}
                        onSave={(url) => {
                          setSigns((prev) => ({ ...prev, [i]: url }));
                          setSigning(null);
                        }}
                      />
                    ) : (
                      <div style={{ minHeight: 72, display: 'flex', alignItems: 'flex-end' }}>
                        {signs[i]
                          ? <img src={signs[i]} alt={(en ? 'Signature of ' : 'Firma de ') + (textOf('sig-' + i, sg.name))} style={{ maxHeight: 72, maxWidth: '100%', objectFit: 'contain', objectPosition: 'left bottom' }} />
                          : editing ? <button type="button" className="mn-noprint" onClick={() => startSigning(i)} style={{ minHeight: 44, border: '1px dashed ' + pdfColor.accent, background: 'transparent', color: pdfColor.accent, borderRadius: 6, padding: '8px 14px', fontSize: 14, fontWeight: 700, cursor: 'pointer' }}>{en ? 'Sign' : 'Firmar'}</button> : null}
                      </div>
                    )}
                    {editing && signs[i] && signing !== i && <button type="button" className="mn-noprint" onClick={() => setSigns((prev) => { const next = { ...prev }; delete next[i]; return next; })} style={{ alignSelf: 'flex-start', minHeight: 44, border: 0, background: 'transparent', color: '#6B635A', fontSize: 13, cursor: 'pointer', padding: 0 }}>{en ? 'Remove signature' : 'Quitar firma'}</button>}
                    <div style={{ borderTop: '1.5px solid ' + pdfColor.line, paddingTop: 10, fontSize: 15, fontWeight: 600 }}>
                      <Editable editing={editing} label={(en ? 'Signer name ' : 'Nombre del firmante ') + (i + 1)} value={textOf('sig-' + i, sg.name)} onChange={setText('sig-' + i)} />
                    </div>
                    <div style={{ fontSize: 12, color: pdfColor.muted }}>{sg.role}</div>
                  </div>
                ))}
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <PactSeal size={108} ring={en ? 'PIOPACTO · THE FIRST PHONE PACT · ' : undefined} label={en ? 'PioPacto, the first phone pact' : undefined} />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap', borderTop: '1px solid #E5DCCD', paddingTop: 12, fontSize: 11, color: '#6B635A' }}>
                <span>{pdf.foot}</span><span>piopacto.com</span>
              </div>
            </article>
            </div>
            <aside className="done-side mn-noprint" aria-labelledby="siguiente-paso">
              <div className="next-kicker">{en ? 'NEXT STEP' : 'SIGUIENTE PASO'}</div>
              <h2 id="siguiente-paso" className="serif">{en ? 'Let the phone follow the pact' : 'Que el móvil cumpla el pacto'}</h2>
              <div className="guide-list">
                {kitGuides.map((id) => {
                  const g = guideCopy[id];
                  return (
                    <div key={id} className="kitcard">
                      <span aria-hidden="true" className="guide-ico">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="7" y="2" width="10" height="20" rx="2" /><path d="M11 18h2" /></svg>
                      </span>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div className="serif guide-title">{g.title}</div>
                        <div className="guide-desc">{g.desc}</div>
                      </div>
                      <a href={g.href} target="_blank" rel="noopener noreferrer" aria-label={(en ? 'Download ' : 'Descargar ') + g.title + (en ? ' (opens in a new tab)' : ' (se abre en una pestaña nueva)')} className="guide-dl">
                        <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 4v11" /><path d="M7 11l5 5 5-5" /><path d="M5 20h14" /></svg>
                      </a>
                    </div>
                  );
                })}
              </div>
              {kitExtra && (
                <a href={kitExtra.href} target="_blank" rel="noopener noreferrer" className="guide-extra">{kitExtra.label} <span className="sr-only">{en ? '(opens in a new tab)' : '(se abre en una pestaña nueva)'}</span></a>
              )}
              <button type="button" className="share-btn" onClick={shareFamily}>{en ? 'Share with another family' : 'Compartir con otra familia'}</button>
              <div className="done-links">
                <button type="button" onClick={() => setSt({ ...st, mode: 'flow', step: 0 })}>{en ? 'Change the answers' : 'Cambiar las respuestas'}</button>
                <p>{en ? 'Was something missing? ' : '¿Echasteis algo en falta? '}<a href={en ? 'mailto:feedback@myfirstphoneagreement.com?subject=Suggestion%20for%20the%20pact' : 'mailto:feedback@myfirstphoneagreement.com?subject=Sugerencia%20para%20el%20pacto'}>{en ? 'Write to Pío' : 'Escríbele a Pío'}</a></p>
              </div>
            </aside>
          </div>
          <div className="done-mobilebar mn-noprint">
            <button type="button" className="mob-ico" aria-label={editing ? (en ? 'Done' : 'Listo') : (en ? 'Edit' : 'Editar')} aria-pressed={editing} onClick={() => toggleEditing()}>{editing ? <IconCheckSmall /> : <IconPencil />}</button>
            <button type="button" className="mob-ico" ref={mobileStyleRef} aria-label={en ? 'Style' : 'Estilo'} aria-expanded={styleOpen} aria-controls="estilo-pacto" onClick={() => setStyleOpen((v) => !v)}><IconPalette /></button>
            <button type="button" className="tool-dl mob-dl" onClick={downloadPact}>{en ? 'Download PDF' : 'Descargar PDF'}</button>
          </div>
          {styleOpen && (
            <>
              <button type="button" className="style-backdrop mn-noprint" aria-label={en ? 'Close style panel' : 'Cerrar panel de estilo'} onClick={() => setStyleOpen(false)} />
              <div id="estilo-pacto" className="style-pop mn-noprint" role="dialog" aria-modal="true" aria-labelledby="estilo-titulo" style={popAt ? { top: popAt.top, left: popAt.left } : undefined}>
                <div className="style-row" style={{ justifyContent: 'space-between' }}>
                  <span id="estilo-titulo">{en ? 'Pact style' : 'Estilo del pacto'}</span>
                  <button type="button" onClick={() => setStyleOpen(false)} style={{ minHeight: 44, border: 0, background: 'transparent', cursor: 'pointer', fontWeight: 700 }}>{en ? 'Close' : 'Cerrar'}</button>
                </div>
                <div className="style-row">
                  <span>{en ? 'Color' : 'Color'}</span>
                  {PDF_COLORS.map((c) => (
                    <button key={c.id} type="button" aria-pressed={look.color === c.id} onClick={() => setLook((prev) => ({ ...prev, color: c.id }))} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, border: look.color === c.id ? '1.5px solid #1E1A16' : '1px solid #E5DCCD', background: '#FFFFFF', borderRadius: 6, padding: '6px 10px', cursor: 'pointer', fontSize: 14 }}>
                      <span style={{ width: 14, height: 14, borderRadius: '50%', background: c.accent }} />{en ? ({ terracota: 'Terracotta', tinta: 'Ink', salvia: 'Sage', marino: 'Navy', uva: 'Grape' } as Record<string, string>)[c.id] || c.name : c.name}
                    </button>
                  ))}
                </div>
                <div className="style-row">
                  <span>{en ? 'Marks' : 'Marcas'}</span>
                  {(en ? [{ id: 'icon', name: 'Icons' }, { id: 'emoji', name: 'Emoji' }, { id: 'none', name: 'None' }] : [{ id: 'icon', name: 'Iconos' }, { id: 'emoji', name: 'Emojis' }, { id: 'none', name: 'Sin nada' }]).map((m) => (
                    <button key={m.id} type="button" aria-pressed={look.marks === m.id} onClick={() => setLook((prev) => ({ ...prev, marks: m.id }))} style={{ border: look.marks === m.id ? '1.5px solid #1E1A16' : '1px solid #E5DCCD', background: '#FFFFFF', borderRadius: 6, padding: '6px 12px', cursor: 'pointer', fontSize: 14 }}>{m.name}</button>
                  ))}
                </div>
                <div className="style-row">
                  <span>{en ? 'Type' : 'Letra'}</span>
                  {PDF_TYPES.map((t) => (
                    <button key={t.id} type="button" aria-pressed={look.type === t.id} onClick={() => setLook((prev) => ({ ...prev, type: t.id }))} style={{ border: look.type === t.id ? '1.5px solid #1E1A16' : '1px solid #E5DCCD', background: '#FFFFFF', borderRadius: 6, padding: '6px 12px', cursor: 'pointer', fontFamily: t.display, fontSize: 15 }}>{en ? ({ editorial: 'Editorial', clasica: 'Classic', limpia: 'Clean' } as Record<string, string>)[t.id] || t.name : t.name}</button>
                  ))}
                </div>
              </div>
            </>
          )}
          {toastOn && (
            <div className="done-toast mn-noprint" role="status">
              <span>{en ? 'Pact downloaded! Shall we set up ' + name + "'s " + toastDevice + ' now?' : '¡Pacto descargado! ¿Configuramos ahora el ' + toastDevice + ' de ' + name + '?'}</span>
              <a href={toastHref}>{en ? 'Open guide' : 'Abrir guía'}</a>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
