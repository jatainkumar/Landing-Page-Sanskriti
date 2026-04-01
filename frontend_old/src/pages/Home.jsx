import React, { useEffect, useState } from 'react';
import { Music, BookOpen, Lamp, Users, Menu, X, ChevronDown, Plus, Minus } from 'lucide-react';
import '../styles/home.css';

const Home = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    email: '',
    country: '',
    interests: []
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [formError, setFormError] = useState(null);
  const [expandedFaq, setExpandedFaq] = useState(null);

  // Scroll reveal animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  // Smooth scroll for anchor links
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  const handleInterestToggle = (interest) => {
    setFormData((prev) => ({
      ...prev,
      interests: prev.interests.includes(interest) ?
        prev.interests.filter((i) => i !== interest) :
        [...prev.interests, interest]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormLoading(true);
    setFormError(null);

    try {
      const backendUrl = (process.env.REACT_APP_BACKEND_URL || 'http://localhost:8000').replace(/['"]+/g, '').trim();
      const response = await fetch(`${backendUrl}/api/waitlist`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setFormSubmitted(true);
        setShowPopup(true);
      } else {
        const data = await response.json();
        setFormError(data.detail || 'Something went wrong. Please try again.');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setFormError('Unable to connect to the server. Please try again later.');
    } finally {
      setFormLoading(false);
    }
  };

  const faqItems = [
    {
      question: "When is Sanskriti launching?",
      answer: "We're preparing to open Sanskriti soon. Join the waitlist and you'll be the first to receive launch updates."
    },
    {
      question: "What kind of content will be available?",
      answer: "Sanskriti will offer devotional music, cultural storytelling, festival experiences, family learning, and curated heritage programming."
    },
    {
      question: "Is Sanskriti only for children?",
      answer: "No. Sanskriti is built for the whole family — children, parents, and anyone seeking a deeper connection to Indian culture."
    },
    {
      question: "Will there be founding member benefits?",
      answer: "Yes. Early members will receive first updates on launch access, selected benefits, and special communication as Sanskriti opens."
    },
    {
      question: "Can I join from outside India?",
      answer: "Yes. Sanskriti is being created for Indian families across the world."
    }];


  return (
    <div className="sanskriti-app">

      {/* Thank You Popup Modal */}
      {showPopup && (
        <div className="popup-overlay" onClick={() => setShowPopup(false)}>
          <div className="popup-card" onClick={(e) => e.stopPropagation()}>
            <div className="popup-diya">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
                <path d="M12 2L8 8H16L12 2Z" fill="var(--color-saffron)" />
                <ellipse cx="12" cy="10" rx="6" ry="3" fill="var(--color-saffron)" opacity="0.7" />
                <circle cx="12" cy="8" r="1.5" fill="#FFE5B4" />
              </svg>
            </div>
            <div className="popup-diamond">✦ ✦ ✦</div>
            <h2 className="popup-headline">Namaste, {formData.firstName}!</h2>
            <p className="popup-message">
              You're now part of the Sanskriti founding family circle.
              We will be in touch soon with launch updates, early access,
              and founding member news — crafted just for you.
            </p>
            <p className="popup-tagline">"Culture is not a thing to carry. It is a flame to pass on."</p>
            <button className="popup-close" onClick={() => setShowPopup(false)}>
              Continue Exploring
            </button>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="nav-bar">
        <div className="nav-content">
          <div className="nav-logo">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="diya-icon">
              <path d="M12 2L8 8H16L12 2Z" fill="var(--color-saffron)" />
              <ellipse cx="12" cy="10" rx="6" ry="3" fill="var(--color-saffron)" opacity="0.7" />
              <circle cx="12" cy="8" r="1.5" fill="#FFE5B4" />
            </svg>
            <span className="brand-name">Sanskriti</span>
          </div>

          <div className={`nav-links ${mobileMenuOpen ? 'mobile-open' : ''}`}>
            <button onClick={() => scrollToSection('about')} className="nav-link">About</button>
            <button onClick={() => scrollToSection('what-we-offer')} className="nav-link">What's Coming</button>
            <button onClick={() => scrollToSection('why-join')} className="nav-link">Why Join</button>
            <button onClick={() => scrollToSection('faq')} className="nav-link">FAQ</button>
            <button onClick={() => scrollToSection('waitlist')} className="btn-nav-cta">Join Waitlist</button>
          </div>

          <button className="mobile-menu-btn" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="mandala-bg"></div>
        <div className="hero-content">
          <div className="hero-left reveal">
            <h1 className="hero-headline">
              Reconnect with Indian <em className="culture-italic">culture</em>, wherever you are.
            </h1>
            <p className="hero-subheadline">
              Sanskriti brings together devotional music, cultural storytelling, festivals, and family learning
              in one premium platform for global Indian families.
            </p>
            <div className="hero-cta-group">
              <button onClick={() => scrollToSection('waitlist')} className="btn-primary">
                Join the Founding Families Waitlist
              </button>
              <button onClick={() => scrollToSection('what-we-offer')} className="btn-secondary">
                Explore What's Coming
              </button>
            </div>
            <p className="hero-microcopy">
              Be among the first to access Sanskriti at launch and receive founding member updates and early launch benefits.
            </p>
            <p className="hero-trust">

            </p>
          </div>

          <div className="hero-right reveal visible">
            <div className="video-label">WATCH: The Sanskriti Story</div>
            <div className="video-frame">
              <iframe
                src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=0&rel=0&modestbranding=1"
                title="Sanskriti — A Cultural Home"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope"
                allowFullScreen>
              </iframe>
            </div>
          </div>
        </div>
      </section>

      {/* Waitlist Form */}
      <section id="waitlist" className="waitlist-section">
        <div className="section-label reveal">JOIN THE WAITLIST</div>
        <div className="waitlist-card reveal">
          {!formSubmitted ?
            <>
              <h2 className="card-headline">Reserve your founding family spot.</h2>
              <p className="card-subline">No spam. Just meaningful updates as we build.</p>

              <form onSubmit={handleSubmit} className="waitlist-form">
                <div className="form-row">
                  <input
                    type="text"
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    required
                    className="form-input" />

                  <input
                    type="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    className="form-input" />

                </div>

                <select
                  value={formData.country}
                  onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                  required
                  className="form-input">

                  <option value="">Select Country</option>
                  <option value="India">India</option>
                  <option value="United States">United States</option>
                  <option value="United Kingdom">United Kingdom</option>
                  <option value="Canada">Canada</option>
                  <option value="Australia">Australia</option>
                  <option value="UAE">UAE</option>
                  <option value="Singapore">Singapore</option>
                  <option value="Other">Other</option>
                </select>

                <div className="form-interests">
                  <label className="interest-label">I'm most interested in:</label>
                  <div className="interest-pills">
                    {['Family & Kids', 'Devotional Music', 'Festivals & Traditions', 'Cultural Stories'].map((interest) =>
                      <button
                        key={interest}
                        type="button"
                        className={`interest-pill ${formData.interests.includes(interest) ? 'selected' : ''}`}
                        onClick={() => handleInterestToggle(interest)}>

                        {interest}
                      </button>
                    )}
                  </div>
                </div>

                <button type="submit" disabled={formLoading} className="btn-submit">
                  {formLoading ? 'Submitting...' : 'Join the Founding Families Waitlist'}
                </button>
                {formError && (
                  <p className="form-error">{formError}</p>
                )}
              </form>
            </> :

            <div className="success-state">
              <div className="success-icon">✦</div>
              <h2 className="success-headline">You're on the list. Welcome to Sanskriti.</h2>
              <p className="success-message">We'll be in touch with launch updates and founding member news.</p>
            </div>
          }
        </div>
      </section>

      {/* Why Sanskriti Exists */}
      <section id="about" className="why-section">
        <div className="section-label reveal visible">WHY WE BUILT SANSKRITI</div>
        <h2 className="section-h2 reveal">Culture shouldn't have to travel in fragments.</h2>
        <div className="divider reveal"></div>
        <p className="why-body reveal">
          For families living away from India, culture often becomes fragmented. Stories are scattered, music is
          disconnected, and traditions are reduced to occasional moments. Sanskriti was created to bring it all
          together in one place, so families can stay rooted, children can grow up with cultural confidence, and
          tradition can remain a living part of everyday life.
        </p>
        <div className="image-banner reveal">
          <img
            src="https://images.unsplash.com/photo-1774437893809-37dd82cf4ab7"
            alt="An Indian family celebrating a festival together" />

        </div>
      </section>

      {/* Four Pillars */}
      <section id="what-we-offer" className="pillars-section">
        <div className="section-label reveal">WHAT WE OFFER</div>
        <h2 className="section-h2 reveal">A living cultural experience</h2>
        <p className="pillars-intro reveal">
          Sanskriti is designed as a cultural home, not just a content platform.
        </p>

        <div className="pillars-grid">
          <div className="pillar-card reveal">
            <Music size={40} className="pillar-icon" />
            <h3 className="pillar-title">Devotional Music</h3>
            <p className="pillar-body">
              Bhajans, sacred music, concerts, and original Sanskriti productions.
            </p>
            <div className="card-video-slot">
              <iframe
                src="https://www.youtube.com/embed/dQw4w9WgXcQ?rel=0&modestbranding=1"
                title="Devotional Music Preview"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope"
                allowFullScreen>
              </iframe>
            </div>
          </div>

          <div className="pillar-card reveal">
            <BookOpen size={40} className="pillar-icon" />
            <h3 className="pillar-title">Cultural Stories</h3>
            <p className="pillar-body">
              Timeless stories, traditions, and heritage explained with depth and beauty.
            </p>
            <div className="card-video-slot">
              <iframe
                src="https://www.youtube.com/embed/dQw4w9WgXcQ?rel=0&modestbranding=1"
                title="Cultural Stories Preview"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope"
                allowFullScreen>
              </iframe>
            </div>
          </div>

          <div className="pillar-card reveal">
            <Lamp size={40} className="pillar-icon" />
            <h3 className="pillar-title">Festivals & Rituals</h3>
            <p className="pillar-body">
              Celebrate Indian festivals with meaning, not just memory.
            </p>
            <div className="card-video-slot">
              <iframe
                src="https://www.youtube.com/embed/dQw4w9WgXcQ?rel=0&modestbranding=1"
                title="Festivals Preview"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope"
                allowFullScreen>
              </iframe>
            </div>
          </div>

          <div className="pillar-card reveal">
            <Users size={40} className="pillar-icon" />
            <h3 className="pillar-title">Family Learning</h3>
            <p className="pillar-body">
              Cultural journeys, stories, and spiritual learning designed for children and families.
            </p>
            <div className="card-video-slot">
              <iframe
                src="https://www.youtube.com/embed/dQw4w9WgXcQ?rel=0&modestbranding=1"
                title="Family Learning Preview"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope"
                allowFullScreen>
              </iframe>
            </div>
          </div>
        </div>
      </section>

      {/* Credibility Stats */}
      <section className="stats-section">
        <div className="stats-mandala"></div>
        <div className="section-label reveal">BUILT ON DEPTH, NOT NOISE</div>
        <div className="stats-grid">
          <div className="stat-cell reveal">
            <div className="stat-number">3500+</div>
            <div className="stat-label-1">Premium cultural content</div>
            <div className="stat-label-2">Minutes of programming</div>
          </div>
          <div className="stat-cell reveal">
            <div className="stat-number">100+</div>
            <div className="stat-label-1">Original music</div>
            <div className="stat-label-2">Songs and growing</div>
          </div>
          <div className="stat-cell reveal">
            <div className="stat-number">4</div>
            <div className="stat-label-1">Content pillars</div>
            <div className="stat-label-2">Regional · Devotional · Family · Stories</div>
          </div>
          <div className="stat-cell reveal">
            <div className="stat-number">Global</div>
            <div className="stat-label-1">Designed for the diaspora</div>
            <div className="stat-label-2">Indian families across the world</div>
          </div>
        </div>
      </section>

      {/* Who It's For */}
      <section className="who-section">
        <div className="who-content">
          <div className="who-left reveal">
            <div className="section-label">WHO SANSKRITI IS FOR</div>
            <h2 className="section-h2">For families who refuse to let culture fade.</h2>
            <div className="divider"></div>
            <p className="who-body">
              Sanskriti is for families who want their children to grow up connected to Indian values, stories,
              music, and traditions. It is for those who miss the emotional depth of festivals, the power of
              devotional music, and the richness of culture that deserves more than random clips and fragmented content.
            </p>
          </div>
          <div className="who-right reveal">
            <div className="portrait-image">
              <img
                src="https://images.unsplash.com/photo-1758598737999-e5b659b3d65c"
                alt="Indian family engaged in cultural learning" />

            </div>
          </div>
        </div>
      </section>

      {/* Founding Families */}
      <section className="founding-section">
        <div className="founding-flowers reveal">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="8" stroke="var(--color-ivory)" strokeWidth="1.5" opacity="0.8" />
            <circle cx="12" cy="12" r="3" fill="var(--color-ivory)" opacity="0.8" />
          </svg>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="8" stroke="var(--color-ivory)" strokeWidth="1.5" opacity="0.8" />
            <circle cx="12" cy="12" r="3" fill="var(--color-ivory)" opacity="0.8" />
          </svg>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="8" stroke="var(--color-ivory)" strokeWidth="1.5" opacity="0.8" />
            <circle cx="12" cy="12" r="3" fill="var(--color-ivory)" opacity="0.8" />
          </svg>
        </div>
        <h2 className="founding-h2 reveal">Become a Founding Family</h2>
        <p className="founding-body reveal">
          Our earliest members will help shape Sanskriti from the beginning. By joining the waitlist, you'll be
          the first to hear about launch access, founding member invitations, and the journey ahead.
        </p>
        <button onClick={() => scrollToSection('waitlist')} className="btn-founding reveal">
          Reserve My Spot
        </button>
        <p className="founding-support reveal">
          Join the first circle of families building a more rooted cultural future.
        </p>
        <div className="founding-banner reveal">
          <img
            src="https://images.unsplash.com/photo-1731783669036-71bc0fe906cf"
            alt="Indian families celebrating culture together" />

        </div>
      </section>

      {/* Why Join Early */}
      <section id="why-join" className="benefits-section">
        <div className="section-label reveal">WHY JOIN THE WAITLIST</div>
        <h2 className="section-h2 reveal">Early. Intentional. Yours.</h2>

        <div className="benefits-grid">
          <div className="benefit-card reveal">
            <div className="benefit-number">01</div>
            <h3 className="benefit-title">Early Access</h3>
            <p className="benefit-body">Be first to know when Sanskriti opens.</p>
          </div>
          <div className="benefit-card reveal">
            <div className="benefit-number">02</div>
            <h3 className="benefit-title">Founding Member Updates</h3>
            <p className="benefit-body">Receive launch news, feature announcements, and special early communication.</p>
          </div>
          <div className="benefit-card reveal">
            <div className="benefit-number">03</div>
            <h3 className="benefit-title">Priority Access</h3>
            <p className="benefit-body">Get first access to selected experiences as the platform rolls out.</p>
          </div>
          <div className="benefit-card reveal">
            <div className="benefit-number">04</div>
            <h3 className="benefit-title">Launch Benefits</h3>
            <p className="benefit-body">Be first in line for founding member launch offers.</p>
          </div>
        </div>

        <div className="benefits-closing reveal">
          <div className="divider"></div>
          <p className="closing-quote">This is not just another streaming platform. It is a cultural home.</p>
          <div className="divider"></div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="faq-section">
        <div className="section-label reveal">QUESTIONS</div>
        <h2 className="section-h2 reveal">What you might be wondering</h2>

        <div className="faq-list">
          {faqItems.map((item, index) =>
            <div key={index} className="faq-item reveal">
              <button
                className="faq-question"
                onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}>

                <span>{item.question}</span>
                {expandedFaq === index ? <Minus size={24} /> : <Plus size={24} />}
              </button>
              <div className={`faq-answer ${expandedFaq === index ? 'expanded' : ''}`}>
                <p>{item.answer}</p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Final CTA */}
      <section className="final-cta-section">
        <div className="final-mandala"></div>
        <h2 className="final-headline reveal">Join the waitlist. Stay rooted.</h2>
        <p className="final-subheadline reveal">
          Be first in line to experience Sanskriti — a new cultural platform for Indian families across the world.
        </p>
        <button onClick={() => scrollToSection('waitlist')} className="btn-final-cta reveal">
          Join the Waitlist
        </button>
        <p className="final-microcopy reveal">
          Early access. Founding member updates. First launch announcements.
        </p>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-left">
            <div className="footer-brand">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="footer-diya">
                <path d="M12 2L8 8H16L12 2Z" fill="var(--color-saffron)" />
                <ellipse cx="12" cy="10" rx="6" ry="3" fill="var(--color-saffron)" opacity="0.7" />
              </svg>
              <span className="footer-brand-name">Sanskriti</span>
            </div>
            <p className="footer-tagline">
              Building a cultural home for global Indian families through music, stories, festivals, and learning.
            </p>
          </div>

          <div className="footer-center">
            <div className="footer-mandala"></div>
          </div>

          <div className="footer-right">
            <a href="#about" className="footer-link">About Sanskriti</a>
            <a href="#contact" className="footer-link">Contact</a>
            <a href="#privacy" className="footer-link">Privacy Policy</a>
            <a href="#terms" className="footer-link">Terms</a>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© 2025 Sanskriti. All rights reserved.</p>
        </div>
      </footer>
    </div>);

};

export default Home;
