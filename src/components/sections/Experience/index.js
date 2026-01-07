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
      company: "HALO Music Productions",
      position: "Java Full Stack Developer | AI Chatbot",
      period: "Nov 2023 – Apr 2024",
      location: "Hyderabad, TS",
      jobType: "Full-time / Contract",
      duration: "6 months",
      summary:
        "Built and scaled a music licensing platform with secure payments, streaming, and an AI chatbot to support users in real time.",
      keyPoint:
        "Supported 1K+ concurrent users with Spring Boot services, AWS S3 streaming, Stripe payments, JWT security, and an NLP chatbot.",
      achievements: [
        "Supported 1K+ concurrent users on the licensing platform",
        "Shipped Stripe payments + JWT auth + AWS S3 streaming end-to-end",
        "Integrated AI chatbot for real-time customer support and licensing navigation",
      ],
      responsibilities: [
        "Developed and maintained a music licensing platform using Java Spring Boot, engineered for 1K+ concurrent users with production-grade API design.",
        "Implemented secure authentication and authorization using JWT, including protected routes and role-aware access patterns.",
        "Delivered payment workflows with Stripe (checkout → confirmation → status handling) and improved reliability through validation and error handling.",
        "Enabled music file storage + streaming using AWS S3 with secure access patterns and optimized delivery for smooth playback.",
        "Developed and integrated an AI chatbot for real-time customer support using NLP-backed dialogue flows to answer licensing questions and guide platform navigation.",
      ],
      technologies: ["Java", "Spring Boot", "JWT", "AWS S3", "Stripe", "REST APIs", "NLP"],
    },

    {
  company: "University of Central Florida",
  position: "Graduate Teaching Assistant / Instructor Support (C, Databases, Java OOP)",
  period: "Spring 2025 – Present",
  location: "Orlando, FL",
  jobType: "Teaching",
  duration: "1+ year",
  summary:
    "Delivered hands-on teaching and mentorship for core CS courses, translating theory into practical problem-solving for large cohorts.",
  keyPoint:
    "Taught and mentored 250+ students per class through labs, debugging sessions, and rubric-driven feedback across C, SQL/DB concepts, and Java OOP.",
  achievements: [
    "Taught and mentored 250+ students per class across multiple CS courses",
    "Improved student confidence and correctness through structured debugging + step-by-step explanation",
    "Maintained fair, consistent evaluation using strong rubrics and actionable feedback at scale",
  ],
  responsibilities: [
    "Taught lab sessions and walkthroughs by turning complex topics into clear, repeatable steps (problem breakdown → approach → implementation → testing).",
    "Mentored students through debugging in C and Java (memory issues, loops, edge cases, OOP design), helping them learn *how to think* rather than just fixing code.",
    "Guided students on SQL and database fundamentals (joins, aggregation, normalization, constraints) with practical examples and query-building strategies.",
    "Delivered high-quality grading and feedback at scale, highlighting patterns of mistakes and giving specific next steps to improve coding style, logic, and performance.",
    "Collaborated with instructors/TAs to refine rubrics, improve assignment clarity, and keep evaluation consistent across large sections.",
  ],
  technologies: ["C", "Java", "SQL", "MySQL", "OOP", "Data Structures", "Debugging", "Teaching"],
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
