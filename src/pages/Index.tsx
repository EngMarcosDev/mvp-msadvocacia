import { forwardRef, type SVGProps } from "react";
import { BookOpen, Mail, MapPin, Clock, Shield, Users, ChevronRight, Gavel, FileText, AlertTriangle, Briefcase, Scale, UserCheck, Building, Siren, GraduationCap, Award, BadgeCheck, Star } from "lucide-react";

import logoTransparente from "@/assets/logo-transparente.png";
import marcioImg from "@/assets/marcio.jpeg";
import liberdadeImg from "@/assets/liberdade.jpg";
import heroBg from "@/assets/hero-bg.jpg";

const WHATSAPP_NUMBER = "5587981373019";
const WHATSAPP_MESSAGE = "Olá, gostaria de falar com a equipe da MS Advocacia.";
const buildWhatsAppLink = (message: string) => {
  const params = new URLSearchParams({
    phone: WHATSAPP_NUMBER,
    text: message,
    type: "phone_number",
    app_absent: "0",
  });

  return `https://api.whatsapp.com/send/?${params.toString()}`;
};

const WHATSAPP_LINK = buildWhatsAppLink(WHATSAPP_MESSAGE);

const MOCK_GOOGLE_REVIEWS = [
  {
    nome: "Cliente satisfeito",
    texto: "Profissional competente e dedicado. Resolveu meu caso com agilidade e transparência.",
    estrelas: 5,
  },
  {
    nome: "Excelente atendimento",
    texto: "Desde o primeiro contato fui muito bem atendido. Recomendo a todos que precisam de um advogado criminal.",
    estrelas: 5,
  },
  {
    nome: "Recomendo",
    texto: "Dr. Marcio é um profissional sério e comprometido. Me deu toda a segurança que eu precisava.",
    estrelas: 5,
  },
];

const openWhatsApp = (message = WHATSAPP_MESSAGE) => {
  if (typeof window === "undefined") {
    return;
  }

  const whatsappUrl = buildWhatsAppLink(message);
  const whatsappWindow = window.open(whatsappUrl, "_blank", "noopener,noreferrer");

  if (!whatsappWindow || whatsappWindow.closed || typeof whatsappWindow.closed === "undefined") {
    window.location.assign(whatsappUrl);
  }
};

const WhatsAppIcon = forwardRef<SVGSVGElement, SVGProps<SVGSVGElement>>(({ className, ...props }, ref) => (
  <svg ref={ref} viewBox="0 0 24 24" fill="currentColor" className={className} {...props}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
));

