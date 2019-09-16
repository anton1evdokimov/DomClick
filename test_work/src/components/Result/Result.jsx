import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import st from './Result.module.css'

const Result = ({ questions }) => {
  if(!Array.isArray(questions) || !questions.length){
    return <Redirect to={"/Questionnaire/1"} />
  }
  let hard = questions.filter(q => q.difficulty === "hard");
  let medium = questions.filter(q => q.difficulty === "medium");
  let easy = questions.filter(q => q.difficulty === "easy");
  debugger
  return <div className={st.main}>
    <h2>Result of Answers:</h2>
    <h3>Hard difficulty questions</h3>
    <ul>
      {hard.map(q => 
      <><li>{`${q.question} Correct answer: ${q.correct_answer}.`} </li>
      <li className={st.li}> {`${q.userAnswer[q.correct_answer]==true ? 'Your answer is correct' : 'Your answer is incorrect'}`}</li></>
      )}
    </ul>
    <h3>Medium difficulty questions</h3>
    <ul>
      {medium.map(q => 
      <><li>{`${q.question} Correct answer: ${q.correct_answer}.`} </li>
      <li className={st.li}> {`${q.userAnswer[q.correct_answer]==true ? 'Your answer is correct' : 'Your answer is incorrect'}`}</li></>
      )}
    </ul>
    <h3>Easy difficulty questions</h3>
    <ul>
      {easy.map(q => 
      <><li>{`${q.question} Correct answer: ${q.correct_answer}.`} </li>
      <li className={st.li}> {`${q.userAnswer[q.correct_answer]==true ? 'Your answer is correct' : 'Your answer is incorrect'}`}</li></>
      )}
    </ul>
  </div>
}

let mapStateToProps = (state) => {
  return { questions: state.main.questions }
};
export default connect(mapStateToProps)(Result)


/*<div className="App">
        {this.state.qw.length ? this.state.qw.map(i => { return <div>{i.question}  {i.correct_answer}</div> }): <h1>Загрузка</h1> }
      </div>*/