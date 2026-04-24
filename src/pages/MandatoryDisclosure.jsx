import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { FiCheckCircle, FiAlertCircle } from 'react-icons/fi'
import './About.css'

const disclosureData = {
  general: [
    { label: 'Name of the School', value: 'New Morning Star Public School' },
    { label: 'Affiliation No.', value: '2730XXX' },
    { label: 'School Code', value: 'XXXXX' },
    { label: 'Address', value: '123, Education Lane, Civil Lines, New Delhi - 110001' },
    { label: 'State', value: 'Delhi' },
    { label: 'District', value: 'New Delhi' },
    { label: 'Pin Code', value: '110001' },
    { label: 'Phone', value: '+91 98765 43210' },
    { label: 'Email', value: 'info@newmorningstar.edu.in' },
    { label: 'Website', value: 'www.newmorningstar.edu.in' },
    { label: 'Year of Establishment', value: '2001' },
    { label: 'Status of Affiliation', value: 'Permanent / Regular' },
    { label: 'Affiliation Period', value: '2023 to 2028' },
  ],
  trust: [
    { label: 'Name of Trust/Society', value: 'Morning Star Educational Trust' },
    { label: 'Registration No.', value: 'DL/XXX/2001' },
    { label: 'Date of Registration', value: '15-01-2001' },
    { label: 'Members of Trust', value: 'Mr. R.K. Sharma (Chairman), Mrs. S. Sharma (Secretary), Mr. A. Kumar (Treasurer)' },
  ],
  certificates: [
    { label: 'NOC from State Government', value: 'Obtained - DL/EDU/NOC/2001/XXX' },
    { label: 'Recognition Certificate', value: 'Valid - RE/DEL/2001/XXX' },
    { label: 'Building Safety Certificate', value: 'Valid till 2028' },
    { label: 'Fire Safety Certificate', value: 'Valid till 2027' },
    { label: 'DEO Certificate', value: 'Obtained' },
    { label: 'Water & Sanitation Certificate', value: 'Valid - Health Dept. Certified' },
    { label: 'Health & Hygiene Certificate', value: 'Valid till 2027' },
  ],
  staff: [
    { category: 'Principal', count: 1, qual: 'Ph.D., M.Ed.' },
    { category: 'Vice Principal', count: 1, qual: 'M.A., B.Ed.' },
    { category: 'PGT (Post Graduate Teachers)', count: 30, qual: 'M.A./M.Sc./M.Com., B.Ed.' },
    { category: 'TGT (Trained Graduate Teachers)', count: 40, qual: 'B.A./B.Sc./B.Com., B.Ed.' },
    { category: 'PRT (Primary Teachers)', count: 25, qual: 'B.A., D.El.Ed./B.Ed.' },
    { category: 'Computer Teachers', count: 5, qual: 'MCA/BCA, B.Ed.' },
    { category: 'Physical Education', count: 3, qual: 'M.P.Ed./B.P.Ed.' },
    { category: 'Art/Music/Dance', count: 4, qual: 'BFA/M.A. Music' },
    { category: 'Lab Assistants', count: 4, qual: 'B.Sc.' },
    { category: 'Administrative Staff', count: 8, qual: 'Various' },
  ],
  infrastructure: [
    { label: 'Total Campus Area', value: '5 Acres' },
    { label: 'Built-up Area', value: '45,000 sq. ft.' },
    { label: 'Number of Classrooms', value: '60' },
    { label: 'Smart Classrooms', value: '45' },
    { label: 'Science Labs', value: '4 (Physics, Chemistry, Biology, Computer)' },
    { label: 'Library', value: '1 (15,000+ books)' },
    { label: 'Playground', value: '2 Acres' },
    { label: 'Auditorium', value: '1 (500 seats)' },
    { label: 'Swimming Pool', value: '1 (Semi-Olympic)' },
    { label: 'Rooms for Co-curricular', value: '6' },
  ],
}

