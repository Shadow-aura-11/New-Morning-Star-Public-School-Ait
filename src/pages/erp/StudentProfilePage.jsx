import { useAuth } from '../../context/AuthContext'
import { useData } from '../../context/DataContext'
import { FiUser, FiHome, FiShield, FiCreditCard, FiSmartphone, FiCalendar, FiMapPin, FiHeart, FiActivity, FiBriefcase } from 'react-icons/fi'

export default function StudentProfilePage() {
  const { user } = useAuth()
  const { students } = useData()

  // Sync profile from global students list
  const profile = students.find(s => s.id === user?.id) || user || {}

  const sections = [
    {
      title: 'Personal Info',
      icon: <FiUser />,
      color: 'var(--primary-600)',
      fields: [
        { label: 'Full Name', value: profile.name },
        { label: 'Admission ID', value: profile.id },
        { label: 'Class & Section', value: `${profile.class}-${profile.section || 'A'}` },
        { label: 'Roll Number', value: profile.rollNo },
        { label: 'Date of Birth', value: profile.dob },
        { label: 'Gender', value: profile.gender === 'M' ? 'Male' : profile.gender === 'F' ? 'Female' : 'Other' },
        { label: 'Blood Group', value: profile.bloodGroup },
      ]
    },
    {
      title: 'Family & Contact',
      icon: <FiHome />,
      color: 'var(--accent-600)',
      fields: [
        { label: "Father's Name", value: profile.fatherName },
        { label: "Mother's Name", value: profile.motherName },
        { label: 'Primary Phone', value: profile.phone || profile.parentPhone },
        { label: 'Emergency Contact', value: profile.emergencyPhone },
        { label: 'Residential Address', value: profile.address, full: true },
      ]
    },
    {
      title: 'Official Documents',
      icon: <FiShield />,
      color: 'var(--success)',
      fields: [
        { label: 'Aadhaar Number', value: profile.aadhaar },
        { label: 'Samagra ID', value: profile.samagra },
        { label: 'Admission Date', value: profile.admissionDate },
        { label: 'Transport Route', value: profile.transport || 'Self' },
      ]
    },
    {
      title: 'Bank & Scholarship Details',
      icon: <FiCreditCard />,
      color: 'var(--gold-600)',
      fields: [
        { label: 'Account Holder', value: profile.bankName || profile.name },
        { label: 'Bank Account No.', value: profile.accNo },
        { label: 'Bank IFSC Code', value: profile.ifsc },
      ]
    }
  ]

  return (
    <div className="student-profile-page">
      <div className="dash-page-header">
        <div>
          <div className="dash-page-title"><FiUser style={{display:'inline', marginRight:8}} /> My Personal Dossier</div>
          <div className="dash-page-subtitle">Your official school records synchronized with the main registry</div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 'var(--space-6)' }}>
        {/* Header Card */}
        <div className="dash-widget" style={{ 
          background: 'linear-gradient(135deg, var(--primary-600), var(--primary-800))', 
          color: 'white',
          padding: 'var(--space-8)',
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--space-8)'
        }}>
          <div style={{ 
            width: 120, height: 120, borderRadius: 30, background: 'rgba(255,255,255,0.2)', 
            backdropFilter: 'blur(10px)', border: '2px solid rgba(255,255,255,0.3)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 48, fontWeight: 900
          }}>
            {profile.photo ? <img src={profile.photo} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 30 }} /> : profile.name[0]}
          </div>
          <div>
            <h2 style={{ fontSize: 32, fontWeight: 900, marginBottom: 8 }}>{profile.name}</h2>
            <div style={{ display: 'flex', gap: 12 }}>
              <span style={{ padding: '6px 16px', background: 'rgba(255,255,255,0.15)', borderRadius: 100, fontSize: 13, fontWeight: 700 }}>Class {profile.class}-{profile.section || 'A'}</span>
              <span style={{ padding: '6px 16px', background: 'rgba(255,255,255,0.15)', borderRadius: 100, fontSize: 13, fontWeight: 700 }}>Roll: {profile.rollNo || 'N/A'}</span>
              <span style={{ padding: '6px 16px', background: 'rgba(255,255,255,0.15)', borderRadius: 100, fontSize: 13, fontWeight: 700 }}>UID: {profile.id}</span>
            </div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: 'var(--space-6)' }}>
          {sections.map((sec, idx) => (
            <div key={idx} className="dash-widget">
              <div className="dash-widget-header">
                <span className="dash-widget-title" style={{ color: sec.color }}>{sec.icon} {sec.title}</span>
              </div>
              <div className="dash-widget-body" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
                {sec.fields.map((f, i) => (
                  <div key={i} style={{ gridColumn: f.full ? 'span 2' : 'span 1' }}>
                    <div style={{ fontSize: 11, fontWeight: 800, color: 'var(--gray-400)', textTransform: 'uppercase', marginBottom: 4 }}>{f.label}</div>
                    <div style={{ fontSize: 15, fontWeight: 600, color: 'var(--gray-700)' }}>{f.value || '---'}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ marginTop: 'var(--space-6)', padding: 'var(--space-6)', background: 'var(--accent-50)', borderRadius: 'var(--radius-xl)', border: '1px solid var(--accent-100)', display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
        <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent-600)' }}>
          <FiSmartphone />
        </div>
        <div>
          <div style={{ fontWeight: 800, color: 'var(--accent-900)' }}>Need to update your details?</div>
          <div style={{ fontSize: 13, color: 'var(--accent-700)' }}>Please contact the school administrative office or your class teacher to update any official information.</div>
        </div>
      </div>
    </div>
  )
}
