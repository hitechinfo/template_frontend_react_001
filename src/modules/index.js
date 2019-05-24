import { combineReducers } from 'redux';

import menu from './menu';
import recruit from './recruit';
import apply from './apply';
import auth from './auth';
import register from './register';
import faq from './faq';

//reducer 통합
export default combineReducers({

    menu,
    recruit,
    auth,
    apply,
    faq,
    register,

})
