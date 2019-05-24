import { createAction, handleActions } from 'redux-actions';
import { Map } from 'immutable';
import _ from 'lodash';

const SET_SERIAL_NUMBER = 'apply/SET_SERIAL_NUMBER';
export const setSerialNumber = createAction(SET_SERIAL_NUMBER);

const SET_APPLY_STATUS = 'apply/SET_APPLY_STATUS';
export const setApplyStatus = createAction(SET_APPLY_STATUS);

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


//작성중
export default handleActions({


    [SET_SERIAL_NUMBER] : (state, action) => {
        return state.set("serialNumber", action.payload);           
    },

    [SET_APPLY_STATUS] : (state, action) => {
        return state.set("applyStatus", action.payload)
    },



}, initialState);
