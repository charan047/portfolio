import React from "react";
import { Helmet } from "react-helmet";
import profileWebp from "../../assets/profile.webp";

const SEOHelmet = ({ title, description, keywords }) => {
  const siteURL = "https://charan047.github.io/portfolio";
  const defaultDescription =
    "Software Engineer building high-performance backend + full-stack products with cloud/DevOps and GenAI (RAG) pipelines.";
  const defaultKeywords =
    "software engineer, full stack developer, backend engineer, java, spring boot, node.js, react, aws, kubernetes, terraform, rag, langchain, postgres, redis";

  return (
    <Helmet>
      <title>
        {title
          ? `${title} | Charan Kumar Edukulla`
          : "Charan Kumar Edukulla | Software Engineer"}
      </title>
      <meta name="description" content={description || defaultDescription} />
      <meta name="keywords" content={keywords || defaultKeywords} />

      {/* Preload LCP image */}
      <link 
        rel="preload" 
        href={profileWebp} 
        as="image" 
        type="image/webp"
        fetchpriority="high"
      />

      {/* OpenGraph Tags */}
      <meta
        property="og:title"
        content={title || "Charan Kumar Edukulla | Software Engineer"}
      />
      <meta
        property="og:description"
        content={description || defaultDescription}
      />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={siteURL} />
      <meta property="og:image" content={`${siteURL}/og-image.jpg`} />

      {/* Twitter Card Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta
        name="twitter:title"
        content={title || "Charan Kumar Edukulla | Software Engineer"}
      />
      <meta
        name="twitter:description"
        content={description || defaultDescription}
      />
      <meta name="twitter:image" content={`${siteURL}/og-image.jpg`} />

      {/* Other Important Meta Tags */}
      <meta name="author" content="Charan Kumar Edukulla" />
      <meta name="robots" content="index, follow" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link rel="canonical" href={siteURL} />
    </Helmet>
  );
};

export default SEOHelmet;
