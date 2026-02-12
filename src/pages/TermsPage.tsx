import { useLanguage } from '@/contexts/LanguageContext';
import { useNavigate } from 'react-router-dom';
import { Smartphone, ArrowLeft } from 'lucide-react';
import LanguageSelector from '@/components/LanguageSelector';

export default function TermsPage() {
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
          {isEs ? 'Términos de uso' : 'Terms of Use'}
        </h1>
        <p className="text-sm text-muted-foreground mb-12">
          {isEs ? 'Última actualización: febrero 2026' : 'Last updated: February 2026'}
        </p>

        <div className="space-y-10 text-foreground leading-relaxed">
          <section>
            <h2 className="text-xl font-bold mb-3">
              {isEs ? '1. Naturaleza orientativa del servicio' : '1. Advisory nature of the service'}
            </h2>
            <p className="text-muted-foreground">
              {isEs
                ? 'KidSmartphone ofrece recomendaciones generales para crear acuerdos familiares sobre el uso del smartphone. El contenido generado es orientativo y está diseñado como punto de partida para el diálogo familiar.'
                : 'KidSmartphone offers general recommendations for creating family agreements about smartphone use. The generated content is advisory and designed as a starting point for family dialogue.'}
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">
              {isEs ? '2. No constituye asesoramiento profesional' : '2. Not professional advice'}
            </h2>
            <p className="text-muted-foreground">
              {isEs
                ? 'Este servicio no constituye asesoramiento legal, psicológico, educativo ni profesional de ningún tipo. Si necesitas orientación específica, te recomendamos consultar con un profesional cualificado.'
                : 'This service does not constitute legal, psychological, educational, or professional advice of any kind. If you need specific guidance, we recommend consulting with a qualified professional.'}
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">
              {isEs ? '3. Responsabilidad del usuario' : '3. User responsibility'}
            </h2>
            <p className="text-muted-foreground">
              {isEs
                ? 'Cada familia es responsable de adaptar, revisar y utilizar el acuerdo generado según su situación particular. KidSmartphone proporciona una base, pero la decisión final siempre es de la familia.'
                : 'Each family is responsible for adapting, reviewing, and using the generated agreement according to their particular situation. KidSmartphone provides a foundation, but the final decision always belongs to the family.'}
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">
              {isEs ? '4. Uso de inteligencia artificial' : '4. Use of artificial intelligence'}
            </h2>
            <p className="text-muted-foreground">
              {isEs
                ? 'Parte del contenido y las recomendaciones pueden estar generados o asistidos por inteligencia artificial. Aunque trabajamos para ofrecer sugerencias útiles y actualizadas, el contenido generado por IA puede contener imprecisiones. Recomendamos revisarlo siempre antes de utilizarlo.'
                : 'Some content and recommendations may be generated or assisted by artificial intelligence. While we work to offer useful and up-to-date suggestions, AI-generated content may contain inaccuracies. We recommend always reviewing it before use.'}
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">
              {isEs ? '5. Limitación de responsabilidad' : '5. Limitation of liability'}
            </h2>
            <p className="text-muted-foreground">
              {isEs
                ? 'KidSmartphone no garantiza resultados específicos derivados del uso del acuerdo generado. La herramienta se ofrece "tal cual", como recurso de apoyo para familias. No nos hacemos responsables de decisiones tomadas en base al contenido generado.'
                : 'KidSmartphone does not guarantee specific outcomes from using the generated agreement. The tool is offered "as is," as a support resource for families. We are not responsible for decisions made based on the generated content.'}
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">
              {isEs ? '6. Contacto' : '6. Contact'}
            </h2>
            <p className="text-muted-foreground">
              {isEs
                ? 'Si tienes alguna pregunta sobre estos términos, puedes escribirnos a '
                : 'If you have any questions about these terms, you can reach us at '}
              <a href="mailto:legal@kidsmartphone.com" className="text-primary underline hover:text-foreground transition-colors">
                legal@kidsmartphone.com
              </a>.
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}
