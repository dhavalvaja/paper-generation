import React, { useEffect, useState } from 'react'
import { Alert, Button, Form } from 'react-bootstrap'
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { Multiselect } from 'multiselect-react-dropdown'
import { db } from '../firebase-config'

export default function AddCO() {

  const [subject, setSubject] = useState([])
  const [selectedSemester, setSelectedSemester] = useState("")
  const [selectedSubject, setSelectedSubject] = useState("")
  const [co, setCo] = useState("")
  const skills = [
    { skill: "Applying" },
    { skill: "Understanding" },
    { skill: "Analyzing" },
    { skill: "creating" },
    { skill: "Remembering" },
    { skill: "Evaluting" }
  ]
  const [skillOption] = useState(skills)
  const [selectedSkills, setSelectedSkills] = useState([])

  const [salert, setsalert] = useState(false)
  const [falert, setfalert] = useState(false)

  useEffect(() => {
    async function fetchSubject() {
      if (selectedSemester !== "") {
        await getDoc(doc(db, "IT", selectedSemester))
          .then((value) => {
            setSubject([])
            if (value.exists()) {
              console.log(value.data()["subject"])
              setSubject(value.data()["subject"])

            } else {
              console.log("no such document");
            }
          })
      }
    }
    fetchSubject()
  }, [selectedSemester])


  async function AddCourseObjective(event) {
    event.preventDefault()
    console.log(selectedSemester)
    console.log(selectedSubject);
    console.log(co)
    console.log(selectedSkills)
    var docData
    await getDoc(doc(db, "IT", selectedSemester))
      .then((value) => {
        if (value.exists()) {
          docData = value.data()
        }
        else {
          console.log("no such document");
        }
      }).catch((error) => { console.log(error); })
    console.log(docData);

    const codata = {
      [co]: {
        "remark": "",
        "skills": selectedSkills.map((skill) => {
          return skill["skill"]
        })
      }
    }
    if (docData[selectedSubject]) {
      if (docData[selectedSubject]["CO"]) {
        docData[selectedSubject]["CO"] = {...docData[selectedSubject]["CO"],...codata}
      } else {
        docData[selectedSubject] = { "CO": codata }
      }
    } else {
      docData = { [selectedSubject]: { "CO": codata } }
    }
    console.log(docData);
    await updateDoc(doc(db, "IT", selectedSemester), docData).then(() => {
      console.log("co added");
      setsalert(true)
    }).catch((error) => {
      console.log(error)
      setfalert(true)
    })

  }

  return (
    <div className='container w-75 mt-3'>
      <h1 className='text-center'>Add Course Objective</h1>
      <div className='container w-50'>
        <Alert show={salert} variant='success' onClose={() => { setsalert(false) }} dismissible>Course Objective added successfully!!</Alert>
        <Alert show={falert} variant='danger' onClose={() => { setfalert(false) }} dismissible>Somthing went wrong!!</Alert>
        <Form>

          <Form.Group className='mb-3' controlId='formsemester'>
            <Form.Label>Semester</Form.Label>
            <Form.Select onChange={(e) => { setSelectedSemester(e.target.value) }} >
              <option value="">Select Semester</option>
              <option value="sem 1">Sem 1</option>
              <option value="sem 2">Sem 2</option>
              <option value="sem 3">Sem 3</option>
              <option value="sem 4">Sem 4</option>
              <option value="sem 5">Sem 5</option>
              <option value="sem 6">Sem 6</option>
              <option value="sem 7">Sem 7</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className='mb-3' controlId='formsubject'>
            <Form.Label>Subject</Form.Label>
            <Form.Select onChange={(e) => { setSelectedSubject(e.target.value) }}>
              <option value="">Select Subject</option>
              {subject && subject.map((element, key) => {
                return (
                  <option key={key} value={element}>{element}</option>
                )
              })}
            </Form.Select>
          </Form.Group>

          <Form.Group className='mb-3' controlId='formco'>
            <Form.Label>CO name</Form.Label>
            <Form.Control type='text' placeholder='Enter CO' onChange={(e) => { setCo(e.target.value) }} />
          </Form.Group>

          <Form.Group className='mb-3' controlId='formskills'>
            <Form.Label>Skills</Form.Label>
            <Multiselect className='mb-3 bg-light text-dark' options={skillOption} displayValue="skill" onSelect={(args) => { setSelectedSkills(args) }} />
          </Form.Group>

          <Button className='mb-3' variant='primary' type="submit" onClick={AddCourseObjective}>Add CO</Button>
        </Form>

      </div>
    </div>
  )
}
