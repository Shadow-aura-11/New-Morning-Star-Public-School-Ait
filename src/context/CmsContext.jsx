import { createContext, useContext, useState, useEffect } from 'react'

const CmsContext = createContext(null)

const INITIAL_CONTENT = {
  session: '2026-27',
  home: {
    hero: {
      title: 'Nurturing Minds, Building Future Leaders',
      subtitle: 'New Morning Star Public School provides a holistic environment where every child discovers their true potential and grows with values.',
      cta: 'Explore Admissions',
      image: 'https://images.unsplash.com/photo-1523050853064-909787c94541?auto=format&fit=crop&q=80'
    },
    stats: [
      { label: 'Academic Excellence', value: '100%', icon: 'Award' },
      { label: 'Experienced Faculty', value: '50+', icon: 'Users' },
      { label: 'Modern Labs', value: '10+', icon: 'Beaker' },
      { label: 'Sports & Arts', value: '25+', icon: 'Star' }
    ]
  },
  about: {
    title: 'About Our Institution',
    image: 'https://images.unsplash.com/photo-1541339907198-e08756ebafe3?auto=format&fit=crop&q=80',
    description: 'Founded with a vision to provide quality education, New Morning Star Public School has been a beacon of learning for over two decades. We focus on academic excellence, character building, and physical development.',
    mission: 'To empower students with knowledge, skills, and values that enable them to succeed in a rapidly changing world.',
    vision: 'To be a globally recognized center of excellence in school education.'
  },
  admissions: {
    title: 'Join Our Community',
    image: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&q=80',
    description: 'Admissions are open for the academic year 2026-27. We welcome students from all backgrounds to join our family.',
    process: 'Fill the inquiry form, attend an interaction session, and complete the documentation.',
    fees: {
      title: 'Standard Fee Structure',
      headers: ['Class', 'Admission Fee', 'Tuition Fee', 'Annual Charges'],
      rows: [
        ['Nursery - UKG', '25,000', '3,500/month', '8,000'],
        ['I - V', '30,000', '4,000/month', '10,000'],
        ['VI - VIII', '35,000', '4,500/month', '12,000'],
        ['IX - X', '40,000', '5,000/month', '14,000']
      ]
    },
    transport: {
      title: 'Transport Fee Structure',
      headers: ['Location / Zone', 'Monthly Transport Fee'],
      rows: [
        ['Subhash Nagar (Internal)', '1,200/month'],
        ['Rajouri Garden / Tagore Garden', '1,800/month'],
        ['Vikaspuri / Janakpuri', '2,500/month']
      ]
    },
    googleSheetUrl: ''
  },
  results: [
    { year: '2025', class: 'Class X', name: 'Aarav Sharma', score: '98.4%', image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80' },
    { year: '2025', class: 'Class X', name: 'Priya Singh', score: '97.8%', image: 'https://images.unsplash.com/photo-1594186166098-816403db9b03?auto=format&fit=crop&q=80' },
    { year: '2025', class: 'Class XII', name: 'Rohit Kumar', score: '97.6%', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80' },
    { year: '2025', class: 'Class XII', name: 'Sneha Gupta', score: '96.8%', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80' }
  ],
  gallery: {
    title: 'Life at New Morning Star',
    images: [
      { url: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80', caption: 'School Annual Function', category: 'Cultural' },
      { url: 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&q=80', caption: 'Science Fair 2025', category: 'Academic' },
      { url: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&q=80', caption: 'Sports Meet', category: 'Sports' }
    ]
  },
  calendar: [
    { month: 'April', events: 'New Session Begins, Orientation Day, Earth Day Celebration' },
    { month: 'May', events: 'Summer Camp, Unit Test I, Mother\'s Day Celebration' },
    { month: 'June', events: 'Summer Vacation, Environment Day Activities' },
    { month: 'July', events: 'Session Resumes, Van Mahotsav, Inter-house Quiz' },
    { month: 'August', events: 'Independence Day, Raksha Bandhan, Half Yearly Preparation' },
    { month: 'September', events: 'Half Yearly Exams, Teacher\'s Day, Hindi Diwas' },
    { month: 'October', events: 'Gandhi Jayanti, Dussehra Break, Science Exhibition' },
    { month: 'November', events: 'Diwali Break, Children\'s Day, Unit Test II' },
    { month: 'December', events: 'Annual Day, Christmas Celebration, Winter Break' },
    { month: 'January', events: 'Republic Day, Pre-Board Exams (X), Sports Day' },
    { month: 'February', events: 'Board Exams Begin, Annual Exams Preparation' },
    { month: 'March', events: 'Annual Examinations, Result Declaration, Session Ends' },
  ],
  faculty: [
    { name: 'Dr. Sunita Sharma', role: 'Principal', qual: 'M.Ed., Ph.D. (Education)', exp: '25 years', dept: 'Administration', image: '' },
    { name: 'Mr. Rajesh Gupta', role: 'Vice Principal', qual: 'M.A., B.Ed.', exp: '20 years', dept: 'English', image: '' },
    { name: 'Mrs. Priya Mehta', role: 'Head of Science', qual: 'M.Sc. (Physics), B.Ed.', exp: '18 years', dept: 'Physics', image: '' },
    { name: 'Mr. Arun Singh', role: 'Senior Teacher', qual: 'M.Sc. (Chemistry), B.Ed.', exp: '15 years', dept: 'Chemistry', image: '' },
    { name: 'Mrs. Kavita Joshi', role: 'Senior Teacher', qual: 'M.Sc. (Biology), B.Ed.', exp: '14 years', dept: 'Biology', image: '' },
    { name: 'Mr. Sunil Kumar', role: 'Head of Mathematics', qual: 'M.Sc. (Math), B.Ed.', exp: '16 years', dept: 'Mathematics', image: '' },
    { name: 'Mrs. Neha Verma', role: 'Head of English', qual: 'M.A. (English), B.Ed.', exp: '12 years', dept: 'English', image: '' },
    { name: 'Mr. Deepak Yadav', role: 'Computer Teacher', qual: 'MCA, B.Ed.', exp: '10 years', dept: 'Computer Science', image: '' },
    { name: 'Mrs. Anita Rani', role: 'Hindi Teacher', qual: 'M.A. (Hindi), B.Ed.', exp: '13 years', dept: 'Hindi', image: '' },
    { name: 'Mr. Vikram Chauhan', role: 'Physical Education', qual: 'M.P.Ed.', exp: '11 years', dept: 'Sports', image: '' },
    { name: 'Mrs. Shalini Gupta', role: 'Art Teacher', qual: 'BFA, B.Ed.', exp: '9 years', dept: 'Art & Craft', image: '' },
    { name: 'Ms. Ritu Sharma', role: 'Music Teacher', qual: 'M.A. (Music)', exp: '8 years', dept: 'Music', image: '' },
  ],
  contact: {
    address: 'Near Main Road, Subhash Nagar, New Delhi - 110027',
    phone: '+91 11 2345 6789, +91 98765 43210',
    email: 'info@newmorningstar.edu.in',
    timings: 'Mon - Sat: 8:00 AM - 2:00 PM',
    facebook: 'https://facebook.com/newmorningstar',
    instagram: 'https://instagram.com/newmorningstar',
    twitter: 'https://twitter.com/newmorningstar',
    youtube: 'https://youtube.com/@newmorningstar'
  }
}

export function CmsProvider({ children }) {
  const [content, setContent] = useState(() => {
    const saved = localStorage.getItem('nms_cms_content')
    if (!saved) return INITIAL_CONTENT
    
    try {
      const parsed = JSON.parse(saved)
      // Migration: Ensure new sections exist
      const migrated = {
        ...INITIAL_CONTENT,
        ...parsed,
        home: { ...INITIAL_CONTENT.home, ...(parsed.home || {}) },
        about: { ...INITIAL_CONTENT.about, ...(parsed.about || {}) },
        contact: { ...INITIAL_CONTENT.contact, ...(parsed.contact || {}) },
        admissions: { ...INITIAL_CONTENT.admissions, ...(parsed.admissions || {}) },
        gallery: { ...INITIAL_CONTENT.gallery, ...(parsed.gallery || {}) },
        calendar: parsed.calendar || INITIAL_CONTENT.calendar,
        faculty: parsed.faculty || INITIAL_CONTENT.faculty,
        results: parsed.results || INITIAL_CONTENT.results
      }
      
      // Ensure fees/transport are objects not arrays
      if (migrated.admissions && Array.isArray(migrated.admissions.fees)) {
        migrated.admissions.fees = INITIAL_CONTENT.admissions.fees;
      }
      if (migrated.admissions && Array.isArray(migrated.admissions.transport)) {
        migrated.admissions.transport = INITIAL_CONTENT.admissions.transport;
      }
      
      return migrated;
    } catch (e) {
      return INITIAL_CONTENT
    }
  })

  useEffect(() => {
    localStorage.setItem('nms_cms_content', JSON.stringify(content))
  }, [content])

  const updateContent = (path, value) => {
    const newContent = { ...content }
    const keys = path.split('.')
    let current = newContent
    for (let i = 0; i < keys.length - 1; i++) {
      current = current[keys[i]]
    }
    current[keys[keys.length - 1]] = value
    setContent(newContent)
  }

  return (
    <CmsContext.Provider value={{ content, updateContent }}>
      {children}
    </CmsContext.Provider>
  )
}

export function useCms() {
  const ctx = useContext(CmsContext)
  if (!ctx) throw new Error('useCms must be used within CmsProvider')
  return ctx
}
