import React, { useEffect, useMemo, useState } from "react";
import {
  LazyMotion,
  domAnimation,
  m as motion,
  AnimatePresence,
} from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faLink, faXmark } from "@fortawesome/free-solid-svg-icons";
import "./Projects.css";

const Projects = () => {
  const projects = useMemo(
    () => [
      {
        id: 1,
        title: "AskDB — NL→SQL Copilot",
        summary:
          "Production-grade natural-language analytics with safe SQL execution, self-correction, and fast UI.",
        description:
          "Built an NL→SQL assistant that generates and executes safe queries across 5+ SQL dialects. Combined RAG retrieval with an error-feedback self-correction loop to boost analytical accuracy, while enforcing strict SELECT-only sandboxing to prevent destructive writes. Shipped a fast React UI with optimized bundles and CI-backed test automation for confident releases.",
        tags: ["GenAI", "RAG", "Data", "Full-stack"],
        technologies: [
          "Python",
          "Flask",
          "React",
          "Node.js",
          "Vite",
          "LangChain (Gemini)",
          "Postgres",
          "Chroma",
          "pytest",
          "Jest",
          "CI/CD",
        ],
        github: "https://github.com/charan047",
        demo: null,
        featured: true,
      },
      {
        id: 2,
        title: "ShopSage — Full-Stack E‑Commerce",
        summary:
          "High-performance e-commerce platform with caching, scalable search, and automated CI/CD deployments.",
        description:
          "Designed a full-stack e-commerce system with a performance-first backend and a responsive React storefront. Improved hot-path latency via Redis caching, optimized MongoDB aggregation + indexing for faceted filtering, and shipped a leaner UI with code-splitting. Automated containerized deploys with health checks and horizontal scaling to sustain reliability during traffic spikes.",
        tags: ["Backend", "Web", "DevOps"],
        technologies: [
          "Node.js",
          "Express",
          "React",
          "Redux Toolkit",
          "MongoDB",
          "Redis",
          "Docker",
          "Kubernetes",
          "AWS (EC2/ECR)",
          "GitHub Actions / Jenkins",
        ],
        github: "https://github.com/charan047",
        demo: null,
        featured: false,
      },
      {
        id: 3,
        title: "MotorStay — Parking Space Finder",
        summary:
          "Low-latency parking search + smart ranking with cloud provisioning via Terraform.",
        description:
          "Built a parking discovery + booking experience with a Spring Boot backend and a React client. Reduced p95 search latency via composite indexing, keyset pagination, and Redis caching of hot availability reads. Added a smart slot recommender (heuristics + NL queries) to improve booking conversion, and codified multi-region AWS environments using Terraform for fast, repeatable setup.",
        tags: ["Systems", "Performance", "Cloud"],
        technologies: [
          "Java 17",
          "Spring Boot",
          "React",
          "MySQL",
          "Redis",
          "LangChain4j",
          "AWS (EC2/VPC/IAM)",
          "Terraform",
        ],
        github: "https://github.com/charan047",
        demo: null,
        featured: false,
      },
    ],
    []
  );


  const tags = useMemo(() => {
    const set = new Set();
    projects.forEach((p) => p.tags.forEach((t) => set.add(t)));
    return ["All", ...Array.from(set).sort()];
  }, [projects]);

  const [activeTag, setActiveTag] = useState("All");
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return projects
      .filter((p) => (activeTag === "All" ? true : p.tags.includes(activeTag)))
      .filter((p) => {
        if (!q) return true;
        return (
          p.title.toLowerCase().includes(q) ||
          (p.summary || "").toLowerCase().includes(q) ||
          (p.description || "").toLowerCase().includes(q)
        );
      });
  }, [projects, activeTag, query]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") setSelected(null);
    };
    if (selected) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [selected]);

  return (
    <div className="projects-container">
      <div className="section-title-container">
        <h2 className="section-title">Projects</h2>
      </div>
      <p className="section-subtitle">Selected work — click a card for details</p>

      <div className="projects-toolbar">
        <div className="filter-pills" role="tablist" aria-label="Project filters">
          {tags.map((t) => (
            <button
              key={t}
              type="button"
              className={`pill ${activeTag === t ? "active" : ""}`}
              onClick={() => setActiveTag(t)}
              role="tab"
              aria-selected={activeTag === t}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="projects-search">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search projects..."
            aria-label="Search projects"
          />
        </div>
      </div>

      <LazyMotion features={domAnimation}>
        <motion.div className="projects-grid" layout>
          <AnimatePresence mode="popLayout">
            {filtered.map((project) => (
              <motion.button
                key={project.id}
                className="project-card"
                layout
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ duration: 0.2 }}
                onClick={() => setSelected(project)}
                type="button"
              >
                <div className="project-card-top">
                  <div className="project-title-row">
                    <h3 className="project-title">{project.title}</h3>
                    {project.featured && <span className="featured">Featured</span>}
                  </div>

                  <p className="project-summary">{project.summary}</p>

                  <div className="project-tags">
                    {project.tags.map((t) => (
                      <span className="tag" key={t}>
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="project-card-bottom">
                  <div className="project-tech">
                    {project.technologies.slice(0, 4).map((tech) => (
                      <span key={tech} className="tech-chip">
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 4 && (
                      <span className="tech-chip subtle">
                        +{project.technologies.length - 4}
                      </span>
                    )}
                  </div>

                  <div className="project-actions" aria-hidden="true">
                    {project.github && (
                      <span className="action">
                        <FontAwesomeIcon icon={faGithub} />
                      </span>
                    )}
                    {project.demo && (
                      <span className="action">
                        <FontAwesomeIcon icon={faLink} />
                      </span>
                    )}
                    <span className="action arrow">→</span>
                  </div>
                </div>
              </motion.button>
            ))}
          </AnimatePresence>
        </motion.div>

        <AnimatePresence>
          {selected && (
            <motion.div
              className="modal-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelected(null)}
              role="dialog"
              aria-modal="true"
              aria-label={`Project details: ${selected.title}`}
            >
              <motion.div
                className="modal-panel"
                initial={{ opacity: 0, y: 18, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 12, scale: 0.98 }}
                transition={{ duration: 0.2 }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="modal-header">
                  <div>
                    <h3 className="modal-title">{selected.title}</h3>
                    <div className="modal-tags">
                      {selected.tags.map((t) => (
                        <span className="tag" key={t}>
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <button
                    type="button"
                    className="modal-close"
                    onClick={() => setSelected(null)}
                    aria-label="Close"
                  >
                    <FontAwesomeIcon icon={faXmark} />
                  </button>
                </div>

                <div className="modal-body">
                  <p className="modal-description">{selected.description}</p>

                  <div className="modal-tech">
                    <h4>Tech</h4>
                    <div className="modal-tech-grid">
                      {selected.technologies.map((tech) => (
                        <span className="tech-chip" key={tech}>
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="modal-links">
                    {selected.github && (
                      <a
                        href={selected.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="modal-link"
                      >
                        <FontAwesomeIcon icon={faGithub} />
                        Code
                      </a>
                    )}
                    {selected.demo && (
                      <a
                        href={selected.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="modal-link"
                      >
                        <FontAwesomeIcon icon={faLink} />
                        Live Demo
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </LazyMotion>
    </div>
  );
};

export default Projects;
