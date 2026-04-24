import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { FiUsers } from 'react-icons/fi'
import { useCms } from '../context/CmsContext'

export default function StudentCorner() {
  const { content } = useCms()

  return (
    <>
      <Helmet>
        <title>Board Toppers - New Morning Star Public School</title>
        <meta name="description" content="Celebrating the academic excellence of our board toppers at New Morning Star Public School." />
      </Helmet>

      <section className="page-banner" style={{ background: 'linear-gradient(135deg, #047857, #0f172a)' }}>
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <span className="section-badge" style={{ background: 'rgba(255,255,255,0.15)', color: 'white', border: 'none' }}>Excellence</span>
            <h1 className="page-banner-title">Board Toppers</h1>
            <p className="page-banner-desc">Celebrating our stars who made us proud in CBSE Board Exams</p>
          </motion.div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">Hall of Fame</span>
            <h2 className="section-title">Academic Achievers</h2>
            <p className="section-subtitle">Our students continue to set new benchmarks in academic excellence year after year.</p>
          </div>

          <div className="infra-grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)', gap: 'var(--space-6)' }}>
            {(content.results || []).map((student, idx) => (
              <motion.div 
                key={idx} 
                className="card" 
                initial={{ opacity: 0, scale: 0.9 }} 
                whileInView={{ opacity: 1, scale: 1 }} 
                viewport={{ once: true }} 
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -10 }}
              >
                <div style={{ position: 'relative', paddingTop: '100%', overflow: 'hidden' }}>
                  {student.image ? (
                    <img 
                      src={student.image} 
                      alt={student.name} 
                      style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }} 
                    />
                  ) : (
                    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'var(--gray-100)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <FiUsers size={40} color="var(--gray-300)" />
                    </div>
                  )}
                  <div style={{ position: 'absolute', top: 15, right: 15 }}>
                    <div style={{ background: 'var(--accent-500)', color: 'white', padding: '4px 10px', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 800, boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
                      {student.score}
                    </div>
                  </div>
                </div>
                <div className="card-body" style={{ textAlign: 'center', padding: 'var(--space-5)' }}>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--gray-800)', marginBottom: '4px' }}>{student.name}</h3>
                  <div style={{ fontSize: '0.75rem', color: 'var(--primary-600)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px' }}>
                    {student.class} | {student.year}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
