import { useState, useRef, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import Navbar from '@/components/Navbar';
import { motion } from 'framer-motion';
import {
  Smartphone, Download, ArrowLeft, Clock, Shield,
  Lock, Eye, Globe, CheckCircle2, AlertTriangle,
  Users, Timer, Ban, ShoppingCart, MapPin,
} from 'lucide-react';
import conversationImg from '@/assets/conversation-illustration.png';

type Platform = 'iphone' | 'android';

/* ── Apple SVG icon ── */
const AppleIcon = ({ size = 24, className = '' }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
  </svg>
);

/* ── Content by platform + language ── */

function getContent(platform: Platform, isEs: boolean) {
  const iPhone = platform === 'iphone';

  const title = isEs
    ? (iPhone ? 'Configura el iPhone de tu hijo antes de entregarlo' : 'Configura el Android de tu hijo antes de entregarlo')
    : (iPhone ? 'Set up your child\'s iPhone before handing it over' : 'Set up your child\'s Android before handing it over');

  const subtitle = isEs
    ? '15 minutos que evitarán meses de conflictos'
    : '15 minutes that will prevent months of conflict';

  const coverBadges = isEs
    ? ['⏱ 15 minutos', '📱 Nivel fácil', '✓ Paso a paso']
    : ['⏱ 15 minutes', '📱 Easy level', '✓ Step by step'];

  const beforeTitle = isEs ? 'Por qué configurar ANTES de entregar' : 'Why set up BEFORE handing it over';

  const beforePoints = isEs ? [
    { text: 'Establecer los límites después genera resistencia. Si las reglas ya están cuando lo recibe, se asumen como parte del dispositivo.', icon: Shield },
    { text: 'Un teléfono sin configurar es acceso libre a contenido para adultos, compras sin límite y uso ilimitado. Todo a un clic.', icon: AlertTriangle },
    { text: 'Configurar juntos el fondo de pantalla o elegir las apps es una buena forma de empezar con ilusión, no con restricciones.', icon: Users },
  ] : [
    { text: 'Setting limits after the fact creates resistance. If the rules are already in place when they receive it, they accept them as part of the device.', icon: Shield },
    { text: 'An unconfigured phone means unrestricted access to adult content, unlimited purchases, and uncapped screen time. All one tap away.', icon: AlertTriangle },
    { text: 'Setting up the wallpaper or choosing apps together is a great way to start with excitement, not restrictions.', icon: Users },
  ];

  /* ── AGE TABLE ── */
  const ageTable = {
    header: isEs
      ? ['Edad', 'Tiempo diario', 'Redes sociales', 'Supervisión']
      : ['Age', 'Daily time', 'Social media', 'Supervision'],
    rows: isEs ? [
      ['8–10', '45–60 min', 'No recomendado', 'Alta – revisión frecuente'],
      ['11–13', '60–90 min', 'Con aprobación', 'Media – revisión semanal'],
      ['14–16', '1.5–2 h', 'Con acuerdo', 'Baja – confianza progresiva'],
    ] : [
      ['8–10', '45–60 min', 'Not recommended', 'High – frequent review'],
      ['11–13', '60–90 min', 'With approval', 'Medium – weekly review'],
      ['14–16', '1.5–2 h', 'With agreement', 'Low – progressive trust'],
    ],
  };

  /* ── STEPS ── */
  const steps = iPhone ? (isEs ? [
    {
      icon: Users,
      title: 'Crear Apple ID infantil (En Familia)',
      why: 'Sin una cuenta infantil vinculada, no podrás gestionar nada de forma remota. Tendrías que coger su teléfono cada vez que quieras cambiar algo.',
      ifNot: 'Sin esto, tu hijo podrá descargar cualquier app, hacer compras y no tendrás visibilidad de su uso.',
      steps: [
        'Abre Ajustes y toca tu nombre',
        'Entra en "En Familia"',
        'Pulsa "Añadir miembro" → "Crear cuenta para un menor"',
        'Sigue los pasos para crear su Apple ID',
      ],
      byAge: {
        '8–10': 'Imprescindible. Gestiona todo desde tu iPhone.',
        '11–13': 'Necesario. Les da un espacio propio con tus límites.',
        '14–16': 'Recomendado. Puedes ir cediendo permisos gradualmente.',
      },
      results: ['Aprobar cada descarga', 'Ver su tiempo de uso', 'Controlar compras', 'Gestionar todos los permisos'],
    },
    {
      icon: Clock,
      title: 'Configurar Tiempo de Uso (todo junto)',
      why: 'El autocontrol digital se desarrolla con la madurez. Los niños no tienen la capacidad neurológica de parar solos. Un sistema automático elimina la necesidad de estar recordándolo constantemente.',
      ifNot: 'Sin límites de tiempo, el uso medio en menores supera las 4 horas diarias. Afecta al sueño, rendimiento escolar y relaciones familiares.',
      steps: [
        'Ajustes → Tiempo de Uso → Activar',
        'Selecciona "Este es el iPhone de un niño"',
        'Establece un código de Tiempo de Uso (que no sea el de desbloqueo)',
      ],
      substeps: [
        {
          label: 'Tiempo de inactividad',
          icon: Timer,
          desc: 'Define horario de bloqueo (ej. 20:30 – 7:00). Solo las apps que tú permitas estarán disponibles fuera del horario.',
          path: 'Tiempo de Uso → Tiempo de inactividad',
        },
        {
          label: 'Límites de apps',
          icon: Lock,
          desc: 'Establece tiempo máximo por categoría. Ejemplo: Juegos 30 min, Redes sociales 20 min. Al terminar, la app se bloquea.',
          path: 'Tiempo de Uso → Límites de apps → Añadir límite',
        },
        {
          label: 'Restricciones de contenido',
          icon: Shield,
          desc: 'Filtra películas, apps, música y webs por edad. Activa "Limitar sitios web para adultos".',
          path: 'Tiempo de Uso → Contenido y privacidad → Restricciones de contenido',
        },
        {
          label: 'Bloquear compras',
          icon: ShoppingCart,
          desc: 'Desactiva compras dentro de apps e instalación sin tu aprobación.',
          path: 'Tiempo de Uso → Contenido y privacidad → Compras en iTunes y App Store',
        },
      ],
      byAge: {
        '8–10': 'Tiempo de inactividad estricto. Límite 45–60 min. Sin redes sociales. Solo apps educativas y comunicación familiar.',
        '11–13': 'Límite 60–90 min. Redes sociales solo con tu aprobación previa. Contenido restringido por edad.',
        '14–16': 'Límite 1.5–2 h. Más autonomía en apps, pero mantén las restricciones de contenido adulto y compras.',
      },
    },
    {
      icon: Eye,
      title: 'Privacidad y ubicación',
      why: 'Las apps piden acceso a cámara, micrófono, fotos y ubicación por defecto. La mayoría no lo necesitan realmente. Configurar esto protege su privacidad y les enseña a ser conscientes de qué comparten.',
      ifNot: 'Sin revisarlo, cualquier app podría acceder a su cámara, fotos o ubicación en tiempo real sin que lo sepa.',
      steps: [
        'Ajustes → Privacidad y seguridad',
        'Revisa Localización: desactiva para apps que no la necesiten',
        'Revisa Cámara: solo apps de comunicación familiar',
        'Revisa Micrófono: solo apps necesarias',
        'Revisa Fotos: limita el acceso',
      ],
      byAge: {
        '8–10': 'Ubicación solo para la app de localización familiar. Cámara y micrófono desactivados para la mayoría.',
        '11–13': 'Ubicación compartida con la familia. Cámara permitida en apps de mensajería aprobadas.',
        '14–16': 'Explícale por qué cada permiso importa. Decidan juntos qué apps necesitan acceso.',
      },
      tip: 'Explícale que revisar permisos no es vigilancia: es como cerrar la puerta de casa. Es un hábito de seguridad digital.',
    },
    {
      icon: Globe,
      title: 'Navegación segura (opcional pero recomendado)',
      why: 'El navegador es la puerta de acceso a todo Internet sin filtro. Incluso con restricciones de apps, un navegador sin configurar permite acceder a cualquier contenido.',
      ifNot: 'Un navegador sin filtros da acceso directo a contenido para adultos, estafas, y sitios de apuestas.',
      steps: [
        'Ajustes → Tiempo de Uso → Restricciones de contenido',
        'Contenido web → "Limitar sitios web para adultos"',
        'O selecciona "Solo sitios web permitidos" para máximo control',
      ],
      byAge: {
        '8–10': 'Mejor opción: "Solo sitios web permitidos". Añade manualmente los que necesite.',
        '11–13': '"Limitar sitios web para adultos" es suficiente. Revisa el historial semanalmente.',
        '14–16': 'Mantén el filtro de adultos activo. Habla sobre qué hacer si encuentra contenido inadecuado.',
      },
    },
  ] : [
    {
      icon: Users,
      title: 'Create child Apple ID (Family Sharing)',
      why: 'Without a linked child account, you can\'t manage anything remotely. You\'d have to take their phone every time you want to change something.',
      ifNot: 'Without this, your child can download any app, make purchases, and you\'ll have no visibility into their usage.',
      steps: [
        'Open Settings and tap your name',
        'Enter "Family Sharing"',
        'Tap "Add Member" → "Create an Account for a Child"',
        'Follow the steps to create their Apple ID',
      ],
      byAge: {
        '8–10': 'Essential. Manage everything from your iPhone.',
        '11–13': 'Necessary. Gives them their own space within your limits.',
        '14–16': 'Recommended. You can gradually grant more permissions.',
      },
      results: ['Approve each download', 'View their screen time', 'Control purchases', 'Manage all permissions'],
    },
    {
      icon: Clock,
      title: 'Configure Screen Time (all at once)',
      why: 'Digital self-control develops with maturity. Children don\'t have the neurological capacity to stop on their own. An automatic system removes the need to constantly remind them.',
      ifNot: 'Without time limits, average screen time for minors exceeds 4 hours daily. It affects sleep, school performance, and family relationships.',
      steps: [
        'Settings → Screen Time → Turn On',
        'Select "This is My Child\'s iPhone"',
        'Set a Screen Time passcode (different from unlock code)',
      ],
      substeps: [
        {
          label: 'Downtime',
          icon: Timer,
          desc: 'Set a lock schedule (e.g., 8:30 PM – 7:00 AM). Only apps you allow will be available outside the schedule.',
          path: 'Screen Time → Downtime',
        },
        {
          label: 'App Limits',
          icon: Lock,
          desc: 'Set maximum time per category. Example: Games 30 min, Social media 20 min. When time is up, the app locks.',
          path: 'Screen Time → App Limits → Add Limit',
        },
        {
          label: 'Content Restrictions',
          icon: Shield,
          desc: 'Filter movies, apps, music and websites by age. Enable "Limit Adult Websites".',
          path: 'Screen Time → Content & Privacy → Content Restrictions',
        },
        {
          label: 'Block Purchases',
          icon: ShoppingCart,
          desc: 'Disable in-app purchases and app installation without your approval.',
          path: 'Screen Time → Content & Privacy → iTunes & App Store Purchases',
        },
      ],
      byAge: {
        '8–10': 'Strict downtime. 45–60 min limit. No social media. Only educational apps and family communication.',
        '11–13': '60–90 min limit. Social media only with prior approval. Age-restricted content.',
        '14–16': '1.5–2 h limit. More app autonomy, but maintain adult content and purchase restrictions.',
      },
    },
    {
      icon: Eye,
      title: 'Privacy and location',
      why: 'Apps request camera, microphone, photos, and location access by default. Most don\'t actually need it. Configuring this protects their privacy and teaches them to be aware of what they share.',
      ifNot: 'Without reviewing this, any app could access their camera, photos, or real-time location without them knowing.',
      steps: [
        'Settings → Privacy & Security',
        'Review Location Services: disable for unnecessary apps',
        'Review Camera: only family communication apps',
        'Review Microphone: only necessary apps',
        'Review Photos: limit access',
      ],
      byAge: {
        '8–10': 'Location only for family locator app. Camera and microphone disabled for most apps.',
        '11–13': 'Location shared with family. Camera allowed in approved messaging apps.',
        '14–16': 'Explain why each permission matters. Decide together which apps need access.',
      },
      tip: 'Explain that reviewing permissions isn\'t surveillance: it\'s like locking the front door. It\'s a digital safety habit.',
    },
    {
      icon: Globe,
      title: 'Safe browsing (optional but recommended)',
      why: 'The browser is the gateway to all of the unfiltered Internet. Even with app restrictions, an unconfigured browser allows access to any content.',
      ifNot: 'An unfiltered browser gives direct access to adult content, scams, and gambling sites.',
      steps: [
        'Settings → Screen Time → Content Restrictions',
        'Web Content → "Limit Adult Websites"',
        'Or select "Allowed Websites Only" for maximum control',
      ],
      byAge: {
        '8–10': 'Best option: "Allowed Websites Only." Add manually the ones they need.',
        '11–13': '"Limit Adult Websites" is sufficient. Review history weekly.',
        '14–16': 'Keep the adult filter active. Talk about what to do if they encounter inappropriate content.',
      },
    },
  ]) : (isEs ? [
    {
      icon: Users,
      title: 'Instalar y vincular Google Family Link',
      why: 'Family Link es la herramienta central de control parental en Android. Sin ella, no hay forma efectiva de gestionar el uso del dispositivo de forma remota.',
      ifNot: 'Sin Family Link, tu hijo puede instalar cualquier app, navegar sin filtro y usar el teléfono sin ningún límite de tiempo.',
      steps: [
        'En tu teléfono: descarga "Google Family Link" desde Play Store',
        'En el teléfono del niño: crea una cuenta Google para menor',
        'En Family Link: añade la cuenta del niño y vincula el dispositivo',
        'Acepta los permisos de administración del dispositivo',
      ],
      byAge: {
        '8–10': 'Imprescindible. Todo se gestiona desde tu teléfono.',
        '11–13': 'Necesario. Permite supervisión remota con autonomía controlada.',
        '14–16': 'Recomendado. Puedes ir cediendo permisos a medida que maduran.',
      },
      results: ['Ver tiempo de uso', 'Aprobar descargas', 'Bloquear el dispositivo remotamente', 'Ver ubicación'],
    },
    {
      icon: Clock,
      title: 'Configurar tiempo de pantalla y límites',
      why: 'Los niños buscan recompensa inmediata y les cuesta frenar estímulos digitales. Un sistema automático de límites da estructura sin necesidad de discutir cada día.',
      ifNot: 'Sin límites, el teléfono compite con el sueño, los deberes, las comidas y las relaciones familiares. Y gana.',
      steps: [
        'Abre Family Link → selecciona la cuenta del niño',
        'Ve a Controles → Tiempo de pantalla',
        'Activa el límite diario',
      ],
      substeps: [
        {
          label: 'Límite diario',
          icon: Timer,
          desc: 'Define cuántas horas puede usar el teléfono al día. Cuando se acaba, el dispositivo se bloquea automáticamente.',
          path: 'Family Link → Controles → Tiempo de pantalla',
        },
        {
          label: 'Hora de dormir',
          icon: Lock,
          desc: 'Configura un bloqueo automático nocturno (ej. 21:00 – 7:00). El teléfono no se puede usar.',
          path: 'Family Link → Controles → Hora de dormir',
        },
        {
          label: 'Aprobar descargas',
          icon: Shield,
          desc: 'Activa la aprobación obligatoria para cada descarga de Google Play.',
          path: 'Family Link → Controles → Google Play → Aprobar todas las descargas',
        },
        {
          label: 'Restringir contenido',
          icon: Ban,
          desc: 'Establece clasificación por edad en Google Play. Bloquea contenido explícito y filtra búsquedas.',
          path: 'Google Play → Configuración → Control parental',
        },
        {
          label: 'Bloquear compras',
          icon: ShoppingCart,
          desc: 'Requiere autenticación para cada compra o desactiva compras completamente.',
          path: 'Google Play → Configuración → Autenticación para compras',
        },
      ],
      byAge: {
        '8–10': 'Límite 45–60 min. Hora de dormir a las 20:30. Aprobación obligatoria para todo. Solo apps educativas.',
        '11–13': 'Límite 60–90 min. Hora de dormir a las 21:30. Aprobación de descargas activa. Redes sociales solo con permiso.',
        '14–16': 'Límite 1.5–2 h. Hora de dormir a las 22:30. Puedes flexibilizar descargas, pero mantén restricciones de contenido.',
      },
    },
    {
      icon: Eye,
      title: 'Privacidad y ubicación',
      why: 'Las apps piden acceso a cámara, micrófono, fotos y ubicación por defecto. Configurar estos permisos les enseña a ser conscientes de su huella digital desde el primer día.',
      ifNot: 'Apps de juegos o redes sociales pueden acceder a la cámara, fotos y ubicación sin que tu hijo sea consciente.',
      steps: [
        'Family Link → Ver ubicación del dispositivo → Activar',
        'En el teléfono del niño: Ajustes → Privacidad',
        'Revisa permisos de ubicación, cámara, micrófono y almacenamiento',
        'Desactiva los que no sean necesarios',
      ],
      byAge: {
        '8–10': 'Ubicación siempre compartida. Cámara y micrófono desactivados para la mayoría de apps.',
        '11–13': 'Ubicación compartida con la familia. Cámara en apps de mensajería aprobadas.',
        '14–16': 'Decidan juntos qué permisos son razonables. Explica por qué importa.',
      },
      tip: 'Explícale que compartir ubicación es como decirle a la familia dónde estás. No es un rastreador, es seguridad mutua.',
    },
    {
      icon: Globe,
      title: 'Navegación segura (opcional pero recomendado)',
      why: 'Chrome da acceso a todo Internet. Incluso con apps controladas, el navegador permite llegar a cualquier contenido sin filtro.',
      ifNot: 'Sin SafeSearch ni filtros, una búsqueda inocente puede llevar a contenido sexual, violento o fraudulento.',
      steps: [
        'En Chrome: activa SafeSearch (google.com/preferences)',
        'En Family Link: activa los filtros de contenido para Chrome',
        'Opcionalmente: bloquea sitios específicos desde Family Link',
      ],
      byAge: {
        '8–10': 'SafeSearch obligatorio. Considera un navegador infantil alternativo. Revisa el historial.',
        '11–13': 'SafeSearch activo. Filtros de contenido habilitados. Revisión semanal del historial.',
        '14–16': 'SafeSearch activo. Habla sobre qué hacer si encuentra contenido inapropiado.',
      },
    },
  ] : [
    {
      icon: Users,
      title: 'Install and link Google Family Link',
      why: 'Family Link is the central parental control tool on Android. Without it, there\'s no effective way to remotely manage device usage.',
      ifNot: 'Without Family Link, your child can install any app, browse without filters, and use the phone with no time limits.',
      steps: [
        'On your phone: download "Google Family Link" from Play Store',
        'On the child\'s phone: create a Google account for a minor',
        'In Family Link: add the child\'s account and link the device',
        'Accept device administration permissions',
      ],
      byAge: {
        '8–10': 'Essential. Everything is managed from your phone.',
        '11–13': 'Necessary. Allows remote supervision with controlled autonomy.',
        '14–16': 'Recommended. You can gradually grant permissions as they mature.',
      },
      results: ['View screen time', 'Approve downloads', 'Lock device remotely', 'View location'],
    },
    {
      icon: Clock,
      title: 'Configure screen time and limits',
      why: 'Children seek immediate rewards and struggle to resist digital stimuli. An automatic limit system provides structure without daily arguments.',
      ifNot: 'Without limits, the phone competes with sleep, homework, meals, and family relationships. And it wins.',
      steps: [
        'Open Family Link → select the child\'s account',
        'Go to Controls → Screen Time',
        'Enable the daily limit',
      ],
      substeps: [
        {
          label: 'Daily limit',
          icon: Timer,
          desc: 'Define how many hours they can use the phone daily. When it runs out, the device locks automatically.',
          path: 'Family Link → Controls → Screen Time',
        },
        {
          label: 'Bedtime',
          icon: Lock,
          desc: 'Set an automatic overnight lock (e.g., 9:00 PM – 7:00 AM). The phone cannot be used.',
          path: 'Family Link → Controls → Bedtime',
        },
        {
          label: 'Approve downloads',
          icon: Shield,
          desc: 'Enable mandatory approval for every Google Play download.',
          path: 'Family Link → Controls → Google Play → Approve all downloads',
        },
        {
          label: 'Restrict content',
          icon: Ban,
          desc: 'Set age ratings in Google Play. Block explicit content and filter searches.',
          path: 'Google Play → Settings → Parental Controls',
        },
        {
          label: 'Block purchases',
          icon: ShoppingCart,
          desc: 'Require authentication for every purchase or disable purchases entirely.',
          path: 'Google Play → Settings → Purchase authentication',
        },
      ],
      byAge: {
        '8–10': '45–60 min limit. Bedtime at 8:30 PM. Mandatory approval for everything. Educational apps only.',
        '11–13': '60–90 min limit. Bedtime at 9:30 PM. Download approval active. Social media only with permission.',
        '14–16': '1.5–2 h limit. Bedtime at 10:30 PM. Downloads can be flexible, but maintain content restrictions.',
      },
    },
    {
      icon: Eye,
      title: 'Privacy and location',
      why: 'Apps request camera, microphone, photos, and location access by default. Configuring these permissions teaches them to be aware of their digital footprint from day one.',
      ifNot: 'Gaming or social media apps can access the camera, photos, and location without your child being aware.',
      steps: [
        'Family Link → View device location → Enable',
        'On the child\'s phone: Settings → Privacy',
        'Review location, camera, microphone, and storage permissions',
        'Disable those that aren\'t necessary',
      ],
      byAge: {
        '8–10': 'Location always shared. Camera and microphone disabled for most apps.',
        '11–13': 'Location shared with family. Camera in approved messaging apps.',
        '14–16': 'Decide together which permissions are reasonable. Explain why it matters.',
      },
      tip: 'Explain that sharing location is like telling the family where you are. It\'s not a tracker, it\'s mutual safety.',
    },
    {
      icon: Globe,
      title: 'Safe browsing (optional but recommended)',
      why: 'Chrome gives access to all of the Internet. Even with controlled apps, the browser lets them reach any unfiltered content.',
      ifNot: 'Without SafeSearch or filters, an innocent search can lead to sexual, violent, or fraudulent content.',
      steps: [
        'In Chrome: enable SafeSearch (google.com/preferences)',
        'In Family Link: enable content filters for Chrome',
        'Optionally: block specific sites from Family Link',
      ],
      byAge: {
        '8–10': 'SafeSearch mandatory. Consider a child-friendly alternative browser. Review history.',
        '11–13': 'SafeSearch active. Content filters enabled. Weekly history review.',
        '14–16': 'SafeSearch active. Talk about what to do if they encounter inappropriate content.',
      },
    },
  ]);

  const checklist = isEs ? [
    'Todos los pasos de esta guía están completados',
    'El código de Tiempo de Uso / Family Link es diferente al de desbloqueo',
    'No hay apps innecesarias preinstaladas',
    'Has revisado los permisos de cámara, micrófono y ubicación',
    'El navegador tiene los filtros activados',
    'Has elegido juntos un fondo de pantalla',
    'El acuerdo familiar está firmado por ambos',
  ] : [
    'All steps in this guide are completed',
    'Screen Time / Family Link passcode is different from unlock code',
    'No unnecessary pre-installed apps',
    'You\'ve reviewed camera, microphone, and location permissions',
    'Browser filters are activated',
    'You\'ve chosen a wallpaper together',
    'The family agreement is signed by both',
  ];

  const conversationTitle = isEs ? 'La conversación al entregarlo' : 'The conversation when handing it over';
  const conversationIntro = isEs
    ? 'El momento de entregar el teléfono es tan importante como la configuración técnica. Dedica 10 minutos a hablar antes de dárselo.'
    : 'The moment of handing over the phone is as important as the technical setup. Spend 10 minutes talking before giving it to them.';
  const conversationPoints = isEs ? [
    '"Esto es tuyo, pero lo usamos con unas reglas que hemos acordado juntos."',
    '"Si el teléfono se bloquea, no es un castigo. Es el horario que hemos puesto."',
    '"Si ves algo que te incomoda o te asusta, puedes contármelo sin consecuencias."',
    '"Cada 3 meses revisaremos el acuerdo y ajustaremos lo que haga falta."',
    '"No voy a leer tus mensajes sin avisarte. Pero necesito saber que estás seguro/a."',
  ] : [
    '"This is yours, but we use it with rules we\'ve agreed on together."',
    '"If the phone locks, it\'s not a punishment. It\'s the schedule we set."',
    '"If you see something that makes you uncomfortable or scared, you can tell me without consequences."',
    '"Every 3 months we\'ll review the agreement and adjust what\'s needed."',
    '"I won\'t read your messages without telling you. But I need to know you\'re safe."',
  ];

  return { title, subtitle, coverBadges, beforeTitle, beforePoints, ageTable, steps, checklist, conversationTitle, conversationIntro, conversationPoints };
}

/* ── COMPONENT ── */

export default function TechGuidePage() {
  const { t, lang } = useLanguage();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [searchParams] = useSearchParams();
  const initialPlatform = (searchParams.get('platform') as Platform) || 'iphone';
  const [platform, setPlatform] = useState<Platform>(initialPlatform);
  const guideRef = useRef<HTMLDivElement>(null);
  const isEs = lang === 'es';

  const c = getContent(platform, isEs);

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

  const PlatformIcon = platform === 'iphone'
    ? () => <AppleIcon size={28} className="text-white" />
    : () => <Smartphone style={{ width: 28, height: 28 }} className="text-white" />;

  return (
    <div className="min-h-screen bg-background">
      <Navbar maxWidth="max-w-3xl" hideNavItems />

      {/* Actions bar */}
      <div className="max-w-3xl mx-auto px-6 py-4 flex flex-wrap items-center gap-3">
        <button onClick={() => navigate('/')}
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="h-4 w-4" /> {t('back')}
        </button>
        <div className="flex-1" />
        <div className="inline-flex rounded-xl border border-border bg-card p-1 gap-1">
          <button
            onClick={() => setPlatform('iphone')}
            className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all ${platform === 'iphone' ? 'bg-primary text-primary-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}
          >
            <AppleIcon size={16} /> iPhone
          </button>
          <button
            onClick={() => setPlatform('android')}
            className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all ${platform === 'android' ? 'bg-primary text-primary-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}
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
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl mx-auto px-6 pb-16">
        <div ref={guideRef}
          className="rounded-2xl border border-border/40 shadow-sm bg-card"
          style={{ padding: '2.5rem', lineHeight: 1.7, fontFamily: "'Inter', system-ui, sans-serif" }}>

          {/* ── COVER ── */}
          <div className="text-center mb-10 no-break" style={{ pageBreakAfter: 'always' }}>
            <div className="mx-auto mb-4 flex items-center justify-center"
              style={{ width: 56, height: 56, borderRadius: 16, background: 'hsl(var(--primary))', color: '#fff' }}>
              <PlatformIcon />
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground mb-2">{c.title}</h1>
            <p className="text-muted-foreground mb-6">{c.subtitle}</p>
            <div className="flex flex-wrap justify-center gap-3">
              {c.coverBadges.map((b, i) => (
                <span key={i} className="inline-block text-xs font-semibold px-3 py-1.5 rounded-full"
                  style={{ background: 'hsl(var(--primary) / 0.1)', color: 'hsl(var(--primary))' }}>
                  {b}
                </span>
              ))}
            </div>
          </div>

          {/* ── BEFORE STARTING ── */}
          <div className="mb-10 no-break">
            <h2 className="font-bold text-foreground text-xl mb-4">{c.beforeTitle}</h2>
            <div className="space-y-4">
              {c.beforePoints.map((p, i) => {
                const Icon = p.icon;
                return (
                  <div key={i} className="flex items-start gap-3 text-sm text-foreground">
                    <div className="flex-shrink-0 mt-0.5" style={{ width: 28, height: 28, borderRadius: 8, background: 'hsl(var(--primary) / 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Icon style={{ width: 14, height: 14, color: 'hsl(var(--primary))' }} />
                    </div>
                    <span className="leading-relaxed">{p.text}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ── AGE TABLE ── */}
          <div className="mb-10 no-break">
            <h2 className="font-bold text-foreground text-lg mb-3 flex items-center gap-2">
              📊 {isEs ? 'Recomendaciones por edad' : 'Age-based recommendations'}
            </h2>
            <div className="overflow-hidden rounded-xl border" style={{ borderColor: 'hsl(var(--border))' }}>
              <table className="w-full text-sm" style={{ borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ background: 'hsl(var(--primary) / 0.08)' }}>
                    {c.ageTable.header.map((h, i) => (
                      <th key={i} className="text-left font-semibold text-foreground px-4 py-2.5 text-xs uppercase tracking-wide">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {c.ageTable.rows.map((row, i) => (
                    <tr key={i} style={{ borderTop: '1px solid hsl(var(--border) / 0.5)' }}>
                      {row.map((cell, j) => (
                        <td key={j} className={`px-4 py-2.5 text-sm ${j === 0 ? 'font-bold text-primary' : 'text-foreground'}`}>{cell}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* ── STEPS ── */}
          <div className="space-y-10 mb-10">
            {c.steps.map((step, i) => {
              const StepIcon = step.icon;
              return (
                <div key={i} className="no-break" style={{ pageBreakInside: 'avoid' }}>
                  {/* Step header */}
                  <div className="flex items-start gap-4 mb-4">
                    <span style={{
                      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                      width: '36px', height: '36px', minWidth: '36px', borderRadius: '50%',
                      background: 'hsl(var(--primary))', color: '#fff',
                      fontSize: '15px', fontWeight: 700, flexShrink: 0,
                    }}>
                      {i + 1}
                    </span>
                    <div className="flex-1">
                      <h3 className="font-bold text-foreground text-lg flex items-center gap-2">
                        <StepIcon style={{ width: 18, height: 18, color: 'hsl(var(--primary))' }} />
                        {step.title}
                      </h3>
                    </div>
                  </div>

                  <div className="ml-12 sm:ml-14 space-y-4">
                    {/* Why */}
                    <p className="text-sm text-foreground leading-relaxed">{step.why}</p>

                    {/* If not warning */}
                    {'ifNot' in step && step.ifNot && (
                      <div className="rounded-lg px-4 py-3 text-sm flex items-start gap-2"
                        style={{ background: 'hsl(0 80% 95%)', border: '1px solid hsl(0 70% 85%)' }}>
                        <AlertTriangle style={{ width: 16, height: 16, color: 'hsl(0 70% 45%)', flexShrink: 0, marginTop: 2 }} />
                        <span style={{ color: 'hsl(0 50% 30%)' }}>
                          <strong>{isEs ? 'Si no lo haces:' : 'If you don\'t:'}</strong> {step.ifNot}
                        </span>
                      </div>
                    )}

                    {/* How to */}
                    <div>
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
                        {isEs ? 'Cómo hacerlo' : 'How to do it'}
                      </p>
                      <div className="space-y-1.5">
                        {step.steps.map((s, j) => (
                          <div key={j} className="flex items-start gap-2 text-sm text-foreground">
                            <span className="font-bold text-primary flex-shrink-0" style={{ minWidth: 18 }}>{j + 1}.</span>
                            <span>{s}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Sub-steps (Screen Time / Family Link) */}
                    {'substeps' in step && step.substeps && (
                      <div className="space-y-3 mt-2">
                        {step.substeps.map((sub, j) => {
                          const SubIcon = sub.icon;
                          return (
                            <div key={j} className="rounded-lg p-3 no-break"
                              style={{ background: 'hsl(var(--secondary) / 0.5)', border: '1px solid hsl(var(--border) / 0.3)' }}>
                              <div className="flex items-center gap-2 mb-1">
                                <SubIcon style={{ width: 14, height: 14, color: 'hsl(var(--primary))' }} />
                                <span className="text-sm font-bold text-foreground">{sub.label}</span>
                              </div>
                              <p className="text-xs text-foreground leading-relaxed mb-1">{sub.desc}</p>
                              <p className="text-xs text-muted-foreground font-mono">📍 {sub.path}</p>
                            </div>
                          );
                        })}
                      </div>
                    )}

                    {/* Results */}
                    {'results' in step && step.results && (
                      <div className="flex flex-wrap gap-2">
                        {step.results.map((r, j) => (
                          <span key={j} className="inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full"
                            style={{ background: 'hsl(var(--primary) / 0.1)', color: 'hsl(var(--primary))' }}>
                            <CheckCircle2 style={{ width: 12, height: 12 }} /> {r}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Age recommendations */}
                    {'byAge' in step && step.byAge && (
                      <div className="rounded-lg overflow-hidden" style={{ border: '1px solid hsl(var(--border) / 0.5)' }}>
                        <div className="px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-foreground"
                          style={{ background: 'hsl(var(--primary) / 0.06)' }}>
                          {isEs ? 'Por edad' : 'By age'}
                        </div>
                        {Object.entries(step.byAge).map(([age, text], j) => (
                          <div key={j} className="flex items-start gap-3 px-3 py-2 text-xs text-foreground"
                            style={{ borderTop: j > 0 ? '1px solid hsl(var(--border) / 0.3)' : undefined }}>
                            <span className="font-bold text-primary flex-shrink-0" style={{ minWidth: 36 }}>{age}</span>
                            <span className="leading-relaxed">{text}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Tip */}
                    {'tip' in step && step.tip && (
                      <div className="rounded-lg px-4 py-2.5 text-xs text-foreground flex items-start gap-2"
                        style={{ background: 'hsl(var(--accent) / 0.1)', borderLeft: '3px solid hsl(var(--accent))' }}>
                        <span>💡</span>
                        <span>{step.tip}</span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* ── CHECKLIST ── */}
          <div className="mb-10 no-break" style={{ pageBreakBefore: 'always' }}>
            <div className="rounded-xl p-6" style={{ background: 'hsl(var(--primary) / 0.04)', border: '1px solid hsl(var(--primary) / 0.12)' }}>
              <h2 className="font-bold text-foreground text-lg mb-4 flex items-center gap-2">
                <CheckCircle2 style={{ width: 20, height: 20, color: 'hsl(var(--primary))' }} />
                {isEs ? 'Checklist antes de entregar' : 'Checklist before handing over'}
              </h2>
              <div className="space-y-2.5">
                {c.checklist.map((item, i) => (
                  <div key={i} className="flex items-start gap-3 text-sm text-foreground">
                    <span className="flex-shrink-0 mt-0.5" style={{
                      width: 18, height: 18, borderRadius: 4,
                      border: '2px solid hsl(var(--primary) / 0.4)',
                      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      &nbsp;
                    </span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── CONVERSATION ── */}
          <div className="mb-10 no-break">
            <div className="rounded-xl p-6" style={{ background: 'hsl(var(--accent) / 0.08)', border: '1px solid hsl(var(--accent) / 0.15)' }}>
              <h2 className="font-bold text-foreground text-lg mb-2">{c.conversationTitle}</h2>
              <p className="text-sm text-foreground leading-relaxed mb-4">{c.conversationIntro}</p>

              <img src={conversationImg} alt={isEs ? 'Padre e hijo hablando sobre el smartphone' : 'Parent and child talking about the smartphone'}
                className="rounded-lg mb-4 mx-auto" style={{ maxWidth: 280, width: '100%' }} />

              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3">
                {isEs ? 'Frases que puedes usar:' : 'Phrases you can use:'}
              </p>
              <div className="space-y-2">
                {c.conversationPoints.map((p, i) => (
                  <div key={i} className="flex items-start gap-2 text-sm text-foreground italic">
                    <span className="text-accent flex-shrink-0 not-italic">💬</span>
                    <span>{p}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── FOOTER ── */}
          <div className="text-center pt-6 border-t" style={{ borderColor: 'hsl(var(--border) / 0.3)' }}>
            <p className="text-xs text-muted-foreground">
              {t('brandName')} · {isEs ? 'Guía de configuración' : 'Setup guide'} · {new Date().getFullYear()}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              {isEs
                ? 'Comparte esta guía con quien la necesite. Configurar bien es cuidar bien.'
                : 'Share this guide with anyone who needs it. Setting up well is caring well.'}
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
