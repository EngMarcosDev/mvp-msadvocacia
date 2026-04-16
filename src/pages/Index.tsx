import { forwardRef, useCallback, useEffect, useRef, useState, type SVGProps } from "react";
import { BookOpen, Mail, MapPin, Clock, Shield, Users, ChevronRight, Gavel, FileText, AlertTriangle, Briefcase, Scale, UserCheck, Building, Siren, GraduationCap, Award, BadgeCheck, Star, ExternalLink, ChevronLeft } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import { useGoogleReviews } from "@/hooks/useGoogleReviews";

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

const GOOGLE_PLACE_ID = import.meta.env.VITE_GOOGLE_PLACE_ID as string | undefined;
const GOOGLE_REVIEWS_URL = GOOGLE_PLACE_ID
  ? `https://search.google.com/local/reviews?placeid=${GOOGLE_PLACE_ID}`
  : "https://www.google.com/search?q=MS+Advocacia+Lajedo+PE";

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

const StarRating = ({ rating, size = "sm" }: { rating: number; size?: "sm" | "md" }) => {
  const starSize = size === "sm" ? "w-4 h-4" : "w-5 h-5";
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`${starSize} ${i < Math.round(rating) ? "fill-accent text-accent" : "fill-muted text-muted"}`}
        />
      ))}
    </div>
  );
};

/* ── Google SVG Icon ── */
const GoogleIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5 flex-shrink-0" aria-hidden>
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
  </svg>
);

