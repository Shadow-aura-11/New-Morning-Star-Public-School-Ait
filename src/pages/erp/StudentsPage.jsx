import { useState } from 'react'
import { useAuth, MOCK_DATA } from '../../context/AuthContext'
import { useData } from '../../context/DataContext'
import { FiUsers, FiPlus, FiSearch, FiEdit2, FiTrash2, FiX, FiCheck, FiFilter, FiUser, FiHome, FiSmartphone, FiCalendar, FiCreditCard, FiDollarSign, FiClock, FiPrinter, FiShield, FiBriefcase, FiHeart, FiMapPin, FiActivity, FiArrowRight } from 'react-icons/fi'

export default function StudentsPage() {
  const { user } = useAuth()
  const isAdmin = user?.role === 'admin'
  const isTeacher = user?.role === 'teacher'
  
  const { students, updateStudents } = useData()

  const [searchTerm, setSearchTerm] = useState('')
  const [filterClass, setFilterClass] = useState('')
  const [modalOpen, setModalOpen] = useState(false)
  const [detailModal, setDetailModal] = useState(false)
  const [selectedStudent, setSelectedStudent] = useState(null)
  const [printStudent, setPrintStudent] = useState(null)
  const idConfig = JSON.parse(localStorage.getItem('nms_id_config') || '{"schoolName":"NEW MORNING STAR PUBLIC SCHOOL","themeColor":"#4f46e5","textColor":"#ffffff","showQr":true,"showSign":true,"cardType":"vertical","borderRadius":12,"headerHeight":60}')
  
  const initialFormData = {
    // Basic
    name: '', class: 'PG', section: 'A', rollNo: '', admissionNo: '', admissionDate: '',
    // Personal
    dob: '', gender: 'Male', bloodGroup: '', religion: '', nationality: 'Indian', category: 'General', 
    photo: null,
    // IDs
    aadhaar: '', samagra: '', sssmId: '', bankAccount: '', ifsc: '',
    // Parental
    fatherName: '', fatherOcc: '', fatherPhone: '', fatherEdu: '',
    motherName: '', motherOcc: '', motherPhone: '', motherEdu: '',
    // Contact
    phone: '', email: '', address: '', permAddress: '',
    // Health & Transport
    allergies: '', medicalConditions: '', transportRoute: 'None', transportStop: ''
  }

  const [formData, setFormData] = useState(initialFormData)

  const filteredStudents = students.filter(s => 
    (s.name.toLowerCase().includes(searchTerm.toLowerCase()) || (s.id || '').toLowerCase().includes(searchTerm.toLowerCase())) &&
    (filterClass ? s.class === filterClass : true)
  )

  const handleSave = (e) => {
    e.preventDefault()
    if (selectedStudent) {
      const updated = students.map(s => s.id === selectedStudent.id ? { ...s, ...formData } : s)
      updateStudents(updated)
    } else {
      const newId = `STU${String(students.length + 1).padStart(3, '0')}`
      const newStudent = { ...formData, id: newId, attendance: 100 }
      
      // Auto-generate Login Credentials
      const username = (formData.name.split(' ')[0] + newId).toLowerCase()
      const password = Math.random().toString(36).slice(-8)
      
      const dynamicUsers = JSON.parse(localStorage.getItem('nms_dynamic_users') || '[]')
      dynamicUsers.push({
        id: newId,
        username,
        password,
        role: 'student',
        name: formData.name,
        class: formData.class,
        avatar: formData.name[0]
      })
      localStorage.setItem('nms_dynamic_users', JSON.stringify(dynamicUsers))

      updateStudents([...students, newStudent])

      // Simulate SMS Notification
      alert(`🎉 Registration Successful!\n\nCredentials sent to ${formData.phone}:\nUsername: ${username}\nPassword: ${password}\nWebsite: https://newmorningstar.edu.in/erp`)
    }
    setModalOpen(false)
  }

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => setFormData({ ...formData, photo: reader.result })
      reader.readAsDataURL(file)
    }
  }

  const openEdit = (s) => {
    setSelectedStudent(s)
    setFormData({ ...initialFormData, ...s })
    setModalOpen(true)
  }

  const openAdd = () => {
    setSelectedStudent(null)
    setFormData(initialFormData)
    setModalOpen(true)
  }

  const getFees = (sid) => (MOCK_DATA.studentFees || {})[sid] || { total: 0, paid: 0, discount: 0, remaining: 0, history: [] }

  return (
    <div className="students-page">
      <div className="dash-page-header">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div className="dash-page-title"><FiUsers style={{ display: 'inline', marginRight: 8 }} />Student Directory</div>
            <div className="dash-page-subtitle">Comprehensive management of student academic and personal records</div>
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            {isAdmin && <button className="btn btn-secondary" onClick={() => window.location.href='/erp/id-card-design'}><FiShield /> Design ID Cards</button>}
            <button className="btn btn-primary" onClick={openAdd}><FiPlus /> Add New Student</button>
          </div>
        </div>
      </div>

      <div className="dash-widget" style={{ padding: '20px', marginBottom: 'var(--space-6)', display: 'flex', gap: 'var(--space-4)', flexWrap: 'wrap' }}>
        <div className="dash-search" style={{ flex: 1, minWidth: 250, marginBottom: 0 }}>
          <FiSearch />
          <input placeholder="Search name or ID..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
        </div>
        <select className="form-select" style={{ width: 150 }} value={filterClass} onChange={e => setFilterClass(e.target.value)}>
          <option value="">All Classes</option>
          {['PG', 'Nursery', 'LKG', 'UKG', '1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th', '9th', '10th'].map(c => <option key={c} value={c}>Class {c}</option>)}
        </select>
      </div>

      <div className="dash-widget">
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Student Details</th>
              <th>Class/Sec</th>
              <th>Parents</th>
              <th>Phone</th>
              <th style={{ textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map(s => (
              <tr key={s.id}>
                <td style={{ fontWeight: 700, color: 'var(--primary-600)', fontSize: 12 }}>{s.id}</td>
                <td>
                  <button onClick={() => { setSelectedStudent(s); setDetailModal(true); }} style={{ border: 'none', background: 'none', textAlign: 'left', padding: 0, cursor: 'pointer' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'var(--gray-100)', overflow: 'hidden' }}>
                        {s.photo ? <img src={s.photo} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : <FiUser style={{ margin: 8 }} />}
                      </div>
                      <div>
                        <div style={{ fontWeight: 700, color: 'var(--gray-800)', textDecoration: 'underline' }}>{s.name}</div>
                        <div style={{ fontSize: 10, color: 'var(--gray-400)' }}>Adm: {s.admissionNo || s.id}</div>
                      </div>
                    </div>
                  </button>
                </td>
                <td><span className="badge badge-info">{s.class}-{s.section}</span></td>
                <td>
                  <div style={{ fontSize: 13, fontWeight: 600 }}>{s.fatherName || s.parentName}</div>
                  <div style={{ fontSize: 10, color: 'var(--gray-400)' }}>{s.motherName || 'Mother'}</div>
                </td>
                <td>{s.phone}</td>
                <td style={{ textAlign: 'right' }}>
                  <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
                    <button className="btn btn-secondary btn-sm" title="Edit" onClick={() => openEdit(s)}><FiEdit2 size={12} /></button>
                    <button className="btn btn-secondary btn-sm" title="Print ID Card" onClick={() => setPrintStudent(s)}><FiPrinter size={12} /></button>
                    {isAdmin && <button className="btn btn-secondary btn-sm" style={{ color: 'var(--error)' }} title="Delete" onClick={() => deleteStudent(s.id)}><FiTrash2 size={12} /></button>}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* COMPREHENSIVE DETAIL MODAL */}
      {detailModal && selectedStudent && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
          <div style={{ background: 'white', padding: 35, borderRadius: 20, width: '100%', maxWidth: 1100, maxHeight: '95vh', overflowY: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 35 }}>
              <div style={{ display: 'flex', gap: 25, alignItems: 'center' }}>
                <div style={{ width: 100, height: 100, borderRadius: 20, background: 'var(--primary-100)', overflow: 'hidden', border: '4px solid white', boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }}>
                  {selectedStudent.photo ? <img src={selectedStudent.photo} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : <div style={{ fontSize: 40, fontWeight: 900, color: 'var(--primary-600)', textAlign: 'center', marginTop: 25 }}>{selectedStudent.name[0]}</div>}
                </div>
                <div>
                  <h2 style={{ fontSize: 28, fontWeight: 900, color: 'var(--gray-900)' }}>{selectedStudent.name}</h2>
                  <div style={{ display: 'flex', gap: 15, marginTop: 10 }}>
                    <span className="badge badge-info" style={{ padding: '6px 12px' }}>ID: {selectedStudent.id}</span>
                    <span className="badge badge-success" style={{ padding: '6px 12px' }}>CLASS {selectedStudent.class} ({selectedStudent.section})</span>
                    <span className="badge" style={{ background: 'var(--accent-100)', color: 'var(--accent-700)', padding: '6px 12px' }}>ROLL NO: {selectedStudent.rollNo}</span>
                  </div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: 12 }}>
                <button className="btn btn-secondary" onClick={() => setPrintStudent(selectedStudent)}><FiPrinter /> Print ID Card</button>
                <button className="btn btn-secondary" onClick={() => window.print()}><FiPrinter /> Print Profile</button>
                <button className="btn btn-secondary" style={{ background: 'var(--gray-100)' }} onClick={() => setDetailModal(false)}><FiX size={20} /></button>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 30 }}>
              {/* Section 1: Personal & Government */}
              <div className="detail-section">
                <h4 className="section-title"><FiUser /> Personal & Identity</h4>
                <div className="detail-grid">
                  <div className="detail-item"><label>Gender</label><span>{selectedStudent.gender}</span></div>
                  <div className="detail-item"><label>Date of Birth</label><span>{selectedStudent.dob}</span></div>
                  <div className="detail-item"><label>Blood Group</label><span>{selectedStudent.bloodGroup || '---'}</span></div>
                  <div className="detail-item"><label>Category</label><span>{selectedStudent.category}</span></div>
                  <div className="detail-item"><label>Aadhaar No</label><span>{selectedStudent.aadhaar || '---'}</span></div>
                  <div className="detail-item"><label>Samagra ID</label><span>{selectedStudent.samagra || '---'}</span></div>
                  <div className="detail-item"><label>Bank Account</label><span>{selectedStudent.bankAccount || '---'}</span></div>
                  <div className="detail-item"><label>Religion</label><span>{selectedStudent.religion || '---'}</span></div>
                </div>
              </div>

              {/* Section 2: Parent & Contact */}
              <div className="detail-section">
                <h4 className="section-title"><FiUsers /> Parent Information</h4>
                <div className="detail-grid">
                  <div className="detail-item" style={{ gridColumn: 'span 2' }}><label>Father's Name</label><span>{selectedStudent.fatherName || selectedStudent.parentName}</span></div>
                  <div className="detail-item"><label>Father's Occ.</label><span>{selectedStudent.fatherOcc || '---'}</span></div>
                  <div className="detail-item"><label>Father's Mob.</label><span>{selectedStudent.fatherPhone || selectedStudent.phone}</span></div>
                  <div className="detail-item" style={{ gridColumn: 'span 2' }}><label>Mother's Name</label><span>{selectedStudent.motherName || '---'}</span></div>
                  <div className="detail-item"><label>Mother's Occ.</label><span>{selectedStudent.motherOcc || '---'}</span></div>
                  <div className="detail-item"><label>Mother's Mob.</label><span>{selectedStudent.motherPhone || '---'}</span></div>
                  <div className="detail-item" style={{ gridColumn: 'span 2' }}><label>Primary Email</label><span>{selectedStudent.email || '---'}</span></div>
                </div>
              </div>

              {/* Section 3: Fees & Financials */}
              <div className="detail-section" style={{ background: 'var(--primary-50)', border: '1px solid var(--primary-100)' }}>
                <h4 className="section-title" style={{ color: 'var(--primary-800)' }}><FiDollarSign /> Fees Summary</h4>
                <div style={{ background: 'white', padding: 20, borderRadius: 15, textAlign: 'center', marginBottom: 20 }}>
                  <div style={{ fontSize: 24, fontWeight: 900, color: 'var(--primary-600)' }}>₹{getFees(selectedStudent.id).remaining}</div>
                  <div style={{ fontSize: 10, color: 'var(--gray-400)', textTransform: 'uppercase', fontWeight: 800, marginTop: 5 }}>Pending Balance</div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 15, marginBottom: 20 }}>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: 16, fontWeight: 800 }}>₹{getFees(selectedStudent.id).total}</div>
                    <div style={{ fontSize: 9, color: 'var(--gray-400)' }}>Total</div>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: 16, fontWeight: 800, color: 'var(--accent-600)' }}>₹{getFees(selectedStudent.id).paid}</div>
                    <div style={{ fontSize: 9, color: 'var(--gray-400)' }}>Paid</div>
                  </div>
                </div>
                <h5 style={{ fontSize: 11, fontWeight: 800, marginBottom: 10, color: 'var(--primary-800)' }}>LAST PAYMENTS</h5>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {getFees(selectedStudent.id).history.slice(0, 3).map((h, i) => (
                    <div key={i} style={{ background: 'white', padding: '8px 12px', borderRadius: 10, display: 'flex', justifyContent: 'space-between', fontSize: 12 }}>
                      <span>{h.date}</span>
                      <span style={{ fontWeight: 700 }}>₹{h.amount}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Section 4: Address (Full Width) */}
              <div className="detail-section" style={{ gridColumn: 'span 2' }}>
                <h4 className="section-title"><FiMapPin /> Address Details</h4>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 30 }}>
                  <div>
                    <label style={{ fontSize: 10, color: 'var(--gray-400)', fontWeight: 800 }}>RESIDENTIAL ADDRESS</label>
                    <p style={{ fontSize: 14, marginTop: 5 }}>{selectedStudent.address}</p>
                  </div>
                  <div>
                    <label style={{ fontSize: 10, color: 'var(--gray-400)', fontWeight: 800 }}>PERMANENT ADDRESS</label>
                    <p style={{ fontSize: 14, marginTop: 5 }}>{selectedStudent.permAddress || selectedStudent.address}</p>
                  </div>
                </div>
              </div>

              {/* Section 5: Health & Transport */}
              <div className="detail-section">
                <h4 className="section-title"><FiActivity /> Health & Transport</h4>
                <div className="detail-grid">
                  <div className="detail-item"><label>Allergies</label><span>{selectedStudent.allergies || 'None'}</span></div>
                  <div className="detail-item"><label>Medical</label><span>{selectedStudent.medicalConditions || 'Normal'}</span></div>
                  <div className="detail-item"><label>Transport</label><span>{selectedStudent.transportRoute}</span></div>
                  <div className="detail-item"><label>Bus Stop</label><span>{selectedStudent.transportStop || '---'}</span></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MASSIVE ADD/EDIT FORM MODAL */}
      {modalOpen && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
          <div style={{ background: 'white', padding: 40, borderRadius: 20, width: '100%', maxWidth: 1100, maxHeight: '90vh', overflowY: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 30 }}>
              <h2 style={{ fontWeight: 900 }}>{selectedStudent ? 'Modify Student Record' : 'Enroll New Student'}</h2>
              <button onClick={() => setModalOpen(false)} style={{ border: 'none', background: 'none', color: 'var(--gray-400)' }}><FiX size={24} /></button>
            </div>

            <form onSubmit={handleSave}>
              <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr', gap: 40 }}>
                {/* Photo Col */}
                <div style={{ textAlign: 'center' }}>
                  <div style={{ width: 180, height: 220, borderRadius: 15, background: 'var(--gray-50)', border: '2px dashed var(--gray-200)', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 15 }}>
                    {formData.photo ? <img src={formData.photo} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : <FiUser size={60} color="var(--gray-200)" />}
                  </div>
                  <label className="btn btn-secondary w-full" style={{ cursor: 'pointer' }}>
                    Change Photo
                    <input type="file" hidden accept="image/*" onChange={handlePhotoUpload} />
                  </label>
                </div>

                {/* Form Col */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 30 }}>
                  {/* Part 1: Basic & Academic */}
                  <div className="form-row-group">
                    <h5 className="form-sub-title">1. Academic Information</h5>
                    <div className="form-grid">
                      <div className="form-group"><label>Full Name *</label><input className="form-input" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} /></div>
                      <div className="form-group"><label>Class *</label>
                        <select className="form-select" value={formData.class} onChange={e => setFormData({...formData, class: e.target.value})}>
                          {['PG', 'Nursery', 'LKG', 'UKG', '1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th', '9th', '10th'].map(c => <option key={c} value={c}>{c}</option>)}
                        </select>
                      </div>
                      <div className="form-group"><label>Section</label>
                        <select className="form-select" value={formData.section} onChange={e => setFormData({...formData, section: e.target.value})}>
                          {['A', 'B', 'C', 'D'].map(s => <option key={s} value={s}>{s}</option>)}
                        </select>
                      </div>
                      <div className="form-group"><label>Admission No</label><input className="form-input" value={formData.admissionNo} onChange={e => setFormData({...formData, admissionNo: e.target.value})} /></div>
                      <div className="form-group"><label>Roll No</label><input className="form-input" value={formData.rollNo} onChange={e => setFormData({...formData, rollNo: e.target.value})} /></div>
                      <div className="form-group"><label>Adm. Date</label><input type="date" className="form-input" value={formData.admissionDate} onChange={e => setFormData({...formData, admissionDate: e.target.value})} /></div>
                    </div>
                  </div>

                  {/* Part 2: Personal Details */}
                  <div className="form-row-group">
                    <h5 className="form-sub-title">2. Personal & Identity Details</h5>
                    <div className="form-grid">
                      <div className="form-group"><label>Date of Birth *</label><input type="date" className="form-input" required value={formData.dob} onChange={e => setFormData({...formData, dob: e.target.value})} /></div>
                      <div className="form-group"><label>Gender</label>
                        <select className="form-select" value={formData.gender} onChange={e => setFormData({...formData, gender: e.target.value})}>
                          <option value="Male">Male</option><option value="Female">Female</option><option value="Other">Other</option>
                        </select>
                      </div>
                      <div className="form-group"><label>Blood Group</label>
                        <select className="form-select" value={formData.bloodGroup} onChange={e => setFormData({...formData, bloodGroup: e.target.value})}>
                          {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(b => <option key={b} value={b}>{b}</option>)}
                        </select>
                      </div>
                      <div className="form-group"><label>Category</label>
                        <select className="form-select" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})}>
                          <option value="General">General</option><option value="OBC">OBC</option><option value="SC">SC</option><option value="ST">ST</option>
                        </select>
                      </div>
                      <div className="form-group"><label>Aadhaar No</label><input className="form-input" placeholder="12 Digit No" value={formData.aadhaar} onChange={e => setFormData({...formData, aadhaar: e.target.value})} /></div>
                      <div className="form-group"><label>Samagra ID</label><input className="form-input" placeholder="9 Digit No" value={formData.samagra} onChange={e => setFormData({...formData, samagra: e.target.value})} /></div>
                    </div>
                  </div>

                  {/* Part 3: Parental Details */}
                  <div className="form-row-group">
                    <h5 className="form-sub-title">3. Parental & Guardian Details</h5>
                    <div className="form-grid">
                      <div className="form-group"><label>Father's Name *</label><input className="form-input" required value={formData.fatherName} onChange={e => setFormData({...formData, fatherName: e.target.value})} /></div>
                      <div className="form-group"><label>Father's Phone *</label><input className="form-input" required value={formData.fatherPhone} onChange={e => setFormData({...formData, fatherPhone: e.target.value})} /></div>
                      <div className="form-group"><label>Father's Occ.</label><input className="form-input" value={formData.fatherOcc} onChange={e => setFormData({...formData, fatherOcc: e.target.value})} /></div>
                      <div className="form-group"><label>Mother's Name *</label><input className="form-input" required value={formData.motherName} onChange={e => setFormData({...formData, motherName: e.target.value})} /></div>
                      <div className="form-group"><label>Mother's Phone</label><input className="form-input" value={formData.motherPhone} onChange={e => setFormData({...formData, motherPhone: e.target.value})} /></div>
                      <div className="form-group"><label>Mother's Occ.</label><input className="form-input" value={formData.motherOcc} onChange={e => setFormData({...formData, motherOcc: e.target.value})} /></div>
                    </div>
                  </div>

                  {/* Part 4: Address & Contact */}
                  <div className="form-row-group">
                    <h5 className="form-sub-title">4. Address & Contact Information</h5>
                    <div className="form-grid">
                      <div className="form-group" style={{ gridColumn: 'span 2' }}><label>Residential Address *</label><input className="form-input" required value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} /></div>
                      <div className="form-group" style={{ gridColumn: 'span 2' }}><label>Permanent Address</label><input className="form-input" value={formData.permAddress} onChange={e => setFormData({...formData, permAddress: e.target.value})} /></div>
                      <div className="form-group"><label>Primary Email</label><input type="email" className="form-input" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} /></div>
                    </div>
                  </div>

                  {/* Part 5: Other Details */}
                  <div className="form-row-group">
                    <h5 className="form-sub-title">5. Health, Bank & Transport</h5>
                    <div className="form-grid">
                      <div className="form-group"><label>Bank A/C No</label><input className="form-input" value={formData.bankAccount} onChange={e => setFormData({...formData, bankAccount: e.target.value})} /></div>
                      <div className="form-group"><label>IFSC Code</label><input className="form-input" value={formData.ifsc} onChange={e => setFormData({...formData, ifsc: e.target.value})} /></div>
                      <div className="form-group"><label>Transport Route</label>
                        <select className="form-select" value={formData.transportRoute} onChange={e => setFormData({...formData, transportRoute: e.target.value})}>
                          <option value="None">None (Self)</option><option value="Route 1">Route 1 (Main City)</option><option value="Route 2">Route 2 (Suburb)</option>
                        </select>
                      </div>
                      <div className="form-group" style={{ gridColumn: 'span 3' }}><label>Health Conditions / Allergies</label><input className="form-input" value={formData.allergies} onChange={e => setFormData({...formData, allergies: e.target.value})} placeholder="Specify any chronic health conditions or allergies..." /></div>
                    </div>
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end', marginTop: 50, borderTop: '1px solid var(--gray-100)', paddingTop: 30 }}>
                <button type="button" className="btn btn-secondary btn-lg" onClick={() => setModalOpen(false)}>Discard Changes</button>
                <button type="submit" className="btn btn-primary btn-lg" style={{ minWidth: 200 }}>Save Student Record</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* STUDENT ID CARD PREVIEW MODAL */}
      {printStudent && (
        <div style={{position:'fixed', inset:0, background:'rgba(0,0,0,0.85)', zIndex:99999, display:'flex', alignItems:'center', justifyContent:'center', padding:20}}>
          <div style={{background:'white', padding:30, borderRadius:20, maxWidth:500, width:'100%'}}>
            <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:25}}>
              <h3 style={{fontWeight:900, color:'var(--gray-800)'}}>Student ID Card Preview</h3>
              <div style={{display:'flex', gap:10}}>
                <button className="btn btn-primary" onClick={() => window.print()}><FiPrinter /> Print</button>
                <button className="btn btn-secondary" onClick={() => setPrintStudent(null)}><FiX /></button>
              </div>
            </div>
            
            <div id="student-id-card" style={{ 
              width: idConfig.cardType === 'vertical' ? 320 : 500, 
              height: idConfig.cardType === 'vertical' ? 500 : 320, 
              margin:'0 auto', border:`4px solid ${idConfig.themeColor}`, 
              borderRadius:idConfig.borderRadius, overflow:'hidden', background:'white', position:'relative', 
              textAlign:'center', boxShadow:'0 20px 40px rgba(0,0,0,0.2)',
              display: 'flex', flexDirection: 'column'
            }}>
               <div style={{background:idConfig.themeColor, color:'white', padding:'20px 15px'}}>
                 <div style={{fontSize:14, fontWeight:900, letterSpacing:1}}>{idConfig.schoolName}</div>
                 <div style={{fontSize:9, marginTop:5, background:'white', color:idConfig.themeColor, display:'inline-block', padding:'2px 10px', borderRadius:100, fontWeight:800}}>STUDENT IDENTITY CARD</div>
               </div>
               
               <div style={{padding:25, display:'flex', flexDirection: idConfig.cardType === 'vertical' ? 'column' : 'row', alignItems:'center', gap:20, flex:1}}>
                 <div style={{width:110, height:130, margin: idConfig.cardType === 'vertical' ? '0 auto' : '0', borderRadius:12, border:`3px solid ${idConfig.themeColor}`, overflow:'hidden', background:'var(--gray-50)', flexShrink:0}}>
                   {printStudent.photo ? <img src={printStudent.photo} style={{width:'100%', height:'100%', objectFit:'cover'}} /> : <div style={{fontSize:50, fontWeight:900, color:'var(--primary-200)', marginTop:30}}>{printStudent.name[0]}</div>}
                 </div>
                 
                 <div style={{textAlign: idConfig.cardType === 'vertical' ? 'center' : 'left', flex:1}}>
                   <div style={{fontSize:20, fontWeight:900, textTransform:'uppercase', color:'var(--gray-800)', marginBottom:5}}>{printStudent.name}</div>
                   <div style={{fontSize:14, fontWeight:800, color:idConfig.themeColor}}>Class: {printStudent.class}-{printStudent.section || 'A'}</div>
                   
                   <div style={{marginTop:15, fontSize:11, textAlign:'left'}}>
                     <div style={{display:'flex', marginBottom:4}}><strong style={{width:60, color:'var(--gray-400)'}}>ROLL NO:</strong> <span style={{fontWeight:800}}>{printStudent.rollNo || '---'}</span></div>
                     <div style={{display:'flex', marginBottom:4}}><strong style={{width:60, color:'var(--gray-400)'}}>FATHER:</strong> <span style={{fontWeight:800}}>{printStudent.fatherName || printStudent.parentName}</span></div>
                     <div style={{display:'flex'}}><strong style={{width:60, color:'var(--gray-400)'}}>PHONE:</strong> <span style={{fontWeight:800}}>{printStudent.phone || printStudent.parentPhone}</span></div>
                   </div>
                 </div>
               </div>
               
               <div style={{padding:'0 25px 20px', width:'100%', display:'flex', justifyContent:'space-between', alignItems:'flex-end'}}>
                  <div style={{textAlign:'left'}}>
                    {idConfig.showQr && <div style={{width:45, height:45, background:'var(--gray-100)', borderRadius:4, display:'flex', alignItems:'center', justifyContent:'center', fontSize:8, color:'var(--gray-400)'}}>QR</div>}
                  </div>
                  {idConfig.showSign && (
                    <div style={{textAlign:'center'}}>
                      <div style={{fontSize:16, fontFamily:'cursive', color:idConfig.themeColor, opacity:0.6}}>Principal</div>
                      <div style={{borderTop:'1px solid var(--gray-300)', paddingTop:2, fontSize:8, fontWeight:800, color:'var(--gray-600)'}}>PRINCIPAL</div>
                    </div>
                  )}
               </div>
               <div style={{height:10, background:idConfig.themeColor}}></div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .form-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
        .form-sub-title { font-size: 13px; font-weight: 800; color: var(--primary-600); text-transform: uppercase; margin-bottom: 15px; border-left: 4px solid var(--primary-600); padding-left: 10px; }
        .section-title { font-size: 14px; font-weight: 800; margin-bottom: 20px; display: flex; alignItems: center; gap: 10; color: var(--gray-800); text-transform: uppercase; }
        .detail-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
        .detail-item label { display: block; font-size: 9px; color: var(--gray-400); text-transform: uppercase; font-weight: 800; margin-bottom: 4px; }
        .detail-item span { font-size: 13px; font-weight: 700; color: var(--gray-700); }
        .detail-section { padding: 25px; background: var(--gray-50); borderRadius: 20px; }
        @media print {
          body * { visibility: hidden; }
          #student-id-card, #student-id-card * { visibility: visible; }
          #student-id-card { position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%); border: none !important; box-shadow: none !important; }
        }
      `}</style>
    </div>
  )
}
