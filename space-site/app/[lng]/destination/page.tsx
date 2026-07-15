import type { Metadata } from "next";
import { getT } from "next-i18next/server";
import DestinationTabs from "@/app/_components/molecules/DestinationTabs";
import { getDestinations } from "@modules/destinations/infra/destinations.api";
import { toDestinationView } from "@modules/destinations/types/destination.types";

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
  const activeDestination = hasSelectedSlug
    ? (selectedSlug as string)
    : destinations[0].slug;

  const labels = {
    avgDistance: safeT("labels.avgDistance"),
    estTravelTime: safeT("labels.estTravelTime"),
  };

  const activeDestinationData = destinations.find(
    (destination) => destination.slug === activeDestination,
  );

  if (!activeDestinationData) {
    throw new Error("No valid destination available for rendering.");
  }

  return (
    <main id="main" className="main-container main-container--destination flow">
      <h1 className="numbered-title">
        <span aria-hidden="true">01</span> {safeT("numberedTitle")}
      </h1>

      <DestinationTabs
        destinations={destinations.map(({ slug, name }) => ({ slug, name }))}
        initialActiveDestination={activeDestination}
      />

      <picture id={`${activeDestinationData.slug}-image`}>
        <source srcSet={activeDestinationData.webp} type="image/webp" />
        <img src={activeDestinationData.image} alt={activeDestinationData.alt} />
      </picture>

      <article
        className="destination-info flow"
        id={`${activeDestinationData.slug}-tab`}
        tabIndex={0}
        role="tabpanel"
        aria-labelledby={`${activeDestinationData.slug}-trigger`}
      >
        <h2 className="fs-800 uppercase ff-serif">
          {activeDestinationData.name}
        </h2>

        <p>{activeDestinationData.description}</p>

        <div className="destination-meta flex">
          <div>
            <h3 className="text-accent fs-200 uppercase">
              {labels.avgDistance}
            </h3>
            <p className="ff-serif uppercase">
              {activeDestinationData.distance}
            </p>
          </div>
          <div>
            <h3 className="text-accent fs-200 uppercase">
              {labels.estTravelTime}
            </h3>
            <p className="ff-serif uppercase">
              {activeDestinationData.travel}
            </p>
          </div>
        </div>
      </article>
    </main>
  );
}
