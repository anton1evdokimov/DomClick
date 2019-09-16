import React from 'react';
import { NavLink } from 'react-router-dom';

import st from './MainPage.module.css'

export default () => {
    return <div className={st.main}>
     <NavLink to="/Questionnaire/1" className={st.link}>Перейти к вопросам</NavLink>
      </div>
}
