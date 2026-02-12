import { useLanguage } from '@/contexts/LanguageContext';
import { useNavigate } from 'react-router-dom';
import { Smartphone, ArrowLeft, ShieldCheck } from 'lucide-react';
import LanguageSelector from '@/components/LanguageSelector';

export default function PrivacyPage() {
  const { t, lang } = useLanguage();
  const navigate = useNavigate();
  const isEs = lang === 'es';

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-border/40">
        <nav className="flex items-center justify-between px-6 lg:px-10 py-4 max-w-7xl mx-auto">
          <button onClick={() => navigate('/')} className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <Smartphone className="h-5 w-5 text-primary" aria-hidden="true" />
            <span className="font-extrabold text-lg tracking-tight text-foreground">{t('brandName')}</span>
          </button>
          <LanguageSelector />
        </nav>
      </header>

      <main className="max-w-2xl mx-auto px-6 py-16 sm:py-20">
        <button onClick={() => navigate(-1)} className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8">
          <ArrowLeft className="h-4 w-4" /> {t('back')}
        </button>

        <h1 className="font-display text-3xl sm:text-4xl font-black text-foreground mb-3">
          {isEs ? 'Política de privacidad' : 'Privacy Policy'}
        </h1>
        <p className="text-sm text-muted-foreground mb-12">
          {isEs ? 'Última actualización: febrero 2026' : 'Last updated: February 2026'}
        </p>

        {/* Privacy highlight */}
        <div className="flex items-start gap-4 bg-primary/5 border border-primary/20 rounded-2xl p-6 mb-12">
          <ShieldCheck className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" aria-hidden="true" />
          <p className="text-foreground font-medium leading-relaxed">
            {isEs
              ? 'KidSmartphone no almacena ningún dato personal. Todo el proceso ocurre en tu navegador. No guardamos nombres, edades ni el contenido del acuerdo.'
              : 'KidSmartphone does not store any personal data. The entire process happens in your browser. We do not save names, ages, or agreement content.'}
          </p>
        </div>

        <div className="space-y-10 text-foreground leading-relaxed">
          <section>
            <h2 className="text-xl font-bold mb-3">
              {isEs ? '1. Qué datos se introducen' : '1. What data is entered'}
            </h2>
            <p className="text-muted-foreground mb-3">
              {isEs
                ? 'Durante el proceso de creación del acuerdo, introduces información como:'
                : 'During the agreement creation process, you enter information such as:'}
            </p>
            <ul className="list-disc pl-6 space-y-1.5 text-muted-foreground">
              <li>{isEs ? 'Nombre del niño/a' : 'Child\'s name'}</li>
              <li>{isEs ? 'Edad' : 'Age'}</li>
              <li>{isEs ? 'Preferencias de uso y supervisión' : 'Usage and supervision preferences'}</li>
              <li>{isEs ? 'Nombres de los padres/tutores' : 'Parent/guardian names'}</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">
              {isEs ? '2. Dónde se procesan los datos' : '2. Where data is processed'}
            </h2>
            <p className="text-muted-foreground">
              {isEs
                ? 'Toda la información se procesa exclusivamente en tu navegador (del lado del cliente). El PDF se genera localmente en tu dispositivo. Ningún dato se envía a nuestros servidores ni a terceros.'
                : 'All information is processed exclusively in your browser (client-side). The PDF is generated locally on your device. No data is sent to our servers or third parties.'}
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">
              {isEs ? '3. Almacenamiento de datos' : '3. Data storage'}
            </h2>
            <p className="text-muted-foreground">
              {isEs
                ? 'No almacenamos ningún dato personal en bases de datos ni servidores. Los datos introducidos existen únicamente durante tu sesión de navegación y se eliminan al cerrar la pestaña.'
                : 'We do not store any personal data in databases or servers. The data you enter exists only during your browsing session and is deleted when you close the tab.'}
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">
              {isEs ? '4. Cookies y analítica' : '4. Cookies and analytics'}
            </h2>
            <p className="text-muted-foreground">
              {isEs
                ? 'Actualmente no utilizamos cookies de seguimiento ni herramientas de analítica que recopilen datos personales. Si en el futuro implementáramos alguna, actualizaremos esta política y te informaremos.'
                : 'We currently do not use tracking cookies or analytics tools that collect personal data. If we implement any in the future, we will update this policy and inform you.'}
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">
              {isEs ? '5. Donaciones' : '5. Donations'}
            </h2>
            <p className="text-muted-foreground">
              {isEs
                ? 'Si decides apoyar el proyecto mediante una donación, serás redirigido a un servicio de pago externo. KidSmartphone no procesa ni almacena datos de pago.'
                : 'If you choose to support the project through a donation, you will be redirected to an external payment service. KidSmartphone does not process or store payment data.'}
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">
              {isEs ? '6. Tus derechos (GDPR)' : '6. Your rights (GDPR)'}
            </h2>
            <p className="text-muted-foreground mb-3">
              {isEs
                ? 'Conforme al Reglamento General de Protección de Datos (GDPR), tienes derecho a:'
                : 'Under the General Data Protection Regulation (GDPR), you have the right to:'}
            </p>
            <ul className="list-disc pl-6 space-y-1.5 text-muted-foreground">
              <li>{isEs ? 'Acceso a tus datos personales' : 'Access your personal data'}</li>
              <li>{isEs ? 'Rectificación de datos incorrectos' : 'Rectification of incorrect data'}</li>
              <li>{isEs ? 'Supresión de tus datos' : 'Erasure of your data'}</li>
              <li>{isEs ? 'Portabilidad de datos' : 'Data portability'}</li>
              <li>{isEs ? 'Oposición al tratamiento' : 'Object to processing'}</li>
            </ul>
            <p className="text-muted-foreground mt-3">
              {isEs
                ? 'Dado que no almacenamos datos personales, estos derechos se ejercen de forma automática: no hay datos que acceder, rectificar o eliminar.'
                : 'Since we do not store personal data, these rights are exercised automatically: there is no data to access, rectify, or delete.'}
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">
              {isEs ? '7. Contacto' : '7. Contact'}
            </h2>
            <p className="text-muted-foreground">
              {isEs
                ? 'Para cualquier consulta relacionada con la privacidad, puedes escribirnos a '
                : 'For any privacy-related inquiries, you can reach us at '}
              <a href="mailto:privacy@kidsmartphone.com" className="text-primary underline hover:text-foreground transition-colors">
                privacy@kidsmartphone.com
              </a>.
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}
