import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { FiMenu, FiX, FiChevronDown, FiPhone, FiMail, FiMapPin, FiClock, FiGlobe } from 'react-icons/fi'
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube, FaWhatsapp } from 'react-icons/fa'
import './Header.css'
import { useCms } from '../context/CmsContext'

const navItems = [
  { label: 'Home', path: '/' },
  {
    label: 'About Us', path: '/about',
    children: [
      { label: 'Vision & Mission', path: '/about#vision' },
      { label: "Principal's Message", path: '/about#principal' },
      { label: 'School History', path: '/about#history' },
      { label: 'Infrastructure', path: '/about#infrastructure' },
    ]
  },
  {
    label: 'Academics', path: '/academics',
    children: [
      { label: 'Curriculum (CBSE)', path: '/academics#curriculum' },
      { label: 'Subjects Offered', path: '/academics#subjects' },
      { label: 'Academic Calendar', path: '/academics#calendar' },
      { label: 'Examination System', path: '/academics#exams' },
    ]
  },
  { label: 'Admissions', path: '/admissions' },
  { label: 'Faculty', path: '/faculty' },
  { label: 'Student Corner', path: '/student-corner' },
  { label: 'CBSE Disclosure', path: '/mandatory-disclosure' },
  { label: 'Gallery', path: '/gallery' },
  { label: 'Contact', path: '/contact' },
]

export default function Header() {
  const { content } = useCms()
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState(null)
  const location = useLocation()
  const dropdownRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
    setActiveDropdown(null)
  }, [location])

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setActiveDropdown(null)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <>
      {/* Top Bar */}
      <div className="top-bar">
        <div className="container">
          <div className="top-bar-inner">
            <div className="top-bar-left">
              <a href={`tel:${content.contact.phone.split(',')[0]}`} className="top-bar-item">
                <FiPhone size={13} /> {content.contact.phone.split(',')[0]}
              </a>
              <a href={`mailto:${content.contact.email}`} className="top-bar-item">
                <FiMail size={13} /> {content.contact.email}
              </a>
              <span className="top-bar-item top-bar-hide-mobile">
                <FiClock size={13} /> {content.contact.timings}
              </span>
            </div>
            <div className="top-bar-right">
              <div className="top-bar-socials">
                <a href={content.contact.facebook} target="_blank" rel="noreferrer" aria-label="Facebook"><FaFacebookF size={12} /></a>
                <a href={content.contact.twitter} target="_blank" rel="noreferrer" aria-label="Twitter"><FaTwitter size={12} /></a>
                <a href={content.contact.instagram} target="_blank" rel="noreferrer" aria-label="Instagram"><FaInstagram size={12} /></a>
                <a href={content.contact.youtube} target="_blank" rel="noreferrer" aria-label="YouTube"><FaYoutube size={12} /></a>
                <a href={`https://wa.me/${content.contact.phone.replace(/[^0-9]/g, '')}`} target="_blank" rel="noreferrer" aria-label="WhatsApp"><FaWhatsapp size={12} /></a>
              </div>
              <Link to="/erp" className="top-bar-erp">ERP Login</Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className={`header ${isScrolled ? 'header-scrolled' : ''}`} id="main-header">
        <div className="container">
          <div className="header-inner">
            <Link to="/" className="header-logo" aria-label="New Morning Star Public School - Home">
              <div className="logo-icon">
                <span>NMS</span>
              </div>
              <div className="logo-text">
                <span className="logo-name">New Morning Star</span>
                <span className="logo-sub">Public School</span>
                <span className="logo-tag">CBSE Affiliated</span>
              </div>
            </Link>

            <nav className="header-nav" ref={dropdownRef}>
              <ul className="nav-list">
                {navItems.map((item, idx) => (
                  <li
                    key={idx}
                    className={`nav-item ${item.children ? 'has-dropdown' : ''} ${location.pathname === item.path ? 'active' : ''}`}
                    onMouseEnter={() => item.children && setActiveDropdown(idx)}
                    onMouseLeave={() => item.children && setActiveDropdown(null)}
                  >
                    <Link to={item.path} className="nav-link">
                      {item.label}
                      {item.children && <FiChevronDown size={14} />}
                    </Link>
                    {item.children && activeDropdown === idx && (
                      <ul className="dropdown-menu animate-fade-in">
                        {item.children.map((child, cidx) => (
                          <li key={cidx}>
                            <Link to={child.path} className="dropdown-link">{child.label}</Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            </nav>

            <div className="header-actions">
              <Link to="/admissions" className="btn btn-primary btn-sm header-cta">
                Apply Now
              </Link>
              <button
                className="mobile-toggle"
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label="Toggle menu"
                aria-expanded={mobileOpen}
              >
                {mobileOpen ? <FiX size={24} /> : <FiMenu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${mobileOpen ? 'open' : ''}`}>
        <div className="mobile-menu-inner">
          {navItems.map((item, idx) => (
            <div key={idx} className="mobile-nav-item">
              <Link to={item.path} className="mobile-nav-link" onClick={() => setMobileOpen(false)}>
                {item.label}
              </Link>
              {item.children && (
                <div className="mobile-submenu">
                  {item.children.map((child, cidx) => (
                    <Link key={cidx} to={child.path} className="mobile-sub-link" onClick={() => setMobileOpen(false)}>
                      {child.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
          <Link to="/admissions" className="btn btn-primary w-full mt-4" onClick={() => setMobileOpen(false)}>
            Apply Now
          </Link>
          <Link to="/erp" className="btn btn-secondary w-full mt-2" onClick={() => setMobileOpen(false)}>
            ERP Login
          </Link>
        </div>
      </div>

      {/* Overlay */}
      {mobileOpen && <div className="mobile-overlay" onClick={() => setMobileOpen(false)} />}
    </>
  )
}
