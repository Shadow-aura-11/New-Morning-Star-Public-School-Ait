import { useState } from 'react'
import { useAuth, MOCK_DATA } from '../../context/AuthContext'
import { FiTruck, FiMapPin, FiUser, FiInfo, FiPlus, FiEdit2, FiTrash2, FiSave, FiX } from 'react-icons/fi'

export default function TransportPage() {
  const { user } = useAuth()
  const [routes, setRoutes] = useState(() => {
    const s = localStorage.getItem('nms_transport');
    return s ? JSON.parse(s) : MOCK_DATA.transport
  })
  const [modal, setModal] = useState(null)
  const [editData, setEditData] = useState({ route: '', bus: '', driver: '', stops: '', students: 0 })
  
  const isAdmin = user?.role === 'admin'

  const save = d => { localStorage.setItem('nms_transport', JSON.stringify(d)); setRoutes(d) }

  const handleSave = () => {
    if (!editData.route.trim()) return
    const updated = modal === 'add' ? [...routes, editData] : routes.map(r => r.route === editData.route ? editData : r)
    save(updated)
    setModal(null)
  }

  return (
    <div>
      <div className="dash-page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <div className="dash-page-title"><FiTruck style={{ display: 'inline', marginRight: 8 }} />Transport Management</div>
          <div className="dash-page-subtitle">{routes.length} active routes | Serving {routes.reduce((a, b) => a + b.students, 0)} students</div>
        </div>
        {isAdmin && <button className="btn btn-primary btn-sm" onClick={() => { setEditData({ route: '', bus: '', driver: '', stops: '', students: 0 }); setModal('add') }}><FiPlus /> Add Route</button>}
      </div>

      <div className="dash-stat-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)', marginBottom: 20 }}>
        <div className="dash-stat-card"><div className="dash-stat-icon" style={{ background: 'var(--primary-50)', color: 'var(--primary-500)' }}><FiTruck /></div><div><div className="dash-stat-value">{routes.length}</div><div className="dash-stat-label">Buses</div></div></div>
        <div className="dash-stat-card"><div className="dash-stat-icon" style={{ background: 'var(--accent-50)', color: 'var(--accent-500)' }}><FiMapPin /></div><div><div className="dash-stat-value">24</div><div className="dash-stat-label">Stops</div></div></div>
        <div className="dash-stat-card"><div className="dash-stat-icon" style={{ background: 'var(--gold-50)', color: 'var(--gold-600)' }}><FiUser /></div><div><div className="dash-stat-value">4</div><div className="dash-stat-label">Drivers</div></div></div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 'var(--space-6)' }}>
        {routes.map((r, i) => (
          <div key={i} className="dash-widget">
            <div className="dash-widget-header" style={{ borderBottom: 'none' }}>
              <span className="dash-widget-title" style={{ color: 'var(--primary-600)' }}><FiTruck /> {r.route}</span>
              <div style={{ display: 'flex', gap: 8 }}>
                {isAdmin && <button className="btn btn-sm btn-secondary" style={{ padding: '4px' }} onClick={() => { setEditData(r); setModal('edit') }}><FiEdit2 size={12} /></button>}
                <span className="badge badge-info">{r.bus}</span>
              </div>
            </div>
            <div className="dash-widget-body" style={{ paddingTop: 0 }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'var(--gray-50)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><FiUser size={14} color="var(--gray-500)" /></div>
                  <div style={{ fontSize: 'var(--text-sm)' }}><strong>Driver:</strong> {r.driver}</div>
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                  <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'var(--gray-50)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><FiMapPin size={14} color="var(--gray-500)" /></div>
                  <div style={{ fontSize: 'var(--text-xs)', color: 'var(--gray-600)', lineHeight: 1.5 }}>
                    <strong>Stops:</strong><br />
                    {r.stops}
                  </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 10, paddingTop: 10, borderTop: '1px solid var(--gray-50)' }}>
                  <span style={{ fontSize: 'var(--text-xs)', color: 'var(--gray-400)' }}>Students Assigned</span>
                  <span style={{ fontWeight: 700, color: 'var(--primary-600)' }}>{r.students}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {modal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }} onClick={() => setModal(null)}>
          <div style={{ background: 'white', borderRadius: 20, padding: 32, maxWidth: 480, width: '100%' }} onClick={e => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}><h3 style={{ fontWeight: 700, fontSize: 'var(--text-xl)' }}>{modal === 'add' ? 'Add Transport Route' : 'Edit Route'}</h3><button onClick={() => setModal(null)}><FiX /></button></div>
            <div className="form-group"><label className="form-label">Route Name *</label><input className="form-input" value={editData.route} onChange={e => setEditData({ ...editData, route: e.target.value })} placeholder="e.g. Route 1" /></div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <div className="form-group"><label className="form-label">Bus Number</label><input className="form-input" value={editData.bus} onChange={e => setEditData({ ...editData, bus: e.target.value })} /></div>
              <div className="form-group"><label className="form-label">Driver Name</label><input className="form-input" value={editData.driver} onChange={e => setEditData({ ...editData, driver: e.target.value })} /></div>
            </div>
            <div className="form-group"><label className="form-label">Stops (Separated by arrows)</label><textarea className="form-input" value={editData.stops} onChange={e => setEditData({ ...editData, stops: e.target.value })} placeholder="A -> B -> School" /></div>
            <div style={{ display: 'flex', gap: 12, marginTop: 8 }}><button className="btn btn-primary" style={{ flex: 1 }} onClick={handleSave}><FiSave /> Save Route</button><button className="btn btn-secondary" onClick={() => setModal(null)}>Cancel</button></div>
          </div>
        </div>
      )}
    </div>
  )
}
