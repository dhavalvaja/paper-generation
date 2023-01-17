import React, { useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { getQuestionCount } from '../db/dbops'

export default function Question({
  isdone,
  setSubQuestionList,
  subQuestionList,
  chapters,
  co,
  selectedSemester,
  selectedSubject,
  index,
  deleteQuestion
}) {

  const [question, setQuestion] = useState({
    chapter: '',
    co: '',
    skill: '',
    type: ''
  })
  const [available, setAvailable] = useState(0)

  function getSkills(co1) {
    var element
    co.forEach(e => {
      if (e.co === co1) {
        element = e
      }
    })
    return element["skills"]
  }

  useEffect(() => {
    var prevQuestionList = subQuestionList
    prevQuestionList[index] = question
    setSubQuestionList(prevQuestionList)
  }, [index, question, subQuestionList, setSubQuestionList])

  function handleChange(event) {
    const { name, value } = event.target
    setQuestion(prevValue => {
      return {
        ...prevValue,
        [name]: value
      }
    })

  }

  async function handleClick(event) {
    await getQuestionCount(selectedSemester, selectedSubject, question.chapter, question.type, question.co, question.skill)
      .then((value) => {
        setAvailable(value)
      })
  }

  return (
    <>
      <tr>
        <td>
          <Form.Select name='chapter' disabled={isdone} value={question.chapter} onChange={handleChange} required >
            <option value="">Select</option>
            {chapters && chapters.map((ele, key) => { return (<option key={key} value={ele.chap}>{ele.chap}</option>) })}
          </Form.Select>
        </td>
        <td>
          <Form.Select name='co' disabled={isdone} value={question.co} onChange={handleChange} required >
            <option value="">Select</option>
            {co && co.map((ele) => (<option value={ele.co}>{ele.co}</option>))}
          </Form.Select>
        </td>
        <td>
          <Form.Select name='skill' disabled={isdone} value={question.skill} onChange={handleChange} required>
            <option value="">Select</option>
            {question.co && getSkills(question.co).map((ele) => {
              return (
                <option value={ele}>{ele}</option>
              )
            })}
          </Form.Select>
        </td>
        <td>
          <Form.Select name='type' disabled={isdone} value={question.type} onChange={handleChange} required>
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
        </td>
        <td className='text-center'>
          <Button variant='link' onClick={handleClick}>check</Button>
          <Form.Label>{available}</Form.Label>
        </td>
        <td>
          <Button variant='danger' onClick={() => {
            deleteQuestion(index)
          }}>Delete</Button>
        </td>
      </tr>
    </>
  )
}
