import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { FiImage, FiVideo, FiGrid, FiX } from 'react-icons/fi'
import './About.css'

const categories = ['All', 'Campus', 'Events', 'Sports', 'Academics', 'Celebrations']

const galleryItems = [
  { title: 'Annual Day Celebration', cat: 'Events', color: 'linear-gradient(135deg, #667eea, #764ba2)' },
  { title: 'Science Exhibition', cat: 'Academics', color: 'linear-gradient(135deg, #f093fb, #f5576c)' },
  { title: 'Sports Day', cat: 'Sports', color: 'linear-gradient(135deg, #4facfe, #00f2fe)' },
  { title: 'School Building', cat: 'Campus', color: 'linear-gradient(135deg, #43e97b, #38f9d7)' },
  { title: 'Republic Day', cat: 'Celebrations', color: 'linear-gradient(135deg, #fa709a, #fee140)' },
  { title: 'Computer Lab', cat: 'Campus', color: 'linear-gradient(135deg, #a18cd1, #fbc2eb)' },
  { title: 'Independence Day', cat: 'Celebrations', color: 'linear-gradient(135deg, #ffecd2, #fcb69f)' },
  { title: 'Inter-School Cricket', cat: 'Sports', color: 'linear-gradient(135deg, #89f7fe, #66a6ff)' },
  { title: 'Art Competition', cat: 'Academics', color: 'linear-gradient(135deg, #c471f5, #fa71cd)' },
  { title: 'Library', cat: 'Campus', color: 'linear-gradient(135deg, #96fbc4, #f9f586)' },
  { title: 'Diwali Celebration', cat: 'Celebrations', color: 'linear-gradient(135deg, #f6d365, #fda085)' },
  { title: 'Swimming Pool', cat: 'Campus', color: 'linear-gradient(135deg, #84fab0, #8fd3f4)' },
]

export default function Gallery() {
  const [activeFilter, setActiveFilter] = useState('All')
  const [lightbox, setLightbox] = useState(null)

  const filtered = activeFilter === 'All' ? galleryItems : galleryItems.filter(i => i.cat === activeFilter)

  return (
    <>
      <Helmet>
        <title>Gallery - New Morning Star Public School</title>
        <meta name="description" content="Explore photos and videos from New Morning Star Public School events, campus, sports, and celebrations." />
      </Helmet>

      <section className="page-banner" style={{ background: 'linear-gradient(135deg, #667eea, #764ba2)' }}>
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <span className="section-badge" style={{ background: 'rgba(255,255,255,0.15)', color: 'white', border: 'none' }}>Media</span>
            <h1 className="page-banner-title">Photo Gallery</h1>
            <p className="page-banner-desc">Capturing memories and milestones of our school journey</p>
          </motion.div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          {/* Filter Buttons */}
          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: 'var(--space-8)', flexWrap: 'wrap', justifyContent: 'center' }}>
            {categories.map(cat => (
              <button key={cat} onClick={() => setActiveFilter(cat)}
                className={`btn ${activeFilter === cat ? 'btn-primary' : 'btn-secondary'} btn-sm`}>
                {cat}
              </button>
            ))}
          </div>

          {/* Gallery Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 'var(--space-5)' }}>
            {filtered.map((item, idx) => (
              <motion.div key={idx} className="card" initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }} onClick={() => setLightbox(item)}
                style={{ cursor: 'pointer' }}>
                <div style={{ height: 200, background: item.color, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
                  <FiImage size={40} style={{ opacity: 0.5 }} />
                </div>
                <div className="card-body" style={{ padding: 'var(--space-4)' }}>
                  <h3 style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}>{item.title}</h3>
                  <span className="badge badge-info" style={{ marginTop: 4 }}>{item.cat}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightbox && (
        <div style={{
          position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.9)', zIndex: 9999,
          display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 'var(--space-8)',
        }} onClick={() => setLightbox(null)}>
          <button style={{ position: 'absolute', top: 20, right: 20, color: 'white', background: 'rgba(255,255,255,0.1)', width: 40, height: 40, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <FiX size={24} />
          </button>
          <div style={{ maxWidth: 700, width: '100%', background: lightbox.color, height: 400, borderRadius: 'var(--radius-xl)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', flexDirection: 'column', gap: '1rem' }}>
            <FiImage size={60} style={{ opacity: 0.5 }} />
            <h3>{lightbox.title}</h3>
          </div>
        </div>
      )}
    </>
  )
}
