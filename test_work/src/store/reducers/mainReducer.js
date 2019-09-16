import { API } from "../../api/api";

const SET_QUESTIONS = "SET_QUESTIONS";
const SET_IS_FETCHING = "SET_IS_FETCHING";
const SET_USER_ANSWER = "SET_USER_ANSWER";

export const setQuestions = questions => ({ type: SET_QUESTIONS, questions });
export const setUserAnswer = (userAnswer, numberQ) => ({ type: SET_USER_ANSWER, userAnswer, numberQ });
export const setIsFetching = isFetching => ({ type: SET_IS_FETCHING, isFetching });

const initState = {
    questions: [],
    isFetching: false
};

const mainReducer = (state = initState, action) => {
    switch (action.type) {
        case SET_QUESTIONS: {
            return {
                ...state,
                questions: [...action.questions]
            };
        }
        case SET_USER_ANSWER: {
            state.questions[action.numberQ].userAnswer = action.userAnswer;
            if (action.numberQ < state.questions.length - 1) state.questions[action.numberQ].nextQuestions = action.numberQ + 2;
            else state.questions[action.numberQ].nextQuestions = null;
           
            return {...state};
        }
        case SET_IS_FETCHING: {
            return {
                ...state,
                isFetching: action.isFetching
            };
        }

        default: return state;
    }
}

export const getQuestions = () => async (dispatch) => {
    dispatch(setIsFetching(true));
    let res = await API.getQuestions();
    if (res.response_code === 0) {
        dispatch(setQuestions(res.results));
    }
    dispatch(setIsFetching(false));
}

export default mainReducer;