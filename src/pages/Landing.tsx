import { useEffect, useState, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import BrandMark, { brandTagline } from '@/components/BrandMark';
import LanguageSelector from '@/components/LanguageSelector';
import { useLanguage } from '@/contexts/LanguageContext';
import HeroScene from '@/components/illustrations/HeroScene';
import PioNest from '@/components/illustrations/PioNest';
import PioMini from '@/components/illustrations/PioMini';
import IllPacto from '@/components/illustrations/IllPacto';
import IllIphone from '@/components/illustrations/IllIphone';
import IllAndroid from '@/components/illustrations/IllAndroid';
import StepTalk from '@/components/illustrations/StepTalk';
import StepClock from '@/components/illustrations/StepClock';
import StepSign from '@/components/illustrations/StepSign';
import KitchenTable from '@/components/illustrations/KitchenTable';
import { PortraitAndres, PortraitElena, PortraitMarta } from '@/components/illustrations/TestimonialAvatars';
import FaqPio from '@/components/illustrations/FaqPio';
import PioWaiting from '@/components/illustrations/PioWaiting';

const FEEDBACK_MAIL = 'mailto:feedback@myfirstphoneagreement.com';
const SUPPORT_URL = 'https://buymeacoffee.com';

const landingCopy = {
  es: {
    skip: 'Saltar al contenido',
    navSections: 'Secciones',
    navPact: 'El pacto',
    navGuides: 'Guías del móvil',
    closeMenu: 'Cerrar menú',
    openMenu: 'Abrir menú',
    moreSections: 'Más secciones',
    questions: 'Preguntas',
    createPact: 'Crear nuestro pacto',
    support: 'Apoya el proyecto',
    privacy: 'Privacidad',
    contact: 'Contacto',
    heroTitle: 'Antes del primer móvil, un buen pacto.',
    heroBody: 'Respondéis unas preguntas sencillas y descargáis un pacto familiar listo para firmar, con lo que recomiendan los pediatras para su edad.',
    cta: 'Crear nuestro pacto gratis',
    heroGuide: 'Os guía Pío, nuestro ayudante · 5 minutos · sin registro',
    meet: 'Conoce a Pío',
    meetBody: 'Pío vive en el nido de cada familia. Os hace las preguntas importantes, os cuenta qué recomiendan los pediatras para su edad y escribe el pacto con vosotros. Sin juicios, sin prisas y sin guardar nada de lo que le contéis.',
    talk: 'Hablar con Pío →',
    chatQ: '¿Cuándo os gustaría que el móvil descanse?',
    chatMeals: 'En las comidas',
    chatBed: 'Antes de dormir',
    chatCar: 'En el coche',
    chatA: 'Apuntado. Cenar sin pantallas es de lo que más recomiendan los pediatras.',
    toolsTitleA: 'Todo lo que necesitas.',
    toolsTitleB: 'Gratis.',
    toolsIntro: 'Elige lo que queréis preparar y Pío lo hace todo en un solo paso',
    choosePact: 'Elegir el pacto familiar',
    pactTitle: 'Pacto familiar',
    pactMeta: 'GRATIS · PDF PARA FIRMAR',
    chooseIphone: 'Elegir la guía para iPhone',
    iphoneTitle: 'Guía para iPhone',
    guideMeta: 'GRATIS · PDF PARA CONFIGURAR',
    chooseAndroid: 'Elegir la guía para Android',
    androidTitle: 'Guía para Android',
    chosen: 'Has elegido: ',
    chooseOne: 'Elige al menos una opción',
    downloadOne: 'Descargar guía (PDF)',
    downloadTwo: 'Descargar guías (PDF)',
    how: 'Cómo funciona',
    step1: 'Charláis con Pío',
    step1Body: 'Diez preguntas cortas, como una conversación. Mejor si lo hacéis juntos.',
    step2: 'Veis lo recomendado',
    step2Body: 'Pío os cuenta qué dicen los pediatras de vuestro país. La decisión es vuestra.',
    step3: 'Firmáis y a la nevera',
    step3Body: 'Descargáis el PDF, lo firmáis en familia y lo dejáis a la vista.',
    whyKicker: 'POR QUÉ UN PACTO',
    whyTitleA: 'No se trata de controlar.',
    whyTitleB: 'Se trata de acompañar.',
    whyBody: 'Cuando las normas se hablan y se firman juntos, se entienden mejor y se cumplen más. Y los padres también se comprometen: el móvil fuera de la mesa es para todos.',
    stories: 'Lo que dicen las familias',
    marta: 'madre de un niño de 10 años',
    martaQuote: 'Lo firmamos en la cocina y lo pegamos en la nevera. Por fin las normas del móvil están claras para los dos, también para nosotros.',
    andres: 'padre de una niña de 12 años',
    andresQuote: 'No fue un castigo. Fue la primera conversación tranquila sobre el móvil, y ella también puso sus condiciones.',
    elena: 'madre de dos, de 8 y 14 años',
    elenaQuote: 'Con dos edades no sirve el mismo tiempo. El pacto nos ayudó a dejarlo escrito sin discutir cada noche.',
    faqKicker: 'PREGUNTAS FRECUENTES',
    faqTitle: 'Lo que suelen preguntarnos',
    faqMissing: '¿No encuentras tu pregunta? ',
    faqWrite: 'Escríbele a Pío',
    waiting: 'Pío os está esperando.',
    waitingBody: '5 minutos. Gratis. Sin registro. Nada sale de tu navegador.',
    faqs: [
      ['¿Guardáis los datos de mi hijo?', 'No. Todo lo que escribes para crear el pacto, como el nombre o la edad, se procesa en tu navegador y nunca llega a nuestros servidores. Tampoco usamos cookies.'],
      ['¿De dónde salen las recomendaciones?', 'De la Asociación Española de Pediatría y su Plan Digital Familiar. Cada consejo de Pío enlaza a la fuente y muestra cuándo se revisó. Las edades mínimas de las apps salen de las condiciones de cada plataforma.'],
      ['¿Sirve si mi hijo ya tiene móvil?', 'Sí. Pío os pregunta si es el primer móvil o si queréis renovar el pacto, y adapta las preguntas y el tono.'],
      ['¿Es un documento legal?', 'No. Es un acuerdo familiar para hablar, decidir juntos y tenerlo a la vista. No tiene validez legal ni la pretende.'],
      ['¿Cuánto cuesta?', 'Nada. El pacto y la guía del móvil son gratis, sin anuncios y sin registro. Si os ayuda, podéis apoyar el proyecto de forma voluntaria.'],
      ['¿Para qué edades está pensado?', 'Para niños y niñas de 7 a 16 años. Si tiene menos de 7, Pío os explica por qué los pediatras recomiendan esperar.'],
      ['¿Puedo editar el pacto después de crearlo?', 'Sí. Antes de descargarlo podéis cambiar cualquier norma o texto, y volver a crearlo cuando lo reviséis.'],
    ] as [string, string][],
  },
  en: {
    skip: 'Skip to content',
    navSections: 'Sections',
    navPact: 'The pact',
    navGuides: 'Phone guides',
    closeMenu: 'Close menu',
    openMenu: 'Open menu',
    moreSections: 'More sections',
    questions: 'Questions',
    createPact: 'Create our pact',
    support: 'Support the project',
    privacy: 'Privacy',
    contact: 'Contact',
    heroTitle: 'Before the first phone, a good pact.',
    heroBody: 'You answer a few simple questions and download a family pact ready to sign, with what pediatricians recommend for their age.',
    cta: 'Create our pact for free',
    heroGuide: 'Pío guides you · 5 minutes · no sign-up',
    meet: 'Meet Pío',
    meetBody: 'Pío lives in every family\'s nest. He asks the important questions, tells you what pediatricians recommend for their age, and writes the pact with you. No judgment, no rush, and nothing you tell him is stored.',
    talk: 'Talk to Pío →',
    chatQ: 'When would you like the phone to rest?',
    chatMeals: 'At meals',
    chatBed: 'Before bed',
    chatCar: 'In the car',
    chatA: 'Noted. Eating dinner without screens is one of the things pediatricians recommend most.',
    toolsTitleA: 'Everything you need.',
    toolsTitleB: 'Free.',
    toolsIntro: 'Choose what you want to prepare and Pío does it all in one step',
    choosePact: 'Choose the family pact',
    pactTitle: 'Family pact',
    pactMeta: 'FREE · PDF TO SIGN',
    chooseIphone: 'Choose the iPhone guide',
    iphoneTitle: 'iPhone guide',
    guideMeta: 'FREE · PDF TO SET UP',
    chooseAndroid: 'Choose the Android guide',
    androidTitle: 'Android guide',
    chosen: 'You\'ve chosen: ',
    chooseOne: 'Choose at least one option',
    downloadOne: 'Download guide (PDF)',
    downloadTwo: 'Download guides (PDF)',
    how: 'How it works',
    step1: 'You talk with Pío',
    step1Body: 'Ten short questions, like a conversation. Better if you do it together.',
    step2: 'You see what is recommended',
    step2Body: 'Pío tells you what pediatricians in your country say. The decision is yours.',
    step3: 'You sign it and put it on the fridge',
    step3Body: 'You download the PDF, sign it as a family, and leave it where everyone can see it.',
    whyKicker: 'WHY A PACT',
    whyTitleA: 'It is not about control.',
    whyTitleB: 'It is about being there.',
    whyBody: 'When the rules are talked through and signed together, they are easier to understand and easier to keep. Parents commit too: phones off the table is for everyone.',
    stories: 'What families say',
    marta: 'mother of a 10-year-old boy',
    martaQuote: 'We signed it in the kitchen and stuck it on the fridge. At last the phone rules are clear for both of us, including us.',
    andres: 'father of a 12-year-old girl',
    andresQuote: 'It was not a punishment. It was the first calm conversation about the phone, and she set her conditions too.',
    elena: 'mother of two, ages 8 and 14',
    elenaQuote: 'With two ages, the same screen time does not work. The pact helped us write it down without arguing every night.',
    faqKicker: 'FREQUENTLY ASKED QUESTIONS',
    faqTitle: 'What people usually ask us',
    faqMissing: 'Can\'t find your question? ',
    faqWrite: 'Write to Pío',
    waiting: 'Pío is waiting for you.',
    waitingBody: '5 minutes. Free. No sign-up. Nothing leaves your browser.',
    faqs: [
      ['Do you keep my child\'s data?', 'No. Everything you write to create the pact, such as the name or the age, is processed in your browser and never reaches our servers. We do not use cookies either.'],
      ['Where do the recommendations come from?', 'From the Spanish Association of Pediatrics and its Family Digital Plan. Every tip from Pío links to the source and shows when it was reviewed. App minimum ages come from each platform\'s terms.'],
      ['Does it work if my child already has a phone?', 'Yes. Pío asks whether it is the first phone or whether you want to renew the pact, and adapts the questions and the tone.'],
      ['Is it a legal document?', 'No. It is a family agreement for talking, deciding together, and keeping it in sight. It has no legal standing, and it does not claim to.'],
      ['How much does it cost?', 'Nothing. The pact and the phone guide are free, with no ads and no sign-up. If it helps, you can support the project voluntarily.'],
      ['What ages is it for?', 'For children from 7 to 16. If they are under 7, Pío explains why pediatricians recommend waiting.'],
      ['Can I edit the pact after creating it?', 'Yes. Before you download it you can change any rule or text, and create it again when you review it.'],
    ] as [string, string][],
  },
};

const cta =
  'inline-flex max-w-full items-center justify-center rounded-lg bg-[#B4472F] px-6 py-5 text-center text-[15px] font-bold uppercase leading-snug tracking-[0.06em] text-[#FFF8EF] no-underline shadow-[0_10px_24px_-12px_rgba(180,71,47,0.7)] transition-colors duration-180 hover:bg-[#963A26] hover:text-[#FFF8EF] sm:px-11 sm:text-[17px] sm:leading-none';

function CheckIcon() {
  return (
    <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#FFF8EF" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12l5 5 9-10" />
    </svg>
  );
}

function ProductCard({
  checked,
  label,
  title,
  meta,
  onToggle,
  children,
}: {
  checked: boolean;
  label: string;
  title: string;
  meta: string;
  onToggle: () => void;
  children: ReactNode;
}) {
  return (
    <div
      className="flex flex-col gap-[22px] rounded-3xl bg-white px-3.5 pb-[30px] pt-3.5 shadow-[0_24px_50px_-36px_rgba(30,26,22,0.4)]"
      style={{ outline: checked ? '2px solid #B4472F' : '2px solid transparent', outlineOffset: -2 }}
    >
      <div className="relative h-[230px] overflow-hidden rounded-2xl bg-[#F7F3ED]">
        {children}
        <button
          type="button"
          role="checkbox"
          aria-checked={checked}
          aria-label={label}
          onClick={onToggle}
          className="absolute left-3.5 top-3.5 flex h-[30px] w-[30px] cursor-pointer items-center justify-center rounded-lg border-2 p-0"
          style={{
            borderColor: checked ? '#B4472F' : '#BDB3A6',
            background: checked ? '#B4472F' : '#FFFFFF',
          }}
        >
          {checked && <CheckIcon />}
        </button>
      </div>
      <div className="flex flex-col gap-1.5">
        <div className="font-display text-[28px] font-semibold text-[#1E1A16]">{title}</div>
        <div className="text-[13px] font-semibold tracking-[0.1em] text-[#8A8178]">{meta}</div>
      </div>
    </div>
  );
}

export default function Landing() {
  const { lang } = useLanguage();
  const c = lang === 'en' ? landingCopy.en : landingCopy.es;
  const tagline = brandTagline(lang);
  useEffect(() => {
    const prev = document.title;
    document.title = lang === 'en' ? 'PioPacto – the first phone pact' : 'PioPacto – el pacto del primer móvil';
    return () => { document.title = prev; };
  }, [lang]);
  const [pacto, setPacto] = useState(true);
  const [iphone, setIphone] = useState(false);
  const [android, setAndroid] = useState(false);
  const [open, setOpen] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  const names = [
    pacto ? c.pactTitle : null,
    iphone ? c.iphoneTitle : null,
    android ? c.androidTitle : null,
  ].filter(Boolean);
  const bundleText = names.length ? `${c.chosen}${names.join(' + ')}` : c.chooseOne;
  const guideIds = [iphone ? 'iphone' : '', android ? 'android' : ''].filter(Boolean);
  const bundleOff = !pacto && guideIds.length === 0;
  const bundleLabel = !pacto && guideIds.length === 1
    ? c.downloadOne
    : !pacto && guideIds.length === 2
      ? c.downloadTwo
      : c.cta;
  const bundleHref = !pacto && guideIds.length === 1
    ? `/tech-guide?platform=${guideIds[0]}&download=1`
    : !pacto && guideIds.length === 2
      ? '/tech-guide?platform=iphone&download=both'
      : guideIds.length
        ? `/crear?guias=${guideIds.join(',')}`
        : '/crear';

  return (
    <div lang={lang === 'en' ? 'en' : 'es'} className="min-w-0 overflow-x-hidden bg-[#FFFDF8] font-sans text-[#1E1A16]">
      <a href="#main-content" className="skip-link">
        {c.skip}
      </a>

      <header className="relative mx-auto flex max-w-[1180px] items-center justify-between gap-4 px-4 py-4 sm:px-8 sm:py-5">
        <Link to="/" className="no-underline" aria-label={tagline ? `PioPacto, ${tagline}` : 'PioPacto'}>
          <BrandMark subtitle={tagline} />
        </Link>
        <div className="flex items-center gap-3 sm:gap-6">
          <nav aria-label={c.navSections} className="hidden items-center gap-6 text-[15px] text-[#1E1A16] md:flex">
            <Link to="/crear" className="no-underline hover:text-[#A8432D]">{c.navPact}</Link>
            <a href="#guias" className="no-underline hover:text-[#A8432D]">{c.navGuides}</a>
          </nav>
          <LanguageSelector pill />
          <button
            type="button"
            aria-label={menuOpen ? c.closeMenu : c.openMenu}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
            className="flex h-11 w-11 items-center justify-center border-0 bg-transparent"
          >
            <svg aria-hidden="true" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1E1A16" strokeWidth="1.75" strokeLinecap="round">
              {menuOpen ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </div>
        {menuOpen && (
          <nav aria-label={c.moreSections} className="absolute left-4 right-4 top-full z-20 flex flex-col gap-3 rounded-lg bg-[#FFFDF8] px-4 py-4 shadow-[0_2px_0_rgba(30,26,22,0.06)] sm:left-8 sm:right-8">
            <Link to="/crear" className="text-[#A8432D] no-underline hover:text-[#7E2F1E]" onClick={() => setMenuOpen(false)}>{c.navPact}</Link>
            <a href="#guias" className="text-[#A8432D] no-underline hover:text-[#7E2F1E]" onClick={() => setMenuOpen(false)}>{c.navGuides}</a>
            <a href="#faq" className="text-[#A8432D] no-underline hover:text-[#7E2F1E]" onClick={() => setMenuOpen(false)}>{c.questions}</a>
            <Link to="/crear" className="text-[#A8432D] no-underline hover:text-[#7E2F1E]" onClick={() => setMenuOpen(false)}>{c.createPact}</Link>
            <a href={SUPPORT_URL} className="text-[#A8432D] no-underline hover:text-[#7E2F1E]" target="_blank" rel="noreferrer">{c.support}</a>
            <Link to="/privacy" className="text-[#A8432D] no-underline hover:text-[#7E2F1E]" onClick={() => setMenuOpen(false)}>{c.privacy}</Link>
            <a href={FEEDBACK_MAIL} className="text-[#A8432D] no-underline hover:text-[#7E2F1E]">{c.contact}</a>
          </nav>
        )}
      </header>

      <main id="main-content">
        <section className="mx-auto flex max-w-[1180px] flex-col items-center gap-5 px-4 pt-8 text-center sm:px-8 sm:pt-10">
          <h1 className="m-0 max-w-[860px] font-display text-[40px] font-medium leading-[1.08] tracking-[-0.02em] sm:text-[52px] lg:text-[58px]">
            {c.heroTitle}
          </h1>
          <p className="m-0 max-w-[680px] text-[17px] leading-normal text-[#5F574E] sm:text-[21px] sm:leading-[1.5]">
            {c.heroBody}
          </p>
          <Link to="/crear" className={`${cta} mt-2`}>
            {c.cta}
          </Link>
          <div className="flex items-center gap-2.5 text-[15px] text-[#5F574E]">
            <PioMini size={30} bob />
            <span>{c.heroGuide}</span>
          </div>
        </section>

        <div className="mx-auto mt-6 max-w-[1180px] px-4 sm:px-8">
          <HeroScene />
        </div>

        <section className="bg-[#F6F1E9]">
          <div className="mx-auto flex max-w-[1180px] flex-wrap items-center gap-10 px-4 py-16 sm:gap-14 sm:px-8 sm:py-24">
            <div className="flex min-w-0 flex-[1_1_420px] flex-col gap-[18px]">
              <PioNest />
              <h2 className="m-0 font-display text-[34px] font-medium leading-[1.08] sm:text-[46px]">{c.meet}</h2>
              <p className="m-0 text-[17px] leading-[1.6] text-[#5F574E] sm:text-[19px]">
                {c.meetBody}
              </p>
              <Link to="/crear" className="self-start text-[17px] font-semibold text-[#A8432D] no-underline hover:text-[#7E2F1E]">
                {c.talk}
              </Link>
            </div>
            <div className="flex min-w-0 flex-[1_1_420px] flex-col gap-3 rounded-[20px] bg-[#FFFDF8] p-7 shadow-[0_30px_60px_-40px_rgba(30,26,22,0.45)]">
              <div className="a-pop1 flex items-end gap-2.5">
                <PioMini size={34} />
                <div className="max-w-[80%] rounded-[18px] rounded-bl-[4px] bg-[#F6F1E9] px-4 py-3 text-[16px] leading-[1.45]">
                  {c.chatQ}
                </div>
              </div>
              <div className="a-pop2 flex flex-wrap justify-end gap-2 pl-11">
                <span className="rounded-full bg-[#B4472F] px-3.5 py-[9px] text-[15px] font-semibold text-[#FFF8EF]">{c.chatMeals}</span>
                <span className="rounded-full bg-[#B4472F] px-3.5 py-[9px] text-[15px] font-semibold text-[#FFF8EF]">{c.chatBed}</span>
                <span className="rounded-full border-[1.5px] border-[rgba(30,26,22,0.2)] px-[13px] py-2 text-[15px]">{c.chatCar}</span>
              </div>
              <div className="a-pop3 flex items-end gap-2.5">
                <PioMini size={34} smile />
                <div className="max-w-[80%] rounded-[18px] rounded-bl-[4px] bg-[#F6F1E9] px-4 py-3 text-[16px] leading-[1.45]">
                  {c.chatA}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="guias" className="bg-[#F6F1E9]">
          <div className="mx-auto flex max-w-[1180px] flex-col items-center gap-12 px-4 py-16 text-center sm:px-8 sm:py-[104px]">
            <div className="flex flex-col items-center gap-3.5">
              <h2 className="m-0 font-display text-[36px] font-medium leading-[1.08] tracking-[-0.01em] sm:text-[52px]">
                {c.toolsTitleA}<br />{c.toolsTitleB}
              </h2>
              <p className="m-0 text-[17px] text-[#5F574E] sm:text-[19px]">{c.toolsIntro}</p>
            </div>
            <div className="grid w-full gap-5 [grid-template-columns:repeat(auto-fit,minmax(min(100%,260px),1fr))]">
              <ProductCard checked={pacto} label={c.choosePact} title={c.pactTitle} meta={c.pactMeta} onToggle={() => setPacto((v) => !v)}>
                <IllPacto />
              </ProductCard>
              <ProductCard checked={iphone} label={c.chooseIphone} title={c.iphoneTitle} meta={c.guideMeta} onToggle={() => setIphone((v) => !v)}>
                <IllIphone />
              </ProductCard>
              <ProductCard checked={android} label={c.chooseAndroid} title={c.androidTitle} meta={c.guideMeta} onToggle={() => setAndroid((v) => !v)}>
                <IllAndroid />
              </ProductCard>
            </div>
            <div className="mt-2 flex flex-col items-center gap-3.5">
              {bundleOff ? (
                <button type="button" aria-disabled="true" disabled className={`${cta} px-8 text-[16px] sm:px-16 sm:py-[22px] sm:text-[18px]`} style={{ background: '#EDE6DB', color: '#8A8178', boxShadow: 'none', cursor: 'not-allowed', opacity: 1 }}>
                  {bundleLabel}
                </button>
              ) : (
                <Link to={bundleHref} className={`${cta} px-8 text-[16px] shadow-[0_12px_28px_-12px_rgba(180,71,47,0.75)] sm:px-16 sm:py-[22px] sm:text-[18px]`}>
                  {bundleLabel}
                </Link>
              )}
              <div className="text-[14px] text-[#6B635A]">{bundleText}</div>
            </div>
          </div>
        </section>

        <section className="bg-[#F6F1E9]">
          <div className="mx-auto flex max-w-[1180px] flex-col items-center gap-10 px-4 py-16 text-center sm:gap-14 sm:px-8 sm:py-[104px]">
            <h2 className="m-0 font-display text-[34px] font-medium leading-[1.08] sm:text-[46px]">{c.how}</h2>
            <div className="grid w-full gap-10 [grid-template-columns:repeat(auto-fit,minmax(min(100%,260px),1fr))]">
              <div className="flex flex-col items-center gap-3.5">
                <StepTalk />
                <div className="font-display text-[24px] font-semibold">{c.step1}</div>
                <p className="m-0 max-w-[280px] text-[16px] leading-normal text-[#5F574E]">{c.step1Body}</p>
              </div>
              <div className="flex flex-col items-center gap-3.5">
                <StepClock />
                <div className="font-display text-[24px] font-semibold">{c.step2}</div>
                <p className="m-0 max-w-[280px] text-[16px] leading-normal text-[#5F574E]">{c.step2Body}</p>
              </div>
              <div className="flex flex-col items-center gap-3.5">
                <StepSign />
                <div className="font-display text-[24px] font-semibold">{c.step3}</div>
                <p className="m-0 max-w-[280px] text-[16px] leading-normal text-[#5F574E]">{c.step3Body}</p>
              </div>
            </div>
            <Link to="/crear" className="inline-flex max-w-full items-center justify-center rounded-lg bg-[#B4472F] px-8 py-[18px] text-center text-[16px] font-bold uppercase leading-snug tracking-[0.06em] text-[#FFF8EF] no-underline transition-colors duration-180 hover:bg-[#963A26] hover:text-[#FFF8EF]">
              {c.cta}
            </Link>
          </div>
        </section>

        <section className="mx-auto flex max-w-[1180px] flex-wrap items-center gap-10 px-4 py-16 sm:gap-14 sm:px-8 sm:py-[104px]">
          <div className="min-w-0 flex-[1_1_440px]">
            <KitchenTable />
          </div>
          <div className="flex min-w-0 flex-[1_1_420px] flex-col gap-[22px]">
            <div className="text-[12px] font-semibold tracking-[0.14em] text-[#A8432D]">{c.whyKicker}</div>
            <h2 className="m-0 font-display text-[32px] font-medium leading-[1.1] sm:text-[44px]">
              {c.whyTitleA}<br />{c.whyTitleB}
            </h2>
            <p className="m-0 text-[17px] leading-[1.6] text-[#5F574E] sm:text-[19px]">
              {c.whyBody}
            </p>
          </div>
        </section>

        <section className="bg-[#F6F1E9]">
          <div className="mx-auto flex max-w-[1180px] flex-col items-center gap-10 px-4 py-16 sm:px-8 sm:py-24">
            <h2 className="m-0 text-center font-display text-[32px] font-medium leading-[1.1] sm:text-[42px]">{c.stories}</h2>
            <div className="grid w-full gap-5 [grid-template-columns:repeat(auto-fit,minmax(min(100%,280px),1fr))]">
              <figure className="m-0 flex flex-col gap-4 rounded-2xl bg-[#FFFDF8] p-[26px]">
                <figcaption className="flex items-center gap-3">
                  <PortraitMarta />
                  <span>
                    <strong className="block text-[15px]">Marta</strong>
                    <span className="text-[13px] text-[#6B635A]">{c.marta}</span>
                  </span>
                </figcaption>
                <blockquote className="m-0 text-[16px] leading-[1.55] text-[#3B3530]">{c.martaQuote}</blockquote>
              </figure>
              <figure className="m-0 flex flex-col gap-4 rounded-2xl bg-[#FFFDF8] p-[26px]">
                <figcaption className="flex items-center gap-3">
                  <PortraitAndres />
                  <span>
                    <strong className="block text-[15px]">Andrés</strong>
                    <span className="text-[13px] text-[#6B635A]">{c.andres}</span>
                  </span>
                </figcaption>
                <blockquote className="m-0 text-[16px] leading-[1.55] text-[#3B3530]">{c.andresQuote}</blockquote>
              </figure>
              <figure className="m-0 flex flex-col gap-4 rounded-2xl bg-[#FFFDF8] p-[26px]">
                <figcaption className="flex items-center gap-3">
                  <PortraitElena />
                  <span>
                    <strong className="block text-[15px]">Elena</strong>
                    <span className="text-[13px] text-[#6B635A]">{c.elena}</span>
                  </span>
                </figcaption>
                <blockquote className="m-0 text-[16px] leading-[1.55] text-[#3B3530]">{c.elenaQuote}</blockquote>
              </figure>
            </div>
          </div>
        </section>

        <section id="faq" className="mx-auto flex max-w-[1180px] flex-wrap gap-10 px-4 pb-10 pt-16 sm:gap-14 sm:px-8 sm:pt-[104px]">
          <div className="flex min-w-0 flex-[1_1_320px] flex-col gap-4">
            <FaqPio />
            <div className="text-[12px] font-semibold tracking-[0.14em] text-[#A8432D]">{c.faqKicker}</div>
            <h2 className="m-0 font-display text-[32px] font-medium leading-[1.1] sm:text-[42px]">{c.faqTitle}</h2>
            <p className="m-0 text-[16px] leading-[1.55] text-[#5F574E]">
              {c.faqMissing}
              <a href={FEEDBACK_MAIL} className="text-[#A8432D] hover:text-[#7E2F1E]">{c.faqWrite}</a>.
            </p>
          </div>
          <div className="flex min-w-0 flex-[2_1_560px] flex-col border-b border-[rgba(30,26,22,0.14)]">
            {c.faqs.map(([q, a], i) => {
              const isOpen = open === i;
              return (
                <div key={q} className="border-t border-[rgba(30,26,22,0.14)]">
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => setOpen(isOpen ? -1 : i)}
                    className="flex w-full cursor-pointer items-center justify-between gap-4 border-0 bg-transparent py-[22px] text-left font-[inherit] text-[18px] font-semibold text-[#1E1A16]"
                  >
                    {q}
                    <span
                      className="flex h-8 w-8 flex-none items-center justify-center rounded-full text-[20px] leading-none"
                      style={{ background: isOpen ? '#B4472F' : '#F6F1E9', color: isOpen ? '#FFF8EF' : '#B4472F' }}
                    >
                      {isOpen ? '\u2212' : '+'}
                    </span>
                  </button>
                  {isOpen && <p className="mb-6 mr-12 mt-0 text-[16px] leading-[1.6] text-[#5F574E]">{a}</p>}
                </div>
              );
            })}
          </div>
        </section>

        <section className="mx-auto flex max-w-[1180px] flex-col items-center gap-5 px-4 py-16 text-center sm:px-8 sm:pb-[88px] sm:pt-24">
          <PioWaiting />
          <h2 className="m-0 font-display text-[36px] font-medium leading-[1.08] sm:text-[48px]">{c.waiting}</h2>
          <p className="m-0 text-[17px] text-[#5F574E] sm:text-[19px]">{c.waitingBody}</p>
          <Link to="/crear" className={`${cta} mt-2`}>
            {c.cta}
          </Link>
        </section>
      </main>

      <footer className="border-t border-[rgba(30,26,22,0.1)]">
        <div className="mx-auto flex max-w-[1180px] flex-wrap items-center justify-between gap-4 px-4 py-8 text-[14px] text-[#6B635A] sm:px-8">
          <BrandMark compact />
          <div className="flex flex-wrap gap-[22px]">
            <a href="#faq" className="text-[#A8432D] hover:text-[#7E2F1E]">{c.questions}</a>
            <a href={SUPPORT_URL} className="text-[#A8432D] hover:text-[#7E2F1E]" target="_blank" rel="noreferrer">{c.support}</a>
            <Link to="/privacy" className="text-[#A8432D] hover:text-[#7E2F1E]">{c.privacy}</Link>
            <a href={FEEDBACK_MAIL} className="text-[#A8432D] hover:text-[#7E2F1E]">{c.contact}</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
