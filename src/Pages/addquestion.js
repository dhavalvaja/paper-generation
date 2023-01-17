import { doc, getDoc, updateDoc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { Alert, Button, Col, Form, Row } from 'react-bootstrap'
import { db } from '../firebase-config'

export default function AddQuestion() {

  const [selectedSemester, setSelectedSemester] = useState("")
  const [selectedSubject, setSelectedSubject] = useState("")
  const [selectedChapter, setselectedChapter] = useState("")
  const [selectedco, setSelectedCo] = useState("")
  const [selectedSkill, setSelectedSkill] = useState("")
  const [selectedType, setSelectedType] = useState("")
  const [question, setquestion] = useState("")
  const [optiona, setoptiona] = useState("")
  const [optionb, setoptionb] = useState("")
  const [optionc, setoptionc] = useState("")
  const [optiond, setoptiond] = useState("")
  const [subject, setSubject] = useState([])
  const [chapter, setchapter] = useState([])
  const [co, setCo] = useState([])
  const [skills, setSkills] = useState([])
  const [salert, setsalert] = useState(false)
  const [falert, setfalert] = useState(false)
  const [optionvisible, setoptionvisible] = useState(false)

  useEffect(() => {
    setSubject([])
    async function fetchSubject() {
      if (selectedSemester !== "") {
        await getDoc(doc(db, "IT", selectedSemester))
          .then((value) => {
            setSubject([])
            if (value.exists()) {
              // console.log(value.data()["subject"])
              setSubject(value.data()["subject"])

            } else {
              console.log("no such document");
            }
          })
      }
    }
    fetchSubject()
  }, [selectedSemester])

  useEffect(() => {
    async function fetchChapter() {
      if (selectedSubject !== "") {
        await getDoc(doc(db, "IT", selectedSemester))
          .then((value) => {
            setchapter([])
            if (value.exists()) {
              // console.log(value.data());
              if (value.data()[selectedSubject]) {
                // console.log(value.data()[selectedSubject]);

                var chapterList = Object.keys(value.data()[selectedSubject]).map(chapterno => {
                  return {
                    chapternumber: chapterno,
                    ...value.data()[selectedSubject][chapterno]
                  }
                })
                chapterList.pop()
                setchapter(chapterList)
                // console.log(chapterList);

                var coObj = value.data()[selectedSubject]["CO"]
                var colist = Object.keys(coObj).map(conumber => {
                  return {
                    conumber: conumber,
                    ...coObj[conumber]
                  }
                })
                // console.log(colist);
                setCo(colist)

              } else {
                setchapter([])
              }
            } else {
              console.log("no such document");
            }

          })
      }
    }
    fetchChapter()
  }, [selectedSemester, selectedSubject])

  useEffect(() => {
    if (co) {
      co.forEach((element) => {
        if (element["conumber"] === selectedco) {
          setSkills(element["skills"])
        }
      })
    }
  }, [co, selectedco])

  useEffect(() => {
    if (selectedType !== "") {
      if (selectedType === "type 3") {
        setoptionvisible(true)
      } else {
        setoptionvisible(false)
      }
    }
  }, [selectedType])


  async function AddQuestionToSubject(e) {
    e.preventDefault()
    console.log(selectedSemester);
    console.log(selectedSubject);
    console.log(selectedChapter);
    console.log(selectedco);
    console.log(selectedSkill);
    console.log(selectedType);
    if (selectedSemester !== "" && selectedSubject !== "" && selectedChapter !== "" && selectedco !== "" && selectedSkill !== "" && selectedType !== "" && question !== "") {
      const typeRef = doc(db, `IT/${selectedSemester}/${selectedSubject}/${selectedChapter}/questions`, selectedType)
      const chapterRef = doc(db, `IT/${selectedSemester}/${selectedSubject}`, selectedChapter)
      var typeData
      var chapterData
      const questionObj = (selectedType === "type 3") ? {
        "optionA": optiona,
        "optionAImg": "",
        "optionB": optionb,
        "optionBImg": "",
        "optionC": optionc,
        "optionCImg": "",
        "optionD": optiond,
        "optionDImg": "",
        "questionText": question,
        "questionImg": ""
      } : {
        "questionText": question,
        "imgUrl": ""
      }
      try {
        await getDoc(typeRef)
          .then(async (value) => {
            if (value.exists()) {
              typeData = value.data()
              if (typeData[selectedco]) {
                if (typeData[selectedco][selectedSkill]) {
                  typeData[selectedco][selectedSkill].push(questionObj)
                  // await updateDoc(typeRef, typeData)
                } else {
                  typeData[selectedco] = {
                    [selectedSkill]: [questionObj],
                    ...typeData[selectedco]
                  }
                }
              } else {
                typeData = {
                  [selectedco]: { [selectedSkill]: [questionObj] }
                }
              }
              console.log(typeData);
              await updateDoc(typeRef, typeData)
            } else {
              console.error("Somthing is wrong");
            }
          })
        await getDoc(chapterRef)
          .then(async (value) => {
            if (value.exists()) {
              chapterData = value.data()
              if (chapterData[selectedType]) {
                if (chapterData[selectedType][selectedco]) {
                  if (chapterData[selectedType][selectedco][selectedSkill]) {
                    var count = chapterData[selectedType][selectedco][selectedSkill]
                    chapterData[selectedType][selectedco][selectedSkill] = count + 1
                  } else {
                    chapterData[selectedType][selectedco] = {
                      [selectedSkill]: 1,
                      ...chapterData[selectedType][selectedco]
                    }
                  }
                } else {
                  chapterData[selectedType] = {
                    [selectedco]: {
                      [selectedSkill]: 1
                    },
                    ...chapterData[selectedType]
                  }
                }
              } else {
                chapterData = {
                  [selectedType]: {
                    [selectedco]: {
                      [selectedSkill]: 1
                    }
                  }
                }
              }
              console.log(chapterData);
              await updateDoc(chapterRef, chapterData)
            }
          })
        setsalert(true)
        // setSelectedSemester("")
        // setSelectedSubject("")
        // setselectedChapter("")
        // setSelectedCo("")
        // setSelectedSkill("")
        // setSelectedType("")
        // setquestion("")
        // setoptiona("")
        // setoptionb("")
        // setoptionc("")
        // setoptiond("")
      } catch (error) {
        setfalert(true)
      }
    }
  }

  return (
    <div className='container w-80 mb-3'>
      <h1 className='text-center'>Add Question</h1>
      <div className='container w-50'>
        <Alert show={salert} variant='success' onClose={() => { setsalert(false) }} dismissible>Question added successfully!!</Alert>
        <Alert show={falert} variant='danger' onClose={() => { setfalert(false) }} dismissible>Somthing went wrong!!</Alert>
        <Form >
          <Form.Group className='mb-3' controlId='formsemester'>
            <Form.Label>Semester</Form.Label>
            <Form.Select value={selectedSemester} onChange={(e) => { setSelectedSemester(e.target.value) }} >
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
            <Form.Select value={selectedSubject} onChange={(e) => { setSelectedSubject(e.target.value) }}>
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
            <Form.Select value={selectedChapter} onChange={(e) => { setselectedChapter(e.target.value) }}>
              <option value="">select chapter</option>
              {chapter && chapter.map(
                (element, key) => {
                  return (
                    <option key={key} value={element.chapterId}>{element.chapterName}</option>
                  )
                }
              )}
            </Form.Select>
          </Form.Group>

          <Form.Group className='mb-3' controlId='formco'>
            <Form.Label>CO name</Form.Label>
            <Form.Select value={selectedco} onChange={(e) => { setSelectedCo(e.target.value) }}>
              <option value="">select co</option>
              {co && co.map((element, key) => {
                return (
                  <option key={key} value={element.conumber}>{element.conumber}</option>
                )
              })}
            </Form.Select>
          </Form.Group>

          <Form.Group className='mb-3' controlId='formskills'>
            <Form.Label>Skills</Form.Label>
            <Form.Select value={selectedSkill} onChange={(e) => { setSelectedSkill(e.target.value) }}>
              <option value="">select skill</option>
              {skills && skills.map((element, key) => {
                return (
                  <option key={key} value={element}>{element}</option>
                )
              })}
            </Form.Select>
          </Form.Group>

          <Form.Group className='mb-3' controlId='formqtype'>
            <Form.Label>Quetion type</Form.Label>
            <Form.Select value={selectedType} className='mb-3' onChange={(e) => { setSelectedType(e.target.value) }} >
              <option value="">select type</option>
              <option value="type 1">fill in the blank</option>
              <option value="type 2">True or False</option>
              <option value="type 3">MCQs</option>
              <option value="type 4">One Mark Questions</option>
              <option value="type 5">Two Mark Questions</option>
              <option value="type 6">Four Mark Questions</option>
              <option value="type 7">Five Mark Questions</option>
              <option value="type 8">Six Mark Questions</option>
            </Form.Select>
          </Form.Group>

          <Form.Group>
            <Form.Label>Question Statement</Form.Label>
            <Form.Control className='mb-3' value={question} type='text' placeholder='Enter Question' onChange={(e) => { setquestion(e.target.value) }} />
          </Form.Group>

          {
            optionvisible &&
            <Form.Group>
              <Form.Label>options</Form.Label>
              <Row className='mb-3'>
                <Col>
                  <Form.Control type='text' placeholder='A' value={optiona} onChange={(e) => { setoptiona(e.target.value) }} />
                </Col>
                <Col>
                  <Form.Control type='text' placeholder='B' value={optionb} onChange={(e) => { setoptionb(e.target.value) }} />
                </Col>
                <Col>
                  <Form.Control type='text' placeholder='C' value={optionc} onChange={(e) => { setoptionc(e.target.value) }} />
                </Col>
                <Col>
                  <Form.Control type='text' placeholder='D' value={optiond} onChange={(e) => { setoptiond(e.target.value) }} />
                </Col>
              </Row>
            </Form.Group>
          }
          <Button className='mb-3' variant='primary' type="submit" onClick={AddQuestionToSubject}>Add question</Button>
        </Form>
      </div>
    </div >
  )
}
