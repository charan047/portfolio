import React from "react";
import { Helmet } from "react-helmet";
import profileWebp from "../../assets/profile.webp";

const SEOHelmet = ({ title, description, keywords }) => {
  const baseURL = "https://charan047.github.io/portfolio/";

  const defaultTitle = "Charan Kumar Edukulla | Software Engineer Portfolio";
  const defaultDescription =
    "Charan Kumar Edukulla — Software Engineer building high-performance backend + full-stack products with cloud/DevOps and GenAI (RAG) pipelines.";
  const defaultKeywords =
    "Charan Kumar Edukulla, Charan portfolio, software engineer, full stack developer, backend engineer, java, spring boot, node.js, react, aws, docker, kubernetes, terraform, rag, langchain, postgres, redis";

  const path = typeof window !== "undefined" ? window.location.pathname : "/";
  const canonicalURL = new URL(path, baseURL).toString();

  const computedTitle = title
    ? `${title} | Charan Kumar Edukulla`
    : defaultTitle;

  const computedDescription = description || defaultDescription;
  const computedKeywords = keywords || defaultKeywords;

  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Charan Kumar Edukulla",
    url: baseURL,
    jobTitle: "Software Engineer",
    sameAs: [
      "https://www.linkedin.com/in/edukulla-charan-kumar/",
      "https://github.com/charan047",
    ],
    alumniOf: [
      {
        "@type": "CollegeOrUniversity",
        name: "University of Central Florida",
      },
    ],
  };

  return (
    <Helmet htmlAttributes={{ lang: "en" }}>
      <title>{computedTitle}</title>
      <meta name="description" content={computedDescription} />
      <meta name="keywords" content={computedKeywords} />
      <meta name="author" content="Charan Kumar Edukulla" />
      <meta name="robots" content="index, follow" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="theme-color" content="#050b18" />

      {/* ✅ Google Search Console verification */}
      <meta
        name="google-site-verification"
        content="ElllPch6mTA03y426ZSN7BSlVcOped0qyF-mCxeuP00"
      />

      {/* Preload LCP image */}
      <link
        rel="preload"
        href={profileWebp}
        as="image"
        type="image/webp"
        fetchpriority="high"
      />

      {/* Canonical */}
      <link rel="canonical" href={canonicalURL} />

      {/* OpenGraph */}
      <meta property="og:title" content={computedTitle} />
      <meta property="og:description" content={computedDescription} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonicalURL} />
      <meta property="og:site_name" content="Charan Kumar Edukulla" />
      <meta property="og:locale" content="en_US" />
      <meta property="og:image" content={`${baseURL}og-image.jpg`} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={computedTitle} />
      <meta name="twitter:description" content={computedDescription} />
      <meta name="twitter:image" content={`${baseURL}og-image.jpg`} />

      {/* JSON-LD: Person */}
      <script type="application/ld+json">
        {JSON.stringify(personJsonLd)}
      </script>
    </Helmet>
  );
};

export default SEOHelmet;
