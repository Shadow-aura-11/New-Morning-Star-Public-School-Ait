import { Link } from 'react-router-dom'
import { useCms } from '../context/CmsContext'
import { FiPhone, FiMail, FiMapPin, FiArrowRight, FiHeart } from 'react-icons/fi'
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube, FaWhatsapp } from 'react-icons/fa'
import './Footer.css'

const quickLinks = [
  { label: 'About Us', path: '/about' },
  { label: 'Academics', path: '/academics' },
  { label: 'Admissions', path: '/admissions' },
  { label: 'Faculty & Staff', path: '/faculty' },
  { label: 'Gallery', path: '/gallery' },
  { label: 'Contact Us', path: '/contact' },
]

const importantLinks = [
  { label: 'Mandatory Disclosure', path: '/mandatory-disclosure' },
  { label: 'Student Corner', path: '/student-corner' },
  { label: 'Fee Structure', path: '/mandatory-disclosure#fees' },
  { label: 'Academic Calendar', path: '/academics#calendar' },
  { label: 'ERP Portal', path: '/erp' },
  { label: 'Results', path: '/student-corner#results' },
]

export default function Footer() {
  const { content } = useCms()
  return (
    <footer className="footer" id="footer">
      {/* CTA Band */}
      <div className="footer-cta">
        <div className="container">
          <div className="footer-cta-inner">
            <div className="footer-cta-text">
              <h3>Ready to Join New Morning Star Family?</h3>
              <p>Admissions are open for the academic session 2026-27. Secure your child's future today.</p>
            </div>
            <div className="footer-cta-actions">
              <Link to="/admissions" className="btn btn-primary btn-lg">
                Apply Now <FiArrowRight />
              </Link>
              <a href="tel:+919876543210" className="btn btn-secondary btn-lg">
                Call Us
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="footer-main">
        <div className="container">
          <div className="footer-grid">
            {/* About Column */}
            <div className="footer-col footer-about">
              <div className="footer-logo">
                <div className="logo-icon">
                  <span>NMS</span>
                </div>
                <div className="logo-text">
                  <span className="logo-name">New Morning Star</span>
                  <span className="logo-sub">Public School</span>
                </div>
              </div>
              <p className="footer-desc">
                Nurturing young minds with quality education, strong values, and a commitment to excellence. 
                CBSE affiliated institution dedicated to holistic development of every child.
              </p>
              <div className="footer-socials">
                <a href="#" aria-label="Facebook"><FaFacebookF /></a>
                <a href="#" aria-label="Twitter"><FaTwitter /></a>
                <a href="#" aria-label="Instagram"><FaInstagram /></a>
                <a href="#" aria-label="YouTube"><FaYoutube /></a>
                <a href="https://wa.me/919876543210" aria-label="WhatsApp"><FaWhatsapp /></a>
              </div>
            </div>

            {/* Quick Links */}
            <div className="footer-col">
              <h4 className="footer-heading">Quick Links</h4>
              <ul className="footer-links">
                {quickLinks.map((link, i) => (
                  <li key={i}>
                    <Link to={link.path}>
                      <FiArrowRight size={12} /> {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Important Links */}
            <div className="footer-col">
              <h4 className="footer-heading">Important</h4>
              <ul className="footer-links">
                {importantLinks.map((link, i) => (
                  <li key={i}>
                    <Link to={link.path}>
                      <FiArrowRight size={12} /> {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div className="footer-col">
              <h4 className="footer-heading">Contact Us</h4>
              <div className="footer-contact">
                <div className="footer-contact-item">
                  <FiMapPin size={16} />
                  <span>{content.contact.address}</span>
                </div>
                <div className="footer-contact-item">
                  <FiPhone size={16} />
                  <div>
                    <span>{content.contact.phone}</span>
                  </div>
                </div>
                <div className="footer-contact-item">
                  <FiMail size={16} />
                  <a href={`mailto:${content.contact.email}`}>{content.contact.email}</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom">
        <div className="container">
          <div className="footer-bottom-inner">
            <p>&copy; {new Date().getFullYear()} New Morning Star Public School. All Rights Reserved.</p>
            <div className="footer-bottom-links">
              <Link to="/mandatory-disclosure">CBSE Disclosure</Link>
              <span>|</span>
              <a href="#">Privacy Policy</a>
              <span>|</span>
              <a href="#">Terms of Use</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
