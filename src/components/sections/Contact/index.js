import React, {useEffect, useMemo, useState} from "react";
import { LazyMotion, domAnimation, m as motion } from "framer-motion";
import "./Contact.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faMapMarkerAlt,
  faPhoneAlt,
  faCheckCircle,
  faPaperPlane,
  faExclamationTriangle,
  faCopy,
} from "@fortawesome/free-solid-svg-icons";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import emailjs from "@emailjs/browser";

const Contact = () => {
  const socials = useMemo(
    () => [
      { label: "GitHub", icon: faGithub, href: "https://github.com/" },
      { label: "LinkedIn", icon: faLinkedin, href: "https://www.linkedin.com/" },
    ],
    []
  );

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [status, setStatus] = useState({
    type: "idle",
    message: "",
  });

  const contactInfo = {
    email: "charankumaredukulla@gmail.com",
    phone: "+1 (xxx) xxx-xxxx",
    location: "Orlando, FL (Open to relocation)",
  };

  const onChange = (e) => {
    setFormData((p) => ({ ...p, [e.target.name]: e.target.value }));
  };

  const canSend =
    formData.name.trim() &&
    formData.email.trim() &&
    formData.subject.trim() &&
    formData.message.trim();

  
  useEffect(() => {
    // Initialize EmailJS globally (recommended by EmailJS docs)
    const pk = process.env.REACT_APP_EMAILJS_PUBLIC_KEY;
    if (pk) emailjs.init({ publicKey: pk });
  }, []);

const sendEmail = async (e) => {
    e.preventDefault();
    if (!canSend) {
      setStatus({ type: "error", message: "Please fill out all fields." });
      return;
    }

    try {
      setStatus({ type: "loading", message: "Sending..." });

      const templateParams = {
        from_name: formData.name,
        reply_to: formData.email,
        subject: formData.subject,
        message: formData.message,
      };

      // EmailJS config
      // Service ID is safe to keep as a default; keep template + public key in .env
      const serviceId = process.env.REACT_APP_EMAILJS_SERVICE_ID || "service_m0lextk";
      const templateId = process.env.REACT_APP_EMAILJS_TEMPLATE_ID;
      const publicKey = process.env.REACT_APP_EMAILJS_PUBLIC_KEY;

      if (!templateId || !publicKey) {
        setStatus({
          type: "error",
          message:
            "Email is not configured yet. Add REACT_APP_EMAILJS_TEMPLATE_ID and REACT_APP_EMAILJS_PUBLIC_KEY in .env.",
        });
        return;
      }

      await emailjs.send(serviceId, templateId, templateParams, { publicKey });

      setStatus({ type: "success", message: "Message sent successfully!" });
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      // Surface EmailJS error details to speed up debugging (blocked domain / wrong keys / quota, etc.)
      console.error("EmailJS error:", err);
      const statusCode = err?.status || err?.statusCode || "unknown";
      const detail =
        err?.text ||
        err?.message ||
        (typeof err === "string" ? err : JSON.stringify(err, null, 2));

      setStatus({
        type: "error",
        message: `Email failed (${statusCode}). ${detail || "Check EmailJS keys + allowed domain."}`,
      });
    }
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(contactInfo.email);
      setStatus({ type: "success", message: "Email copied to clipboard." });
      setTimeout(() => setStatus({ type: "idle", message: "" }), 1800);
    } catch {
      setStatus({ type: "error", message: "Could not copy email." });
    }
  };

  return (
    <section className="contact">
      <div className="contact-container">
        <div className="section-title-container">
          <h2 className="section-title">Contact</h2>
        </div>
        <p className="section-subtitle">
          Want to collaborate or chat about an opportunity? Send a note — I’ll reply quickly.
        </p>

        <LazyMotion features={domAnimation}>
          <div className="contact-grid">
            <motion.aside
              className="contact-card"
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.45 }}
            >
              <h3>Reach me directly</h3>

              <div className="contact-items">
                <div className="contact-item">
                  <span className="ci-icon" aria-hidden="true">
                    <FontAwesomeIcon icon={faEnvelope} />
                  </span>
                  <div className="ci-text">
                    <div className="ci-title">Email</div>
                    <div className="ci-value">{contactInfo.email}</div>
                  </div>
                  <button className="ci-action" onClick={copyEmail} type="button" aria-label="Copy email">
                    <FontAwesomeIcon icon={faCopy} />
                  </button>
                </div>

                <div className="contact-item">
                  <span className="ci-icon" aria-hidden="true">
                    <FontAwesomeIcon icon={faPhoneAlt} />
                  </span>
                  <div className="ci-text">
                    <div className="ci-title">Phone</div>
                    <div className="ci-value">{contactInfo.phone}</div>
                  </div>
                </div>

                <div className="contact-item">
                  <span className="ci-icon" aria-hidden="true">
                    <FontAwesomeIcon icon={faMapMarkerAlt} />
                  </span>
                  <div className="ci-text">
                    <div className="ci-title">Location</div>
                    <div className="ci-value">{contactInfo.location}</div>
                  </div>
                </div>
              </div>

              <div className="contact-socials">
                {socials.map((s) => (
                  <a key={s.label} className="social-btn" href={s.href} target="_blank" rel="noreferrer">
                    <FontAwesomeIcon icon={s.icon} />
                    <span>{s.label}</span>
                  </a>
                ))}
              </div>

              <div className="contact-note">
                <span className="note-dot" aria-hidden="true" />
                <span>Prefer email? Use the form — it’s routed to my inbox via EmailJS.</span>
              </div>
            </motion.aside>

            <motion.form
              className="form-card"
              onSubmit={sendEmail}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.45, delay: 0.06 }}
            >
              <div className="form-row">
                <div className="field">
                  <label htmlFor="name">Name</label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={onChange}
                    placeholder="Your name"
                    autoComplete="name"
                  />
                </div>

                <div className="field">
                  <label htmlFor="email">Email</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={onChange}
                    placeholder="you@example.com"
                    autoComplete="email"
                  />
                </div>
              </div>

              <div className="field">
                <label htmlFor="subject">Subject</label>
                <input
                  id="subject"
                  name="subject"
                  type="text"
                  value={formData.subject}
                  onChange={onChange}
                  placeholder="What’s this about?"
                />
              </div>

              <div className="field">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows="6"
                  value={formData.message}
                  onChange={onChange}
                  placeholder="Write your message..."
                />
              </div>

              <div className="form-actions">
                <button className="send-btn" type="submit" disabled={status.type === "loading"}>
                  <FontAwesomeIcon icon={faPaperPlane} /> Send message
                </button>

                <div className={`status status-${status.type}`} aria-live="polite">
                  {status.type === "success" && <FontAwesomeIcon icon={faCheckCircle} />}
                  {status.type === "error" && <FontAwesomeIcon icon={faExclamationTriangle} />}
                  <span>{status.message}</span>
                </div>
              </div>
            </motion.form>
          </div>
        </LazyMotion>
      </div>
    </section>
  );
};

export default Contact;
