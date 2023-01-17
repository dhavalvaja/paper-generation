import React, { useEffect, useRef, useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { generatePaper, getBlueprints } from '../db/dbops'

export default function GeneratePaper() {

  const [blueprints, setBlueprints] = useState([])
  const blueprintRef = useRef("")
  const [paper, setPaper] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  // blueprintname, semester, subject, chapterlist, papertype, questionlist

  const fetchPaper = async () => {
    setIsLoading(true)

    var paperObj
    await generatePaper(blueprintRef.current.value).then((value) => {
      paperObj = value
      console.log(value);
    })
    setPaper(paperObj)

    setIsLoading(false)
  }

  useEffect(() => {
    // eslint-disable-next-line eqeqeq
    if (blueprintRef.current.value === "") {
      async function fetchBlueprints() {
        var blueprintList
        await getBlueprints().then((value) => {
          blueprintList = value
        })
        setBlueprints(blueprintList)
      }
      fetchBlueprints()
    }
  }, [])

  return (
    <div className='container w-75'>
      <h1 className='text-center'>Generate Paper</h1>
      <Row>
        <Col>
          <Form.Select className='mb-3'
            // value={blueprint}  onChange={(e) => { setBlueprint(e.target.value) }} 
            ref={blueprintRef}
          >
            <option value={""}>select blueprint</option>
            {
              blueprints && blueprints.map((element, key) => {
                return (
                  <option key={key} value={element}>{element}</option>
                )
              })
            }
          </Form.Select>
        </Col>
        <Col md='auto'>
          <Button className='mb-3' onClick={fetchPaper} disabled={isLoading}>Generate Paper</Button>
        </Col>
      </Row>
      {paper && paper.map((element) => {
        return (
          <Row key={element.qno} className='border m-2'>
            <Col md='auto'>
              <label className='form-label'>{element.qno}</label>
            </Col>
            <Col>
              <label className='form-label'>
                {element.question.questionText}
              </label>
              {element.type === "type 3" &&
                <Row>
                  <Col>
                    <label className='form-label'>
                      (A)  {element.question.optionA}
                    </label>
                  </Col>
                  <Col>
                    <label className='form-label'>
                      (B)  {element.question.optionB}
                    </label>
                  </Col>
                  <Col>
                    <label className='form-label'>
                      (C)  {element.question.optionC}
                    </label>
                  </Col>
                  <Col>
                    <label className='form-label'>
                      (D)  {element.question.optionD}
                    </label>
                  </Col>
                </Row>
              }
            </Col>
          </Row>
        )
      })}
    </div >
  )
}
