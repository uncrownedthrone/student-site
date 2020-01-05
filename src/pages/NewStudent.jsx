import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'

const NewStudent = () => {
  const [student, setStudent] = useState({
    fullName: '',
    email: '',
    phone: '',
    slackName: '',
  })
  const [studentId, setStudentId] = useState()
  const [
    wasStudentCreatedSuccessfully,
    setWasStudentCreatedSuccessfully,
  ] = useState(false)

  const updateStudentObject = e => {
    e.persist()
    setStudent(prevStudent => ({
      ...prevStudent,
      [e.target.name]: e.target.value,
    }))
  }

  const submitStudent = async e => {
    e.preventDefault()
    const isValid = Object.keys(student).reduce((acc, key) => {
      return acc && student[key] !== ''
    }, true)
    console.log(isValid)
    if (isValid) {
      const resp = await axios.post('https://localhost:5001/api/student', {
        ...student,
        phoneNumber: student.phone,
      })
      console.log(resp.data)
      if (resp.status === 200) {
        setStudentId(resp.data.id)
      }
    }
  }

  useEffect(() => {
    if (studentId) {
      setWasStudentCreatedSuccessfully(true)
    }
  }, [studentId])

  return wasStudentCreatedSuccessfully ? (
    <Redirect to={`/student/${studentId}`} />
  ) : (
    <div>
      <form onSubmit={submitStudent}>
        <input
          type="text"
          placeholder="New Student's Name"
          value={student.fullName}
          name="fullName"
          onChange={updateStudentObject}
        />
        <input
          type="email"
          placeholder="Email"
          value={student.email}
          name="email"
          onChange={updateStudentObject}
        />
        <input
          type="text"
          placeholder="Phone Number"
          value={student.phone}
          name="phone"
          onChange={updateStudentObject}
        />
        <input
          type="text"
          placeholder="Slack Name"
          value={student.slackName}
          name="slackName"
          onChange={updateStudentObject}
        />
        <button>CREATE</button>
      </form>
    </div>
  )
}

export default NewStudent
