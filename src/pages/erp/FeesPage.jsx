import { useState, useRef } from 'react'
import { useAuth, MOCK_DATA } from '../../context/AuthContext'
import { FiDollarSign, FiSearch, FiArrowRight, FiCheckCircle, FiClock, FiAlertCircle, FiPlus, FiPrinter, FiX, FiTag, FiCalendar, FiDownload } from 'react-icons/fi'

export default function FeesPage() {
  const { user } = useAuth()
  const [selectedStudent, setSelectedStudent] = useState(null)
  const [search, setSearch] = useState('')
  const [collectModal, setCollectModal] = useState(false)
  const [printData, setPrintData] = useState(null)
  
  // Local state for fee data (simulating DB)
  const [feeRecords, setFeeRecords] = useState(() => {
    const saved = localStorage.getItem('nms_detailed_fees')
    return saved ? JSON.parse(saved) : MOCK_DATA.studentFees
  })

  // State for collection form
  const [collectForm, setCollectForm] = useState({
    type: 'Tuition',
    amount: '',
    discount: '0',
    mode: 'Cash',
    date: new Date().toISOString().split('T')[0],
    remarks: ''
  })

  const isAdmin = user?.role === 'admin'
  const isParent = user?.role === 'parent'
  const isStudent = user?.role === 'student'

  // Filter students for search
  const filteredStudents = MOCK_DATA.students.filter(s => 
    s.name.toLowerCase().includes(search.toLowerCase()) || 
    s.id.toLowerCase().includes(search.toLowerCase()) ||
    s.class.toLowerCase().includes(search.toLowerCase())
  )

  const handleCollect = (e) => {
    e.preventDefault()
    if (!selectedStudent || !collectForm.amount) return

    const studentId = selectedStudent.id
    const current = feeRecords[studentId] || { total: 40000, paid: 0, discount: 0, remaining: 40000, history: [] }
    
    const amount = parseFloat(collectForm.amount)
    const discount = parseFloat(collectForm.discount)
    
    const newTxn = {
      id: `TXN${Date.now()}`,
      type: collectForm.type,
      amount: amount + discount,
      paid: amount,
      date: collectForm.date,
      status: 'Paid',
      mode: collectForm.mode,
      remarks: collectForm.remarks
    }

    const updated = {
      ...feeRecords,
      [studentId]: {
        ...current,
        paid: current.paid + amount,
        discount: current.discount + discount,
        remaining: current.remaining - (amount + discount),
        history: [newTxn, ...current.history]
      }
    }

    setFeeRecords(updated)
    localStorage.setItem('nms_detailed_fees', JSON.stringify(updated))
    setCollectModal(false)
    setPrintData(newTxn) // Open print preview
  }

  const getStudentFees = (id) => feeRecords[id] || { total: 40000, paid: 0, discount: 0, remaining: 40000, history: [] }

  // Print Logic
  const printReceipt = () => {
    window.print()
  }

  // If viewing as student or parent, auto-select the current student
  if ((isStudent || isParent) && !selectedStudent) {
    const studentId = isStudent ? user.id : user.children[0].id
    const student = MOCK_DATA.students.find(s => s.id === studentId)
    if (student) setSelectedStudent(student)
  }

  return (
    <div className="fees-page">
      <div className="dash-page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <div className="dash-page-title"><FiDollarSign style={{ display: 'inline', marginRight: 8 }} />Fee Management</div>
          <div className="dash-page-subtitle">Manage and track student-wise fee collections</div>
        </div>
        {selectedStudent && isAdmin && (
          <button className="btn btn-primary btn-sm" onClick={() => setCollectModal(true)}>
            <FiPlus /> Collect Fees
          </button>
        )}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: isAdmin ? '320px 1fr' : '1fr', gap: 'var(--space-6)', alignItems: 'flex-start' }}>
        
        {/* Left Panel: Student Selection (Admin only) */}
        {isAdmin && (
          <div className="dash-widget" style={{ maxHeight: 'calc(100vh - 200px)', display: 'flex', flexDirection: 'column' }}>
            <div className="dash-widget-header" style={{ padding: '12px 15px' }}>
              <div className="dash-search" style={{ width: '100%', minWidth: 'auto' }}>
                <FiSearch size={14} />
                <input placeholder="Search students..." value={search} onChange={e => setSearch(e.target.value)} style={{ fontSize: 13 }} />
              </div>
            </div>
            <div style={{ overflowY: 'auto', flex: 1 }}>
              {filteredStudents.map(s => {
                const fees = getStudentFees(s.id)
                return (
                  <div key={s.id} onClick={() => setSelectedStudent(s)} 
                    style={{ 
                      padding: '12px 15px', 
                      borderBottom: '1px solid var(--gray-50)', 
                      cursor: 'pointer',
                      background: selectedStudent?.id === s.id ? 'var(--primary-50)' : 'transparent',
                      transition: 'all 0.15s'
                    }}>
                    <div style={{ fontWeight: 600, fontSize: 13, color: selectedStudent?.id === s.id ? 'var(--primary-700)' : 'var(--gray-800)' }}>{s.name}</div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4 }}>
                      <span style={{ fontSize: 11, color: 'var(--gray-400)' }}>ID: {s.id} | {s.class}</span>
                      <span className={`badge ${s.feeStatus === 'Paid' ? 'badge-success' : s.feeStatus === 'Overdue' ? 'badge-error' : 'badge-warning'}`} style={{ fontSize: 9, padding: '2px 6px' }}>{s.feeStatus}</span>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* Right Panel: Fee Details */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
          {!selectedStudent ? (
            <div className="dash-widget" style={{ padding: 60, textAlign: 'center', color: 'var(--gray-400)' }}>
              <FiDollarSign size={48} style={{ marginBottom: 15, opacity: 0.3 }} />
              <div>Select a student to view detailed fee information</div>
            </div>
          ) : (
            <>
              {/* Student Overview Header */}
              <div className="dash-widget" style={{ padding: '20px 25px', background: 'linear-gradient(135deg, var(--primary-600), var(--primary-800))', color: 'white' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <h2 style={{ fontSize: 20, fontWeight: 700 }}>{selectedStudent.name}</h2>
                    <div style={{ fontSize: 13, opacity: 0.8, marginTop: 4 }}>
                      Class: <strong>{selectedStudent.class}</strong> | Roll No: <strong>{selectedStudent.rollNo}</strong> | ID: <strong>{selectedStudent.id}</strong>
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: 1, opacity: 0.8 }}>Balance Amount</div>
                    <div style={{ fontSize: 28, fontWeight: 800 }}>₹{getStudentFees(selectedStudent.id).remaining.toLocaleString()}</div>
                  </div>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="dash-stat-grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
                <div className="dash-stat-card">
                  <div className="dash-stat-icon" style={{ background: 'var(--primary-50)', color: 'var(--primary-500)' }}><FiDollarSign /></div>
                  <div>
                    <div className="dash-stat-value">₹{getStudentFees(selectedStudent.id).total.toLocaleString()}</div>
                    <div className="dash-stat-label">Total Fee</div>
                  </div>
                </div>
                <div className="dash-stat-card">
                  <div className="dash-stat-icon" style={{ background: 'var(--accent-50)', color: 'var(--accent-500)' }}><FiCheckCircle /></div>
                  <div>
                    <div className="dash-stat-value">₹{getStudentFees(selectedStudent.id).paid.toLocaleString()}</div>
                    <div className="dash-stat-label">Paid</div>
                  </div>
                </div>
                <div className="dash-stat-card">
                  <div className="dash-stat-icon" style={{ background: '#fef2f2', color: 'var(--error)' }}><FiAlertCircle /></div>
                  <div>
                    <div className="dash-stat-value">₹{getStudentFees(selectedStudent.id).remaining.toLocaleString()}</div>
                    <div className="dash-stat-label">Remaining</div>
                  </div>
                </div>
                <div className="dash-stat-card">
                  <div className="dash-stat-icon" style={{ background: 'var(--gold-50)', color: 'var(--gold-600)' }}><FiTag /></div>
                  <div>
                    <div className="dash-stat-value">₹{getStudentFees(selectedStudent.id).discount.toLocaleString()}</div>
                    <div className="dash-stat-label">Discounted</div>
                  </div>
                </div>
              </div>

              {/* Transaction History */}
              <div className="dash-widget">
                <div className="dash-widget-header">
                  <span className="dash-widget-title"><FiClock /> Transaction History</span>
                  <button className="btn btn-secondary btn-sm" style={{ padding: '4px 10px' }}><FiDownload /> Export</button>
                </div>
                <div style={{ overflowX: 'auto' }}>
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Date</th>
                        <th>Type</th>
                        <th>Mode</th>
                        <th>Total</th>
                        <th>Discount</th>
                        <th>Paid</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {getStudentFees(selectedStudent.id).history.length === 0 ? (
                        <tr><td colSpan="7" style={{ textAlign: 'center', padding: 40, color: 'var(--gray-400)' }}>No transactions found for this student.</td></tr>
                      ) : (
                        getStudentFees(selectedStudent.id).history.map((h, i) => (
                          <tr key={h.id}>
                            <td style={{ fontSize: 13, fontWeight: 500 }}>{h.date}</td>
                            <td><span className="badge badge-info">{h.type}</span></td>
                            <td style={{ fontSize: 12 }}>{h.mode}</td>
                            <td style={{ fontWeight: 600 }}>₹{h.amount.toLocaleString()}</td>
                            <td style={{ color: 'var(--gold-600)', fontWeight: 600 }}>₹{h.discount || 0}</td>
                            <td style={{ color: 'var(--accent-600)', fontWeight: 700 }}>₹{h.paid.toLocaleString()}</td>
                            <td>
                              <button className="btn btn-sm" style={{ padding: 4, background: 'var(--gray-50)' }} onClick={() => setPrintData(h)}>
                                <FiPrinter size={14} color="var(--gray-500)" />
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Collect Fees Modal */}
      {collectModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }} onClick={() => setCollectModal(false)}>
          <form style={{ background: 'white', borderRadius: 20, padding: 32, maxWidth: 500, width: '100%' }} onClick={e => e.stopPropagation()} onSubmit={handleCollect}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
              <div>
                <h3 style={{ fontWeight: 700, fontSize: 18 }}>Collect Fees</h3>
                <p style={{ fontSize: 12, color: 'var(--gray-400)' }}>Collecting for: <strong>{selectedStudent.name}</strong></p>
              </div>
              <button type="button" onClick={() => setCollectModal(false)}><FiX /></button>
            </div>
            
            <div className="form-group">
              <label className="form-label">Fee Type</label>
              <select className="form-select" value={collectForm.type} onChange={e => setCollectForm({...collectForm, type: e.target.value})}>
                <option>Tuition</option>
                <option>Transport</option>
                <option>Registration</option>
                <option>Admission</option>
                <option>Examination</option>
                <option>Library</option>
                <option>Activity</option>
              </select>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 15 }}>
              <div className="form-group">
                <label className="form-label">Amount to Pay *</label>
                <input className="form-input" type="number" required placeholder="0.00" value={collectForm.amount} onChange={e => setCollectForm({...collectForm, amount: e.target.value})} />
              </div>
              <div className="form-group">
                <label className="form-label">Discount (if any)</label>
                <input className="form-input" type="number" placeholder="0.00" value={collectForm.discount} onChange={e => setCollectForm({...collectForm, discount: e.target.value})} />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 15 }}>
              <div className="form-group">
                <label className="form-label">Payment Mode</label>
                <select className="form-select" value={collectForm.mode} onChange={e => setCollectForm({...collectForm, mode: e.target.value})}>
                  <option>Cash</option>
                  <option>Online</option>
                  <option>Cheque</option>
                  <option>Bank Transfer</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Payment Date</label>
                <input className="form-input" type="date" value={collectForm.date} onChange={e => setCollectForm({...collectForm, date: e.target.value})} />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Remarks</label>
              <input className="form-input" placeholder="Optional remarks..." value={collectForm.remarks} onChange={e => setCollectForm({...collectForm, remarks: e.target.value})} />
            </div>

            <div style={{ display: 'flex', gap: 12, marginTop: 10 }}>
              <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>Confirm Collection</button>
              <button type="button" className="btn btn-secondary" onClick={() => setCollectModal(false)}>Cancel</button>
            </div>
          </form>
        </div>
      )}

      {/* Print Receipt Preview Modal */}
      {printData && (
        <div className="no-print" style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', zIndex: 10000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }} onClick={() => setPrintData(null)}>
          <div style={{ background: 'white', borderRadius: 0, padding: 40, maxWidth: 600, width: '100%', boxShadow: '0 20px 50px rgba(0,0,0,0.3)' }} onClick={e => e.stopPropagation()}>
            
            {/* The actual Printable area */}
            <div id="receipt-print-area">
              <div style={{ borderBottom: '2px solid var(--gray-800)', paddingBottom: 20, marginBottom: 30, textAlign: 'center' }}>
                <h1 style={{ fontSize: 24, fontWeight: 800, color: 'var(--primary-700)' }}>NEW MORNING STAR PUBLIC SCHOOL</h1>
                <p style={{ fontSize: 12, color: 'var(--gray-500)', marginTop: 4 }}>Subhash Nagar, New Delhi - 110027 | +91 11 2345 6789</p>
                <div style={{ display: 'inline-block', padding: '4px 15px', background: 'var(--gray-800)', color: 'white', fontSize: 11, fontWeight: 700, marginTop: 15, borderRadius: 4 }}>FEE RECEIPT</div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40, marginBottom: 30 }}>
                <div>
                  <div style={{ fontSize: 10, color: 'var(--gray-400)', textTransform: 'uppercase' }}>Student Details</div>
                  <div style={{ fontSize: 16, fontWeight: 700, marginTop: 5 }}>{selectedStudent.name}</div>
                  <div style={{ fontSize: 13, color: 'var(--gray-600)', marginTop: 2 }}>ID: {selectedStudent.id} | Class: {selectedStudent.class}</div>
                  <div style={{ fontSize: 13, color: 'var(--gray-600)' }}>Roll No: {selectedStudent.rollNo}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: 10, color: 'var(--gray-400)', textTransform: 'uppercase' }}>Receipt Details</div>
                  <div style={{ fontSize: 14, fontWeight: 700, marginTop: 5 }}>No: {printData.id}</div>
                  <div style={{ fontSize: 13, color: 'var(--gray-600)', marginTop: 2 }}>Date: {printData.date}</div>
                  <div style={{ fontSize: 13, color: 'var(--gray-600)' }}>Mode: {printData.mode}</div>
                </div>
              </div>

              <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: 30 }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--gray-200)' }}>
                    <th style={{ textAlign: 'left', padding: '10px 0', fontSize: 12 }}>Description</th>
                    <th style={{ textAlign: 'right', padding: '10px 0', fontSize: 12 }}>Amount</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderBottom: '1px solid var(--gray-50)' }}>
                    <td style={{ padding: '15px 0', fontSize: 14 }}>{printData.type} Fees</td>
                    <td style={{ textAlign: 'right', padding: '15px 0', fontSize: 14 }}>₹{(printData.amount).toLocaleString()}</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '10px 0', fontSize: 12, color: 'var(--gray-500)' }}>Discount Applied</td>
                    <td style={{ textAlign: 'right', padding: '10px 0', fontSize: 12, color: 'var(--gray-500)' }}>- ₹{(printData.discount || 0).toLocaleString()}</td>
                  </tr>
                </tbody>
                <tfoot>
                  <tr style={{ borderTop: '2px solid var(--gray-800)' }}>
                    <td style={{ padding: '15px 0', fontWeight: 800, fontSize: 16 }}>TOTAL PAID</td>
                    <td style={{ textAlign: 'right', padding: '15px 0', fontWeight: 800, fontSize: 18, color: 'var(--primary-700)' }}>₹{printData.paid.toLocaleString()}</td>
                  </tr>
                </tfoot>
              </table>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40, marginTop: 60 }}>
                <div style={{ fontSize: 11, color: 'var(--gray-400)' }}>
                  * This is a computer generated receipt.<br />
                  * Fees once paid is non-refundable.
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ height: 1, background: 'var(--gray-300)', marginBottom: 10 }} />
                  <div style={{ fontSize: 12, fontWeight: 700 }}>Authorized Signatory</div>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: 15, marginTop: 40 }} className="no-print">
              <button className="btn btn-primary" style={{ flex: 1 }} onClick={printReceipt}><FiPrinter /> Print Receipt</button>
              <button className="btn btn-secondary" onClick={() => setPrintData(null)}>Close</button>
            </div>
          </div>
        </div>
      )}

      {/* Hidden print-only style */}
      <style>{`
        @media print {
          body * { visibility: hidden; }
          #receipt-print-area, #receipt-print-area * { visibility: visible; }
          #receipt-print-area { position: fixed; left: 0; top: 0; width: 100%; padding: 40px; }
          .no-print { display: none !important; }
        }
      `}</style>
    </div>
  )
}
