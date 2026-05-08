import { useEffect, useRef } from "react";

import ronitaImg from "../assets/Ronita.jpeg";
import debtulyaImg from "../assets/me.jpeg";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400&family=DM+Sans:wght@300;400;500&display=swap');

  .about-root {
    font-family: 'DM Sans', sans-serif;
    background: #FAF6EF;
    color: #1A1612;
    overflow-x: hidden;
  }

  /* HERO */
  .about-hero {
    display: grid;
    grid-template-columns: 1fr 1fr;
    min-height: 88vh;
  }
  .hero-left {
    background: #1A1612;
    padding: 7rem 5vw 5rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: relative;
    overflow: hidden;
  }
  .hero-left::before {
    content: '';
    position: absolute;
    top: -60px; right: -60px;
    width: 300px; height: 300px;
    border-radius: 50%;
    border: 1px solid rgba(201,168,76,0.12);
  }
  .hero-tag {
    font-size: 0.72rem;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: #C9A84C;
    margin-bottom: 1rem;
  }
  .hero-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(2.8rem, 4.5vw, 4.8rem);
    font-weight: 600;
    color: #FAF6EF;
    line-height: 1.05;
    margin-bottom: 1.5rem;
  }
  .hero-title em {
    font-style: italic;
    color: #C9A84C;
  }
  .hero-sub {
    font-size: 1rem;
    color: #9E9184;
    max-width: 380px;
    line-height: 1.8;
    margin-bottom: 2.5rem;
  }
  .btn-gold {
    display: inline-block;
    background: #C9A84C;
    color: #1A1612;
    padding: 0.75rem 2rem;
    font-size: 0.78rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    font-weight: 500;
    text-decoration: none;
    border: none;
    cursor: pointer;
    transition: background 0.2s, transform 0.15s;
    font-family: 'DM Sans', sans-serif;
  }
  .btn-gold:hover { background: #EDD9A3; transform: translateY(-1px); }

  .hero-right {
    background: #2A2218;
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 300px;
  }

  /* STATS */
  .stats-bar {
    background: #1A1612;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 2px;
  }
  .stat-item {
    background: #211D17;
    padding: 2.5rem 1.5rem;
    text-align: center;
  }
  .stat-number {
    font-family: 'Cormorant Garamond', serif;
    font-size: 3rem;
    font-weight: 600;
    color: #C9A84C;
    line-height: 1;
  }
  .stat-label {
    font-size: 0.72rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: #6E6458;
    margin-top: 0.5rem;
  }

  /* STORY */
  .section {
    padding: 5.5rem 6vw;
  }
  .section-inner { max-width: 1100px; margin: 0 auto; }
  .section-label {
    font-size: 0.72rem;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: #C9A84C;
    margin-bottom: 0.7rem;
  }
  .section-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(2rem, 3vw, 2.8rem);
    font-weight: 600;
    line-height: 1.15;
    color: #1A1612;
    margin-bottom: 1rem;
  }
  .section-body { color: #8A7F72; max-width: 560px; line-height: 1.85; }

  .story-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 5rem;
    align-items: center;
    margin-top: 3rem;
  }
  .story-text p { color: #8A7F72; margin-bottom: 1.2rem; line-height: 1.9; }

  .story-card {
    background: #1A1612;
    padding: 2.8rem 2.5rem;
    position: relative;
  }
  .story-card::before {
    content: '';
    position: absolute;
    top: -8px; left: -8px;
    right: 8px; bottom: 8px;
    border: 1px solid #C9A84C;
    pointer-events: none;
  }
  .story-card-quote {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.45rem;
    font-style: italic;
    color: #EDD9A3;
    line-height: 1.5;
    margin-bottom: 1.5rem;
  }
  .story-card-author {
    font-size: 0.75rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: #6E6458;
  }

  /* VALUES */
  .values-section { background: #F3EDE2; }
  .values-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 2px;
    margin-top: 3rem;
  }
  .value-card {
    background: #FAF6EF;
    padding: 2.5rem 2rem;
    position: relative;
    overflow: hidden;
    transition: box-shadow 0.2s;
  }
  .value-card::after {
    content: '';
    position: absolute;
    bottom: 0; left: 0;
    height: 2px; width: 0;
    background: #C9A84C;
    transition: width 0.4s ease;
  }
  .value-card:hover::after { width: 100%; }
  .value-icon { width: 32px; height: 32px; color: #C9A84C; margin-bottom: 1.1rem; }
  .value-name {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.25rem;
    font-weight: 600;
    color: #1A1612;
    margin-bottom: 0.5rem;
  }
  .value-desc { font-size: 0.88rem; color: #8A7F72; line-height: 1.75; }

  /* TEAM */
  .team-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;
    margin-top: 3rem;
  }
  .team-card { text-align: center; }
  .team-avatar {
    width: 130px; height: 130px;
    border-radius: 50%;
    background: #1A1612;
    border: 2px solid rgba(201,168,76,0.3);
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 1.2rem;
    font-family: 'Cormorant Garamond', serif;
    font-size: 2rem;
    font-weight: 600;
    color: #C9A84C;
  }
  .team-name {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.2rem;
    font-weight: 600;
    color: #1A1612;
  }
  .team-role {
    font-size: 0.75rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: #C9A84C;
    margin-top: 0.2rem;
  }

  /* CTA */
  .cta-section {
    background: #6B3F2A;
    padding: 6rem 6vw;
    text-align: center;
    position: relative;
    overflow: hidden;
  }
  .cta-section::before {
    content: '';
    position: absolute;
    border-radius: 50%;
    border: 1px solid rgba(255,255,255,0.1);
    width: 500px; height: 500px;
    top: -250px; left: -100px;
  }
  .cta-section h2 {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(2rem, 3.5vw, 3.2rem);
    font-weight: 600;
    color: #FAF6EF;
    margin-bottom: 1rem;
    position: relative;
  }
  .cta-section p {
    color: rgba(250,246,239,0.75);
    max-width: 460px;
    margin: 0 auto 2rem;
    position: relative;
  }
  .btn-light {
    display: inline-block;
    background: #FAF6EF;
    color: #6B3F2A;
    padding: 0.85rem 2.5rem;
    font-size: 0.78rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    font-weight: 500;
    text-decoration: none;
    border: none;
    cursor: pointer;
    font-family: 'DM Sans', sans-serif;
    position: relative;
    transition: background 0.2s, transform 0.15s;
  }
  .btn-light:hover { background: #fff; transform: translateY(-1px); }

  /* RESPONSIVE */
  @media (max-width: 768px) {
    .about-hero { grid-template-columns: 1fr; }
    .hero-right { min-height: 240px; }
    .stats-bar { grid-template-columns: repeat(2, 1fr); }
    .story-grid { grid-template-columns: 1fr; gap: 2.5rem; }
    .values-grid { grid-template-columns: 1fr; }
    .team-grid { grid-template-columns: repeat(2, 1fr); }
  }
`;

const StarIcon = () => (
  <svg className="value-icon" viewBox="0 0 36 36" fill="none">
    <path d="M18 3L22 13H33L24 19.5L27.5 30L18 23.5L8.5 30L12 19.5L3 13H14L18 3Z"
      stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
  </svg>
);

const CheckIcon = () => (
  <svg className="value-icon" viewBox="0 0 36 36" fill="none">
    <circle cx="18" cy="18" r="13" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M12 18.5L16 22.5L24 14" stroke="currentColor" strokeWidth="1.5"
      strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ShieldIcon = () => (
  <svg className="value-icon" viewBox="0 0 36 36" fill="none">
    <path d="M18 4L6 9V18C6 24.6 11.4 30.6 18 32C24.6 30.6 30 24.6 30 18V9L18 4Z"
      stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
    <path d="M13 18L16.5 21.5L23 15" stroke="currentColor" strokeWidth="1.5"
      strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const Emblem = () => (
  <svg viewBox="0 0 400 420" fill="none" style={{ width: "80%", maxWidth: 380, opacity: 0.9 }}>
    <circle cx="200" cy="210" r="160" stroke="#C9A84C" strokeOpacity="0.12" strokeWidth="1"/>
    <circle cx="200" cy="210" r="120" stroke="#C9A84C" strokeOpacity="0.18" strokeWidth="1"/>
    <rect x="140" y="130" width="120" height="160" rx="4" fill="#C9A84C" fillOpacity="0.07"
      stroke="#C9A84C" strokeOpacity="0.35" strokeWidth="1"/>
    <rect x="154" y="144" width="92" height="132" rx="2" fill="none"
      stroke="#C9A84C" strokeOpacity="0.18" strokeWidth="0.5"/>
    <text x="200" y="232" fontFamily="Georgia, serif" fontSize="72" fill="#C9A84C"
      fillOpacity="0.85" textAnchor="middle" fontWeight="bold">A</text>
    <circle cx="126" cy="150" r="2.5" fill="#C9A84C" fillOpacity="0.5"/>
    <circle cx="274" cy="172" r="2" fill="#C9A84C" fillOpacity="0.4"/>
    <circle cx="150" cy="310" r="2" fill="#C9A84C" fillOpacity="0.35"/>
    <circle cx="258" cy="296" r="3" fill="#C9A84C" fillOpacity="0.45"/>
    <text x="200" y="332" fontFamily="sans-serif" fontSize="9" fill="#C9A84C"
      fillOpacity="0.5" textAnchor="middle" letterSpacing="4">ADDITIYASTORE</text>
    <line x1="155" y1="325" x2="172" y2="325" stroke="#C9A84C" strokeOpacity="0.3" strokeWidth="0.5"/>
    <line x1="228" y1="325" x2="245" y2="325" stroke="#C9A84C" strokeOpacity="0.3" strokeWidth="0.5"/>
  </svg>
);

const stats = [
  { number: "5+",  label: "Years of Excellence" },
  { number: "10K", label: "Happy Customers" },
  { number: "500+",label: "Unique Products" },
  { number: "98%", label: "Satisfaction Rate" },
];

const values = [
  { Icon: StarIcon,  name: "Quality First",    desc: "Every product we stock is tested and trusted. We never compromise on the standards our customers deserve." },
  { Icon: CheckIcon, name: "Customer Trust",   desc: "We build lasting relationships through honesty, transparency, and a commitment to exceptional experiences." },
  { Icon: ShieldIcon,name: "Ethical Commerce", desc: "We believe business must be responsible — for our customers, our partners, and the world we all share." },
];

const team = [
  { image: ronitaImg, name: "Ronita Roy", role: "Founder & CEO" },
  { image: debtulyaImg, name: "Debtulya Sarkar",      role: "Web-Developer" },
];

export default function AboutUs() {
  const styleRef = useRef(null);

  useEffect(() => {
    if (!document.getElementById("about-us-styles")) {
      const tag = document.createElement("style");
      tag.id = "about-us-styles";
      tag.textContent = styles;
      document.head.appendChild(tag);
    }
  }, []);

  return (
    <div className="about-root">
      {/* HERO */}
      <section className="about-hero">
        <div className="hero-left">
          <p className="hero-tag">Our Story</p>
          <h1 className="hero-title">
            Crafted with<br />
            <em>Purpose</em> &amp;<br />
            Passion
          </h1>
          <p className="hero-sub">
            Additiyastore was born from a simple belief — that every product should
            tell a story, carry quality, and bring joy to the people who receive it.
          </p>
          <button className="btn-gold">Explore Our Shop</button>
        </div>
        <div className="hero-right">
          <Emblem />
        </div>
      </section>

      {/* STATS */}
      <div className="stats-bar">
        {stats.map((s) => (
          <div className="stat-item" key={s.label}>
            <div className="stat-number">{s.number}</div>
            <div className="stat-label">{s.label}</div>
          </div>
        ))}
      </div>

      {/* STORY */}
      <section className="section">
        <div className="section-inner">
          <p className="section-label">Who We Are</p>
          <h2 className="section-title">More Than a Store —<br />A Community</h2>
          <div className="story-grid">
            <div className="story-text">
              <p>
                Additiyastore started as a small family venture with a big dream — to bring
                thoughtfully curated, high-quality products to homes across India and beyond.
                We believe shopping should feel personal, not transactional.
              </p>
              <p>
                Every item in our collection is handpicked with care. We work closely with
                makers, artisans, and trusted brands who share our commitment to quality and
                authenticity. From everyday essentials to unique finds, there's something for everyone.
              </p>
              <p>
                We're proud to have built a community of customers who trust us not just for our
                products, but for the experience and care we bring to every order.
              </p>
              <button className="btn-gold" style={{ marginTop: "1.2rem" }}>Shop Now</button>
            </div>
            <div>
              <div className="story-card">
                <p className="story-card-quote">
                  "Quality is never an accident; it is always the result of intelligent effort."
                </p>
                <p className="story-card-author">— The Additiyastore Promise</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className="section values-section">
        <div className="section-inner">
          <p className="section-label">What We Stand For</p>
          <h2 className="section-title">Our Core Values</h2>
          <div className="values-grid">
            {values.map((v) => (
              <div className="value-card" key={v.name}>
                <v.Icon />
                <p className="value-name">{v.name}</p>
                <p className="value-desc">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TEAM */}
      <section className="section">
        <div className="section-inner">
          <p className="section-label">The People Behind It</p>
          <h2 className="section-title">Meet Our Team</h2>
          <p className="section-body">
            A passionate group of individuals who wake up every day excited to build
            something meaningful for our community.
          </p>
          <div className="team-grid">
            {team.map((m) => (
              <div className="team-card" key={m.name}>
                <img
                  src={member.image}
                  alt={member.name}
                  className="team-avatar"
                  style={{ objectFit: "cover", borderRadius: "50%" }}
                />
                <p className="team-name">{m.name}</p>
                <p className="team-role">{m.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <h2>Ready to Explore?</h2>
        <p>
          Discover our curated collection and find something you'll truly love.
          Every purchase comes with the Additiyastore promise.
        </p>
        <button className="btn-light">Browse the Store</button>
      </section>
    </div>
  );
}