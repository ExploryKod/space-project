import type { Metadata } from "next";
import { getT } from "next-i18next/server";
import DestinationView from "@/app/_components/molecules/DestinationView";
import { getDestinations } from "@modules/destinations/infra/destinations.api";
import { toDestinationView } from "@modules/destinations/types/destination.types";
import { Suspense } from "react";

type PageProps = {
  params: Promise<{ lng: string }>;
  searchParams: Promise<{ destination?: string }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { lng } = await params;
  const { t } = await getT("destination", { lng });
  return {
    title: t("metaTitle"),
  };
}

export default async function Destination({ params, searchParams }: PageProps) {
  const { lng } = await params;
  const resolvedSearchParams = await searchParams;
  const { t } = await getT("destination", { lng });

  const missingMarker = (key: string) => `[[MISSING_TRANSLATION:${key}]]`;
  const safeT = (key: string) =>
    t(key, {
      defaultValue: missingMarker(key),
    });

  const destinations = (await getDestinations(lng)).map(toDestinationView);

  if (destinations.length === 0) {
    throw new Error(`No destinations available for locale "${lng}".`);
  }

  const selectedSlug = resolvedSearchParams.destination;
  const hasSelectedSlug = destinations.some(
    (destination) => destination.slug === selectedSlug,
  );
  const initialActiveDestination = hasSelectedSlug
    ? (selectedSlug as string)
    : destinations[0].slug;

  const labels = {
    avgDistance: safeT("labels.avgDistance"),
    estTravelTime: safeT("labels.estTravelTime"),
  };

  return (
    <main id="main" className="main-container main-container--destination flow">
      <h1 className="numbered-title">
        <span aria-hidden="true">01</span> {safeT("numberedTitle")}
      </h1>

      <Suspense>
        <DestinationView
          destinations={destinations}
          labels={labels}
          initialActiveDestination={initialActiveDestination}
        />
      </Suspense>
    </main>
  );
}
