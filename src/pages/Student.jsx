import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Student = props => {
  const [student, setStudent] = useState({})

  const [doingWell, setDoingWell] = useState('')
  const [improve, setImprove] = useState('')
  const [attendance, setAttendance] = useState('')

  const getStudent = async () => {
    const resp = await axios.get(
      `https://localhost:5001/api/student/${props.match.params.id}`
    )

    setStudent(resp.data)
  }

  const sendProgressReportToApi = async () => {
    const resp = await axios.post('https://localhost:5001/api/progressreport', {
      attendanceIssues: attendance,
      improvement: improve,
      doingWell: doingWell,
      studentId: parseInt(props.match.params.id),
    })

    console.log(resp.data)
    setStudent(prev => {
      return {
        ...prev,
        progressReports: [...prev.progressReports.concat(resp.data)],
      }
    })
  }

  useEffect(() => {
    getStudent()
  }, [])

  return (
    <div>
      <h1>{student.fullName}</h1>
      <h2>GPA: {student.gpa}</h2>
      <h3>{student.isJoyful ? 'Joyful!!!!!!!' : 'Grumpy today'}</h3>
      <section>
        <header>New Progress report</header>
        doing well:{' '}
        <input
          type="text"
          value={doingWell}
          onChange={e => setDoingWell(e.target.value)}
        />
        could improve:{' '}
        <input
          type="text"
          value={improve}
          onChange={e => setImprove(e.target.value)}
        />
        attendance issues:{' '}
        <input
          type="text"
          value={attendance}
          onChange={e => setAttendance(e.target.value)}
        />
        <button onClick={sendProgressReportToApi}>
          Create Progress Report
        </button>
      </section>
      <section>
        <header>old progress reports</header>
        {student.progressReports &&
          (student.progressReports.length > 0 ? (
            <ul>
              {student.progressReports.map(report => {
                return (
                  <li>
                    Good: {report.doingWell}
                    Bad: {report.improvement}
                  </li>
                )
              })}
            </ul>
          ) : (
            <h3>No progress reports yet</h3>
          ))}
      </section>
    </div>
  )
}

export default Student
