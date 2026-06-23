"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "@phosphor-icons/react";

function Content() {
  const searchParams = useSearchParams();
  const project = searchParams.get("project") || "This project";
  const image = searchParams.get("image");

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-20">
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors duration-150 mb-16"
      >
        <ArrowLeft size={14} />
        Back
      </Link>

      <div className="flex flex-col items-center text-center">
        <div className="w-16 h-16 rounded-xl bg-secondary flex items-center justify-center mb-6 overflow-hidden">
          {image ? (
            <Image src={image} alt={project} width={64} height={64} className="object-cover w-full h-full" />
          ) : (
            <span className="text-2xl font-semibold text-muted-foreground">{project[0]}</span>
          )}
        </div>
        <h1 className="text-2xl font-semibold mb-2">{project}</h1>
        <p className="text-muted-foreground max-w-sm">
          This case study is in development. Check back soon for insights into the design process and decisions behind {project}.
        </p>
      </div>
    </div>
  );
}

export default function ComingSoon() {
  return (
    <Suspense fallback={<div className="max-w-2xl mx-auto px-4 sm:px-6 py-20" />}>
      <Content />
    </Suspense>
  );
}
