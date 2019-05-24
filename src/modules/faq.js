import { createAction, handleActions } from 'redux-actions';
import { Map } from 'immutable';

/*
 * 액션 타입 정의
 */
const SET_FAQ_LIST = 'faq/SET_FAQ_LIST';

/*
 * 액션 생성 함수 정의
 */
export const setFaqList = createAction(SET_FAQ_LIST);

 /*
  * 초기상태 정의
  */
 const initialState = Map({
     faqList: [],
 });

 /*
 * reducer 작성
 */
export default handleActions({
  [SET_FAQ_LIST] : (state, action) => {
    return state.set('faqList', action.payload)
  }
}, initialState)
