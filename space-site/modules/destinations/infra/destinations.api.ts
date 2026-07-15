import {
  DestinationsResponseSchema,
  type Destination,
} from "@modules/destinations/types/destination.types";

function getApiBaseUrl(): string {
  const baseUrl = process.env.SPACE_API_URL;
  if (!baseUrl) {
    throw new Error("SPACE_API_URL is not set");
  }
  return baseUrl.replace(/\/$/, "");
}

export async function getDestinations(lng: string): Promise<Destination[]> {
  const url = `${getApiBaseUrl()}/api/v1/destinations?lng=${encodeURIComponent(lng)}`;

  const response = await fetch(url, { cache: "no-store" });

  if (!response.ok) {
    throw new Error(`Destinations API failed with status ${response.status}`);
  }

  const json: unknown = await response.json();
  const parsed = DestinationsResponseSchema.safeParse(json);

  if (!parsed.success) {
    throw new Error("Destinations API returned an invalid payload");
  }

  return parsed.data.data;
}
