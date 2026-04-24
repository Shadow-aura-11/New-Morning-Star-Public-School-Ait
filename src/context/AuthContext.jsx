import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext(null)

/* ──────────────────────────────────────────────
   MOCK USERS  (role → credentials → profile)
   ────────────────────────────────────────────── */
const USERS = [
  {
    id: 'ADM001',
    username: 'admin',
    password: 'admin123',
    role: 'admin',
    name: 'Dr. Rajesh Kumar',
    designation: 'System Administrator',
    email: 'admin@newmorningstar.edu.in',
    avatar: 'RK',
  },
  {
    id: 'TCH001',
    username: 'teacher',
    password: 'teacher123',
    role: 'teacher',
    name: 'Mrs. Priya Mehta',
    designation: 'Head of Science (PGT Physics)',
    email: 'priya.mehta@newmorningstar.edu.in',
    avatar: 'PM',
    assignedClasses: ['X-A', 'X-B', 'IX-A', 'XI-Sci'],
    subject: 'Physics',
  },
  {
    id: 'STU001',
    username: 'student',
    password: 'student123',
    role: 'student',
    name: 'Aarav Sharma',
    class: 'X-A',
    rollNo: 12,
    admissionNo: 'NMS/2020/1042',
    email: 'aarav.sharma@student.nms.edu.in',
    avatar: 'AS',
    parentName: 'Mr. Vikram Sharma',
    parentPhone: '+91 98765 43210',
  },
]

/* ──────────────────────────────────────────────
   MOCK DATA  — shared across dashboards
   ────────────────────────────────────────────── */
