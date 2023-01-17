import React from 'react'
import { Col, Row } from 'react-bootstrap'

export default function DisplayQuestion({ question }) {

	return (
		question && question.map((ele) => {
				return (
					<Row className='border m-2'>
						<Col md='auto'>
							<label className='form-label'>{ele.qno}</label>
						</Col>
						<Col>
							<label className='form-label'>
								{ele.question.questionText}
							</label>
							{ele.type === "type 3" &&
								<Row>
									<Col>
										<label className='form-label'>
											(A)  {ele.question.optionA}
										</label>
									</Col>
									<Col>
										<label className='form-label'>
											(B)  {ele.question.optionB}
										</label>
									</Col>
									<Col>
										<label className='form-label'>
											(C)  {ele.question.optionC}
										</label>
									</Col>
									<Col>
										<label className='form-label'>
											(D)  {ele.question.optionD}
										</label>
									</Col>
								</Row>
							}
						</Col>
					</Row>
				)
			})
	)
}
