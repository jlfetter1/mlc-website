/* ==========================================================================
   MLC — Internationalization (EN / ES)
   Lightweight i18n via data-i18n attributes + localStorage persistence
   ========================================================================== */

const translations = {
  en: {
    // Nav
    "nav.solutions": "Solutions",
    "nav.process": "Process",
    "nav.why": "Why MLC",
    "nav.clients": "Clients",
    "nav.faq": "FAQ",
    "nav.cta": "Request a Consultation",

    // Hero
    "hero.eyebrow": "Modern Language Center",
    "hero.h1": 'Precision Communication for the <span style="color:var(--gold)">Global Elite</span>',
    "hero.lead": "We engineer cultural fluency for high-stakes business environments. From sovereign wealth funds to multinational boards, we redefine how the elite navigate the global stage.",
    "hero.cta1": "Request a Consultation",
    "hero.cta2": "Explore Our Solutions",

    // Trust bar
    "trust.eyebrow": "Trusted by Mexico's most demanding organizations",

    // Solutions
    "sol.eyebrow": "Our Solutions",
    "sol.h2": "Eight solutions. One standard: yours.",
    "sol.lead": "Every solution is campaign-ready. Every page stands alone as a landing page for your paid media.",
    "sol.bep.tag": "Transform your English class",
    "sol.bep.h3": "Business English Program",
    "sol.bep.p": "Award-winning CEFR-aligned English for teams. AI-adapted content for your sector, certified instructors, groups of 8 max.",
    "sol.premium.tag": "Transform your productivity",
    "sol.premium.h3": "Premium Production",
    "sol.premium.p": "80% production-based. Presentations, negotiations, and boardroom fluency with Harvard Business Review and MIT Sloan material. Max 4.",
    "sol.coaching.tag": "Transform your events",
    "sol.coaching.h3": "Last-Minute Coaching",
    "sol.coaching.p": "48-hour express preparation for critical events. Board presentations, keynotes, negotiations.",
    "sol.recruit.tag": "Transform your hiring",
    "sol.recruit.h3": "Recruitment Support",
    "sol.recruit.p": "Official proficiency evaluations for HR. Two-stage assessment with CEFR-certified reports and candidate scorecards.",
    "sol.translate.tag": "Precision & trust",
    "sol.translate.h3": "Translation & Interpretation",
    "sol.translate.p": "Legal, medical, and financial translation. Remote and on-site interpretation for events up to thousands of attendees.",
    "sol.languages.tag": "Multilingual excellence",
    "sol.languages.h3": "Other Languages",
    "sol.languages.p": "Portuguese, French, German, Italian, Spanish for foreigners, Japanese, and Mandarin.",
    "sol.accredit.tag": "Transform your credentials",
    "sol.accredit.h3": "Accreditation",
    "sol.accredit.p": "Expert preparation for IELTS, TOEFL, TOEIC, DELF, DALF, Goethe, CELPE-BRAS, and DELE.",
    "sol.abroad.tag": "Transform your world access",
    "sol.abroad.h3": "Train Abroad",
    "sol.abroad.p": "Executive immersion in the UK, Canada, and the US. Academic excellence, cultural integration, and professional networking.",
    "sol.learn": "Learn more &rarr;",

    // Process
    "proc.eyebrow": "Our Process",
    "proc.h2": "Your board will ask how you measured this.<br>Here's your answer.",
    "proc.lead": "A methodology proven over 20+ years, now powered by AI.",
    "proc.s1.h4": "Assess",
    "proc.s1.p": "We map every team's level, gaps, and goals with your HR lead.",
    "proc.s2.h4": "Design",
    "proc.s2.p": "AI builds a custom curriculum by role, level, and industry.",
    "proc.s3.h4": "Deliver",
    "proc.s3.p": "Live sessions — on-site, remote, or hybrid — with real-time QC.",
    "proc.s4.h4": "Prove",
    "proc.s4.p": "Monthly ROI reports your CFO will actually read.",
    "proc.stat.years": "Years",
    "proc.stat.languages": "Languages",
    "proc.stat.companies": "Companies",

    // Why MLC
    "why.eyebrow": "The Difference",
    "why.h2": "Not a school.<br>A strategic advantage.",
    "why.lead": "The only language partner in Mexico that combines AI-native infrastructure with 20 years of executive-level delivery. Your competitors already work with us.",
    "why.proven.h3": "Proven at the Highest Levels",
    "why.proven.p": "From Supreme Court justices to pharmaceutical CEOs, from live interpretation for 5,000 at Tony Robbins events to C-suite coaching at BMW, PepsiCo, and Grupo Salinas. Battle-tested methodology refined over two decades.",
    "why.admin.h3": "Zero Administrative Burden",
    "why.admin.p": "Your HR team reviews results. We handle everything else.",
    "why.admin.li1": "Placement testing",
    "why.admin.li2": "Group formation",
    "why.admin.li3": "Instructor matching",
    "why.admin.li4": "Monthly PDF reports",
    "why.admin.li5": "Attendance tracking",
    "why.admin.li6": "Invoice generation",
    "why.roi.h3": "Measurable ROI",
    "why.roi.p": "Every dollar justified with data. Monthly progress reports, CEFR-level tracking, attendance rates, and cost-per-student breakdowns — ready for leadership review.",
    "why.roi.link": "See how the platform works &rarr;",

    // Platform
    "plat.eyebrow": "Powered by Technology",
    "plat.h2": "AI-native infrastructure<br>behind every program",
    "plat.lead": "Not just consultants. Our proprietary platform automates the coordination that typically requires an entire operations team.",
    "plat.dash.eyebrow": "Real-Time Dashboards",
    "plat.dash.h3": "Complete visibility for HR.<br>Zero effort required.",
    "plat.dash.p": "Attendance, progress, grades, billable hours, and cost-per-student — all in one dashboard your HR team can access anytime.",
    "plat.dash.s1": "Active Students",
    "plat.dash.s2": "Attendance Rate",
    "plat.dash.s3": "Hours Delivered",
    "plat.dash.s4": "Cost per Hour",
    "plat.ai.eyebrow": "AI Content Engine",
    "plat.ai.h3": "Industry-specific vocabulary powered by AI",
    "plat.ai.p": "Our AI adapts every lesson to your sector — pharma, finance, automotive, tech, consumer goods.",
    "plat.ai.preview": "Generated lesson preview",
    "plat.zoom.eyebrow": "Zoom Integration",
    "plat.zoom.h3": "Automated attendance & class management",
    "plat.zoom.p": "Webhook-based Zoom tracking. No manual attendance sheets. No missed sessions. Everything logged automatically.",
    "plat.hr.eyebrow": "HR Reporting",
    "plat.hr.h3": "Monthly PDF reports ready for leadership",
    "plat.hr.p": "Billable hours, cost per student, CEFR progress, attendance rates — data that justifies your training investment.",
    "plat.tools.eyebrow": "40+ AI Tools",
    "plat.tools.h3": "One person can run an entire language program",
    "plat.tools.p": "Scheduling, group organization, instructor assignment, progress monitoring, invoice generation — all automated. Your team focuses on teaching and relationships.",
    "plat.flow.s1": "Student enrolls",
    "plat.flow.s2": "Placed in group",
    "plat.flow.s3": "Zoom link sent",
    "plat.flow.s4": "Progress tracked",

    // Testimonials
    "test.eyebrow": "Client Impact",
    "test.h2": "Results that speak",
    "test.q1": "\u201CModern Language Center transformed our executive team's communication. The monthly reports gave us the visibility we needed to justify the investment to the board.\u201D",
    "test.n1": "HR Director",
    "test.r1": "Pharmaceutical Company",
    "test.q2": "\u201CThe industry-specific content makes an enormous difference. Our executives practice with real vocabulary from their day-to-day, not generic textbook exercises.\u201D",
    "test.n2": "VP of Operations",
    "test.r2": "Consumer Goods Company",
    "test.q3": "\u201CThe coaching for our board presentation was exceptional. The preparation and attention to detail surpassed any service we\u2019ve ever contracted. We closed the deal.\u201D",
    "test.n3": "CEO",
    "test.r3": "Expanding Fintech",

    // FAQ
    "faq.eyebrow": "Questions",
    "faq.h2": "Frequently asked",
    "faq.q1": "What languages do you offer?",
    "faq.a1": "English, French, Portuguese, German, Italian, Spanish for foreigners, Japanese, and Mandarin. All programs follow the same rigorous methodology and quality standards.",
    "faq.q2": "Are classes online or in-person?",
    "faq.a2": "Both. We offer Zoom-integrated live online sessions, on-site at your offices, or hybrid formats. All include automated attendance tracking and progress monitoring.",
    "faq.q3": "How do you measure ROI?",
    "faq.a3": "Monthly reports include billable hours, cost per student, attendance rates, grade breakdowns, and progress against CEFR levels. Everything your HR team needs to present to leadership.",
    "faq.q4": "What is the free diagnostic?",
    "faq.a4": "A comprehensive evaluation of your team's current levels, an analysis of your organizational objectives, and a tailored program proposal. No commitment required.",
    "faq.q5": "What size are the groups?",
    "faq.a5": "Maximum 8 per group for standard programs, organized by level and functional area. Premium Production is capped at 4. One-on-one is also available.",
    "faq.q6": "How is content personalized by industry?",
    "faq.a6": "We use AI to adapt vocabulary, case studies, and practice scenarios to your company's specific sector — pharmaceuticals, finance, technology, consumer goods, automotive, logistics, and more.",

    // CTA
    "cta.eyebrow": "Take the Next Step",
    "cta.h2": "Your competitors are already investing in<br>executive language fluency.",
    "cta.lead": "The question is: are you?",
    "cta.btn1": "Schedule a Consultation",
    "cta.btn2": "Call Us Directly",

    // Footer
    "foot.brand": "Precision communication for the global elite. 20+ years transforming executive talent.",
    "foot.location": "&#128205; Mexico City",
    "foot.col1": "Solutions",
    "foot.col2": "Individuals",
    "foot.col3": "Company",
    "foot.copyright": "&copy; 2026 Modern Language Center. All rights reserved.",
    "foot.tagline": "Precision Communication for the Global Elite",
    "foot.overview": "Overview",
    "foot.oneOnOne": "One-on-One English",
    "foot.meet": "Meet Program",
    "foot.travelAbroad": "Travel Abroad",
    "foot.about": "About Us",
    "foot.contact": "Contact",
    "foot.privacy": "Privacy Policy"
  },

  es: {
    // Nav
    "nav.solutions": "Soluciones",
    "nav.process": "Proceso",
    "nav.why": "Por qué MLC",
    "nav.clients": "Clientes",
    "nav.faq": "FAQ",
    "nav.cta": "Solicitar una Consulta",

    // Hero
    "hero.eyebrow": "Modern Language Center",
    "hero.h1": 'Comunicación de Precisión para la <span style="color:var(--gold)">Élite Global</span>',
    "hero.lead": "Diseñamos fluidez cultural para entornos empresariales de alto impacto. Desde fondos soberanos hasta juntas directivas multinacionales, redefinimos cómo la élite navega el escenario global.",
    "hero.cta1": "Solicitar una Consulta",
    "hero.cta2": "Explorar Nuestras Soluciones",

    // Trust bar
    "trust.eyebrow": "La confianza de las organizaciones más exigentes de México",

    // Solutions
    "sol.eyebrow": "Nuestras Soluciones",
    "sol.h2": "Ocho soluciones. Un estándar: el tuyo.",
    "sol.lead": "Cada solución está lista para campaña. Cada página funciona como landing page para tus medios pagados.",
    "sol.bep.tag": "Transforma tu clase de inglés",
    "sol.bep.h3": "Programa de Inglés de Negocios",
    "sol.bep.p": "Inglés CEFR para equipos, premiado internacionalmente. Contenido adaptado por IA a tu sector, instructores certificados, grupos de máximo 8.",
    "sol.premium.tag": "Transforma tu productividad",
    "sol.premium.h3": "Producción Premium",
    "sol.premium.p": "80% basado en producción. Presentaciones, negociaciones y fluidez en sala de juntas con material de Harvard Business Review y MIT Sloan. Máximo 4.",
    "sol.coaching.tag": "Transforma tus eventos",
    "sol.coaching.h3": "Coaching de Último Minuto",
    "sol.coaching.p": "Preparación exprés de 48 horas para eventos críticos. Presentaciones a junta directiva, keynotes, negociaciones.",
    "sol.recruit.tag": "Transforma tu contratación",
    "sol.recruit.h3": "Soporte de Reclutamiento",
    "sol.recruit.p": "Evaluaciones oficiales de competencia para RH. Evaluación en dos etapas con reportes CEFR y scorecards de candidatos.",
    "sol.translate.tag": "Precisión y confianza",
    "sol.translate.h3": "Traducción e Interpretación",
    "sol.translate.p": "Traducción legal, médica y financiera. Interpretación remota y presencial para eventos de hasta miles de asistentes.",
    "sol.languages.tag": "Excelencia multilingüe",
    "sol.languages.h3": "Otros Idiomas",
    "sol.languages.p": "Portugués, francés, alemán, italiano, español para extranjeros, japonés y mandarín.",
    "sol.accredit.tag": "Transforma tus credenciales",
    "sol.accredit.h3": "Acreditación",
    "sol.accredit.p": "Preparación experta para IELTS, TOEFL, TOEIC, DELF, DALF, Goethe, CELPE-BRAS y DELE.",
    "sol.abroad.tag": "Transforma tu acceso al mundo",
    "sol.abroad.h3": "Capacitación en el Extranjero",
    "sol.abroad.p": "Inmersión ejecutiva en Reino Unido, Canadá y EE.UU. Excelencia académica, integración cultural y networking profesional.",
    "sol.learn": "Más información &rarr;",

    // Process
    "proc.eyebrow": "Nuestro Proceso",
    "proc.h2": "Tu junta directiva preguntará cómo mediste esto.<br>Aquí está tu respuesta.",
    "proc.lead": "Una metodología probada por más de 20 años, ahora potenciada por IA.",
    "proc.s1.h4": "Evaluar",
    "proc.s1.p": "Mapeamos el nivel, brechas y objetivos de cada equipo con tu líder de RH.",
    "proc.s2.h4": "Diseñar",
    "proc.s2.p": "La IA construye un currículo personalizado por rol, nivel e industria.",
    "proc.s3.h4": "Entregar",
    "proc.s3.p": "Sesiones en vivo — presenciales, remotas o híbridas — con control de calidad en tiempo real.",
    "proc.s4.h4": "Comprobar",
    "proc.s4.p": "Reportes mensuales de ROI que tu CFO realmente leerá.",
    "proc.stat.years": "Años",
    "proc.stat.languages": "Idiomas",
    "proc.stat.companies": "Empresas",

    // Why MLC
    "why.eyebrow": "La Diferencia",
    "why.h2": "No somos una escuela.<br>Somos una ventaja estratégica.",
    "why.lead": "El único socio de idiomas en México que combina infraestructura nativa de IA con 20 años de entrega a nivel ejecutivo. Tus competidores ya trabajan con nosotros.",
    "why.proven.h3": "Probado en los Niveles más Altos",
    "why.proven.p": "Desde ministros de la Suprema Corte hasta CEOs farmacéuticos, desde interpretación en vivo para 5,000 en eventos de Tony Robbins hasta coaching C-suite en BMW, PepsiCo y Grupo Salinas. Metodología probada en batalla, refinada durante dos décadas.",
    "why.admin.h3": "Cero Carga Administrativa",
    "why.admin.p": "Tu equipo de RH revisa resultados. Nosotros nos encargamos de todo lo demás.",
    "why.admin.li1": "Exámenes de ubicación",
    "why.admin.li2": "Formación de grupos",
    "why.admin.li3": "Asignación de instructores",
    "why.admin.li4": "Reportes PDF mensuales",
    "why.admin.li5": "Control de asistencia",
    "why.admin.li6": "Generación de facturas",
    "why.roi.h3": "ROI Medible",
    "why.roi.p": "Cada peso justificado con datos. Reportes mensuales de progreso, seguimiento de niveles CEFR, tasas de asistencia y desgloses de costo por alumno — listos para revisión directiva.",
    "why.roi.link": "Conoce cómo funciona la plataforma &rarr;",

    // Platform
    "plat.eyebrow": "Impulsado por Tecnología",
    "plat.h2": "Infraestructura nativa de IA<br>detrás de cada programa",
    "plat.lead": "No solo consultores. Nuestra plataforma propietaria automatiza la coordinación que normalmente requiere todo un equipo de operaciones.",
    "plat.dash.eyebrow": "Dashboards en Tiempo Real",
    "plat.dash.h3": "Visibilidad completa para RH.<br>Cero esfuerzo requerido.",
    "plat.dash.p": "Asistencia, progreso, calificaciones, horas facturables y costo por alumno — todo en un dashboard al que tu equipo de RH puede acceder en cualquier momento.",
    "plat.dash.s1": "Alumnos Activos",
    "plat.dash.s2": "Tasa de Asistencia",
    "plat.dash.s3": "Horas Impartidas",
    "plat.dash.s4": "Costo por Hora",
    "plat.ai.eyebrow": "Motor de Contenido IA",
    "plat.ai.h3": "Vocabulario específico por industria impulsado por IA",
    "plat.ai.p": "Nuestra IA adapta cada lección a tu sector — farmacéutica, finanzas, automotriz, tecnología, consumo.",
    "plat.ai.preview": "Vista previa de lección generada",
    "plat.zoom.eyebrow": "Integración Zoom",
    "plat.zoom.h3": "Asistencia automatizada y gestión de clases",
    "plat.zoom.p": "Seguimiento de Zoom vía webhooks. Sin listas de asistencia manuales. Sin sesiones perdidas. Todo registrado automáticamente.",
    "plat.hr.eyebrow": "Reportes para RH",
    "plat.hr.h3": "Reportes PDF mensuales listos para directivos",
    "plat.hr.p": "Horas facturables, costo por alumno, progreso CEFR, tasas de asistencia — datos que justifican tu inversión en capacitación.",
    "plat.tools.eyebrow": "40+ Herramientas IA",
    "plat.tools.h3": "Una persona puede administrar todo un programa de idiomas",
    "plat.tools.p": "Programación, organización de grupos, asignación de instructores, monitoreo de progreso, generación de facturas — todo automatizado. Tu equipo se enfoca en enseñar y en las relaciones.",
    "plat.flow.s1": "Alumno se inscribe",
    "plat.flow.s2": "Ubicado en grupo",
    "plat.flow.s3": "Link de Zoom enviado",
    "plat.flow.s4": "Progreso rastreado",

    // Testimonials
    "test.eyebrow": "Impacto en Clientes",
    "test.h2": "Resultados que hablan",
    "test.q1": "\u201CModern Language Center transformó la comunicación de nuestro equipo ejecutivo. Los reportes mensuales nos dieron la visibilidad que necesitábamos para justificar la inversión ante la junta.\u201D",
    "test.n1": "Directora de RH",
    "test.r1": "Empresa Farmacéutica",
    "test.q2": "\u201CEl contenido específico por industria hace una diferencia enorme. Nuestros ejecutivos practican con vocabulario real de su día a día, no ejercicios genéricos de libros de texto.\u201D",
    "test.n2": "VP de Operaciones",
    "test.r2": "Empresa de Consumo",
    "test.q3": "\u201CEl coaching para nuestra presentación ante la junta fue excepcional. La preparación y atención al detalle superó cualquier servicio que hayamos contratado. Cerramos el trato.\u201D",
    "test.n3": "CEO",
    "test.r3": "Fintech en Expansión",

    // FAQ
    "faq.eyebrow": "Preguntas",
    "faq.h2": "Preguntas frecuentes",
    "faq.q1": "¿Qué idiomas ofrecen?",
    "faq.a1": "Inglés, francés, portugués, alemán, italiano, español para extranjeros, japonés y mandarín. Todos los programas siguen la misma metodología rigurosa y estándares de calidad.",
    "faq.q2": "¿Las clases son en línea o presenciales?",
    "faq.a2": "Ambas. Ofrecemos sesiones en vivo integradas con Zoom, presenciales en tus oficinas, o formatos híbridos. Todas incluyen seguimiento automatizado de asistencia y monitoreo de progreso.",
    "faq.q3": "¿Cómo miden el ROI?",
    "faq.a3": "Los reportes mensuales incluyen horas facturables, costo por alumno, tasas de asistencia, desglose de calificaciones y progreso contra niveles CEFR. Todo lo que tu equipo de RH necesita para presentar a directivos.",
    "faq.q4": "¿Qué es el diagnóstico gratuito?",
    "faq.a4": "Una evaluación integral de los niveles actuales de tu equipo, un análisis de los objetivos organizacionales y una propuesta de programa a la medida. Sin compromiso.",
    "faq.q5": "¿De qué tamaño son los grupos?",
    "faq.a5": "Máximo 8 por grupo en programas estándar, organizados por nivel y área funcional. Producción Premium tiene un máximo de 4. También disponible modalidad uno a uno.",
    "faq.q6": "¿Cómo se personaliza el contenido por industria?",
    "faq.a6": "Usamos IA para adaptar vocabulario, casos de estudio y escenarios de práctica al sector específico de tu empresa — farmacéutica, finanzas, tecnología, consumo, automotriz, logística y más.",

    // CTA
    "cta.eyebrow": "Da el Siguiente Paso",
    "cta.h2": "Tus competidores ya están invirtiendo en<br>fluidez lingüística ejecutiva.",
    "cta.lead": "La pregunta es: ¿y tú?",
    "cta.btn1": "Agendar una Consulta",
    "cta.btn2": "Llámanos Directamente",

    // Footer
    "foot.brand": "Comunicación de precisión para la élite global. Más de 20 años transformando talento ejecutivo.",
    "foot.location": "&#128205; Ciudad de México",
    "foot.col1": "Soluciones",
    "foot.col2": "Individuales",
    "foot.col3": "Empresa",
    "foot.copyright": "&copy; 2026 Modern Language Center. Todos los derechos reservados.",
    "foot.tagline": "Comunicación de Precisión para la Élite Global",
    "foot.overview": "General",
    "foot.oneOnOne": "Inglés Uno a Uno",
    "foot.meet": "Programa Meet",
    "foot.travelAbroad": "Viaja al Extranjero",
    "foot.about": "Nosotros",
    "foot.contact": "Contacto",
    "foot.privacy": "Política de Privacidad"
  }
};

