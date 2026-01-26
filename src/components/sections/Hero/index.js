import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
  useRef,
} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDownload,
  faEnvelope,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import "./Hero.css";
import profileWebp from "../../../assets/profile.webp";

const Hero = () => {
  const containerRef = useRef(null);

  // Spotlight cursor (WOW effect)
  const updateSpotlight = useCallback((e) => {
    const el = containerRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    el.style.setProperty("--mx", `${x}px`);
    el.style.setProperty("--my", `${y}px`);
  }, []);

  const resetSpotlight = useCallback(() => {
    const el = containerRef.current;
    if (!el) return;
    el.style.setProperty("--mx", "50%");
    el.style.setProperty("--my", "35%");
  }, []);

  // Fast role rotator (no typewriter cursor)
  const roles = useMemo(
    () => [
      "Software Engineer",
      "Frontend / Backend / Full-Stack",
      "Cloud/DevOps",
      "Machine Learning / GenAI",
    ],
    []
  );

  const [currentRole, setCurrentRole] = useState(0);

  // const chips = useMemo(
  //   () => [
  //     "Java 17",
  //     "Spring Boot",
  //     "Node.js",
  //     "React",
  //     "AWS",
  //     "Terraform",
  //     "Kubernetes",
  //     "Postgres/MySQL",
  //     "Redis",
  //     "RAG",
  //   ],
  //   []
  // );

  const metrics = useMemo(
    () => [
      { label: "UCF", value: "MS CS • GPA 3.91" },
      { label: "Latency", value: "p95 <350ms @ 1K+ sessions" },
      { label: "Support", value: "45% ticket deflection (RAG)" },
      { label: "Reliability", value: "MTTD 30→10 min (OTel + Grafana)" },
    ],
    []
  );

  useEffect(() => {
    const id = setInterval(() => {
      setCurrentRole((i) => (i + 1) % roles.length);
    }, 1100);
    return () => clearInterval(id);
  }, [roles.length]);

  // Seed spotlight on mount
  useEffect(() => {
    resetSpotlight();
  }, [resetSpotlight]);

  return (
    <div
      className="hero-container"
      ref={containerRef}
      onMouseMove={updateSpotlight}
      onMouseLeave={resetSpotlight}
      id="home"
    >
      {/* Premium background layers */}
      <div className="hero-aurora" aria-hidden="true" />
      <div className="hero-grid" aria-hidden="true" />
      <div className="hero-noise" aria-hidden="true" />
      <div className="hero-spotlight" aria-hidden="true" />

      {/* Ambient blobs */}
      <div className="hero-bg hero-bg-1" aria-hidden="true" />
      <div className="hero-bg hero-bg-2" aria-hidden="true" />

      <div className="hero-content">
        <div className="hero-card">
          <div className="hero-pill" role="note">
            <span className="hero-pill-dot" aria-hidden="true" />
            Seeking Full-Time Opportunities • SDE • SWE • AI/ML
          </div>

          <span className="greeting">Hi, I&apos;m</span>
          <h1 className="hero-title">
            <span className="title-accent">Charan</span> Kumar Edukulla
          </h1>

          <div className="hero-role" aria-label="Role highlights">
            <span key={currentRole} className="role-badge">
              {roles[currentRole]}
            </span>
          </div>

          <p className="hero-summary">
            I build high-performance backend + full-stack products — microservices,
            caching, and reliable cloud pipelines — plus GenAI features like RAG
            copilots. I care about measurable impact: latency, reliability,
            and polished user experiences.
          </p>

          {/* <div className="hero-chips" aria-label="Key skills">
            {chips.map((c) => (
              <span key={c} className="chip">
                {c}
              </span>
            ))}
          </div> */}

          <div className="hero-btns">
            <a href="#projects" className="btn primary-btn">
              View Projects <FontAwesomeIcon icon={faArrowRight} />
            </a>

            <a
              href={`${process.env.PUBLIC_URL}/resume.pdf`}
              className="btn ghost-btn"
              download="Charan_Kumar_Edukulla_Resume.pdf"
              aria-label="Download Resume"
            >
              <FontAwesomeIcon icon={faDownload} /> Resume
            </a>

            <a
              href="#contact"
              className="btn ghost-btn"
              aria-label="Jump to contact section"
            >
              <FontAwesomeIcon icon={faEnvelope} /> Contact
            </a>
          </div>

          <div className="metrics" aria-label="Highlights">
            {metrics.map((m) => (
              <div key={m.label} className="metric">
                <div className="metric-value">{m.value}</div>
                <div className="metric-label">{m.label}</div>
              </div>
            ))}
          </div>

          <div className="social-links" aria-label="Social links">
            <a
              href="https://github.com/charan047"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              title="GitHub"
            >
              <FontAwesomeIcon icon={faGithub} />
            </a>
            <a
              href="https://www.linkedin.com/in/edukulla-charan-kumar/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              title="LinkedIn"
            >
              <FontAwesomeIcon icon={faLinkedin} />
            </a>
            <a
              href="mailto:charankumaredukulla@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Email"
              title="Email"
            >
              <FontAwesomeIcon icon={faEnvelope} />
            </a>
          </div>
        </div>

        <div className="hero-image-container">
          <div className="portrait-ring" aria-hidden="true" />
          <div className="profile-circle">
            <picture>
              <source srcSet={profileWebp} type="image/webp" />
              <img
                src={profileWebp}
                alt="Charan Kumar Edukulla"
                className="profile-img"
                loading="eager"
              />
            </picture>
          </div>

          <div className="availability-badge" role="note">
  Backend • Full-Stack • Cloud/DevOps • GenAI (RAG)
</div>

{/* Floating tags (kept subtle + non-overlapping) */}
<div className="floating-tag ft1" aria-hidden="true">
  Java • Spring Boot • Postgres • Redis
</div>
<div className="floating-tag ft2" aria-hidden="true">
  AWS • Docker • Kubernetes • Terraform
</div>

        </div>
      </div>
    </div>
  );
};

export default Hero;