export default function MandatoryDisclosure() {
  return (
    <>
      <Helmet>
        <title>Mandatory Public Disclosure - New Morning Star Public School (CBSE)</title>
        <meta name="description" content="CBSE Mandatory Public Disclosure for New Morning Star Public School - affiliation details, certificates, staff info, fee structure, and more." />
      </Helmet>

      <section className="page-banner" style={{ background: 'linear-gradient(135deg, #b45309, #78350f)' }}>
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <span className="section-badge" style={{ background: 'rgba(255,255,255,0.15)', color: 'white', border: 'none' }}>CBSE Compliance</span>
            <h1 className="page-banner-title">Mandatory Public Disclosure</h1>
            <p className="page-banner-desc">As per CBSE guidelines for transparency and accountability</p>
          </motion.div>
        </div>
      </section>

      <section className="section">
        <div className="container" style={{ maxWidth: 900 }}>
          <div style={{ background: 'var(--gold-50)', padding: 'var(--space-4)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--gold-200)', marginBottom: 'var(--space-8)', display: 'flex', alignItems: 'flex-start', gap: 'var(--space-3)', fontSize: '0.875rem', color: 'var(--gray-700)' }}>
            <FiAlertCircle style={{ color: 'var(--gold-600)', flexShrink: 0, marginTop: 2 }} />
            <span>This information is published as per CBSE Affiliation Bye-Laws and is updated annually. Last updated: April 2026.</span>
          </div>

          {/* General Information */}
          <div style={{ marginBottom: 'var(--space-10)' }}>
            <h2 style={{ fontSize: 'var(--text-2xl)', fontWeight: 700, marginBottom: 'var(--space-4)', color: 'var(--gray-800)', fontFamily: 'var(--font-display)' }}>
              A. General Information
            </h2>
            <div className="table-wrapper">
              <table className="table">
                <tbody>
                  {disclosureData.general.map((item, i) => (
                    <tr key={i}><td style={{ fontWeight: 600, width: '40%' }}>{item.label}</td><td>{item.value}</td></tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Trust/Society */}
          <div style={{ marginBottom: 'var(--space-10)' }}>
            <h2 style={{ fontSize: 'var(--text-2xl)', fontWeight: 700, marginBottom: 'var(--space-4)', color: 'var(--gray-800)', fontFamily: 'var(--font-display)' }}>
              B. Trust / Society Information
            </h2>
            <div className="table-wrapper">
              <table className="table">
                <tbody>
                  {disclosureData.trust.map((item, i) => (
                    <tr key={i}><td style={{ fontWeight: 600, width: '40%' }}>{item.label}</td><td>{item.value}</td></tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Certificates */}
          <div style={{ marginBottom: 'var(--space-10)' }}>
            <h2 style={{ fontSize: 'var(--text-2xl)', fontWeight: 700, marginBottom: 'var(--space-4)', color: 'var(--gray-800)', fontFamily: 'var(--font-display)' }}>
              C. Certificates & Documents
            </h2>
            <div className="table-wrapper">
              <table className="table">
                <tbody>
                  {disclosureData.certificates.map((item, i) => (
                    <tr key={i}>
                      <td style={{ fontWeight: 600, width: '40%' }}>{item.label}</td>
                      <td><span className="badge badge-success"><FiCheckCircle size={12} style={{ marginRight: 4 }} />{item.value}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Staff */}
          <div style={{ marginBottom: 'var(--space-10)' }}>
            <h2 style={{ fontSize: 'var(--text-2xl)', fontWeight: 700, marginBottom: 'var(--space-4)', color: 'var(--gray-800)', fontFamily: 'var(--font-display)' }}>
              D. Staff Details (Qualification-wise)
            </h2>
            <div className="table-wrapper">
              <table className="table">
                <thead>
                  <tr><th>Category</th><th>No. of Staff</th><th>Qualifications</th></tr>
                </thead>
                <tbody>
                  {disclosureData.staff.map((item, i) => (
                    <tr key={i}>
                      <td style={{ fontWeight: 600 }}>{item.category}</td>
                      <td>{item.count}</td>
                      <td>{item.qual}</td>
                    </tr>
                  ))}
                  <tr style={{ background: 'var(--gray-50)', fontWeight: 700 }}>
                    <td>Total</td>
                    <td>{disclosureData.staff.reduce((a, s) => a + s.count, 0)}</td>
                    <td>-</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Infrastructure */}
          <div style={{ marginBottom: 'var(--space-10)' }}>
            <h2 style={{ fontSize: 'var(--text-2xl)', fontWeight: 700, marginBottom: 'var(--space-4)', color: 'var(--gray-800)', fontFamily: 'var(--font-display)' }}>
              E. Infrastructure Details
            </h2>
            <div className="table-wrapper">
              <table className="table">
                <tbody>
                  {disclosureData.infrastructure.map((item, i) => (
                    <tr key={i}><td style={{ fontWeight: 600, width: '40%' }}>{item.label}</td><td>{item.value}</td></tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Fee Structure */}
          <div style={{ marginBottom: 'var(--space-10)' }} id="fees">
            <h2 style={{ fontSize: 'var(--text-2xl)', fontWeight: 700, marginBottom: 'var(--space-4)', color: 'var(--gray-800)', fontFamily: 'var(--font-display)' }}>
              F. Fee Structure (Session 2026-27)
            </h2>
            <div className="table-wrapper">
              <table className="table">
                <thead>
                  <tr><th>Class</th><th>Admission Fee</th><th>Monthly Tuition</th><th>Annual Charges</th></tr>
                </thead>
                <tbody>
                  {[
                    ['Nursery - UKG', '25,000', '3,500', '8,000'],
                    ['I - V', '30,000', '4,000', '10,000'],
                    ['VI - VIII', '35,000', '4,500', '12,000'],
                    ['IX - X', '40,000', '5,000', '14,000'],
                    ['XI - XII', '45,000', '5,500', '16,000'],
                  ].map((row, i) => (
                    <tr key={i}><td style={{ fontWeight: 600 }}>{row[0]}</td><td>&#8377; {row[1]}</td><td>&#8377; {row[2]}</td><td>&#8377; {row[3]}</td></tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Results */}
          <div>
            <h2 style={{ fontSize: 'var(--text-2xl)', fontWeight: 700, marginBottom: 'var(--space-4)', color: 'var(--gray-800)', fontFamily: 'var(--font-display)' }}>
              G. Academic Results (Class X & XII)
            </h2>
            <div className="table-wrapper">
              <table className="table">
                <thead>
                  <tr><th>Year</th><th>Class</th><th>Appeared</th><th>Passed</th><th>Pass %</th></tr>
                </thead>
                <tbody>
                  <tr><td rowSpan={2} style={{ fontWeight: 700 }}>2025</td><td>X</td><td>120</td><td>120</td><td><span className="badge badge-success">100%</span></td></tr>
                  <tr><td>XII</td><td>95</td><td>95</td><td><span className="badge badge-success">100%</span></td></tr>
                  <tr><td rowSpan={2} style={{ fontWeight: 700 }}>2024</td><td>X</td><td>115</td><td>115</td><td><span className="badge badge-success">100%</span></td></tr>
                  <tr><td>XII</td><td>88</td><td>88</td><td><span className="badge badge-success">100%</span></td></tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
