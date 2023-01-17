import { doc, updateDoc } from 'firebase/firestore'
import Multiselect from 'multiselect-react-dropdown'
import React, { useEffect, useState } from 'react'
import { Alert, Button, Col, Form, Row } from 'react-bootstrap'
import QuestionList from '../Components/questionList'
import { getChapterDetails, getCo, getSubjects } from '../db/dbops'
import { db } from '../firebase-config'

export default function AddBlueprint() {

  const [blueprintname, setBlueprintname] = useState("")
  const [selectedSemester, setSelectedSemester] = useState("")
  const [selectedSubject, setSelectedSubject] = useState("")
  const [selectedChapters, setSelectedChapters] = useState([])
  const [subject, setSubject] = useState([])
  const [, setChapter] = useState([])
  const [Mchapter, setMchapter] = useState([])
  const [co, setCo] = useState([])

  const defultQuestionList = { chapter: '', co: '', skill: '', type: '', available: '' }

  const [questionList, setQuestionList] = useState([[defultQuestionList]])

  const [isSelectInfo, setisSelectInfo] = useState(false)
  const [salert, setsalert] = useState(false)
  const [falert, setfalert] = useState(false)



  useEffect(() => {
    setSubject([])
    async function fetchSubject() {
      if (selectedSemester !== "") {
        await getSubjects(selectedSemester)
          .then((value) => {
            setSubject(value)
          })
      }
    }
    fetchSubject()
  }, [selectedSemester])

  useEffect(() => {
    setMchapter([])
    setChapter([])
    async function fetchChapter() {
      if (selectedSubject !== "" && selectedSemester !== "") {
        await getChapterDetails(selectedSemester, selectedSubject)
          .then((value) => {
            var MchapterList = value.map(element => {
              return { "chap": element["chapterName"], "Id": element["chapterId"] }
            })
            setChapter(value)
            setMchapter(MchapterList)
          })
        await getCo(selectedSemester, selectedSubject)
          .then((value) => {
            setCo(value)
          })
      }
    }
    fetchChapter()
  }, [selectedSemester, selectedSubject])

  async function onSubmit(e) {
    e.preventDefault()
    console.log(questionList);
    try {
      const blueprint = {
        blueprintname: blueprintname,
        semester: selectedSemester,
        subject: selectedSubject,
        chapters: Mchapter,
        questionList: { ...questionList }
      }
      console.log(questionList);
      // await updateDoc(doc(db, `Blueprint`, selectedSemester), { [blueprintname]: blueprint }).then(() => {
      //   setsalert(true)
      // }).catch(() => {
      //   setfalert(false)
      // })
    } catch (error) {
      console.log(error);
    }
  }

  function AddQuestion() {
    setQuestionList(prev => {
      return [
        ...prev,
        [defultQuestionList]
      ]
    })
  }

  function DeleteQuestion(element) {
    // var prevQuestionList = [...questionList]
    // prevQuestionList.splice(index, 1)
    // setQuestionList(prevQuestionList)
    setQuestionList(prev => {
      var temp = prev.filter((e) => {
        return e !== element
      })
      console.log(temp);
      return temp
    })
  }

  return (
    <div className='container w-75 '>
      <h1 className='text-center mb-3'>Add Blueprint</h1>

      <>
        <Alert show={salert} variant='success' onClose={() => { setsalert(false) }} dismissible>Blueprint added successfully!!</Alert>
        <Alert show={falert} variant='danger' onClose={() => { setfalert(false) }} dismissible>Somthing went wrong!!</Alert>
      </>

      <Form>
        <Row>
          <Col>
            <Form.Group>
              <Form.Label>Blueprint name</Form.Label>
              <Form.Control className='mb-3' onChange={(e) => { setBlueprintname(e.target.value) }} placeholder='enter blueprint name' />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group className='mb-3' controlId='formsemester'>
              <Form.Label>Semester</Form.Label>
              <Form.Select disabled={isSelectInfo} onChange={(e) => { setSelectedSemester(e.target.value) }} >
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
          </Col>
          <Col>
            <Form.Group className='mb-3' controlId='formsubject'>
              <Form.Label>Subject</Form.Label>
              <Form.Select disabled={isSelectInfo} onChange={(e) => { setSelectedSubject(e.target.value) }}>
                <option value="">Select Subject</option>
                {subject && subject.map((element, key) => {
                  return (
                    <option key={key} value={element}>{element}</option>
                  )
                })}
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>

        <Row className='mb-3'>
          <Col>
            <Form.Group className='mb-3' controlId='formchapter'>
              <Form.Label>Chapters</Form.Label>
              <Multiselect disable={isSelectInfo} className='mb-3 bg-light text-dark' placeholder='select chapters' options={Mchapter} displayValue='chap' onSelect={(e) => { setSelectedChapters(e); }} onRemove={(e) => { setSelectedChapters(e); }}></Multiselect>
            </Form.Group>
          </Col>
        </Row>
        <Button onClick={() => {
          setisSelectInfo(!isSelectInfo)
          setQuestionList([[defultQuestionList]])
        }}>{!isSelectInfo ? "Done" : "change"}</Button>


        <Row className='mb-3'>
          <Col>
            <h1 className='text-center'>Select Questions</h1>
          </Col>
        </Row>

        <table className='table'>

          <thead>
            <tr>
              <th>chapter</th>
              <th>course objective</th>
              <th>skill</th>
              <th>type</th>
              <th>available</th>
            </tr>
          </thead>

          <tbody>
            {questionList.map((element, index) => {
              return <QuestionList
                key={index}
                questionList={questionList}
                setQuestionList={setQuestionList}
                chapters={selectedChapters}
                co={co}
                number={index}
                selectedSemester={selectedSemester}
                selectedSubject={selectedSubject}
                isSelectInfo={isSelectInfo}
                deleteQuestion={DeleteQuestion}
              />
            })}
          </tbody>

        </table>
        <Button className='m-3' onClick={AddQuestion}>Add Question</Button>

        <Button
          className='m-3'
          variant='primary'
          type='submit'
          onClick={onSubmit}
          disabled={!isSelectInfo}
        >Add Blueprint</Button>

      </Form>

    </div>
  )
}
