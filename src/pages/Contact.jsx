import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { useCms } from '../context/CmsContext'
import { motion } from 'framer-motion'
import { FiPhone, FiMail, FiMapPin, FiClock, FiSend, FiCheckCircle, FiMessageCircle } from 'react-icons/fi'
import { FaWhatsapp } from 'react-icons/fa'
import './About.css'

export default function Contact() {
  const { content } = useCms()
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', subject: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <>
      <Helmet>
        <title>Contact Us - New Morning Star Public School</title>
        <meta name="description" content="Get in touch with New Morning Star Public School. Address, phone, email, inquiry form, and Google Maps location." />
      </Helmet>

      <section className="page-banner" style={{ background: 'linear-gradient(135deg, var(--primary-600), var(--accent-700))' }}>
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <span className="section-badge" style={{ background: 'rgba(255,255,255,0.15)', color: 'white', border: 'none' }}>Get in Touch</span>
            <h1 className="page-banner-title">Contact Us</h1>
            <p className="page-banner-desc">We would love to hear from you. Reach out to us anytime.</p>
          </motion.div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: 'var(--space-10)' }}>
            {/* Contact Info */}
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <h2 className="section-title" style={{ fontSize: 'var(--text-2xl)' }}>Get In Touch</h2>
              <p style={{ color: 'var(--gray-500)', marginBottom: 'var(--space-6)', lineHeight: 1.7 }}>
                Have questions about admissions, academics, or anything else? Our team is here to help.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
                {[
                  { icon: <FiMapPin />, title: 'Address', text: content.contact.address, color: 'var(--primary-500)' },
                  { icon: <FiPhone />, title: 'Phone', text: content.contact.phone, color: 'var(--accent-500)' },
                  { icon: <FiMail />, title: 'Email', text: content.contact.email, color: 'var(--gold-500)' },
                  { icon: <FiClock />, title: 'Office Hours', text: content.contact.timings, color: 'var(--error)' },
                ].map((item, i) => (
                  <div key={i} style={{ display: 'flex', gap: 'var(--space-4)' }}>
                    <div style={{ width: 48, height: 48, borderRadius: 'var(--radius-lg)', background: `${item.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: item.color, fontSize: 20, flexShrink: 0 }}>
                      {item.icon}
                    </div>
                    <div>
                      <strong style={{ fontSize: 'var(--text-sm)', color: 'var(--gray-800)' }}>{item.title}</strong>
                      <p style={{ fontSize: 'var(--text-sm)', color: 'var(--gray-500)', whiteSpace: 'pre-line', lineHeight: 1.6 }}>{item.text}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ marginTop: 'var(--space-6)', display: 'flex', gap: 'var(--space-3)' }}>
                <a href="https://wa.me/919876543210" className="btn btn-accent btn-sm" target="_blank" rel="noopener">
                  <FaWhatsapp /> WhatsApp Us
                </a>
                <a href="tel:+919876543210" className="btn btn-secondary btn-sm">
                  <FiPhone /> Call Now
                </a>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              {submitted ? (
                <div style={{ textAlign: 'center', padding: 'var(--space-12)', background: 'var(--accent-50)', borderRadius: 'var(--radius-2xl)', border: '1px solid var(--accent-200)' }}>
                  <FiCheckCircle size={48} style={{ color: 'var(--accent-500)', marginBottom: 'var(--space-4)' }} />
                  <h3 style={{ fontSize: 'var(--text-2xl)', fontWeight: 700, marginBottom: 'var(--space-2)' }}>Message Sent!</h3>
                  <p style={{ color: 'var(--gray-600)' }}>Thank you for reaching out. We will get back to you within 24 hours.</p>
                  <button className="btn btn-primary" style={{ marginTop: 'var(--space-4)' }} onClick={() => setSubmitted(false)}>Send Another</button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ background: 'white', padding: 'var(--space-8)', borderRadius: 'var(--radius-2xl)', boxShadow: 'var(--shadow-card)', border: '1px solid var(--gray-100)' }}>
                  <h3 style={{ fontSize: 'var(--text-xl)', fontWeight: 700, marginBottom: 'var(--space-5)' }}>
                    <FiMessageCircle style={{ display: 'inline', marginRight: 8, color: 'var(--primary-500)' }} />
                    Send us a Message
                  </h3>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
                    <div className="form-group">
                      <label className="form-label">Full Name *</label>
                      <input className="form-input" required placeholder="Your name" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Email *</label>
                      <input className="form-input" type="email" required placeholder="you@example.com" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
                    </div>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
                    <div className="form-group">
                      <label className="form-label">Phone</label>
                      <input className="form-input" placeholder="+91 XXXXX XXXXX" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Subject *</label>
                      <select className="form-select" required value={formData.subject} onChange={e => setFormData({...formData, subject: e.target.value})}>
                        <option value="">Select Subject</option>
                        <option value="admission">Admission Inquiry</option>
                        <option value="academic">Academic Query</option>
                        <option value="fee">Fee Related</option>
                        <option value="transport">Transport</option>
                        <option value="feedback">Feedback</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Message *</label>
                    <textarea className="form-textarea" required placeholder="Write your message here..." value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} />
                  </div>
                  <button type="submit" className="btn btn-primary btn-lg w-full">
                    <FiSend /> Send Message
                  </button>
                </form>
              )}
            </motion.div>
          </div>

          {/* Google Map */}
          <div style={{ marginTop: 'var(--space-12)' }}>
            <div style={{ borderRadius: 'var(--radius-2xl)', overflow: 'hidden', boxShadow: 'var(--shadow-lg)', border: '1px solid var(--gray-200)' }}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3501.456!2d77.2090!3d28.6352!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjjCsDM4JzA2LjciTiA3N8KwMTInMzIuNCJF!5e0!3m2!1sen!2sin!4v1"
                width="100%" height="400" style={{ border: 0 }} allowFullScreen="" loading="lazy"
                title="School Location"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
