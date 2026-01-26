import React from "react";
import { LazyMotion, domAnimation, m as motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGraduationCap,
  faCalendarAlt,
  faMedal,
  faCertificate,
} from "@fortawesome/free-solid-svg-icons";
import "./Education.css";

const Education = () => {
  const education = [
  {
    school: "University of Central Florida",
    degree: "Master of Science in Computer Science",
    period: "Aug 2024 – May 2026 (Expected)",
    highlights: [
      "GPA 3.91 — graduate coursework focused on scalable systems, databases, and applied AI/ML",
      "Building production-grade full-stack and cloud-native projects with measurable performance + reliability improvements",
      "Hands-on work across Computer Vision, Databases, and Systems with a shipping-first mindset",
    ],
    badges: ["GPA: 3.91", "Orlando, FL"],
  },
];


  const certifications = [
    { title: "AWS Cloud Foundations", meta: "Certificate", icon: faCertificate },
    { title: "Forage — Data Analytics", meta: "Virtual experience", icon: faMedal },
  ];

  return (
    <section className="education" id="education">
      <div className="education-container">
        <div className="section-title-container">
          <h2 className="section-title">Education</h2>
        </div>
        <p className="section-subtitle">
          Academics, credentials, and continuous learning.
        </p>

        <LazyMotion features={domAnimation}>
          <div className="edu-grid">
            {education.map((e, idx) => (
              <motion.article
                key={e.school}
                className="edu-card"
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.45, delay: idx * 0.05 }}
              >
                <div className="edu-head">
                  <div className="edu-icon" aria-hidden="true">
                    <FontAwesomeIcon icon={faGraduationCap} />
                  </div>
                  <div className="edu-title">
                    <h3>{e.degree}</h3>
                    <p className="edu-school">{e.school}</p>
                  </div>
                </div>

                <div className="edu-meta">
                  <span className="meta-chip">
                    <FontAwesomeIcon icon={faCalendarAlt} /> {e.period}
                  </span>
                  {e.badges.map((b) => (
                    <span className="meta-chip" key={b}>
                      {b}
                    </span>
                  ))}
                </div>

                <ul className="edu-list">
                  {e.highlights.map((h) => (
                    <li key={h}>{h}</li>
                  ))}
                </ul>
              </motion.article>
            ))}

            <motion.aside
              className="cert-card"
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.45, delay: 0.1 }}
            >
              <h3>Certifications</h3>
              <div className="cert-list">
                {certifications.map((c) => (
                  <div className="cert-item" key={c.title}>
                    <span className="cert-icon" aria-hidden="true">
                      <FontAwesomeIcon icon={c.icon} />
                    </span>
                    <div className="cert-text">
                      <div className="cert-title">{c.title}</div>
                      <div className="cert-meta">{c.meta}</div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.aside>
          </div>
        </LazyMotion>
      </div>
    </section>
  );
};

export default Education;
