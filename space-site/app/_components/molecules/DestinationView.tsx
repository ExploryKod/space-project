"use client";

import DestinationTabs from "@/app/_components/molecules/DestinationTabs";
import type { DestinationView as DestinationData } from "@modules/destinations/types/destination.types";
import { useEffect, useState } from "react";

type DestinationLabels = {
  avgDistance: string;
  estTravelTime: string;
};

type DestinationViewProps = {
  destinations: readonly DestinationData[];
  labels: DestinationLabels;
  initialActiveDestination: string;
};

export default function DestinationView({
  destinations,
  labels,
  initialActiveDestination,
}: DestinationViewProps) {
  const [activeSlug, setActiveSlug] = useState(initialActiveDestination);

  useEffect(() => {
    setActiveSlug(initialActiveDestination);
  }, [initialActiveDestination]);

  const activeDestination =
    destinations.find((destination) => destination.slug === activeSlug) ??
    destinations[0];

  if (!activeDestination) {
    return null;
  }

  return (
    <>
      <DestinationTabs
        destinations={destinations.map(({ slug, name }) => ({ slug, name }))}
        activeDestination={activeDestination.slug}
        onSelect={setActiveSlug}
      />

      <picture id={`${activeDestination.slug}-image`}>
        <source srcSet={activeDestination.webp} type="image/webp" />
        <img src={activeDestination.image} alt={activeDestination.alt} />
      </picture>

      <article
        className="destination-info flow"
        id={`${activeDestination.slug}-tab`}
        tabIndex={0}
        role="tabpanel"
        aria-labelledby={`${activeDestination.slug}-trigger`}
      >
        <h2 className="fs-800 uppercase ff-serif">{activeDestination.name}</h2>

        <p>{activeDestination.description}</p>

        <div className="destination-meta flex">
          <div>
            <h3 className="text-accent fs-200 uppercase">{labels.avgDistance}</h3>
            <p className="ff-serif uppercase">{activeDestination.distance}</p>
          </div>
          <div>
            <h3 className="text-accent fs-200 uppercase">
              {labels.estTravelTime}
            </h3>
            <p className="ff-serif uppercase">{activeDestination.travel}</p>
          </div>
        </div>
      </article>
    </>
  );
}
