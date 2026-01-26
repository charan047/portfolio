import React, { useEffect, useMemo, useState } from "react";
import {
  LazyMotion,
  domAnimation,
  m as motion,
  AnimatePresence,
} from "framer-motion";
import "./Experience.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBriefcase,
  faMapMarkerAlt,
  faClock,
  faTrophy,
  faArrowUpRightFromSquare,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";

const Experience = () => {
  const [selected, setSelected] = useState(null);

const experiences = useMemo(
  () => [
    {
      company: "Halo Music Productions",
      position: "Software Engineer",
      period: "Feb 2023 – Aug 2024",
      location: "Remote",
      jobType: "Full-time",
      duration: "1 yr 7 mos",
      summary:
        "Built scalable microservices and cloud-native media workflows for a music licensing platform, improving latency, reliability, and customer support automation.",
      keyPoint:
        "Sustained 1,000+ concurrent sessions at p95 <350ms, reduced failed uploads by 30%, cut MTTD from 30→10 minutes, and deflected 45% of support tickets via RAG automation.",
      achievements: [
        "Sustained 1,000+ concurrent sessions with p95 latency <350ms via Spring Boot microservices + Redis caching",
        "Reduced failed uploads by 30% by shipping multipart pre-signed uploads + retry logic on AWS S3/CloudFront (Terraform IaC)",
        "Cut Mean Time to Detection from 30 min to 10 min via OpenTelemetry + Grafana SLI/SLO dashboards + alerting",
        "Deflected 45% of support tickets by deploying a Python RAG pipeline with Pinecone for context-aware licensing answers",
      ],
      responsibilities: [
        "Engineered high-concurrency microservices and API workflows with database safety controls using Java/Spring Boot + Redis + PostgreSQL",
        "Architected a cloud-native media pipeline (S3 + CloudFront) provisioned with Terraform; implemented multipart pre-signed URLs and automated retries",
        "Modernized observability with OpenTelemetry, structured logs, and actionable dashboards; defined SLI/SLOs and alert policies",
        "Built and integrated a RAG assistant for licensing inquiries using Python + Pinecone vector search + document ingestion and retrieval",
      ],
      technologies: [
        "Java",
        "Spring Boot",
        "Redis",
        "PostgreSQL",
        "AWS (S3, CloudFront)",
        "Terraform",
        "OpenTelemetry",
        "Grafana",
        "Python",
        "Pinecone",
        "RAG",
      ],
    },
  ],
  []
);



  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") setSelected(null);
    };
    if (selected) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [selected]);

  return (
    <section className="experience" id="experience">
      <div className="experience-container">
        <div className="section-title-container">
          <h2 className="section-title">Experience</h2>
        </div>
        <p className="section-subtitle">
          Roles and projects where I shipped features, improved performance, and learned fast.
        </p>

        <LazyMotion features={domAnimation}>
          <div className="exp-list">
            {experiences.map((exp, idx) => (
              <motion.article
                key={`${exp.company}-${idx}`}
                className="exp-card"
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.45, delay: idx * 0.05 }}
              >
                <div className="exp-top">
                  <div>
                    <div className="exp-role">
                      {exp.position}
                      <span className="exp-company"> @ {exp.company}</span>
                    </div>

                    <div className="exp-meta">
                      <span className="meta-chip">
                        <FontAwesomeIcon icon={faClock} /> {exp.period}
                      </span>
                      <span className="meta-chip">
                        <FontAwesomeIcon icon={faMapMarkerAlt} /> {exp.location}
                      </span>
                      <span className="meta-chip">
                        <FontAwesomeIcon icon={faBriefcase} /> {exp.jobType}
                      </span>
                    </div>
                  </div>

                  <button
                    className="exp-open"
                    onClick={() => setSelected(exp)}
                    aria-label={`Open details for ${exp.position} at ${exp.company}`}
                  >
                    Details <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
                  </button>
                </div>

                <p className="exp-summary">{exp.summary}</p>

                <div className="exp-highlight">
                  <FontAwesomeIcon icon={faTrophy} />
                  <span>{exp.keyPoint}</span>
                </div>

                <div className="exp-tech">
                  {exp.technologies.slice(0, 6).map((t) => (
                    <span className="tech-pill" key={t}>
                      {t}
                    </span>
                  ))}
                </div>
              </motion.article>
            ))}
          </div>

          <AnimatePresence>
            {selected && (
              <motion.div
                className="exp-modal-overlay"
                role="dialog"
                aria-modal="true"
                aria-label={`Experience details: ${selected.position} at ${selected.company}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelected(null)}
              >
                <motion.div
                  className="exp-modal"
                  initial={{ opacity: 0, x: 28, scale: 0.98 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: 28, scale: 0.98 }}
                  transition={{ duration: 0.22 }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="exp-modal-head">
                    <div>
                      <h3 className="exp-modal-title">
                        {selected.position} <span>@ {selected.company}</span>
                      </h3>
                      <div className="exp-modal-sub">
                        <span className="meta-chip">
                          <FontAwesomeIcon icon={faClock} /> {selected.period}
                        </span>
                        <span className="meta-chip">
                          <FontAwesomeIcon icon={faMapMarkerAlt} /> {selected.location}
                        </span>
                        <span className="meta-chip">
                          <FontAwesomeIcon icon={faBriefcase} /> {selected.jobType}
                        </span>
                      </div>
                    </div>

                    <button className="exp-modal-close" onClick={() => setSelected(null)} aria-label="Close">
                      <FontAwesomeIcon icon={faXmark} />
                    </button>
                  </div>

                  <p className="exp-modal-summary">{selected.summary}</p>

                  <div className="exp-modal-section">
                    <h4>Key achievements</h4>
                    <ul>
                      {selected.achievements.map((a) => (
                        <li key={a}>{a}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="exp-modal-section">
                    <h4>What I did</h4>
                    <ul>
                      {selected.responsibilities.map((r) => (
                        <li key={r}>{r}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="exp-modal-section">
                    <h4>Tech</h4>
                    <div className="exp-modal-tech">
                      {selected.technologies.map((t) => (
                        <span className="tech-pill" key={t}>
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </LazyMotion>
      </div>
    </section>
  );
};

export default Experience;