(function() {
  const STORAGE_KEY = 'mlc-lang';

  function getLang() {
    return localStorage.getItem(STORAGE_KEY) || 'en';
  }

  function setLang(lang) {
    localStorage.setItem(STORAGE_KEY, lang);
    applyLang(lang);
  }

  function applyLang(lang) {
    const dict = translations[lang];
    if (!dict) return;

    document.documentElement.lang = lang;

    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.dataset.i18n;
      if (dict[key] === undefined) return;

      // For elements that contain HTML (spans, br tags, etc.)
      if (dict[key].includes('<')) {
        el.innerHTML = dict[key];
      } else {
        el.textContent = dict[key];
      }
    });

    // Update toggle button labels
    const toggle = document.getElementById('langToggle');
    if (toggle) {
      const active = toggle.querySelector('.lang-active');
      const inactive = toggle.querySelector('.lang-inactive');
      if (active) active.textContent = lang === 'en' ? 'EN' : 'ES';
      if (inactive) inactive.textContent = lang === 'en' ? 'ES' : 'EN';
    }
  }

  // Init on DOM ready
  document.addEventListener('DOMContentLoaded', () => {
    const lang = getLang();
    applyLang(lang);

    const toggle = document.getElementById('langToggle');
    if (toggle) {
      toggle.addEventListener('click', () => {
        const current = getLang();
        setLang(current === 'en' ? 'es' : 'en');
      });
    }
  });
})();
