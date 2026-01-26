import React from "react";
import { LazyMotion, domAnimation, m as motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCode,
  faLayerGroup,
  faDatabase,
  faCloud,
  faScrewdriverWrench,
} from "@fortawesome/free-solid-svg-icons";

import "./Skills.css";

const Skills = () => {
  const languages = {
    title: "Languages",
    icon: faCode,
    note: "Primary: Java • Python • TypeScript",
    items: ["Java", "Python", "TypeScript", "JavaScript", "SQL", "C++", "GoLang"],
  };

  const matrix = [
    {
      title: "Frontend",
      icon: faLayerGroup,
      items: ["React", "Next.js", "HTML/CSS", "State Management", "Web Perf"],
    },
    {
      title: "Backend",
      icon: faLayerGroup,
      items: [
        "Spring Boot",
        "Node.js",
        "REST APIs",
        "Fast API",
        "Auth (JWT/OAuth)",
        "Microservices",
        "Caching",
      ],
    },
    {
      title: "Data",
      icon: faDatabase,
      items: [
        "PostgreSQL",
        "MySQL",
        "Redis",
        "Indexing",
        "Query Optimization",
      ],
    },
    {
      title: "Cloud / DevOps",
      icon: faCloud,
      items: ["AWS", "Docker", "Kubernetes", "Terraform", "CI/CD"],
    },
    {
      title: "AI / GenAI",
      icon: faDatabase,
      items: ["RAG", "Embeddings", "Vector Search", "LangChain", "Pinecone/Chroma"],
    },
    {
      title: "Testing / Observability",
      icon: faScrewdriverWrench,
      items: [
        "JUnit",
        "pytest",
        "Jest",
        "Integration Tests",
        "OpenTelemetry",
        "Grafana",
      ],
    },
  ];

  return (
    <section className="skills stack-matrix" id="skills">
      <div className="skills-container">
        <div className="section-title-container">
          <h2 className="section-title">Skills</h2>
        </div>
        <p className="section-subtitle">A  quick snapshot of what I use to build, ship, and iterate.</p>

        <LazyMotion features={domAnimation}>
          <div className="stack-grid">
            <motion.article
              className="stack-card stack-card-wide"
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.45 }}
              whileHover={{ y: -3 }}
            >
              <div className="stack-card-head">
                <div className="stack-icon" aria-hidden="true">
                  <FontAwesomeIcon icon={languages.icon} />
                </div>
                <div className="stack-meta">
                  <h3 className="stack-title">{languages.title}</h3>
                  <div className="stack-note">{languages.note}</div>
                </div>
              </div>

              <div className="stack-chips" role="list">
                {languages.items.map((s) => (
                  <span className="stack-chip" role="listitem" key={s}>
                    {s}
                  </span>
                ))}
              </div>
            </motion.article>

            {matrix.map((g, idx) => (
              <motion.article
                key={g.title}
                className="stack-card"
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.45, delay: idx * 0.04 }}
                whileHover={{ y: -3 }}
              >
                <div className="stack-card-head">
                  <div className="stack-icon" aria-hidden="true">
                    <FontAwesomeIcon icon={g.icon} />
                  </div>
                  <div className="stack-meta">
                    <h3 className="stack-title">{g.title}</h3>
                  </div>
                </div>

                <div className="stack-chips" role="list">
                  {g.items.map((s) => (
                    <span className="stack-chip" role="listitem" key={s}>
                      {s}
                    </span>
                  ))}
                </div>
              </motion.article>
            ))}
          </div>
        </LazyMotion>
      </div>
    </section>
  );
};

export default Skills;
