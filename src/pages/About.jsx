import { useEffect } from 'react'
import { useLocation, Link } from 'react-router-dom'
import { useCms } from '../context/CmsContext'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import {
  FiTarget, FiEye, FiHeart, FiBookOpen, FiAward,
  FiCheckCircle, FiUsers, FiMonitor, FiTruck
} from 'react-icons/fi'
import {
  FaGraduationCap, FaFlask, FaLaptopCode, FaFutbol,
  FaSwimmingPool, FaTheaterMasks, FaMusic, FaBus
} from 'react-icons/fa'
import './About.css'

const infrastructure = [
  { icon: <FaLaptopCode />, title: 'Smart Classrooms', desc: '40+ ICT-enabled classrooms with interactive boards and projectors' },
  { icon: <FaFlask />, title: 'Science Laboratories', desc: 'Fully equipped Physics, Chemistry, Biology and Computer labs' },
  { icon: <FaFutbol />, title: 'Sports Complex', desc: 'Multi-sport ground with cricket, football, basketball and athletics facilities' },
  { icon: <FaSwimmingPool />, title: 'Swimming Pool', desc: 'Semi-Olympic size pool with trained coaches and safety measures' },
  { icon: <FaTheaterMasks />, title: 'Auditorium', desc: '500-seat air-conditioned auditorium for events and performances' },
  { icon: <FaMusic />, title: 'Music & Dance Room', desc: 'Dedicated spaces for vocal, instrumental music and dance practice' },
  { icon: <FiMonitor />, title: 'Computer Lab', desc: '2 labs with 80+ computers, high-speed internet and coding platforms' },
  { icon: <FaBus />, title: 'Transport Fleet', desc: '20+ GPS-tracked buses covering all major routes of the city' },
]

export default function About() {
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
        <title>About Us - New Morning Star Public School</title>
        <meta name="description" content="Learn about New Morning Star Public School's vision, mission, history, and world-class infrastructure. A CBSE-affiliated institution committed to excellence." />
      </Helmet>

      {/* Page Banner */}
      <section className="page-banner about-banner">
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <span className="section-badge" style={{ background: 'rgba(255,255,255,0.15)', color: 'white', border: 'none' }}>About Us</span>
            <h1 className="page-banner-title">{content.about.title}</h1>
            <p className="page-banner-desc">{content.about.description}</p>
          </motion.div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="section" id="vision">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">Our Foundation</span>
            <h2 className="section-title">Vision & Mission</h2>
          </div>
          <div className="vm-grid">
            <motion.div className="vm-card vm-vision" initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <div className="vm-icon"><FiEye /></div>
              <h3>Our Vision</h3>
              <p>{content.about.vision}</p>
            </motion.div>
            <motion.div className="vm-card vm-mission" initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <div className="vm-icon"><FiTarget /></div>
              <h3>Our Mission</h3>
              <p style={{ marginBottom: 15 }}>{content.about.mission}</p>
              <ul className="vm-list">
                <li><FiCheckCircle /> Provide quality education aligned with CBSE standards</li>
                <li><FiCheckCircle /> Foster critical thinking, creativity, and innovation</li>
                <li><FiCheckCircle /> Develop strong moral values and ethical character</li>
                <li><FiCheckCircle /> Promote physical fitness and mental well-being</li>
                <li><FiCheckCircle /> Embrace technology for enhanced learning experiences</li>
                <li><FiCheckCircle /> Create an inclusive and supportive learning environment</li>
              </ul>
            </motion.div>
          </div>
          <div className="values-bar">
            {['Integrity', 'Excellence', 'Innovation', 'Compassion', 'Respect', 'Responsibility'].map((v, i) => (
              <div key={i} className="value-chip"><FiHeart size={12} /> {v}</div>
            ))}
          </div>
        </div>
      </section>

      {/* Principal's Message */}
      <section className="section bg-light" id="principal">
        <div className="container">
          <div className="principal-grid">
            <motion.div className="principal-image" initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}>
              <div className="principal-photo">
                <div className="principal-placeholder">
                  <FaGraduationCap size={50} />
                  <span>Principal</span>
                </div>
              </div>
              <div className="principal-info-card">
                <strong>Dr. Sunita Sharma</strong>
                <span>M.Ed., Ph.D. (Education)</span>
                <span>25+ Years Experience</span>
              </div>
            </motion.div>
            <motion.div className="principal-message" initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <span className="section-badge">From the Principal's Desk</span>
              <h2 className="section-title">Principal's Message</h2>
              <blockquote className="principal-quote">
                "Education is not just about filling minds with knowledge, but about igniting the flame of curiosity and the passion for lifelong learning."
              </blockquote>
              <p>Dear Parents and Students,</p>
              <p>
                Welcome to New Morning Star Public School! As we embark on another year of learning and growth, 
                I am filled with immense pride and gratitude for the community we have built together.
              </p>
              <p>
                Our school stands as a testament to the belief that every child is unique and deserves an education 
                that recognizes and nurtures their individual talents. We are committed to providing a holistic learning 
                environment where academic rigor is complemented by character development, sports excellence, and creative expression.
              </p>
              <p>
                With a team of dedicated educators, state-of-the-art infrastructure, and a curriculum designed to prepare 
                students for the challenges of the 21st century, we ensure that every child who walks through our doors 
                leaves as a confident, compassionate, and capable individual.
              </p>
              <p>
                I invite you to explore our website and discover what makes New Morning Star a truly special place for learning.
              </p>
              <p className="principal-sign"><strong>Dr. Sunita Sharma</strong><br />Principal</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* School History */}
      <section className="section" id="history">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">Our Journey</span>
            <h2 className="section-title">School History</h2>
            <p className="section-subtitle">From humble beginnings to a beacon of educational excellence</p>
          </div>
          <div className="timeline">
            {[
              { year: '2001', title: 'Foundation', desc: 'New Morning Star Public School was established with a vision to provide quality education accessible to all. Started with 50 students and 5 teachers.' },
              { year: '2005', title: 'CBSE Affiliation', desc: 'Received formal affiliation from the Central Board of Secondary Education (CBSE), marking a significant milestone in our journey.' },
              { year: '2010', title: 'Campus Expansion', desc: 'Inaugurated the new campus with science labs, computer labs, sports complex, and a 500-seat auditorium.' },
              { year: '2015', title: 'Digital Transformation', desc: 'Introduced smart classrooms, ERP system, and digital learning platforms across all classes.' },
              { year: '2020', title: 'Excellence Awards', desc: 'Recognized as one of the top schools in the region. 100% board results with multiple national-level achievements.' },
              { year: '2026', title: 'Today & Beyond', desc: 'Serving 2500+ students with 120+ faculty members, continuing our mission of excellence in education.' },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                className={`timeline-item ${idx % 2 === 0 ? 'left' : 'right'}`}
                initial={{ opacity: 0, x: idx % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <div className="timeline-marker">{item.year}</div>
                <div className="timeline-card card">
                  <div className="card-body">
                    <h3>{item.title}</h3>
                    <p>{item.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Infrastructure */}
      <section className="section bg-light" id="infrastructure">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">Our Campus</span>
            <h2 className="section-title">World-Class Infrastructure</h2>
            <p className="section-subtitle">State-of-the-art facilities designed to inspire learning and growth</p>
          </div>
          <div className="infra-grid">
            {infrastructure.map((item, idx) => (
              <motion.div
                key={idx}
                className="infra-card card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08 }}
              >
                <div className="card-body">
                  <div className={`infra-icon color-${idx % 4}`}>{item.icon}</div>
                  <h3 className="infra-title">{item.title}</h3>
                  <p className="infra-desc">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
