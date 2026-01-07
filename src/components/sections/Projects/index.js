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
        title: "XR-DaaS — AI Chest X-ray Analysis",
        summary: "YOLOv8 detection + secure React/Flask app for clinical workflows.",
        description:
          "Built a 95% accurate YOLOv8 model for chest X-ray abnormality detection, integrating OpenAI for AI-driven medical insights. Implemented HIPAA-compliant security with AES encryption, AWS S3 storage, and role-based access control. Launched a React & Flask-based web application with an intuitive UX, increasing AI adoption by 40% among doctors and patients.",
        tags: ["ML", "Full-stack", "Healthcare"],
        technologies: [
          "React",
          "Flask",
          "Python",
          "YOLOv8",
          "OpenAI",
          "AWS S3",
          "AES Encryption",
          "RBAC",
        ],
        github: null,
        demo: null,
        featured: true,
      },
      {
        id: 2,
        title: "SAFE-MD — Crime Rate Modeling",
        summary: "Causal + time-series modeling with a deployable analytics dashboard.",
        description:
          "Predicted crime rates with 85% accuracy utilizing causal inference on 10 years of socio-economic data, uncovering crime-driving factors. Trained ML models, including XGBoost and time series forecasting, to identify connections between education, unemployment, and crime. Designed a Streamlit dashboard with real-time visualizations, deploying ML pipelines on AWS for insights and decision-making.",
        tags: ["ML", "Data"],
        technologies: [
          "Python",
          "XGBoost",
          "Time Series",
          "Streamlit",
          "AWS",
          "Causal Inference",
        ],
        github: null,
        demo: null,
      },
      {
        id: 3,
        title: "Tech News Curator",
        summary: "Multi-source scraping + OpenAI summarization into digestible updates.",
        description:
          "A Python application that curates tech news from various sources, summarizes articles using OpenAI, and delivers them as markdown files or email digests. Features include multi-source scraping, AI-powered summarization, flexible output options, robust error handling, and comprehensive logging. Configurable via environment variables for tailored usage.",
        tags: ["Automation", "Data"],
        technologies: [
          "Python",
          "OpenAI",
          "Web Scraping",
          "Markdown",
          "Email Automation",
          "Logging",
        ],
        github: null,
        demo: null,
      },
      {
        id: 4,
        title: "Food Ordering Platform",
        summary: "MERN platform with optimized APIs and production deployments.",
        description:
          "Developed a scalable MERN stack food-ordering platform for 1,000+ users, supporting 20 API endpoints. Optimized database queries for reduced load times and accelerated data handling speed for faster and more reliable order management. Deployed the front-end on Netlify and back-end on AWS.",
        tags: ["Full-stack"],
        technologies: [
          "MongoDB",
          "Express",
          "React",
          "Node.js",
          "AWS",
          "Netlify",
        ],
        github: null,
        demo: null,
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
