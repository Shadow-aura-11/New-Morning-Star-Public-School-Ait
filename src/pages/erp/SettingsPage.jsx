import { useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import { FiSettings, FiUser, FiLock, FiBell, FiShield, FiSave, FiCheckCircle } from 'react-icons/fi'

export default function SettingsPage() {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState('profile')
  const [saved, setSaved] = useState(false)
  
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    currentPass: '',
    newPass: '',
    confirmPass: ''
  })

  const handleSave = (e) => {
    e.preventDefault()
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  return (
    <div>
      <div className="dash-page-header">
        <div className="dash-page-title"><FiSettings style={{ display: 'inline', marginRight: 8 }} />Account Settings</div>
        <div className="dash-page-subtitle">Manage your profile and portal preferences</div>
      </div>

      <div style={{ display: 'flex', gap: 'var(--space-6)', alignItems: 'flex-start', flexWrap: 'wrap' }}>
        {/* Tabs Sidebar */}
        <div className="dash-widget" style={{ width: 240, padding: 8 }}>
          {[
            { id: 'profile', label: 'General Profile', icon: <FiUser /> },
            { id: 'security', label: 'Security & Password', icon: <FiLock /> },
            { id: 'notifications', label: 'Notifications', icon: <FiBell /> },
            { id: 'privacy', label: 'Privacy Settings', icon: <FiShield /> },
          ].map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 10, padding: '12px 16px', borderRadius: 'var(--radius-lg)', background: activeTab === tab.id ? 'var(--primary-50)' : 'transparent', color: activeTab === tab.id ? 'var(--primary-600)' : 'var(--gray-500)', border: 'none', cursor: 'pointer', fontSize: 'var(--text-sm)', fontWeight: activeTab === tab.id ? 600 : 500, transition: 'all 0.15s', textAlign: 'left' }}>
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="dash-widget" style={{ flex: 1, minWidth: 320 }}>
          <form onSubmit={handleSave} style={{ padding: 'var(--space-4)' }}>
            {activeTab === 'profile' && (
              <>
                <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 30 }}>
                  <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'var(--primary-100)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, fontWeight: 800, color: 'var(--primary-600)' }}>
                    {user?.name?.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <button type="button" className="btn btn-secondary btn-sm">Change Photo</button>
                    <div style={{ fontSize: 10, color: 'var(--gray-400)', marginTop: 8 }}>Recommended size: 400x400px</div>
                  </div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
                  <div className="form-group"><label className="form-label">Full Name</label><input className="form-input" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} /></div>
                  <div className="form-group"><label className="form-label">Email Address</label><input className="form-input" type="email" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} /></div>
                  <div className="form-group"><label className="form-label">Phone Number</label><input className="form-input" value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} /></div>
                  <div className="form-group"><label className="form-label">User ID</label><input className="form-input" value={user?.id} readOnly style={{ background: 'var(--gray-50)' }} /></div>
                </div>
              </>
            )}

            {activeTab === 'security' && (
              <div style={{ maxWidth: 400 }}>
                <div className="form-group"><label className="form-label">Current Password</label><input className="form-input" type="password" placeholder="••••••••" autoComplete="new-password" /></div>
                <div className="form-group"><label className="form-label">New Password</label><input className="form-input" type="password" placeholder="••••••••" autoComplete="new-password" /></div>
                <div className="form-group"><label className="form-label">Confirm New Password</label><input className="form-input" type="password" placeholder="••••••••" autoComplete="new-password" /></div>
              </div>
            )}

            {activeTab === 'notifications' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                {[
                  { label: 'Email Notifications', desc: 'Receive updates on your registered email address' },
                  { label: 'SMS Alerts', desc: 'Get attendance and fee alerts via SMS' },
                  { label: 'Mobile App Push', desc: 'Instant notifications on your school app' },
                  { label: 'Circulars & Notices', desc: 'Get notified when a new notice is posted' },
                ].map((n, i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <div style={{ fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--gray-700)' }}>{n.label}</div>
                      <div style={{ fontSize: 'var(--text-xs)', color: 'var(--gray-400)' }}>{n.desc}</div>
                    </div>
                    <label style={{ width: 44, height: 24, background: 'var(--primary-500)', borderRadius: 12, display: 'block', position: 'relative', cursor: 'pointer' }}>
                      <div style={{ position: 'absolute', right: 2, top: 2, width: 20, height: 20, background: 'white', borderRadius: '50%' }} />
                    </label>
                  </div>
                ))}
              </div>
            )}

            <div style={{ marginTop: 40, paddingTop: 20, borderTop: '1px solid var(--gray-100)', display: 'flex', alignItems: 'center', gap: 15 }}>
              <button type="submit" className="btn btn-primary"><FiSave /> Save Changes</button>
              {saved && <span style={{ fontSize: 'var(--text-sm)', color: 'var(--accent-600)', fontWeight: 600 }}><FiCheckCircle style={{ display: 'inline', marginRight: 4 }} />Profile updated successfully!</span>}
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
