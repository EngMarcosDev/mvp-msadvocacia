import { useEffect, useState } from "react";

export interface GoogleReview {
  author_name: string;
  rating: number;
  text: string;
  time: number;
  profile_photo_url?: string;
  relative_time_description?: string;
}

interface UseGoogleReviewsState {
  reviews: GoogleReview[];
  rating: number | null;
  totalRatings: number | null;
  loading: boolean;
  error: string | null;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type GoogleMaps = any;

declare global {
  interface Window {
    google?: GoogleMaps;
  }
}

const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string | undefined;
const GOOGLE_PLACE_ID = import.meta.env.VITE_GOOGLE_PLACE_ID as string | undefined;

function loadGoogleMapsScript(apiKey: string): Promise<void> {
  return new Promise((resolve, reject) => {
    if (window.google?.maps?.places) {
      resolve();
      return;
    }

    const existing = document.getElementById("google-maps-script");
    if (existing) {
      existing.addEventListener("load", () => resolve());
      existing.addEventListener("error", () => reject(new Error("Falha ao carregar Google Maps")));
      return;
    }

    const script = document.createElement("script");
    script.id = "google-maps-script";
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
    script.async = true;
    script.defer = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Falha ao carregar Google Maps API"));
    document.head.appendChild(script);
  });
}

export function useGoogleReviews(): UseGoogleReviewsState {
  const [state, setState] = useState<UseGoogleReviewsState>({
    reviews: [],
    rating: null,
    totalRatings: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    if (!GOOGLE_MAPS_API_KEY || !GOOGLE_PLACE_ID) {
      setState((prev) => ({
        ...prev,
        loading: false,
        error: "Chave de API ou Place ID não configurados.",
      }));
      return;
    }

    let cancelled = false;

    async function fetchReviews() {
      try {
        await loadGoogleMapsScript(GOOGLE_MAPS_API_KEY!);

        if (cancelled) return;

        const mapDiv = document.createElement("div");
        const maps = window.google.maps;
        const map = new maps.Map(mapDiv);
        const service = new maps.places.PlacesService(map);

        service.getDetails(
          {
            placeId: GOOGLE_PLACE_ID!,
            fields: ["reviews", "rating", "user_ratings_total"],
          },
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (place: any, status: string) => {
            if (cancelled) return;

            if (status === maps.places.PlacesServiceStatus.OK && place) {
              const allReviews: GoogleReview[] = (place.reviews ?? []);
              const sorted = allReviews
                .filter((r) => r.text && r.text.trim().length > 10)
                .sort((a, b) => b.time - a.time)
                .slice(0, 6);

              setState({
                reviews: sorted.map((r) => ({
                  author_name: r.author_name,
                  rating: r.rating,
                  text: r.text,
                  time: r.time,
                  profile_photo_url: r.profile_photo_url,
                  relative_time_description: r.relative_time_description,
                })),
                rating: place.rating ?? null,
                totalRatings: place.user_ratings_total ?? null,
                loading: false,
                error: null,
              });
            } else {
              setState((prev) => ({
                ...prev,
                loading: false,
                error: `Erro ao buscar avaliações: ${status}`,
              }));
            }
          }
        );
      } catch (err) {
        if (!cancelled) {
          setState((prev) => ({
            ...prev,
            loading: false,
            error: err instanceof Error ? err.message : "Erro desconhecido",
          }));
        }
      }
    }

    fetchReviews();

    return () => {
      cancelled = true;
    };
  }, []);

  return state;
}
