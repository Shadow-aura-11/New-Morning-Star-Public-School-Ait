import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { FiCheckCircle, FiBookOpen, FiCalendar, FiFileText, FiAward } from 'react-icons/fi'
import './About.css'
import { useCms } from '../context/CmsContext'

const subjects = {
  'Primary (I-V)': ['English', 'Hindi', 'Mathematics', 'EVS', 'Computer Science', 'General Knowledge', 'Art & Craft', 'Physical Education'],
  'Middle (VI-VIII)': ['English', 'Hindi', 'Sanskrit', 'Mathematics', 'Science', 'Social Science', 'Computer Science', 'Physical Education'],
  'Secondary (IX-X)': ['English', 'Hindi/Sanskrit', 'Mathematics', 'Science', 'Social Science', 'Information Technology', 'Physical Education'],
}



export default function Academics() {
  const { content } = useCms()
  const { hash } = useLocation()
  useEffect(() => {
    if (hash) {
      setTimeout(() => {
        const el = document.querySelector(hash)
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }, 100)
    }
  }, [hash])

  return (
    <>
      <Helmet>
        <title>Academics - New Morning Star Public School | CBSE Curriculum</title>
        <meta name="description" content="Explore our CBSE curriculum, subjects offered, academic calendar, and examination system at New Morning Star Public School." />
      </Helmet>

      <section className="page-banner">
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <span className="section-badge" style={{ background: 'rgba(255,255,255,0.15)', color: 'white', border: 'none' }}>Academics</span>
            <h1 className="page-banner-title">Academic Excellence</h1>
            <p className="page-banner-desc">CBSE-aligned curriculum designed for holistic development</p>
          </motion.div>
        </div>
      </section>

      {/* CBSE Curriculum */}
      <section className="section" id="curriculum">
        <div className="container">
          <div className="section-header">
            <span className="section-badge"><FiBookOpen size={14} /> Curriculum</span>
            <h2 className="section-title">CBSE Curriculum Framework</h2>
            <p className="section-subtitle">Our academic program follows the CBSE curriculum with a focus on competency-based learning and skill development.</p>
          </div>
          <div className="vm-grid">
            <div className="vm-card vm-vision">
              <h3>Our Approach</h3>
              <p>We follow the CBSE (Central Board of Secondary Education) curriculum from Pre-Primary to Class X. Our teaching methodology integrates:</p>
              <ul className="vm-list" style={{ marginTop: '1rem' }}>
                <li><FiCheckCircle /> Activity-based learning for primary classes</li>
                <li><FiCheckCircle /> Competency-based assessment framework</li>
                <li><FiCheckCircle /> NCERT and supplementary study materials</li>
                <li><FiCheckCircle /> Experiential learning through labs and projects</li>
                <li><FiCheckCircle /> NEP 2020 aligned pedagogical practices</li>
                <li><FiCheckCircle /> Regular workshops and training for teachers</li>
              </ul>
            </div>
            <div className="vm-card vm-mission">
              <h3>Academic Structure</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {[
                  { level: 'Pre-Primary', classes: 'Nursery, LKG, UKG', focus: 'Play-based learning' },
                  { level: 'Primary', classes: 'Classes I - V', focus: 'Foundation building' },
                  { level: 'Middle School', classes: 'Classes VI - VIII', focus: 'Conceptual learning' },
                  { level: 'Secondary', classes: 'Classes IX - X', focus: 'Board preparation' },
                ].map((item, i) => (
                  <div key={i} style={{ padding: '0.75rem', background: 'rgba(255,255,255,0.5)', borderRadius: '0.75rem' }}>
                    <strong style={{ color: 'var(--gray-800)' }}>{item.level}</strong>
                    <div style={{ fontSize: '0.875rem', color: 'var(--gray-600)' }}>{item.classes} - {item.focus}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Subjects Offered */}
      <section className="section bg-light" id="subjects">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">Subjects</span>
            <h2 className="section-title">Subjects Offered</h2>
          </div>
          <div className="infra-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
            {Object.entries(subjects).map(([level, subs], idx) => (
              <motion.div key={idx} className="card" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }}>
                <div className="card-body">
                  <h3 style={{ fontSize: 'var(--text-lg)', fontWeight: 700, color: 'var(--gray-800)', marginBottom: 'var(--space-4)' }}>{level}</h3>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                    {subs.map((s, i) => (
                      <span key={i} className="badge badge-info">{s}</span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Academic Calendar */}
      <section className="section" id="calendar">
        <div className="container">
          <div className="section-header">
            <span className="section-badge"><FiCalendar size={14} /> Calendar</span>
            <h2 className="section-title">Academic Calendar {content.session || '2026-27'}</h2>
          </div>
          <div className="infra-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
            {(content.calendar || []).map((item, idx) => (
              <motion.div key={idx} className="card" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.05 }}>
                <div className="card-body">
                  <h4 style={{ fontSize: 'var(--text-base)', fontWeight: 700, color: 'var(--primary-600)', marginBottom: 'var(--space-3)' }}>{item.month}</h4>
                  {(typeof item.events === 'string' ? item.events.split(',') : []).map((e, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem', fontSize: '0.875rem', color: 'var(--gray-600)' }}>
                      <FiCheckCircle size={12} style={{ color: 'var(--accent-500)', flexShrink: 0 }} /> {e.trim()}
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Examination System */}
      <section className="section bg-light" id="exams">
        <div className="container">
          <div className="section-header">
            <span className="section-badge"><FiFileText size={14} /> Examinations</span>
            <h2 className="section-title">Examination System</h2>
            <p className="section-subtitle">Comprehensive assessment aligned with CBSE guidelines</p>
          </div>
          <div className="vm-grid">
            <div className="vm-card vm-vision">
              <h3>Assessment Pattern</h3>
              <ul className="vm-list">
                <li><FiCheckCircle /> <strong>Periodic Tests:</strong> 3 periodic tests per academic year</li>
                <li><FiCheckCircle /> <strong>Half Yearly Exam:</strong> Comprehensive exam covering first-half syllabus</li>
                <li><FiCheckCircle /> <strong>Annual Exam:</strong> Full syllabus exam at the end of session</li>
                <li><FiCheckCircle /> <strong>Internal Assessment:</strong> Projects, assignments, and class participation</li>
                <li><FiCheckCircle /> <strong>Practical Exams:</strong> Lab-based assessment for Science and Computer subjects</li>
              </ul>
            </div>
            <div className="vm-card vm-mission">
              <h3>Grading System</h3>
              <div className="table-wrapper" style={{ marginTop: '1rem' }}>
                <table className="table">
                  <thead>
                    <tr>
                      <th>Marks Range</th>
                      <th>Grade</th>
                      <th>Grade Point</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ['91-100', 'A1', '10'],
                      ['81-90', 'A2', '9'],
                      ['71-80', 'B1', '8'],
                      ['61-70', 'B2', '7'],
                      ['51-60', 'C1', '6'],
                      ['41-50', 'C2', '5'],
                      ['33-40', 'D', '4'],
                      ['Below 33', 'E (Failed)', '-'],
                    ].map(([marks, grade, gp], i) => (
                      <tr key={i}>
                        <td>{marks}</td>
                        <td><span className="badge badge-info">{grade}</span></td>
                        <td>{gp}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
