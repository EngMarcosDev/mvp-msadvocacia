import { useEffect, useState } from "react";

export interface GoogleReview {
  author_name: string;
  rating: number;
  text: string;
  time: number;
  profile_photo_url?: string;
  relative_time_description?: string;
}

interface State {
  reviews: GoogleReview[];
  rating: number | null;
  totalRatings: number | null;
  loading: boolean;
  error: string | null;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type G = any;
declare global { interface Window { google?: G; } }

const API_KEY  = import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string | undefined;
const PLACE_ID = import.meta.env.VITE_GOOGLE_PLACE_ID    as string | undefined;

function loadScript(apiKey: string): Promise<void> {
  return new Promise((resolve, reject) => {
    if (window.google?.maps) { resolve(); return; }
    const existing = document.getElementById("gmap-script");
    if (existing) {
      existing.addEventListener("load",  () => resolve());
      existing.addEventListener("error", () => reject(new Error("Falha ao carregar Maps")));
      return;
    }
    const s = document.createElement("script");
    s.id      = "gmap-script";
    // loading=async + nova biblioteca places
    s.src     = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places&loading=async&language=pt-BR`;
    s.async   = true;
    s.onload  = () => resolve();
    s.onerror = () => reject(new Error("Erro ao carregar Google Maps API"));
    document.head.appendChild(s);
  });
}

export function useGoogleReviews(): State {
  const [state, setState] = useState<State>({
    reviews: [], rating: null, totalRatings: null, loading: true, error: null,
  });

  useEffect(() => {
    if (!API_KEY || !PLACE_ID) {
      const msg = "Env vars não encontradas no build (VITE_GOOGLE_MAPS_API_KEY / VITE_GOOGLE_PLACE_ID).";
      console.error("[Reviews]", msg);
      setState(s => ({ ...s, loading: false, error: msg }));
      return;
    }

    let cancelled = false;

    async function run() {
      try {
        await loadScript(API_KEY!);
        if (cancelled) return;

        // Nova API: google.maps.places.Place (substitui PlacesService)
        const maps  = window.google.maps;
        const Place = maps.places.Place as G;

        const place = new Place({ id: PLACE_ID });

        await place.fetchFields({
          fields: ["reviews", "rating", "userRatingCount"],
        });

        if (cancelled) return;

        const raw: G[] = place.reviews ?? [];
        const sorted: GoogleReview[] = raw
          .filter((r: G) => r.text?.text?.trim().length > 5)
          .sort((a: G, b: G) => {
            const ta = a.publishTime ? new Date(a.publishTime).getTime() : 0;
            const tb = b.publishTime ? new Date(b.publishTime).getTime() : 0;
            return tb - ta;
          })
          .map((r: G) => ({
            author_name:              r.authorAttribution?.displayName ?? "Anônimo",
            rating:                   r.rating ?? 5,
            text:                     r.text?.text ?? "",
            time:                     r.publishTime ? new Date(r.publishTime).getTime() / 1000 : 0,
            profile_photo_url:        r.authorAttribution?.photoURI ?? undefined,
            relative_time_description: r.relativePublishTimeDescription ?? undefined,
          }));

        console.info(`[Reviews] ${sorted.length} avaliação(ões) carregada(s).`);

        setState({
          reviews:      sorted,
          rating:       place.rating       ?? null,
          totalRatings: place.userRatingCount ?? null,
          loading:      false,
          error:        null,
        });
      } catch (err) {
        if (!cancelled) {
          const msg = err instanceof Error ? err.message : "Erro desconhecido";
          console.error("[Reviews]", msg);
          setState(s => ({ ...s, loading: false, error: msg }));
        }
      }
    }

    run();
    return () => { cancelled = true; };
  }, []);

  return state;
}