export const MOCK_DATA = {
  /* ── students ── */
  students: [
    { 
      id: 'STU001', name: 'Aarav Sharma', class: 'X-A', rollNo: 12, gender: 'M', attendance: 94, feeStatus: 'Partial', parentPhone: '+91 98765 43210',
      dob: '2010-05-15', bloodGroup: 'B+', address: 'H-42, Rajouri Garden, New Delhi', admissionDate: '2015-04-01', fatherName: 'Mr. Vikram Sharma', motherName: 'Mrs. Suman Sharma', transport: 'Route 1'
    },
    { 
      id: 'STU002', name: 'Anika Sharma', class: 'VI-B', rollNo: 8, gender: 'F', attendance: 97, feeStatus: 'Paid', parentPhone: '+91 98765 43210',
      dob: '2014-08-22', bloodGroup: 'O+', address: 'H-42, Rajouri Garden, New Delhi', admissionDate: '2019-04-01', fatherName: 'Mr. Vikram Sharma', motherName: 'Mrs. Suman Sharma', transport: 'Route 1'
    },
    { 
      id: 'STU003', name: 'Rohit Verma', class: 'X-A', rollNo: 3, gender: 'M', attendance: 88, feeStatus: 'Pending', parentPhone: '+91 87654 32109',
      dob: '2010-02-10', bloodGroup: 'A+', address: 'A-15, Vikas Puri, New Delhi', admissionDate: '2015-04-01', fatherName: 'Mr. R.K. Verma', motherName: 'Mrs. Meena Verma', transport: 'Self'
    },
    { id: 'STU004', name: 'Sneha Gupta', class: 'X-A', rollNo: 7, gender: 'F', attendance: 96, feeStatus: 'Paid', parentPhone: '+91 76543 21098' },
    { id: 'STU005', name: 'Amit Kumar', class: 'X-B', rollNo: 1, gender: 'M', attendance: 78, feeStatus: 'Overdue', parentPhone: '+91 65432 10987' },
    { id: 'STU006', name: 'Priya Singh', class: 'IX-A', rollNo: 15, gender: 'F', attendance: 92, feeStatus: 'Paid', parentPhone: '+91 54321 09876' },
    { id: 'STU007', name: 'Vikas Yadav', class: 'IX-A', rollNo: 22, gender: 'M', attendance: 85, feeStatus: 'Partial', parentPhone: '+91 43210 98765' },
    { id: 'STU008', name: 'Neha Patel', class: 'X-A', rollNo: 19, gender: 'F', attendance: 91, feeStatus: 'Paid', parentPhone: '+91 32109 87654' },
    { id: 'STU009', name: 'Rahul Joshi', class: 'XI-Sci', rollNo: 5, gender: 'M', attendance: 89, feeStatus: 'Paid', parentPhone: '+91 21098 76543' },
    { id: 'STU010', name: 'Kavita Nair', class: 'XI-Sci', rollNo: 11, gender: 'F', attendance: 93, feeStatus: 'Pending', parentPhone: '+91 10987 65432' },
  ],

  /* ── attendance (for student STU001 – current month) ── */
  attendanceLog: [
    { date: '2026-04-01', status: 'Present' }, { date: '2026-04-02', status: 'Present' },
    { date: '2026-04-03', status: 'Present' }, { date: '2026-04-04', status: 'Absent' },
    { date: '2026-04-05', status: 'Present' }, { date: '2026-04-07', status: 'Present' },
    { date: '2026-04-08', status: 'Present' }, { date: '2026-04-09', status: 'Late' },
    { date: '2026-04-10', status: 'Present' }, { date: '2026-04-11', status: 'Present' },
    { date: '2026-04-12', status: 'Present' }, { date: '2026-04-14', status: 'Present' },
    { date: '2026-04-15', status: 'Present' }, { date: '2026-04-16', status: 'Present' },
    { date: '2026-04-17', status: 'Absent' }, { date: '2026-04-18', status: 'Present' },
    { date: '2026-04-19', status: 'Present' }, { date: '2026-04-21', status: 'Present' },
    { date: '2026-04-22', status: 'Present' }, { date: '2026-04-23', status: 'Present' },
  ],

  /* ── timetable (for X-A) ── */
  timetable: {
    'Monday':    ['Physics', 'Mathematics', 'English', 'Hindi', 'Chemistry', 'Social Sc.', 'PT'],
    'Tuesday':   ['Mathematics', 'English', 'Physics', 'Computer', 'Hindi', 'Chemistry', 'Library'],
    'Wednesday': ['English', 'Physics', 'Chemistry', 'Mathematics', 'Hindi', 'Social Sc.', 'Art'],
    'Thursday':  ['Hindi', 'Chemistry', 'Mathematics', 'English', 'Physics', 'Computer', 'PT'],
    'Friday':    ['Social Sc.', 'Mathematics', 'Hindi', 'Physics', 'English', 'Chemistry', 'Music'],
    'Saturday':  ['Chemistry', 'English', 'Physics', 'Mathematics', 'Hindi', 'Social Sc.'],
  },
  periods: ['8:00 - 8:40', '8:40 - 9:20', '9:30 - 10:10', '10:10 - 10:50', '11:00 - 11:40', '11:40 - 12:20', '12:30 - 1:10'],

  /* ── exam types ── */
  examTypes: ['FA1 (Unit Test)', 'FA2 (Unit Test)', 'SA1 (Half Yearly)', 'FA3 (Unit Test)', 'FA4 (Unit Test)', 'SA2 (Annual)'],

  /* ── student detailed results ── */
  studentResults: {
    'STU001': {
      'FA1 (Unit Test)': [
        { subject: 'Physics', marks: 42, max: 50 }, { subject: 'Chemistry', marks: 38, max: 50 }, { subject: 'Mathematics', marks: 45, max: 50 },
        { subject: 'English', marks: 40, max: 50 }, { subject: 'Hindi', marks: 35, max: 50 }, { subject: 'Social Science', marks: 42, max: 50 }
      ],
      'FA2 (Unit Test)': [
        { subject: 'Physics', marks: 45, max: 50 }, { subject: 'Chemistry', marks: 40, max: 50 }, { subject: 'Mathematics', marks: 48, max: 50 },
        { subject: 'English', marks: 42, max: 50 }, { subject: 'Hindi', marks: 38, max: 50 }, { subject: 'Social Science', marks: 44, max: 50 }
      ],
      'SA1 (Half Yearly)': [
        { subject: 'Physics', marks: 82, max: 100 }, { subject: 'Chemistry', marks: 75, max: 100 }, { subject: 'Mathematics', marks: 92, max: 100 },
        { subject: 'English', marks: 85, max: 100 }, { subject: 'Hindi', marks: 78, max: 100 }, { subject: 'Social Science', marks: 88, max: 100 }
      ]
    },
    'STU003': {
      'FA1 (Unit Test)': [
        { subject: 'Physics', marks: 35, max: 50 }, { subject: 'Chemistry', marks: 32, max: 50 }, { subject: 'Mathematics', marks: 38, max: 50 },
        { subject: 'English', marks: 36, max: 50 }, { subject: 'Hindi', marks: 34, max: 50 }, { subject: 'Social Science', marks: 35, max: 50 }
      ]
    }
  },

  /* ── homework ── */
  homework: [
    { id: 1, subject: 'Physics', title: 'Reflection & Refraction - NCERT Q1-Q15', assignedBy: 'Mrs. Priya Mehta', date: '2026-04-22', due: '2026-04-25', status: 'Pending' },
    { id: 2, subject: 'Mathematics', title: 'Arithmetic Progressions - Ex 5.3', assignedBy: 'Mr. Sunil Kumar', date: '2026-04-21', due: '2026-04-24', status: 'Submitted' },
    { id: 3, subject: 'English', title: 'Essay: My Vision for India', assignedBy: 'Mrs. Neha Verma', date: '2026-04-20', due: '2026-04-23', status: 'Graded', grade: 'A' },
    { id: 4, subject: 'Chemistry', title: 'Chemical Reactions Worksheet', assignedBy: 'Mr. Arun Singh', date: '2026-04-19', due: '2026-04-22', status: 'Overdue' },
  ],

  /* ── student detailed fees ── */
  studentFees: {
    'STU001': {
      total: 45000, paid: 32000, discount: 2000, remaining: 11000,
      history: [
        { id: 'TXN101', type: 'Registration', amount: 5000, paid: 5000, date: '2026-03-10', status: 'Paid', mode: 'Cash' },
        { id: 'TXN102', type: 'Tuition (Q1)', amount: 15000, paid: 15000, date: '2026-04-05', status: 'Paid', mode: 'Online' },
        { id: 'TXN103', type: 'Transport (Q1)', amount: 6000, paid: 6000, date: '2026-04-05', status: 'Paid', mode: 'Online' },
        { id: 'TXN104', type: 'Tuition (Q2)', amount: 15000, paid: 6000, date: '2026-04-15', status: 'Partial', mode: 'Cheque' }
      ]
    },
    'STU003': {
      total: 42000, paid: 0, discount: 0, remaining: 42000,
      history: []
    },
    'STU005': {
      total: 38000, paid: 10000, discount: 1000, remaining: 27000,
      history: [
        { id: 'TXN201', type: 'Registration', amount: 5000, paid: 5000, date: '2026-03-12', status: 'Paid', mode: 'Cash' },
        { id: 'TXN202', type: 'Tuition (Q1)', amount: 12000, paid: 5000, date: '2026-04-10', status: 'Partial', mode: 'Cash' }
      ]
    },
    'STU007': {
      total: 40000, paid: 15000, discount: 0, remaining: 25000,
      history: [
        { id: 'TXN301', type: 'Registration', amount: 5000, paid: 5000, date: '2026-03-15', status: 'Paid', mode: 'Online' },
        { id: 'TXN302', type: 'Tuition (Q1)', amount: 14000, paid: 10000, date: '2026-04-12', status: 'Partial', mode: 'Online' }
      ]
    }
  },

  /* ── notices ── */
  notices: [
    { id: 1, title: 'Admissions Open for 2026-27', date: '2026-04-20', category: 'Admission', priority: 'high' },
    { id: 2, title: 'Annual Sports Day - April 25', date: '2026-04-18', category: 'Event', priority: 'medium' },
    { id: 3, title: 'Parent-Teacher Meeting - Class IX & X', date: '2026-04-15', category: 'Meeting', priority: 'high' },
    { id: 4, title: 'Summer Vacation: May 15 to June 30', date: '2026-04-12', category: 'Academic', priority: 'medium' },
    { id: 5, title: 'Science Exhibition Registration Open', date: '2026-04-10', category: 'Event', priority: 'low' },
    { id: 6, title: 'Fee Payment Reminder - Last Date April 30', date: '2026-04-08', category: 'Finance', priority: 'high' },
  ],

  /* ── messages ── */
  messages: [
    { id: 1, from: 'Mrs. Priya Mehta', role: 'Teacher', subject: 'Physics Assignment Feedback', preview: 'Aarav has done excellent work on the optics assignment...', time: '2 hours ago', read: false },
    { id: 2, from: 'Admin Office', role: 'Admin', subject: 'Fee Receipt - April 2026', preview: 'Your fee payment of ₹5,000 has been received...', time: '1 day ago', read: true },
    { id: 3, from: 'Mr. Sunil Kumar', role: 'Teacher', subject: 'Math Extra Class', preview: 'Extra class for AP chapter on Saturday 10 AM...', time: '2 days ago', read: true },
    { id: 4, from: 'Transport Dept.', role: 'Admin', subject: 'Bus Route Change Notice', preview: 'Route 7 timings updated from April 28...', time: '3 days ago', read: true },
  ],

  /* ── staff ── */
  staff: [
    { id: 'TCH001', name: 'Mrs. Priya Mehta', dept: 'Physics', designation: 'PGT', status: 'Present', phone: '+91 99887 76655' },
    { id: 'TCH002', name: 'Mr. Sunil Kumar', dept: 'Mathematics', designation: 'PGT', status: 'Present', phone: '+91 99887 76656' },
    { id: 'TCH003', name: 'Mrs. Neha Verma', dept: 'English', designation: 'PGT', status: 'On Leave', phone: '+91 99887 76657' },
    { id: 'TCH004', name: 'Mr. Arun Singh', dept: 'Chemistry', designation: 'PGT', status: 'Present', phone: '+91 99887 76658' },
    { id: 'TCH005', name: 'Mrs. Kavita Joshi', dept: 'Biology', designation: 'PGT', status: 'Present', phone: '+91 99887 76659' },
    { id: 'TCH006', name: 'Mrs. Anita Rani', dept: 'Hindi', designation: 'TGT', status: 'Present', phone: '+91 99887 76660' },
    { id: 'TCH007', name: 'Mr. Deepak Yadav', dept: 'Computer', designation: 'PGT', status: 'Present', phone: '+91 99887 76661' },
    { id: 'TCH008', name: 'Mr. Vikram Chauhan', dept: 'Physical Ed.', designation: 'PET', status: 'Present', phone: '+91 99887 76662' },
  ],

  /* ── transport ── */
  transport: [
    { route: 'Route 1', bus: 'DL-01-AB-1234', driver: 'Ramesh Kumar', stops: 'Civil Lines → Model Town → School', students: 42 },
    { route: 'Route 2', bus: 'DL-01-CD-5678', driver: 'Suresh Yadav', stops: 'Karol Bagh → Rajouri Garden → School', students: 38 },
    { route: 'Route 3', bus: 'DL-01-EF-9012', driver: 'Manoj Singh', stops: 'Dwarka → Janakpuri → School', students: 45 },
    { route: 'Route 4', bus: 'DL-01-GH-3456', driver: 'Vinod Sharma', stops: 'Rohini → Pitampura → School', students: 40 },
  ],

  /* ── classes & sections management ── */
  classesAndSections: [
    { class: 'PG', sections: [ { name: 'A', teacher: 'Mrs. Anita Rani' } ] },
    { class: 'Nursery', sections: [ { name: 'A', teacher: 'Mrs. S. Gupta' } ] },
    { class: 'LKG', sections: [ { name: 'A', teacher: 'Mrs. R. Sharma' } ] },
    { class: 'UKG', sections: [ { name: 'A', teacher: 'Mrs. M. Kapoor' } ] },
    { class: '1st', sections: [ { name: 'A', teacher: 'Mrs. Neha Verma' }, { name: 'B', teacher: 'Mrs. P. Singh' } ] },
    { class: 'X', sections: [ { name: 'A', teacher: 'Mrs. Priya Mehta' }, { name: 'B', teacher: 'Mr. Sunil Kumar' } ] },
  ],
  availableClasses: ['PG', 'Nursery', 'LKG', 'UKG', '1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th', '9th', '10th'],
}

