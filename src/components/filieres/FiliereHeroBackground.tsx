"use client";

import Image from "next/image";
import { useState } from "react";

export function FiliereHeroBackground({
  imageSrc,
  colorClass,
}: {
  imageSrc: string;
  colorClass: string;
}) {
  const [imgError, setImgError] = useState(false);

  return (
    <div className="absolute inset-0">
      {!imgError ? (
        <>
          <Image
            src={imageSrc}
            alt=""
            fill
            className="object-cover"
            priority
            sizes="100vw"
            onError={() => setImgError(true)}
          />
          <div className={`absolute inset-0 ${colorClass} opacity-90`} aria-hidden />
        </>
      ) : (
        <div className={`absolute inset-0 ${colorClass}`} aria-hidden />
      )}
    </div>
  );
}
