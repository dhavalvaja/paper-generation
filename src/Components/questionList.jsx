import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import Question from './question'

export default function QuestionList({
  questionList,
  setQuestionList,
  chapters,
  co,
  number,
  selectedSemester,
  selectedSubject,
  isSelectInfo,
  deleteQuestion
}) {

  const [subQuestionList, setSubQuestionList] = useState([{ chapter: '', co: '', skill: '', type: '' }])
  const [isdone, setIsDone] = useState(false)

  function handleADD() {
    setSubQuestionList(prev => {
      return [
        ...prev,
        { chapter: '', co: '', skill: '', type: '' }
      ]
    })
  }

  function handleDelete(index) {
    let prevSubQuestionList = [...subQuestionList]
    console.log(prevSubQuestionList[index]);
    console.log(index);
    prevSubQuestionList.splice(index, 1)
    console.log(prevSubQuestionList);
    setSubQuestionList(prevSubQuestionList)
  }

  useEffect(() => {
    var prevQuestionList = questionList
    prevQuestionList[number] = subQuestionList
    setQuestionList(prevQuestionList)
  }, [number, questionList, setQuestionList, subQuestionList])

  return (
    <>
      {
        subQuestionList && subQuestionList.map((element, index) => {
          return (
            <Question
              key={index}
              isSelectInfo={isSelectInfo}
              isdone={isdone}
              setSubQuestionList={setSubQuestionList}
              subQuestionList={subQuestionList}
              chapters={chapters}
              co={co}
              selectedSemester={selectedSemester}
              selectedSubject={selectedSubject}
              index={index}
              deleteQuestion={handleDelete}
            />
          )
        })
      }
      <tr >
        <td>
          <Button onClick={handleADD}>Add into Q-{number + 1}</Button>
        </td>
        <td>
          <Button onClick={() => { setIsDone(!isdone) }}>{!isdone ? "Done" : "change"}</Button>
        </td>
        <td>
          <Button onClick={() => { deleteQuestion(subQuestionList) }} variant='danger'>Delete</Button>
        </td>
      </tr >
    </>

  )
}