/* ── Reviews Carousel ── */
const ReviewsSection = () => {
  const { reviews, rating, totalRatings, loading, error } = useGoogleReviews();
  const hasApiReviews = !loading && !error && reviews.length > 0;

  const displayReviews = hasApiReviews
    ? reviews
    : MOCK_GOOGLE_REVIEWS.map((r) => ({
        author_name: r.nome,
        rating: r.estrelas,
        text: r.texto,
        time: 0,
        profile_photo_url: undefined,
        relative_time_description: undefined,
      }));

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);
  const autoplayRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  const scrollTo = useCallback(
    (index: number) => emblaApi && emblaApi.scrollTo(index),
    [emblaApi]
  );
  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  const startAutoplay = useCallback(() => {
    if (autoplayRef.current) clearInterval(autoplayRef.current);
    autoplayRef.current = setInterval(() => {
      if (emblaApi) emblaApi.scrollNext();
    }, 5000);
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on("select", onSelect);
    emblaApi.on("pointerDown", () => {
      if (autoplayRef.current) clearInterval(autoplayRef.current);
    });
    emblaApi.on("pointerUp", startAutoplay);
    startAutoplay();
    return () => {
      if (autoplayRef.current) clearInterval(autoplayRef.current);
    };
  }, [emblaApi, onSelect, startAutoplay]);

  return (
    <section className="py-20 bg-background overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">

        {/* Cabeçalho */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div>
            <div className="w-12 h-px bg-accent mb-5" />
            <h2 className="text-2xl md:text-3xl font-bold leading-tight">
              O que nossos clientes dizem
            </h2>
            {rating && totalRatings && (
              <div className="flex items-center gap-2 mt-3">
                <StarRating rating={rating} size="md" />
                <span className="font-bold text-base">{rating.toFixed(1)}</span>
                <span className="text-xs text-muted-foreground">· {totalRatings} avaliações no Google</span>
              </div>
            )}
          </div>

          {/* Setas desktop */}
          <div className="hidden md:flex items-center gap-2">
            <button
              onClick={scrollPrev}
              className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-secondary transition-colors"
              aria-label="Anterior"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={scrollNext}
              className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-secondary transition-colors"
              aria-label="Próximo"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Loading skeleton */}
        {loading && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="bg-card border border-border rounded-xl p-6 animate-pulse">
                <div className="flex gap-2 items-center mb-4">
                  <div className="w-10 h-10 rounded-full bg-muted" />
                  <div className="space-y-1.5 flex-1">
                    <div className="h-3 bg-muted rounded w-1/2" />
                    <div className="h-2.5 bg-muted rounded w-1/3" />
                  </div>
                </div>
                <div className="flex gap-1 mb-3">
                  {Array.from({ length: 5 }).map((_, j) => <div key={j} className="w-4 h-4 rounded bg-muted" />)}
                </div>
                <div className="space-y-2">
                  <div className="h-3 bg-muted rounded w-full" />
                  <div className="h-3 bg-muted rounded w-5/6" />
                  <div className="h-3 bg-muted rounded w-4/6" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Carrossel */}
        {!loading && (
          <div id="google-reviews" className="overflow-hidden" ref={emblaRef}>
            <div className="flex -ml-4">
              {displayReviews.map((review, i) => (
                <div
                  key={i}
                  className="pl-4 flex-none w-[88vw] sm:w-1/2 lg:w-1/3 min-w-0"
                >
                <div className="bg-card border border-border rounded-xl p-6 flex flex-col h-full">
                  {/* Topo: autor + Google icon */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      {review.profile_photo_url ? (
                        <img
                          src={review.profile_photo_url}
                          alt={review.author_name}
                          className="w-10 h-10 rounded-full object-cover flex-shrink-0"
                          referrerPolicy="no-referrer"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center text-sm font-bold text-accent flex-shrink-0">
                          {review.author_name.charAt(0).toUpperCase()}
                        </div>
                      )}
                      <div>
                        <p className="text-sm font-semibold leading-tight">{review.author_name}</p>
                        {review.relative_time_description && (
                          <p className="text-[0.65rem] text-muted-foreground mt-0.5">{review.relative_time_description}</p>
                        )}
                      </div>
                    </div>
                    <GoogleIcon />
                  </div>

                  {/* Estrelas */}
                  <StarRating rating={review.rating} />

                  {/* Texto */}
                  <p className="text-sm text-muted-foreground leading-relaxed mt-3 italic flex-1">
                    "{review.text.length > 220 ? review.text.slice(0, 220) + "…" : review.text}"
                  </p>
                </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Dots + CTA */}
        {!loading && (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-8">
            {/* Dots */}
            <div className="flex items-center gap-2">
              {scrollSnaps.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => scrollTo(idx)}
                  className={`rounded-full transition-all duration-300 ${
                    idx === selectedIndex
                      ? "w-6 h-2 bg-accent"
                      : "w-2 h-2 bg-border hover:bg-muted-foreground"
                  }`}
                  aria-label={`Ir para slide ${idx + 1}`}
                />
              ))}
            </div>

            {/* Botão ver todas */}
            <a
              href={GOOGLE_REVIEWS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-border text-sm font-medium px-5 py-2.5 rounded-md hover:bg-secondary transition-colors"
            >
              Ver todas no Google
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        )}
      </div>
    </section>
  );
};

const AREAS = [
  { title: "Acompanhamento em Delegacias", icon: Shield },
  { title: "Audiências de Custódia", icon: Gavel },
  { title: "Homicídios", icon: AlertTriangle },
  { title: "Tráfico de Drogas", icon: Scale },
  { title: "Crimes contra o Patrimônio", icon: Briefcase },
  { title: "Lei Maria da Penha", icon: Users },
  { title: "Crimes Sexuais", icon: Shield },
  { title: "Recursos Criminais", icon: FileText },
  { title: "Habeas Corpus", icon: BookOpen },
];

const AreasSection = () => {
  const [areasEmblaRef, areasEmblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
    breakpoints: { "(min-width: 640px)": { active: false } },
  });
  const [areasIndex, setAreasIndex] = useState(0);
  const areasAutoRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const areasPrev = useCallback(() => areasEmblaApi && areasEmblaApi.scrollPrev(), [areasEmblaApi]);
  const areasNext = useCallback(() => areasEmblaApi && areasEmblaApi.scrollNext(), [areasEmblaApi]);

  useEffect(() => {
    if (!areasEmblaApi) return;
    areasEmblaApi.on("select", () => setAreasIndex(areasEmblaApi.selectedScrollSnap()));
    areasAutoRef.current = setInterval(() => areasEmblaApi.scrollNext(), 3500);
    areasEmblaApi.on("pointerDown", () => { if (areasAutoRef.current) clearInterval(areasAutoRef.current); });
    areasEmblaApi.on("pointerUp", () => {
      areasAutoRef.current = setInterval(() => areasEmblaApi.scrollNext(), 3500);
    });
    return () => { if (areasAutoRef.current) clearInterval(areasAutoRef.current); };
  }, [areasEmblaApi]);

  return (
    <section id="areas" className="py-24 bg-primary text-primary-foreground overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        {/* Cabeçalho */}
        <div className="text-center mb-12">
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

        {/* MOBILE: slider Embla */}
        <div className="sm:hidden">
          <div className="overflow-hidden" ref={areasEmblaRef}>
            <div className="flex -ml-4">
              {AREAS.map((area) => (
                <div
                  key={area.title}
                  className="pl-4 flex-none w-[78vw] min-w-0"
                >
                  <div className="bg-primary-foreground/5 border border-primary-foreground/10 rounded-xl p-6 h-full">
                    <div className="w-12 h-12 rounded-lg bg-primary-foreground/10 flex items-center justify-center mb-4">
                      <area.icon className="w-5 h-5 text-accent" />
                    </div>
                    <h3
                      className="text-base font-semibold leading-snug"
                      style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.1rem" }}
                    >
                      {area.title}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Controles mobile */}
          <div className="flex items-center justify-between mt-6 px-1">
            {/* Dots */}
            <div className="flex gap-1.5">
              {AREAS.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => areasEmblaApi && areasEmblaApi.scrollTo(idx)}
                  className={`rounded-full transition-all duration-300 ${
                    idx === areasIndex
                      ? "w-5 h-1.5 bg-accent"
                      : "w-1.5 h-1.5 bg-primary-foreground/20"
                  }`}
                  aria-label={`Ir para ${AREAS[idx].title}`}
                />
              ))}
            </div>
            {/* Setas discretas */}
            <div className="flex gap-2">
              <button
                onClick={areasPrev}
                className="w-8 h-8 rounded-full border border-primary-foreground/20 flex items-center justify-center hover:border-accent hover:text-accent transition-colors"
                aria-label="Anterior"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={areasNext}
                className="w-8 h-8 rounded-full border border-primary-foreground/20 flex items-center justify-center hover:border-accent hover:text-accent transition-colors"
                aria-label="Próximo"
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* DESKTOP: grid */}
        <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {AREAS.map((area) => (
            <div
              key={area.title}
              className="bg-primary-foreground/5 border border-primary-foreground/10 rounded-lg p-6 hover:bg-primary-foreground/10 transition-colors group"
            >
              <div className="w-12 h-12 rounded-lg bg-primary-foreground/10 flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                <area.icon className="w-5 h-5 text-primary-foreground/70 group-hover:text-accent transition-colors" />
              </div>
              <h3
                className="text-base font-semibold"
                style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.05rem" }}
              >
                {area.title}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

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
      <AreasSection />

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
      <ReviewsSection />

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
