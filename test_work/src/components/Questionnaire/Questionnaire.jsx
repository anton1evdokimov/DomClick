import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { compose } from "redux";
import { withRouter, Redirect } from 'react-router-dom';

import { getQuestions, setUserAnswer } from './../../store/reducers/mainReducer';

import st from './Questionnaire.module.css'

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.numberQ = parseInt(props.match.params.number) - 1;
    this.state = { setUserAnswer: false };
  }
  onSubmit = formData => {
    this.props.setUserAnswer(formData, this.numberQ - 1);
    this.setState({ setUserAnswer: true });
  }
  componentDidMount() {
    if (!this.props.questions.length) {
      this.props.getQuestions();
    }
  }
  render() {
    if (!this.props.questions.length) return <h3>Загрузка данных...</h3>;
    this.numberQ = parseInt(this.props.match.params.number);
    let question = this.props.questions[this.numberQ - 1];

    if (question.userAnswer) {
      if (question.nextQuestions) {
        return <Redirect to={"/Questionnaire/" + question.nextQuestions} />
      }
      else {
        return <Redirect to={"/Result/"} />
      }
    }

    return question.type === "multiple" ? <LoginFormReduxCheckBox onSubmit={this.onSubmit} number={this.numberQ} question={question} /> :
      <LoginFormReduxRadioBtn onSubmit={this.onSubmit} number={this.numberQ} question={question} />
  }
}

let mapStateToProps = state => {
  return { questions: state.main.questions }
};


let LoginFormConnect = compose(
  withRouter,
  connect(mapStateToProps, { getQuestions, setUserAnswer }),
)
  (LoginForm);

const FormRadioBtn = ({ handleSubmit, number, question }) => {
  return <form onSubmit={handleSubmit} className={st.form}>
    <h3>Вопрос номер {number}</h3>
    <h3>{question.question}?</h3>
    <div className={st.radioContent}>
      <div className={st.item}>
        <label htmlFor="True" >True</label>
        <Field name="True" component="input" type="radio" value="True" />
      </div>
      <div className={st.item}>
        <label htmlFor="False" >False</label>
        <Field name="False" component="input" type="radio" value="False" />
      </div>
    </div>
    <button type="submit">Далее</button>
  </form>
}

const FormCheckBox = ({ handleSubmit, number, question }) => {
  let answer = [...question.incorrect_answers, question.correct_answer];
  return <form onSubmit={handleSubmit} className={st.form}>
    <h3>Вопрос номер {number}:</h3>
    <h3>{question.question}?</h3>
    {
      answer.map((q, i) => {
        return <div className={st.item} key={i + q}>
          <label htmlFor={q}>{q}</label>
          <Field name={q} component="input" type="checkbox" />
        </div>
      })
    }
    <button type="submit">Далее</button>
  </form>
}

const LoginFormReduxRadioBtn = reduxForm({ form: `FormRadioBtn` })(FormRadioBtn)
const LoginFormReduxCheckBox = reduxForm({ form: `FormCheckBox` })(FormCheckBox)

export default props => {
  return <div className={st.main}>
    <LoginFormConnect />
  </div>
}
