import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { FiMail, FiAward } from 'react-icons/fi'
import { FaGraduationCap } from 'react-icons/fa'
import './About.css'
import { useCms } from '../context/CmsContext'

export default function Faculty() {
  const { content } = useCms()
  return (
    <>
      <Helmet>
        <title>Faculty & Staff - New Morning Star Public School</title>
        <meta name="description" content="Meet our dedicated and qualified faculty members at New Morning Star Public School." />
      </Helmet>

      <section className="page-banner">
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <span className="section-badge" style={{ background: 'rgba(255,255,255,0.15)', color: 'white', border: 'none' }}>Our Team</span>
            <h1 className="page-banner-title">Faculty & Staff</h1>
            <p className="page-banner-desc">Dedicated educators shaping the leaders of tomorrow</p>
          </motion.div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">120+ Qualified Teachers</span>
            <h2 className="section-title">Meet Our Faculty</h2>
            <p className="section-subtitle">Our team of highly qualified and experienced educators is committed to providing the best education.</p>
          </div>
          <div className="infra-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
            {(content.faculty || []).map((f, idx) => (
              <motion.div key={idx} className="card" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.05 }}>
                <div className="card-body" style={{ textAlign: 'center' }}>
                  {f.image ? (
                    <div style={{ width: 100, height: 100, borderRadius: '50%', margin: '0 auto var(--space-4)', overflow: 'hidden', border: '3px solid var(--primary-100)' }}>
                      <img src={f.image} alt={f.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                  ) : (
                    <div style={{
                      width: 80, height: 80, borderRadius: '50%', margin: '0 auto var(--space-4)',
                      background: `linear-gradient(135deg, ${idx % 3 === 0 ? 'var(--primary-400), var(--primary-600)' : idx % 3 === 1 ? 'var(--accent-400), var(--accent-600)' : 'var(--gold-400), var(--gold-600)'})`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '1.5rem', fontWeight: 700,
                    }}>
                      {f.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                    </div>
                  )}
                  <h3 style={{ fontSize: 'var(--text-base)', fontWeight: 700, color: 'var(--gray-800)', marginBottom: '2px' }}>{f.name}</h3>
                  <p style={{ fontSize: 'var(--text-sm)', color: 'var(--primary-600)', fontWeight: 600, marginBottom: 'var(--space-3)' }}>{f.role}</p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', fontSize: 'var(--text-xs)', color: 'var(--gray-500)' }}>
                    <span><FaGraduationCap size={12} style={{ marginRight: 4, display: 'inline' }} />{f.qual}</span>
                    <span><FiAward size={12} style={{ marginRight: 4, display: 'inline' }} />{f.exp} experience</span>
                    <span className="badge badge-info" style={{ alignSelf: 'center', marginTop: 4 }}>{f.dept}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div style={{ marginTop: 'var(--space-12)', textAlign: 'center' }}>
            <div className="card" style={{ display: 'inline-block', maxWidth: 600, textAlign: 'center' }}>
              <div className="card-body" style={{ padding: 'var(--space-8)' }}>
                <h3 style={{ fontSize: 'var(--text-xl)', fontWeight: 700, marginBottom: 'var(--space-2)' }}>Staff Summary</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 'var(--space-4)', marginTop: 'var(--space-4)' }}>
                  {[
                    { label: 'Teaching Staff', count: '95' },
                    { label: 'Non-Teaching', count: '25' },
                    { label: 'PGT', count: '30' },
                    { label: 'TGT/PRT', count: '65' },
                  ].map((s, i) => (
                    <div key={i}>
                      <div style={{ fontSize: 'var(--text-2xl)', fontWeight: 800, color: 'var(--primary-600)' }}>{s.count}</div>
                      <div style={{ fontSize: 'var(--text-xs)', color: 'var(--gray-500)' }}>{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
