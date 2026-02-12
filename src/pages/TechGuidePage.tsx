import { useState, useRef } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import LanguageSelector from '@/components/LanguageSelector';
import { motion } from 'framer-motion';
import {
  Smartphone, Download, ArrowLeft, Apple, Clock, Shield,
  Lock, Eye, ShoppingCart, MapPin, Globe, CheckCircle2,
  AlertTriangle, Heart, Settings, Users
} from 'lucide-react';

type Platform = 'iphone' | 'android';

export default function TechGuidePage() {
  const { t, lang } = useLanguage();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const initialPlatform = (searchParams.get('platform') as Platform) || 'iphone';
  const [platform, setPlatform] = useState<Platform>(initialPlatform);
  const guideRef = useRef<HTMLDivElement>(null);

  const isEs = lang === 'es';

  const handleDownloadPdf = async () => {
    if (!guideRef.current) return;
    const el = guideRef.current;
    el.style.maxWidth = '700px';
    el.style.width = '700px';

    const html2pdf = (await import('html2pdf.js')).default;
    const filename = platform === 'iphone'
      ? (isEs ? 'guia-configurar-iphone-hijo.pdf' : 'iphone-setup-guide-child.pdf')
      : (isEs ? 'guia-configurar-android-hijo.pdf' : 'android-setup-guide-child.pdf');

    await html2pdf()
      .set({
        margin: [10, 12, 10, 12],
        filename,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2.5, useCORS: true, logging: false, letterRendering: true },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
        pagebreak: { mode: ['css', 'legacy'], avoid: ['.no-break'] },
      })
      .from(el)
      .save();

    el.style.maxWidth = '';
    el.style.width = '';
  };

  const iphoneSteps = isEs ? [
    {
      icon: Users,
      title: 'Crear Apple ID para el niño (con En Familia)',
      why: 'Permite controlar compras, descargas y tiempo de uso desde tu propio iPhone.',
      steps: [
        'Ve a Ajustes',
        'Toca tu nombre',
        'Entra en "En Familia"',
        'Añadir miembro de la familia',
        'Crear cuenta para un menor',
      ],
      benefits: ['Aprobar descargas', 'Ver tiempo de uso', 'Controlar compras', 'Gestionar permisos'],
    },
    {
      icon: Clock,
      title: 'Activar "Tiempo de Uso"',
      why: 'El cerebro infantil no tiene aún autocontrol digital desarrollado. Los límites externos ayudan a crear autorregulación futura.',
      steps: [
        'Ajustes → Tiempo de uso',
        'Activar Tiempo de uso',
        'Configurar como "Este es el iPhone de un niño"',
      ],
      tip: 'Este es el punto clave de toda la configuración.',
    },
    {
      icon: Clock,
      title: 'Limitar tiempo diario total',
      why: 'Establece un horario claro que bloquea el teléfono automáticamente.',
      steps: [
        'Tiempo de uso → Tiempo de inactividad',
        'Establecer horario (ej. 20:30 – 7:00)',
      ],
      recommendations: '8–10 años: 45–60 min · 11–13 años: 60–90 min · 14–16 años: 1.5–2 h',
      tip: 'Es mejor que el límite lo ponga el sistema, no tú. Reduce discusiones y convierte la norma en algo previsible.',
    },
    {
      icon: Lock,
      title: 'Limitar apps concretas',
      why: 'No todas las apps generan el mismo impacto. Los juegos y redes sociales merecen límites específicos.',
      steps: [
        'Tiempo de uso → Límites de apps',
        'Añadir límite',
        'Seleccionar categorías o apps específicas',
      ],
      tip: 'Ejemplo: Juegos: 30 min · Redes sociales: 20 min. Cuando el tiempo termina, la app se bloquea.',
    },
    {
      icon: Shield,
      title: 'Restringir contenido por edad',
      why: 'Protege de contenido inapropiado sin necesidad de supervisar constantemente.',
      steps: [
        'Tiempo de uso → Contenido y privacidad',
        'Restricciones de contenido',
      ],
      benefits: ['Películas por edad', 'Apps por clasificación', 'Música explícita', 'Web inapropiada'],
      tip: 'Activa "Limitar sitios web para adultos".',
    },
    {
      icon: ShoppingCart,
      title: 'Limitar compras dentro de apps',
      why: 'Evita gastos impulsivos y sorpresas en la factura.',
      steps: [
        'Ajustes → Tiempo de uso → Contenido y privacidad',
        'Compras en iTunes y App Store',
        'Desactivar: Compras dentro de apps',
        'Desactivar: Instalación sin aprobación',
      ],
    },
    {
      icon: Eye,
      title: 'Configurar privacidad y ubicación',
      why: 'Controla qué apps acceden a la cámara, micrófono, fotos y ubicación.',
      steps: [
        'Ajustes → Privacidad y seguridad',
        'Revisar: Localización (solo apps necesarias)',
        'Revisar: Cámara, Micrófono, Fotos',
      ],
      tip: 'Explícale por qué revisas estos permisos. No es vigilancia, es acompañamiento.',
    },
    {
      icon: Globe,
      title: 'Navegador seguro',
      why: 'Limita el acceso a contenido web no adecuado.',
      steps: [
        'Ajustes → Tiempo de uso → Restricciones de contenido',
        'Limitar contenido web',
      ],
      tip: 'También puedes instalar un navegador con control parental como alternativa.',
    },
  ] : [
    {
      icon: Users,
      title: 'Create Apple ID for the child (with Family Sharing)',
      why: 'Lets you control purchases, downloads, and screen time from your own iPhone.',
      steps: [
        'Go to Settings',
        'Tap your name',
        'Enter "Family Sharing"',
        'Add family member',
        'Create account for a child',
      ],
      benefits: ['Approve downloads', 'View screen time', 'Control purchases', 'Manage permissions'],
    },
    {
      icon: Clock,
      title: 'Enable "Screen Time"',
      why: 'Children\'s brains haven\'t yet developed digital self-control. External limits help build future self-regulation.',
      steps: [
        'Settings → Screen Time',
        'Enable Screen Time',
        'Set up as "This is My Child\'s iPhone"',
      ],
      tip: 'This is the key point of the entire setup.',
    },
    {
      icon: Clock,
      title: 'Set daily time limits',
      why: 'Sets a clear schedule that automatically locks the phone.',
      steps: [
        'Screen Time → Downtime',
        'Set schedule (e.g. 8:30 PM – 7:00 AM)',
      ],
      recommendations: '8–10 years: 45–60 min · 11–13 years: 60–90 min · 14–16 years: 1.5–2 h',
      tip: 'It\'s better for the system to enforce the limit, not you. Reduces arguments and makes the rule predictable.',
    },
    {
      icon: Lock,
      title: 'Limit specific apps',
      why: 'Not all apps have the same impact. Games and social media deserve specific limits.',
      steps: [
        'Screen Time → App Limits',
        'Add Limit',
        'Select categories or specific apps',
      ],
      tip: 'Example: Games: 30 min · Social media: 20 min. When time is up, the app locks.',
    },
    {
      icon: Shield,
      title: 'Restrict content by age',
      why: 'Protects from inappropriate content without constant monitoring.',
      steps: [
        'Screen Time → Content & Privacy Restrictions',
        'Content Restrictions',
      ],
      benefits: ['Movies by age rating', 'Apps by classification', 'Explicit music', 'Inappropriate websites'],
      tip: 'Enable "Limit Adult Websites".',
    },
    {
      icon: ShoppingCart,
      title: 'Limit in-app purchases',
      why: 'Prevents impulse spending and billing surprises.',
      steps: [
        'Settings → Screen Time → Content & Privacy',
        'iTunes & App Store Purchases',
        'Disable: In-App Purchases',
        'Disable: Installing without approval',
      ],
    },
    {
      icon: Eye,
      title: 'Configure privacy and location',
      why: 'Control which apps access camera, microphone, photos and location.',
      steps: [
        'Settings → Privacy & Security',
        'Review: Location Services (only necessary apps)',
        'Review: Camera, Microphone, Photos',
      ],
      tip: 'Explain why you review these permissions. It\'s not surveillance, it\'s guidance.',
    },
    {
      icon: Globe,
      title: 'Safe browsing',
      why: 'Limits access to inappropriate web content.',
      steps: [
        'Settings → Screen Time → Content Restrictions',
        'Limit Web Content',
      ],
      tip: 'You can also install a browser with parental controls as an alternative.',
    },
  ];

  const androidSteps = isEs ? [
    {
      icon: Settings,
      title: 'Instalar Google Family Link',
      why: 'Es la herramienta principal de control parental en Android. Fundamental configurarlo antes de que el niño use el teléfono.',
      steps: [
        'En tu teléfono: Descargar "Google Family Link para padres"',
        'En el teléfono del niño: Crear cuenta Google para menor',
      ],
    },
    {
      icon: Users,
      title: 'Vincular dispositivos',
      why: 'Conecta tu cuenta con la del niño para gestionar todo remotamente.',
      steps: [
        'Abrir Family Link',
        'Añadir cuenta del niño',
        'Vincular al dispositivo Android',
      ],
      benefits: ['Ver tiempo de uso', 'Aprobar apps', 'Bloquear el dispositivo remotamente'],
    },
    {
      icon: Clock,
      title: 'Limitar tiempo diario total',
      why: 'Cuando termina el tiempo, el teléfono se bloquea. Esto es clave.',
      steps: [
        'Family Link → Controles → Tiempo de pantalla',
        'Establecer límite diario',
        'Definir horario de uso',
        'Configurar hora de dormir (bloqueo automático)',
      ],
      recommendations: '8–10 años: 45–60 min · 11–13 años: 60–90 min · 14–16 años: 1.5–2 h',
    },
    {
      icon: Lock,
      title: 'Aprobar descargas',
      why: 'Evita que instale apps sin supervisión.',
      steps: [
        'Family Link → Controles → Google Play',
        'Activar: Aprobar todas las descargas',
      ],
    },
    {
      icon: Shield,
      title: 'Restringir contenido por edad',
      why: 'Filtra contenido inapropiado automáticamente.',
      steps: [
        'En Google Play: Establecer clasificación por edad',
        'Bloquear contenido explícito',
        'Filtrar búsquedas',
      ],
    },
    {
      icon: ShoppingCart,
      title: 'Limitar compras',
      why: 'Previene gastos no autorizados.',
      steps: [
        'Google Play → Configuración',
        'Requerir autenticación para compras',
        'O desactivar compras completamente',
      ],
    },
    {
      icon: Globe,
      title: 'Control del navegador',
      why: 'Protege la navegación web del niño.',
      steps: [
        'En Chrome: Activar SafeSearch',
        'Activar filtros de contenido',
        'Bloquear páginas específicas desde Family Link',
      ],
    },
    {
      icon: MapPin,
      title: 'Ubicación',
      why: 'Permite saber dónde está el dispositivo. Importante: explicarlo antes.',
      steps: [
        'Family Link → Ver ubicación del dispositivo',
        'Activar/desactivar permisos de ubicación',
      ],
      tip: 'Siempre explícale antes que puedes ver su ubicación. La transparencia genera confianza.',
    },
  ] : [
    {
      icon: Settings,
      title: 'Install Google Family Link',
      why: 'The main parental control tool on Android. Essential to set up before the child uses the phone.',
      steps: [
        'On your phone: Download "Google Family Link for parents"',
        'On the child\'s phone: Create a Google account for a minor',
      ],
    },
    {
      icon: Users,
      title: 'Link devices',
      why: 'Connect your account with the child\'s to manage everything remotely.',
      steps: [
        'Open Family Link',
        'Add child\'s account',
        'Link to the Android device',
      ],
      benefits: ['View screen time', 'Approve apps', 'Lock device remotely'],
    },
    {
      icon: Clock,
      title: 'Set daily time limits',
      why: 'When time is up, the phone locks. This is key.',
      steps: [
        'Family Link → Controls → Screen Time',
        'Set daily limit',
        'Define usage schedule',
        'Set bedtime (automatic lock)',
      ],
      recommendations: '8–10 years: 45–60 min · 11–13 years: 60–90 min · 14–16 years: 1.5–2 h',
    },
    {
      icon: Lock,
      title: 'Approve downloads',
      why: 'Prevents installing apps without supervision.',
      steps: [
        'Family Link → Controls → Google Play',
        'Enable: Approve all downloads',
      ],
    },
    {
      icon: Shield,
      title: 'Restrict content by age',
      why: 'Automatically filters inappropriate content.',
      steps: [
        'In Google Play: Set age rating',
        'Block explicit content',
        'Filter searches',
      ],
    },
    {
      icon: ShoppingCart,
      title: 'Limit purchases',
      why: 'Prevents unauthorized spending.',
      steps: [
        'Google Play → Settings',
        'Require authentication for purchases',
        'Or disable purchases completely',
      ],
    },
    {
      icon: Globe,
      title: 'Browser control',
      why: 'Protects the child\'s web browsing.',
      steps: [
        'In Chrome: Enable SafeSearch',
        'Enable content filters',
        'Block specific pages from Family Link',
      ],
    },
    {
      icon: MapPin,
      title: 'Location',
      why: 'Lets you know where the device is. Important: explain it first.',
      steps: [
        'Family Link → View device location',
        'Enable/disable location permissions',
      ],
      tip: 'Always explain beforehand that you can see their location. Transparency builds trust.',
    },
  ];

  const steps = platform === 'iphone' ? iphoneSteps : androidSteps;

  const beforeDelivery = isEs
    ? [
        'Revisa que no tenga apps descargadas innecesarias.',
        'Ajusta el fondo de pantalla juntos.',
        'Habla del acuerdo familiar.',
        'Explica qué pasa cuando se acaba el tiempo.',
      ]
    : [
        'Check that no unnecessary apps are installed.',
        'Set the wallpaper together.',
        'Discuss the family agreement.',
        'Explain what happens when time runs out.',
      ];

  const psychNote = isEs
    ? {
        title: 'Parte psicológica clave',
        subtitle: 'Limitar tiempo no es castigo. Es estructura.',
        points: [
          'Los niños no tienen madurez prefrontal completa.',
          'Buscan recompensa inmediata.',
          'Les cuesta frenar estímulos digitales.',
          'El límite externo crea seguridad.',
        ],
        extras: [
          'Revisar el acuerdo cada 3 meses.',
          'Ajustar límites según madurez.',
          'No usar el móvil como premio o castigo constante.',
          'Mantener espacios sin pantalla (comidas, noche, colegio).',
        ],
      }
    : {
        title: 'Key psychological insight',
        subtitle: 'Limiting time isn\'t punishment. It\'s structure.',
        points: [
          'Children don\'t have full prefrontal maturity.',
          'They seek immediate rewards.',
          'They struggle to resist digital stimuli.',
          'External limits create security.',
        ],
        extras: [
          'Review the agreement every 3 months.',
          'Adjust limits based on maturity.',
          'Don\'t use the phone as a constant reward or punishment.',
          'Keep screen-free spaces (meals, nighttime, school).',
        ],
      };

  const guideTitle = isEs
    ? (platform === 'iphone'
        ? 'Cómo configurar un iPhone para tu hijo paso a paso'
        : 'Cómo configurar un Android para tu hijo paso a paso')
    : (platform === 'iphone'
        ? 'How to set up an iPhone for your child step by step'
        : 'How to set up an Android for your child step by step');

  const guideSubtitle = isEs
    ? 'Una preparación consciente antes de entregarlo'
    : 'A conscious preparation before handing it over';

  const introText = isEs
    ? platform === 'iphone'
      ? 'El smartphone no es solo un dispositivo. Es acceso a comunicación, entretenimiento, presión social y mundo digital sin filtro. Configurar bien el teléfono antes de entregarlo reduce conflictos futuros, evita negociaciones constantes, protege su desarrollo y da estructura clara desde el inicio.'
      : 'En Android, el control se hace principalmente con Google Family Link. Es fundamental configurarlo antes de que el niño use el teléfono.'
    : platform === 'iphone'
      ? 'A smartphone isn\'t just a device. It\'s access to communication, entertainment, social pressure, and an unfiltered digital world. Setting up the phone properly before handing it over reduces future conflicts, avoids constant negotiations, protects their development, and provides clear structure from the start.'
      : 'On Android, parental control is mainly done through Google Family Link. It\'s essential to set it up before the child uses the phone.';

  const motto = isEs
    ? 'Primero se configura. Después se entrega.'
    : 'First you set it up. Then you hand it over.';

  const objectiveText = isEs
    ? 'El objetivo no es controlar. Es acompañar.'
    : 'The goal isn\'t to control. It\'s to guide.';

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-border/40" role="banner">
        <nav className="flex items-center justify-between px-6 py-4 max-w-3xl mx-auto">
          <div className="flex items-center gap-2">
            <Smartphone className="h-5 w-5 text-primary" aria-hidden="true" />
            <span className="font-bold text-foreground">{t('brandName')}</span>
          </div>
          <LanguageSelector />
        </nav>
      </header>

      {/* Actions bar */}
      <div className="max-w-3xl mx-auto px-6 py-4 flex flex-wrap items-center gap-3">
        <button onClick={() => navigate('/')}
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="h-4 w-4" /> {t('back')}
        </button>
        <div className="flex-1" />

        {/* Platform toggle */}
        <div className="inline-flex rounded-xl border border-border bg-card p-1 gap-1">
          <button
            onClick={() => setPlatform('iphone')}
            className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              platform === 'iphone'
                ? 'bg-primary text-primary-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <Apple className="h-4 w-4" /> iPhone
          </button>
          <button
            onClick={() => setPlatform('android')}
            className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              platform === 'android'
                ? 'bg-primary text-primary-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <Smartphone className="h-4 w-4" /> Android
          </button>
        </div>

        <button onClick={handleDownloadPdf}
          className="inline-flex items-center gap-1.5 gradient-primary text-primary-foreground px-4 py-2 rounded-xl text-sm font-bold shadow-md hover:shadow-lg transition-shadow">
          <Download className="h-4 w-4" /> {isEs ? 'Descargar PDF' : 'Download PDF'}
        </button>
      </div>

      {/* Guide content */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        className="max-w-3xl mx-auto px-6 pb-16">
        <div ref={guideRef}
          className="rounded-2xl border border-border/40 shadow-sm bg-card"
          style={{ padding: '2.5rem', lineHeight: 1.7, fontFamily: "'Inter', system-ui, sans-serif" }}>

          {/* Header */}
          <div className="text-center mb-10 no-break">
            <div className="mx-auto mb-4 flex items-center justify-center"
              style={{ width: 56, height: 56, borderRadius: 16, background: 'hsl(var(--primary))', color: '#fff' }}>
              {platform === 'iphone' ? <Apple style={{ width: 28, height: 28 }} /> : <Smartphone style={{ width: 28, height: 28 }} />}
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground mb-2">
              {guideTitle}
            </h1>
            <p className="text-muted-foreground">{guideSubtitle}</p>
          </div>

          {/* Intro */}
          <div className="mb-10 no-break">
            <div className="bg-secondary/50 rounded-xl p-6 border border-border/30">
              <h2 className="font-bold text-foreground mb-3 flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-accent" />
                {isEs ? 'Antes de empezar' : 'Before you start'}
              </h2>
              <p className="text-sm text-foreground leading-relaxed mb-4">{introText}</p>
              <p className="font-bold text-primary text-sm">{motto}</p>
            </div>
          </div>

          {/* Steps */}
          <div className="space-y-8 mb-10">
            {steps.map((step, i) => (
              <div key={i} className="no-break" style={{ pageBreakInside: 'avoid' }}>
                <div className="flex items-start gap-4 mb-3">
                  <span style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '32px',
                    height: '32px',
                    minWidth: '32px',
                    borderRadius: '50%',
                    background: 'hsl(var(--primary) / 0.1)',
                    color: 'hsl(var(--primary))',
                    fontSize: '14px',
                    fontWeight: 700,
                    flexShrink: 0,
                  }}>
                    {i + 1}
                  </span>
                  <div className="flex-1">
                    <h3 className="font-bold text-foreground text-lg">{step.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{step.why}</p>
                  </div>
                </div>

                <div className="ml-12">
                  {/* Steps list */}
                  <div className="space-y-1.5 mb-3">
                    {step.steps.map((s, j) => (
                      <div key={j} className="flex items-start gap-2 text-sm text-foreground">
                        <span className="text-primary mt-0.5 flex-shrink-0">→</span>
                        <span>{s}</span>
                      </div>
                    ))}
                  </div>

                  {/* Benefits */}
                  {'benefits' in step && step.benefits && (
                    <div className="flex flex-wrap gap-2 mb-3">
                      {step.benefits.map((b, j) => (
                        <span key={j} className="inline-flex items-center gap-1 text-xs bg-primary/10 text-primary px-2.5 py-1 rounded-full font-medium">
                          <CheckCircle2 className="h-3 w-3" /> {b}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Recommendations */}
                  {'recommendations' in step && step.recommendations && (
                    <div className="bg-secondary/40 rounded-lg px-4 py-2.5 text-xs text-foreground font-medium mb-3">
                      📊 {step.recommendations}
                    </div>
                  )}

                  {/* Tip */}
                  {'tip' in step && step.tip && (
                    <div className="bg-accent/10 rounded-lg px-4 py-2.5 text-xs text-foreground border-l-3 border-accent mb-3" style={{ borderLeftWidth: 3, borderLeftColor: 'hsl(var(--accent))' }}>
                      💡 {step.tip}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Before delivery */}
          <div className="mb-10 no-break">
            <div className="bg-primary/5 rounded-xl p-6 border border-primary/10">
              <h2 className="font-bold text-foreground mb-4 flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-primary" />
                {isEs ? 'Antes de entregarlo' : 'Before handing it over'}
              </h2>
              <div className="space-y-2">
                {beforeDelivery.map((item, i) => (
                  <div key={i} className="flex items-start gap-2 text-sm text-foreground">
                    <span className="text-primary flex-shrink-0">✓</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
              <p className="text-primary font-bold text-sm mt-4">{objectiveText}</p>
            </div>
          </div>

          {/* Psychological note */}
          <div className="no-break">
            <div className="bg-accent/10 rounded-xl p-6 border border-accent/20">
              <h2 className="font-bold text-foreground mb-2 flex items-center gap-2">
                <Heart className="h-5 w-5 text-accent" />
                {psychNote.title}
              </h2>
              <p className="text-primary font-bold text-sm mb-4">{psychNote.subtitle}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 mb-4">
                {psychNote.points.map((p, i) => (
                  <div key={i} className="flex items-start gap-2 text-sm text-foreground">
                    <span className="text-accent flex-shrink-0">•</span>
                    <span>{p}</span>
                  </div>
                ))}
              </div>
              <p className="text-xs text-muted-foreground font-semibold mb-2">
                {isEs ? 'Igual de importante:' : 'Equally important:'}
              </p>
              <div className="space-y-1.5">
                {psychNote.extras.map((e, i) => (
                  <div key={i} className="flex items-start gap-2 text-sm text-foreground">
                    <span className="text-primary flex-shrink-0">✓</span>
                    <span>{e}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center mt-10 pt-6 border-t border-border/30">
            <p className="text-xs text-muted-foreground">
              {t('brandName')} · {isEs ? 'Guía de configuración' : 'Setup guide'} · {new Date().getFullYear()}
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
