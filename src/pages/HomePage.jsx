import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const HomePage = () => {
  const [students, setStudents] = useState([])
  const getStudents = async () => {
    const resp = await axios.get('https://localhost:5001/api/student')
    setStudents(resp.data)
  }

  useEffect(() => {
    getStudents()
  }, [])
  return (
    <>
      <header>All Students</header>
      <ul>
        {students.map(student => {
          return (
            <li>
              <Link to={`/student/${student.id}`}>{student.fullName}</Link>
            </li>
          )
        })}
      </ul>
    </>
  )
}

export default HomePage
