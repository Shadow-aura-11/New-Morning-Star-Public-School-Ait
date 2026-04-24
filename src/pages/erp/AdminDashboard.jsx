import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth, MOCK_DATA } from '../../context/AuthContext'
import {
  FiUsers, FiDollarSign, FiCheckCircle, FiClock, FiTruck,
  FiBookOpen, FiBarChart2, FiTrendingUp, FiTrendingDown,
  FiAlertCircle, FiCalendar, FiArrowRight, FiEye,
  FiUserPlus, FiFileText, FiBell, FiPlusCircle, FiMonitor
} from 'react-icons/fi'

export default function AdminDashboard() {
  const { user, currentSession, updateSession } = useAuth()
  const today = new Date().toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })

  const stats = [
    { icon: <FiUsers />, label: 'Total Students', value: '2,547', change: '+12 this month', up: true, bg: 'var(--primary-50)', color: 'var(--primary-500)' },
    { icon: <FiCheckCircle />, label: 'Today Attendance', value: '94.2%', change: '+1.3% vs yesterday', up: true, bg: 'var(--accent-50)', color: 'var(--accent-500)' },
    { icon: <FiDollarSign />, label: 'Fee Collected (Apr)', value: '₹18.5L', change: '₹4.2L pending', up: false, bg: 'var(--gold-50)', color: 'var(--gold-600)' },
    { icon: <FiBarChart2 />, label: 'Staff Present', value: '112/121', change: '9 on leave', up: false, bg: '#f3e8ff', color: '#8b5cf6' },
  ]

  return (
    <>
      <div className="dash-page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <div className="dash-page-title">Welcome back, {user?.name?.split(' ')[0]}!</div>
          <div className="dash-page-subtitle">{today}</div>
        </div>
        <div style={{ display: 'flex', gap: 'var(--space-2)', alignItems: 'center' }}>
          <div style={{ marginRight: 15, display: 'flex', alignItems: 'center', gap: 8, background: 'white', padding: '6px 12px', borderRadius: 10, border: '1px solid var(--gray-200)' }}>
            <FiCalendar style={{ color: 'var(--primary-500)' }} />
            <select 
              value={currentSession} 
              onChange={(e) => updateSession(e.target.value)}
              style={{ border: 'none', background: 'transparent', fontSize: 13, fontWeight: 700, color: 'var(--gray-700)', cursor: 'pointer', outline: 'none' }}
            >
              <option value="2024-25">Session 2024-25</option>
              <option value="2025-26">Session 2025-26</option>
              <option value="2026-27">Session 2026-27</option>
              <option value="2027-28">Session 2027-28</option>
            </select>
          </div>
          <Link to="/erp/students" className="btn btn-primary btn-sm"><FiUserPlus /> Add Student</Link>
          <Link to="/erp/notices" className="btn btn-secondary btn-sm"><FiBell /> New Notice</Link>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="dash-stat-grid">
        {stats.map((s, i) => (
          <div key={i} className="dash-stat-card">
            <div className="dash-stat-icon" style={{ background: s.bg, color: s.color }}>{s.icon}</div>
            <div>
              <div className="dash-stat-value">{s.value}</div>
              <div className="dash-stat-label">{s.label}</div>
              <div className={`dash-stat-change ${s.up ? 'up' : 'down'}`}>
                {s.up ? <FiTrendingUp size={12} /> : <FiTrendingDown size={12} />} {s.change}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="dash-quick-actions">
        <Link to="/erp/attendance" className="dash-quick-btn"><FiClock /> View Attendance</Link>
        <Link to="/erp/fees" className="dash-quick-btn"><FiDollarSign /> Fee Reports</Link>
        <Link to="/erp/exams" className="dash-quick-btn"><FiFileText /> Exam Results</Link>
        <Link to="/erp/transport" className="dash-quick-btn"><FiTruck /> Transport</Link>
        <Link to="/erp/students" className="dash-quick-btn"><FiUsers /> All Students</Link>
        <Link to="/web-admin" className="dash-quick-btn" style={{ background: 'var(--primary-50)', color: 'var(--primary-600)', borderColor: 'var(--primary-200)' }}><FiMonitor /> Website CMS</Link>
      </div>

      <div className="dash-widget-row">
        {/* Recent Notices */}
        <div className="dash-widget">
          <div className="dash-widget-header">
            <span className="dash-widget-title"><FiBell /> Recent Notices</span>
            <Link to="/erp/notices" style={{ fontSize: 'var(--text-sm)', color: 'var(--primary-500)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 4 }}>
              View All <FiArrowRight size={14} />
            </Link>
          </div>
          <div className="dash-widget-body" style={{ padding: 0 }}>
            {MOCK_DATA.notices.slice(0, 5).map((n, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', padding: 'var(--space-3) var(--space-5)', borderBottom: '1px solid var(--gray-50)', cursor: 'pointer', transition: 'background 0.15s' }}
                onMouseEnter={e => e.currentTarget.style.background = 'var(--gray-50)'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: n.priority === 'high' ? 'var(--error)' : n.priority === 'medium' ? 'var(--gold-500)' : 'var(--accent-500)', flexShrink: 0 }} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 'var(--text-sm)', fontWeight: 500, color: 'var(--gray-700)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{n.title}</div>
                  <div style={{ fontSize: 'var(--text-xs)', color: 'var(--gray-400)' }}>{n.date} | {n.category}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Fee Overview */}
        <div className="dash-widget">
          <div className="dash-widget-header">
            <span className="dash-widget-title"><FiDollarSign /> Fee Overview (April)</span>
          </div>
          <div className="dash-widget-body">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 'var(--space-4)', marginBottom: 'var(--space-5)' }}>
              {[
                { label: 'Collected', value: '₹18.5L', color: 'var(--accent-600)' },
                { label: 'Pending', value: '₹4.2L', color: 'var(--gold-600)' },
                { label: 'Overdue', value: '₹1.8L', color: 'var(--error)' },
              ].map((f, i) => (
                <div key={i} style={{ textAlign: 'center', padding: 'var(--space-3)', background: 'var(--gray-50)', borderRadius: 'var(--radius-lg)' }}>
                  <div style={{ fontSize: 'var(--text-xl)', fontWeight: 800, color: f.color }}>{f.value}</div>
                  <div style={{ fontSize: 'var(--text-xs)', color: 'var(--gray-500)' }}>{f.label}</div>
                </div>
              ))}
            </div>
            {/* Fee collection bar */}
            <div style={{ fontSize: 'var(--text-xs)', color: 'var(--gray-500)', marginBottom: 4 }}>Collection Progress: 75%</div>
            <div style={{ height: 10, background: 'var(--gray-100)', borderRadius: 5, overflow: 'hidden' }}>
              <div style={{ width: '75%', height: '100%', background: 'linear-gradient(90deg, var(--accent-400), var(--accent-600))', borderRadius: 5, transition: 'width 1s ease' }} />
            </div>
          </div>
        </div>
      </div>

      <div className="dash-widget-row">
        {/* Today's Attendance Summary */}
        <div className="dash-widget">
          <div className="dash-widget-header">
            <span className="dash-widget-title"><FiClock /> Attendance Summary (Today)</span>
          </div>
          <div className="dash-widget-body">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 'var(--space-3)' }}>
              {[
                { cls: 'VI-A', present: 38, total: 42 },
                { cls: 'VII-A', present: 40, total: 44 },
                { cls: 'VIII-A', present: 35, total: 40 },
                { cls: 'IX-A', present: 37, total: 42 },
                { cls: 'X-A', present: 36, total: 40 },
                { cls: 'VI-B', present: 39, total: 42 },
                { cls: 'VII-B', present: 41, total: 44 },
                { cls: 'VIII-B', present: 36, total: 40 },
                { cls: 'IX-B', present: 38, total: 42 },
                { cls: 'X-B', present: 37, total: 40 },
              ].map((c, i) => {
                const pct = Math.round((c.present / c.total) * 100)
                return (
                  <div key={i} style={{ textAlign: 'center', padding: 'var(--space-2)', background: pct >= 90 ? 'var(--accent-50)' : pct >= 80 ? 'var(--gold-50)' : '#fef2f2', borderRadius: 'var(--radius-md)' }}>
                    <div style={{ fontSize: 'var(--text-xs)', fontWeight: 700, color: 'var(--gray-700)' }}>{c.cls}</div>
                    <div style={{ fontSize: 'var(--text-lg)', fontWeight: 800, color: pct >= 90 ? 'var(--accent-600)' : pct >= 80 ? 'var(--gold-600)' : 'var(--error)' }}>{pct}%</div>
                    <div style={{ fontSize: '10px', color: 'var(--gray-400)' }}>{c.present}/{c.total}</div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Staff Today */}
        <div className="dash-widget">
          <div className="dash-widget-header">
            <span className="dash-widget-title"><FiUsers /> Staff Status</span>
            <Link to="/erp/staff" style={{ fontSize: 'var(--text-sm)', color: 'var(--primary-500)', fontWeight: 600 }}>View All</Link>
          </div>
          <div className="dash-widget-body" style={{ padding: 0 }}>
            {MOCK_DATA.staff.map((s, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', padding: 'var(--space-3) var(--space-5)', borderBottom: '1px solid var(--gray-50)' }}>
                <div style={{ width: 32, height: 32, borderRadius: '50%', background: s.status === 'Present' ? 'var(--accent-100)' : '#fef2f2', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 700, color: s.status === 'Present' ? 'var(--accent-700)' : 'var(--error)' }}>
                  {s.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 'var(--text-sm)', fontWeight: 500, color: 'var(--gray-700)' }}>{s.name}</div>
                  <div style={{ fontSize: 'var(--text-xs)', color: 'var(--gray-400)' }}>{s.dept} | {s.designation}</div>
                </div>
                <span className={`badge ${s.status === 'Present' ? 'badge-success' : 'badge-error'}`}>{s.status}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Students Table */}
      <div className="dash-widget" style={{ marginTop: 'var(--space-5)' }}>
        <div className="dash-widget-header">
          <span className="dash-widget-title"><FiUsers /> Recent Students</span>
          <Link to="/erp/students" style={{ fontSize: 'var(--text-sm)', color: 'var(--primary-500)', fontWeight: 600 }}>View All Students</Link>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table className="table">
            <thead>
              <tr><th>ID</th><th>Name</th><th>Class</th><th>Roll No</th><th>Attendance</th><th>Fee Status</th><th>Action</th></tr>
            </thead>
            <tbody>
              {MOCK_DATA.students.map((s, i) => (
                <tr key={i}>
                  <td style={{ fontWeight: 600, fontSize: 'var(--text-xs)' }}>{s.id}</td>
                  <td><strong>{s.name}</strong></td>
                  <td><span className="badge badge-info">{s.class}</span></td>
                  <td>{s.rollNo}</td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                      <div style={{ width: 60, height: 6, background: 'var(--gray-100)', borderRadius: 3, overflow: 'hidden' }}>
                        <div style={{ width: `${s.attendance}%`, height: '100%', background: s.attendance >= 90 ? 'var(--accent-500)' : s.attendance >= 80 ? 'var(--gold-500)' : 'var(--error)', borderRadius: 3 }} />
                      </div>
                      <span style={{ fontSize: 'var(--text-xs)', fontWeight: 600, color: s.attendance >= 90 ? 'var(--accent-600)' : s.attendance >= 80 ? 'var(--gold-600)' : 'var(--error)' }}>{s.attendance}%</span>
                    </div>
                  </td>
                  <td><span className={`badge ${s.feeStatus === 'Paid' ? 'badge-success' : s.feeStatus === 'Pending' ? 'badge-warning' : 'badge-error'}`}>{s.feeStatus}</span></td>
                  <td><button className="btn btn-sm btn-secondary" style={{ padding: '4px 10px', fontSize: '11px' }}><FiEye size={12} /> View</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}
