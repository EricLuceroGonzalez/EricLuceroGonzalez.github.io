// Server component — injects JSON-LD structured data into <head>
export function PersonJsonLd({ locale }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Eric Lucero González",
    url: `https://ericlucero.dev/${locale}`,
    sameAs: [
      "https://github.com/EricLuceroGonzalez",
      "https://www.linkedin.com/in/ericlucerog/",
      "https://x.com/EricLuceroG",
    ],
    jobTitle: locale === "es" ? "Estudiante de Doctorado en IA" : "PhD Student in AI",
    description:
      locale === "es"
        ? "Estudiante de doctorado especializado en Inteligencia Artificial, algoritmos de optimización y metaheurísticas."
        : "PhD student specialising in Artificial Intelligence, optimization algorithms, and metaheuristics.",
    image:
      "https://res.cloudinary.com/dcvnw6hvt/image/upload/v1732922346/elCronopio/Web-communication/owsftbzp6mn5iuvkogrl.jpg",
    knowsAbout: [
      "Artificial Intelligence",
      "Genetic Algorithms",
      "Metaheuristics",
      "Optimization",
      "LaTeX",
      "Next.js",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function WebSiteJsonLd({ locale }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Eric Lucero González",
    url: `https://ericlucero.dev/${locale}`,
    inLanguage: locale,
    author: {
      "@type": "Person",
      name: "Eric Lucero González",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function BlogPostingJsonLd({ post, locale }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt || post.description || "",
    url: `https://ericlucero.dev/${locale}/blog/${post.slug}`,
    datePublished: post.date?.iso || "",
    dateModified: post.date?.iso || "",
    inLanguage: locale,
    author: {
      "@type": "Person",
      name: "Eric Lucero González",
      url: `https://ericlucero.dev/${locale}/about`,
    },
    publisher: {
      "@type": "Person",
      name: "Eric Lucero González",
    },
    image: post.coverImage
      ? {
          "@type": "ImageObject",
          url: post.coverImage,
          width: 1200,
          height: 630,
        }
      : undefined,
    keywords: post.keywords?.join(", ") || "",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://ericlucero.dev/${locale}/blog/${post.slug}`,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function LatexArticleJsonLd({ post, locale }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: post.title,
    description: post.excerpt || post.description || "",
    url: `https://ericlucero.dev/${locale}/latex/${post.slug}`,
    datePublished: post.date?.iso || "",
    dateModified: post.date?.iso || "",
    inLanguage: locale,
    author: {
      "@type": "Person",
      name: "Eric Lucero González",
      url: `https://ericlucero.dev/${locale}/about`,
    },
    publisher: {
      "@type": "Person",
      name: "Eric Lucero González",
    },
    keywords: post.keywords?.join(", ") || "",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://ericlucero.dev/${locale}/latex/${post.slug}`,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
