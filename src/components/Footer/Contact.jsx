import React, { useRef, useState } from "react";
import {
  FaGithub,
  FaGitlab,
  FaLinkedin,
  FaEnvelope,
  FaPhone,
} from "react-icons/fa";
import emailjs from "@emailjs/browser";
import styles from "./Contact.module.css";

const Contact = () => {
  const form = useRef();
  const [status, setStatus] = useState("");

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_mokcp6q",
        "template_chja1cd",
        form.current,
        "9PuGyR6X7C-YNmCv5"
      )
      .then(
        (result) => {
          console.log(result.text);
          setStatus("Message sent successfully!");
          form.current.reset();
        },
        (error) => {
          console.log(error.text);
          setStatus("Failed to send message. Please try again.");
        }
      );
  };

  return (
    <>
      <div className={styles.contacts}>
        <h2 className={styles.contactTitle}>Contact Me</h2>
        <div className={styles.contactCards}>
          <div className={styles.card}>
            <a
              href="https://gitlab.com/limelaine14"
              target="_blank"
              rel="noreferrer"
              className={styles.iconLink}
            >
              <FaGitlab className={styles.icon} />
            </a>
            <span>GitLab</span>
          </div>

          <div className={styles.card}>
            <a
              href="https://github.com/elaina-c"
              target="_blank"
              rel="noreferrer"
              className={styles.iconLink}
            >
              <FaGithub className={styles.icon} />
            </a>
            <span>GitHub</span>
          </div>

          <div className={styles.card}>
            <a
              href="https://www.linkedin.com/in/elaine-lim-014989368/"
              target="_blank"
              rel="noreferrer"
              className={styles.iconLink}
            >
              <FaLinkedin className={styles.icon} />
            </a>
            <span>LinkedIn</span>
          </div>

          <div className={styles.card}>
            <a href="mailto:limelaine14@gmail.com" className={styles.iconLink}>
              <FaEnvelope className={styles.icon} />
            </a>
            <span>Email</span>
          </div>

          <div className={styles.card}>
            <a href="tel:+639368195756" className={styles.iconLink}>
              <FaPhone className={styles.icon} />
            </a>
            <span>+63 9368195756</span>
          </div>
        </div>
      </div>

      <div className={styles.feedback}>
        <h2 className={styles.feedbackTitle}>Feedback</h2>
        <form ref={form} onSubmit={sendEmail} className={styles.contactForm}>
          <input
            type="text"
            name="user_name"
            placeholder="Your Name"
            required
          />
          <input
            type="email"
            name="user_email"
            placeholder="Your Email"
            required
          />
          <textarea name="message" placeholder="Your Message" required />
          <button type="submit" className={styles.messageBtn}>
            Send Message
          </button>
        </form>
        {status && <p className={styles.status}>{status}</p>}
      </div>
    </>
  );
};

export default Contact;
