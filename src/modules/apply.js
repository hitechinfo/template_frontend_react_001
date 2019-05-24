import { createAction, handleActions } from 'redux-actions';
import { Map } from 'immutable';
import _ from 'lodash';

/*
 * 액션 타입 정의
 */
const SET_SERIAL_NUMBER = 'apply/SET_SERIAL_NUMBER';
const SET_APPLY_STATUS = 'apply/SET_APPLY_STATUS';

/*
 * 액션 생성 함수 정의
 */
export const setSerialNumber = createAction(SET_SERIAL_NUMBER);
export const setApplyStatus = createAction(SET_APPLY_STATUS);

/*
 * 초기상태 정의
 */
const initialState = Map({
    basicInfo: {},
    degreeInfoArr: [],
    extraCertArr: [],
    coverLetter: "",

    companyList:[],
    recommendList:[],

    regionCode:"",
    noticeNumber:"",
    serialNumber: "",
    applyStatus:""

});

/*
 * reducer 작성
 */
export default handleActions({
    [SET_SERIAL_NUMBER] : (state, action) => {
        return state.set("serialNumber", action.payload);           
    },

    [SET_APPLY_STATUS] : (state, action) => {
        return state.set("applyStatus", action.payload)
    },



}, initialState);