WhatsAppIcon.displayName = "WhatsAppIcon";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">

      {/* ============ HERO ============ */}
      <section className="relative min-h-screen flex flex-col">
        <img
          src={heroBg}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
          width={1920}
          height={1080}
        />
        <div className="absolute inset-0 bg-primary/85" />

        <nav className="relative z-20 w-full">
          <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
            <div className="flex flex-col">
              <span className="font-bold text-primary-foreground tracking-[0.2em] uppercase text-lg" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                MS Advocacia
              </span>
              <span className="text-[0.6rem] text-primary-foreground/50 tracking-widest uppercase">Direito Criminal</span>
            </div>
            <div className="hidden md:flex items-center gap-8 text-sm text-primary-foreground/70">
              <a href="#sobre" className="hover:text-primary-foreground transition-colors">Sobre</a>
              <a href="#areas" className="hover:text-primary-foreground transition-colors">Áreas</a>
              <a href="#diferenciais" className="hover:text-primary-foreground transition-colors">Diferenciais</a>
              <a href="#contato" className="hover:text-primary-foreground transition-colors">Contato</a>
            </div>
          </div>
        </nav>

        <div className="relative z-10 flex-1 flex items-center">
          <div className="max-w-6xl mx-auto px-6 w-full py-12 md:py-16">
            <div className="max-w-2xl">
              <img src={logoTransparente} alt="MS Advocacia" className="-ml-4 sm:-ml-6 md:-ml-10 lg:-ml-14 w-[18rem] sm:w-[22rem] md:w-[30rem] lg:w-[36rem] max-w-full h-auto object-contain drop-shadow-2xl mb-4" />
              <div className="w-16 h-px bg-accent mb-8" />
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight text-primary-foreground mb-6 uppercase">
                Sua liberdade
                <br />
                não pode esperar.
                <br />
                <span className="text-accent">Nós garantimos isso.</span>
              </h1>
              <p className="text-primary-foreground/70 leading-relaxed max-w-lg mb-8 text-base">
                Defesa criminal firme e estratégica em todas as instâncias.
                Cada caso exige resposta rápida, técnica apurada e
                compromisso absoluto com o resultado.
              </p>
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(event) => {
                  event.preventDefault();
                  openWhatsApp();
                }}
                className="inline-flex items-center justify-center gap-3 bg-accent text-accent-foreground px-8 py-4 text-sm font-semibold hover:bg-accent/90 transition-colors rounded-md uppercase tracking-wider"
              >
                Fale com um especialista
                <WhatsAppIcon className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ============ SOBRE ============ */}
      <section id="sobre" className="py-24 bg-background">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="relative flex justify-center">
              <div className="relative">
                <div className="absolute -inset-3 border border-border rounded-lg" />
                <div className="absolute -inset-6 border border-border/50 rounded-lg" />
                <img
                  src={marcioImg}
                  alt="Dr. Marcio Silva"
                  className="relative z-10 w-full max-w-sm object-cover rounded-lg shadow-2xl"
                  width={400}
                  height={550}
                />
                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 z-20 bg-card border border-border px-5 py-3 rounded-md shadow-lg">
                  <div className="w-12 h-px bg-accent mx-auto mb-2" />
                  <p className="text-center font-semibold" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.1rem' }}>
                    Dr. Marcio Silva
                  </p>
                </div>
              </div>
            </div>

            <div>
              <span className="text-xs uppercase tracking-[0.25em] text-muted-foreground font-medium border-b border-border pb-1">
                Conheça
              </span>
              <h2 className="text-3xl md:text-4xl font-bold leading-tight mt-4 mb-6">
                MS Advocacia
              </h2>
              <p className="text-muted-foreground leading-relaxed text-sm mb-4">
                Sob a supervisão do Dr. Marcio Silva, pós-graduado em Direito
                Penal e Processo Penal, o escritório MS Advocacia acumula 9 anos
                de dedicação exclusiva ao Direito Criminal. Atuamos de forma
                incisiva em delegacias e tribunais de toda a região, trabalhando
                por sua liberdade com uma defesa personalizada e estratégica.
              </p>
              <p className="text-muted-foreground leading-relaxed text-sm mb-8">
                Não entregamos apenas processos; entregamos o peso de anos de
                especialização para proteger o que você tem de mais valioso.
              </p>
              <div className="grid max-w-2xl gap-3 sm:grid-cols-2">
                <div className="flex min-h-14 items-center gap-3 rounded-lg border border-border bg-secondary px-5 py-3">
                  <GraduationCap className="w-5 h-5 text-accent flex-shrink-0" />
                  <span className="text-sm font-medium leading-snug">Pós-graduado em Direito Penal e Processo Penal</span>
                </div>
                <div className="flex min-h-14 items-center gap-3 rounded-lg border border-border bg-secondary px-5 py-3">
                  <Award className="w-5 h-5 text-accent flex-shrink-0" />
                  <span className="text-sm font-medium leading-snug">9 anos de atuação exclusiva</span>
                </div>
                <div className="flex min-h-14 items-center gap-3 rounded-lg border border-border bg-secondary px-5 py-3 sm:col-span-2">
                  <BadgeCheck className="w-5 h-5 text-accent flex-shrink-0" />
                  <span className="text-sm font-medium leading-snug">Especialista em Direito Criminal</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ ÁREAS ============ */}
      <section id="areas" className="py-24 bg-primary text-primary-foreground">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="w-12 h-px bg-accent mx-auto mb-6" />
            <span className="text-xs uppercase tracking-[0.25em] text-primary-foreground/50 font-medium">
              O que fazemos
            </span>
            <h2 className="text-3xl md:text-4xl font-bold leading-tight mt-3">
              Atuação especializada em
              <br />
              Direito Criminal
            </h2>
            <p className="text-primary-foreground/60 max-w-2xl mx-auto mt-4 text-sm leading-relaxed">
              Cobertura jurídica completa em todas as etapas do processo penal,
              da investigação policial ao julgamento em plenário.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { title: "Acompanhamento em Delegacias", icon: Shield },
              { title: "Audiências de Custódia", icon: Gavel },
              { title: "Homicídios", icon: AlertTriangle },
              { title: "Tráfico de Drogas", icon: Scale },
              { title: "Crimes contra o Patrimônio", icon: Briefcase },
              { title: "Lei Maria da Penha", icon: Users },
              { title: "Crimes Sexuais", icon: Shield },
              { title: "Recursos Criminais", icon: FileText },
              { title: "Habeas Corpus", icon: BookOpen },
            ].map((area) => (
              <div key={area.title} className="bg-primary-foreground/5 border border-primary-foreground/10 rounded-lg p-6 hover:bg-primary-foreground/10 transition-colors group">
                <div className="w-12 h-12 rounded-lg bg-primary-foreground/10 flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                  <area.icon className="w-5 h-5 text-primary-foreground/70 group-hover:text-accent transition-colors" />
                </div>
                <h3 className="text-base font-semibold" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.05rem' }}>
                  {area.title}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ ATENDIMENTO IMEDIATO ============ */}
      <section className="py-24 bg-background">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="w-12 h-px bg-primary mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold leading-tight">
              Atendimento imediato em
              <br />
              situações críticas
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mt-4 text-sm leading-relaxed">
              Quando a liberdade está em risco, não há espaço para demora.
              Nossa equipe age com precisão e urgência para proteger seus
              direitos desde o primeiro instante.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
            {[
              { icon: Siren, label: "Prisão em flagrante" },
              { icon: UserCheck, label: "Orientação e defesa na fase policial" },
              { icon: Building, label: "Atuação imediata perante o juiz" },
              { icon: Shield, label: "Prisão preventiva" },
            ].map((item) => (
              <div key={item.label} className="bg-card border border-border rounded-lg p-6 text-center hover:shadow-lg transition-shadow">
                <div className="w-14 h-14 rounded-full bg-secondary flex items-center justify-center mx-auto mb-4">
                  <item.icon className="w-6 h-6 text-muted-foreground" />
                </div>
                <p className="text-sm font-medium">{item.label}</p>
              </div>
            ))}
          </div>
          <div className="text-center">
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(event) => {
                event.preventDefault();
                openWhatsApp();
              }}
              className="inline-flex items-center justify-center gap-3 bg-accent text-accent-foreground px-8 py-4 text-sm font-semibold hover:bg-accent/90 transition-colors rounded-md"
            >
              Fale com um especialista
              <ChevronRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* ============ DIFERENCIAIS ============ */}
      <section id="diferenciais" className="py-24 bg-primary text-primary-foreground">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="w-12 h-px bg-accent mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold leading-tight">
              Nossos Diferenciais
            </h2>
            <p className="text-primary-foreground/60 mt-3 text-sm">
              Defesa personalizada, estratégica, experiente e comprometida
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Scale, title: "Foco exclusivo", desc: "no Direito Penal" },
              { icon: Users, title: "Atendimento direto", desc: "e personalizado ao cliente" },
              { icon: Shield, title: "Defesa orientada", desc: "à conquista da liberdade" },
              { icon: UserCheck, title: "Postura ética", desc: "com resultados concretos" },
            ].map((item) => (
              <div key={item.title} className="text-center">
                <div className="w-16 h-16 rounded-full bg-primary-foreground/10 border border-primary-foreground/20 flex items-center justify-center mx-auto mb-4">
                  <item.icon className="w-6 h-6 text-primary-foreground/70" />
                </div>
                <div className="w-8 h-px bg-accent mx-auto mb-3" />
                <p className="text-sm">
                  <span className="font-bold">{item.title}</span>{" "}
                  <span className="text-primary-foreground/60">{item.desc}</span>
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ PROFISSIONALISMO ============ */}
      <section className="py-24 bg-background">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <div className="w-12 h-px bg-accent mb-6" />
              <h2 className="text-3xl md:text-4xl font-bold leading-tight mb-6">
                A lei existe para
                <br />
                proteger, não para punir
              </h2>
              <p className="text-muted-foreground leading-relaxed text-sm mb-4">
                Acreditamos que todo cidadão merece uma defesa justa e rigorosa.
                Nosso compromisso é transformar o peso de uma acusação em uma
                oportunidade real de justiça.
              </p>
              <p className="text-muted-foreground leading-relaxed text-sm mb-8">
                Com estratégia sólida e conhecimento profundo do ordenamento jurídico,
                lutamos para que cada cliente tenha seus direitos plenamente
                respeitados em todas as instâncias.
              </p>
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
              onClick={(event) => {
                event.preventDefault();
                openWhatsApp();
              }}
                className="inline-flex items-center justify-center gap-3 bg-accent text-accent-foreground px-8 py-4 text-sm font-semibold hover:bg-accent/90 transition-colors rounded-md"
              >
                Fale com um especialista
                <ChevronRight className="w-4 h-4" />
              </a>
            </div>
            <div className="relative flex justify-center">
              <img
                src={liberdadeImg}
                alt="Algemas quebradas e balança da justiça — símbolo de liberdade"
                className="w-full max-w-md object-cover rounded-lg shadow-2xl"
                loading="lazy"
                width={1024}
                height={768}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ============ FORMULÁRIO DE CONTATO ============ */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="max-w-6xl mx-auto px-6">
          <div className="bg-primary-foreground/5 border border-primary-foreground/10 rounded-2xl p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold leading-tight mb-6">
                  Preencha o formulário para um atendimento online e rápido!
                </h2>
                <div className="w-12 h-px bg-accent mb-6" />
                <p className="text-primary-foreground/60 text-sm leading-relaxed">
                  As informações enviadas serão analisadas pela nossa equipe para
                  que possamos entender sua situação e orientar o próximo passo
                  com segurança e agilidade.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-6">Consulte seu caso</h3>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    const formData = new FormData(e.currentTarget);
                    const nome = formData.get("nome") || "";
                    const email = formData.get("email") || "";
                    const telefone = formData.get("telefone") || "";
                    const mensagem = formData.get("mensagem") || "";
                    const texto = `Olá, meu nome é ${nome}. E-mail: ${email}. Telefone: ${telefone}. ${mensagem}`;
                    openWhatsApp(String(texto));
                  }}
                  className="space-y-4"
                >
                  <input
                    name="nome"
                    type="text"
                    placeholder="Digite seu nome aqui"
                    required
                    className="w-full bg-transparent border-b border-primary-foreground/20 pb-3 text-sm text-primary-foreground placeholder:text-primary-foreground/40 focus:outline-none focus:border-accent transition-colors"
                  />
                  <input
                    name="email"
                    type="email"
                    placeholder="Digite seu e-mail aqui"
                    required
                    className="w-full bg-transparent border-b border-primary-foreground/20 pb-3 text-sm text-primary-foreground placeholder:text-primary-foreground/40 focus:outline-none focus:border-accent transition-colors"
                  />
                  <input
                    name="telefone"
                    type="tel"
                    placeholder="Digite seu número para contato aqui"
                    required
                    className="w-full bg-transparent border-b border-primary-foreground/20 pb-3 text-sm text-primary-foreground placeholder:text-primary-foreground/40 focus:outline-none focus:border-accent transition-colors"
                  />
                  <textarea
                    name="mensagem"
                    placeholder="Conte-nos um pouco sobre a sua situação aqui"
                    rows={3}
                    className="w-full bg-transparent border-b border-primary-foreground/20 pb-3 text-sm text-primary-foreground placeholder:text-primary-foreground/40 focus:outline-none focus:border-accent transition-colors resize-none"
                  />
                  <button
                    type="submit"
                    className="w-full bg-accent text-accent-foreground py-4 rounded-md text-sm font-semibold hover:bg-accent/90 transition-colors flex items-center justify-center gap-2 mt-4"
                  >
                    Entrar em contato agora
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ AVALIAÇÕES ============ */}
      <section className="py-16 bg-background">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-10">
            <div className="w-12 h-px bg-accent mx-auto mb-6" />
            <h2 className="text-2xl md:text-3xl font-bold leading-tight">
              O que nossos clientes dizem
            </h2>
          </div>
          <div id="google-reviews" className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {MOCK_GOOGLE_REVIEWS.map((review, i) => (
              <div key={i} className="bg-card border border-border rounded-lg p-6">
                <div className="flex gap-1 mb-3">
                  {Array.from({ length: review.estrelas }).map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-accent text-accent" />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4 italic">
                  "{review.texto}"
                </p>
                <p className="text-xs font-semibold">{review.nome}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ CONTATO / FOOTER ============ */}
      <section id="contato" className="py-24 bg-primary text-primary-foreground">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-12 items-start">
            <div className="flex flex-col items-center md:items-start gap-4">
              <img src={logoTransparente} alt="MS Advocacia" className="sm:-ml-2 md:-ml-6 lg:-ml-8 w-[12rem] sm:w-[15rem] md:w-[21rem] lg:w-[25rem] h-auto object-contain drop-shadow-2xl" />
              <p className="font-bold tracking-[0.15em] uppercase" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.2rem' }}>
                MS Advocacia
              </p>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-6" style={{ fontFamily: "'Cormorant Garamond', serif" }}>Contato</h3>
              <div className="space-y-4">
                <a
                  href={WHATSAPP_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(event) => {
                    event.preventDefault();
                    openWhatsApp();
                  }}
                  className="flex items-center gap-3 text-sm text-primary-foreground/70 hover:text-accent transition-colors"
                >
                  <WhatsAppIcon className="w-4 h-4 text-accent" />
                  WhatsApp: (87) 98137-3019
                </a>
                <a href="mailto:contato@marciosilvaadvocacia.com" className="flex items-center gap-3 text-sm text-primary-foreground/70 hover:text-accent transition-colors">
                  <Mail className="w-4 h-4 text-accent" />
                  contato@marciosilvaadvocacia.com
                </a>
                <div className="flex items-center gap-3 text-sm text-primary-foreground/70">
                  <Clock className="w-4 h-4 text-accent" />
                  Segunda a sexta, 8h às 17h
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-6" style={{ fontFamily: "'Cormorant Garamond', serif" }}>Localização</h3>
              <div className="flex items-start gap-3 text-sm text-primary-foreground/70">
                <MapPin className="w-4 h-4 text-accent mt-0.5" />
                <span>Av. Presidente Vargas, 200,<br />Centro, Lajedo – PE</span>
              </div>
            </div>
          </div>

          <div className="border-t border-primary-foreground/10 mt-16 pt-8 text-center">
            <p className="text-xs text-primary-foreground/40">
              © {new Date().getFullYear()} MS Advocacia. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </section>

      {/* WhatsApp floating button */}
      <a
        href={WHATSAPP_LINK}
        target="_blank"
        rel="noopener noreferrer"
        onClick={(event) => {
          event.preventDefault();
          openWhatsApp();
        }}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#25D366] hover:bg-[#20BD5A] text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all hover:scale-105"
        aria-label="Contato via WhatsApp"
      >
        <WhatsAppIcon className="w-7 h-7" />
      </a>
    </div>
  );
};

export default Index;
