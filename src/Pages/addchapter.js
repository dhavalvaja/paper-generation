import { doc, getDoc, setDoc, Timestamp, updateDoc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { Alert, Button, Form } from 'react-bootstrap'
import { db } from '../firebase-config'

export default function AddChapter() {

  const [subject, setSubject] = useState([])
  const [selectedSemester, setSelectedSemester] = useState("")
  const [selectedSubject, setSelectedSubject] = useState("")
  const [chapter, setchapter] = useState("")
  const [chapternumber, setchapternumber] = useState("")
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

  async function AddChapterToSubject(e) {
    e.preventDefault()
    console.log(selectedSemester);
    console.log(selectedSubject);
    console.log(chapter);
    console.log(chapternumber);

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

    var newDocumentData = {}
    const ts = Timestamp.fromDate(new Date()).toDate()
    const chapterId = chapter + " " + ts.getFullYear() + "-" + ts.getMonth() + "-" + ts.getDate() + " " + ts.getHours() + ":" + ts.getMinutes() + ":" + ts.getSeconds()
    console.log(chapterId);
    if (docData[selectedSubject]) {
      docData[selectedSubject][chapternumber] = {
        chapterId: chapterId,
        chapterName: chapter
      }
      newDocumentData = docData
    } else {
      newDocumentData[selectedSubject] = {
        [chapternumber]: {
          chapterId: chapterId,
          chapterName: chapter
        }
      }
    }
    try {
      await updateDoc(doc(db, "IT", selectedSemester), newDocumentData)
      await setDoc(doc(db, `IT/${selectedSemester}/${selectedSubject}`, chapterId), {})

      for (let index = 0; index < 8; index++) {
        await setDoc(doc(db, `IT/${selectedSemester}/${selectedSubject}/${chapterId}/questions`, "type " + index), {})
      }

      setsalert(true)
    } catch (error) {
      setfalert(true)
    }
  }

  return (
    <div className='container w-75 mt-3'>
      <h1 className='text-center'>Add Chapter</h1>
      <div className='container w-50'>
        <Alert show={salert} variant='success' onClose={() => { setsalert(false) }} dismissible>Chapter added successfully!!</Alert>
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

          <Form.Group className='mb-3' controlId='formchapter'>
            <Form.Label>Chapter name</Form.Label>
            <Form.Control type='text' placeholder='Enter Chapter' onChange={(e) => { setchapter(e.target.value) }} />
          </Form.Group>

          <Form.Group className='mb-3' controlId='formchapterno'>
            <Form.Label>Chapter number</Form.Label>
            <Form.Control type='text' placeholder='Enter Chapter no.' onChange={(e) => { setchapternumber(e.target.value) }} />
          </Form.Group>

          <Button variant='primary' type="submit" onClick={AddChapterToSubject}>Add Chapter</Button>
        </Form>
      </div>
    </div>
  )
}