/* ──────────────────────────────────────────────
   AUTH PROVIDER
   ────────────────────────────────────────────── */
export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('nms_user')
    return saved ? JSON.parse(saved) : null
  })
  const [currentSession, setCurrentSession] = useState(() => {
    return localStorage.getItem('nms_session') || '2026-27'
  })
  const [error, setError] = useState('')

  useEffect(() => {
    if (user) localStorage.setItem('nms_user', JSON.stringify(user))
    else localStorage.removeItem('nms_user')
  }, [user])

  useEffect(() => {
    localStorage.setItem('nms_session', currentSession)
  }, [currentSession])

  const login = (username, password) => {
    setError('')
    const dynamicUsers = JSON.parse(localStorage.getItem('nms_dynamic_users') || '[]')
    const allUsers = [...USERS, ...dynamicUsers]
    
    const found = allUsers.find(
      u => u.username.toLowerCase() === username.toLowerCase() && u.password === password
    )
    if (found) {
      const { password: _, ...safeUser } = found
      setUser(safeUser)
      return true
    }
    setError('Invalid username or password. Please try again.')
    return false
  }

  const logout = () => {
    setUser(null)
    setError('')
  }

  const updateSession = (year) => {
    setCurrentSession(year)
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, error, setError, currentSession, updateSession }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
