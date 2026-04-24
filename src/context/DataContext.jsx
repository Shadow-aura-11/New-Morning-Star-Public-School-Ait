import { createContext, useContext, useState, useEffect, useCallback } from 'react'

const DataContext = createContext(null)

const INITIAL_MOCK_STUDENTS = [
  { 
    id: 'STU001', name: 'Aarav Sharma', class: 'X', section: 'A', rollNo: 12, gender: 'M', attendance: 94, feeStatus: 'Partial', phone: '+91 98765 43210',
    dob: '2010-05-15', bloodGroup: 'B+', address: 'H-42, Rajouri Garden, New Delhi', admissionDate: '2015-04-01', fatherName: 'Mr. Vikram Sharma', motherName: 'Mrs. Suman Sharma', transport: 'Route 1'
  },
  { 
    id: 'STU002', name: 'Anika Sharma', class: '6th', section: 'B', rollNo: 8, gender: 'F', attendance: 97, feeStatus: 'Paid', phone: '+91 98765 43210',
    dob: '2014-08-22', bloodGroup: 'O+', address: 'H-42, Rajouri Garden, New Delhi', admissionDate: '2019-04-01', fatherName: 'Mr. Vikram Sharma', motherName: 'Mrs. Suman Sharma', transport: 'Route 1'
  }
]

export function DataProvider({ children }) {
  // 1. Centralized State
  const [students, setStudents] = useState(() => {
    const saved = localStorage.getItem('nms_students')
    return saved ? JSON.parse(saved) : INITIAL_MOCK_STUDENTS
  })

  const [attendance, setAttendance] = useState(() => {
    const saved = localStorage.getItem('nms_global_attendance')
    return saved ? JSON.parse(saved) : []
  })

  const [marks, setMarks] = useState(() => {
    const saved = localStorage.getItem('nms_exam_marks')
    return saved ? JSON.parse(saved) : {}
  })

  const [homework, setHomework] = useState(() => {
    const saved = localStorage.getItem('nms_homework')
    return saved ? JSON.parse(saved) : []
  })

  const [holidays, setHolidays] = useState(() => {
    const saved = localStorage.getItem('nms_holidays')
    return saved ? JSON.parse(saved) : ['2026-01-26', '2026-08-15', '2026-10-02']
  })

  // 2. Storage Sync (Cross-Tab Support)
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === 'nms_students') setStudents(JSON.parse(e.newValue))
      if (e.key === 'nms_global_attendance') setAttendance(JSON.parse(e.newValue))
      if (e.key === 'nms_exam_marks') setMarks(JSON.parse(e.newValue))
      if (e.key === 'nms_homework') setHomework(JSON.parse(e.newValue))
      if (e.key === 'nms_holidays') setHolidays(JSON.parse(e.newValue))
    }
    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [])

  // 3. Update Helpers
  const updateStudents = useCallback((newData) => {
    setStudents(newData)
    localStorage.setItem('nms_students', JSON.stringify(newData))
  }, [])

  const updateAttendance = useCallback((newData) => {
    setAttendance(newData)
    localStorage.setItem('nms_global_attendance', JSON.stringify(newData))
  }, [])

  const updateMarks = useCallback((newData) => {
    setMarks(newData)
    localStorage.setItem('nms_exam_marks', JSON.stringify(newData))
  }, [])

  const updateHomework = useCallback((newData) => {
    setHomework(newData)
    localStorage.setItem('nms_homework', JSON.stringify(newData))
  }, [])

  const updateHolidays = useCallback((newData) => {
    setHolidays(newData)
    localStorage.setItem('nms_holidays', JSON.stringify(newData))
  }, [])

  const value = {
    students, updateStudents,
    attendance, updateAttendance,
    marks, updateMarks,
    homework, updateHomework,
    holidays, updateHolidays
  }

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  )
}

export function useData() {
  const context = useContext(DataContext)
  if (!context) throw new Error('useData must be used within DataProvider')
  return context
}
