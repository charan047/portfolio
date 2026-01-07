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

  // Typewriter roles
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(135);

  const titles = useMemo(
    () => [
      "Full-Stack Engineer (Java • React)",
      "Backend Engineer (APIs • Systems)",
      "AI/ML Engineer (CV • NLP)",
      "Product-minded Builder",
      "Performance + Security Focused",
    ],
    []
  );

  const chips = useMemo(
    () => ["Java", "Spring Boot", "React", "AWS", "SQL", "ML/CV"],
    []
  );

  const metrics = useMemo(
    () => [
      { label: "UCF", value: "MS CS • GPA 3.91" },
      { label: "Built for", value: "1K+ concurrent users" },
      { label: "Taught", value: "250+ students / class" },
      { label: "Open to", value: "Internships/Full Time roles" },
    ],
    []
  );

  const period = 1600;

  const tick = useCallback(() => {
    const i = loopNum % titles.length;
    const fullText = titles[i];

    if (isDeleting) {
      setText(fullText.substring(0, text.length - 1));
      setTypingSpeed(65);
    } else {
      setText(fullText.substring(0, text.length + 1));
      setTypingSpeed(135);
    }

    if (!isDeleting && text === fullText) {
      setTypingSpeed(period);
      setIsDeleting(true);
    } else if (isDeleting && text === "") {
      setIsDeleting(false);
      setLoopNum(loopNum + 1);
      setTypingSpeed(220);
    }
  }, [isDeleting, loopNum, text, titles]);

  useEffect(() => {
    const timer = setTimeout(() => tick(), typingSpeed);
    return () => clearTimeout(timer);
  }, [text, typingSpeed, tick]);

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

          <div className="hero-role" aria-label="Current focus">
            <span className="typing-text">{text}</span>
            <span className="cursor" aria-hidden="true" />
          </div>

          <p className="hero-summary">
            I build scalable, production-ready software — from clean React UX to
            Spring Boot APIs, cloud integrations, and ML-powered features. I
            care about performance, reliability, and shipping polished
            experiences that feel premium.
          </p>

          <div className="hero-chips" aria-label="Key skills">
            {chips.map((c) => (
              <span key={c} className="chip">
                {c}
              </span>
            ))}
          </div>

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
              href="https://github.com/charan07"
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
              href="mailto:charan.kdf15@gmail.com"
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
            Building premium apps + ML
          </div>

          {/* Floating tags (kept subtle + non-overlapping) */}
          <div className="floating-tag ft1" aria-hidden="true">
            React • Spring Boot
          </div>
          <div className="floating-tag ft2" aria-hidden="true">
            Computer Vision • ML
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
