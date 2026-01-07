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
  const groups = [
    {
      title: "Languages",
      icon: faCode,
      items: ["Java", "JavaScript", "TypeScript", "Python", "C++", "HTML", "CSS", "SQL"],
    },
    {
      title: "Frameworks",
      icon: faLayerGroup,
      items: ["React", "Next.js", "Node.js", "Express", "Spring Boot", "Flask"],
    },
    {
      title: "Data & ML",
      icon: faDatabase,
      items: ["PyTorch", "TensorFlow", "OpenCV", "scikit-learn", "Pandas", "NumPy"],
    },
    {
      title: "Cloud & DevOps",
      icon: faCloud,
      items: ["AWS", "Docker", "GitHub Actions", "Linux", "CI/CD"],
    },
    {
      title: "Tools",
      icon: faScrewdriverWrench,
      items: ["Git", "Postman", "Jira", "Figma", "MySQL", "MongoDB"],
    },
  ];

  return (
    <section className="skills">
      <div className="skills-container">
        <div className="section-title-container">
          <h2 className="section-title">Skills</h2>
        </div>
        <p className="section-subtitle">
          A quick snapshot of what I use to build, ship, and iterate.
        </p>

        <LazyMotion features={domAnimation}>
          <div className="skills-grid">
            {groups.map((g, idx) => (
              <motion.article
                key={g.title}
                className={`skill-card skill-card-${idx % 3}`}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.45, delay: idx * 0.04 }}
                whileHover={{ y: -4 }}
              >
                <div className="skill-card-head">
                  <div className="skill-icon" aria-hidden="true">
                    <FontAwesomeIcon icon={g.icon} />
                  </div>
                  <div className="skill-meta">
                    <h3 className="skill-title">{g.title}</h3>
                    <span className="skill-count">{g.items.length} items</span>
                  </div>
                </div>

                <div className="skill-chips" role="list">
                  {g.items.map((s) => (
                    <span className="skill-chip" role="listitem" key={s}>
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
