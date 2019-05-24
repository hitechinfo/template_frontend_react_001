import React from 'react';
import ReactDOM from 'react-dom';
import { createBrowserHistory } from 'history'
import { Router, Route, IndexRoute, BrowserRouter , Switch, Redirect} from 'react-router-dom'
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import { createLogger } from 'redux-logger';

//reducer
import reducers from 'modules';

//application page
import App from 'App';
import {
  ApplyContainer,
  MyApplyContainer,
  QuestionAddContainer,
  QuestionListContainer,
  QuestionDetailContainer,
  CompanyContainer,
  IntroContainer,
  LoginContainer,
  AgreementContainer,
  QualifiedContainer,
  ApprovalContainer,
  RegistFormContainer,
  SelectCompanyContainer,
  SubmitResumeContainer,
  RecruitContainer,
  NavContainer,
  FaqContainer,
  HeaderContainer,
  RegisterContainer,
  UnauthRoute,
  AuthRoute
        } from 'containers';


// menu
import Footer from 'components/block/Footer';

import { privateRoutes, publicRoutes } from 'routes';

//Logging 미들웨어 생성
const logger = createLogger();

// Redux Store 생성
const store = createStore(reducers);
/**
 * store 
 */
// const store = createStore(modules, applyMiddleware(logger))


const history = createBrowserHistory();
const rootElement = document.getElementById('root');


const Routers = () => (
      <div>
        <Switch>
            {/* 메인 화면 Route 설정 */}
            <Route exact path="/" component={App} />
            {/* 로그인이 필요한 화면의 Route 설정 */}
            {
              privateRoutes.map((prop, key) => {
                return <AuthRoute path={prop.path} component={prop.component} key={key} />;
              })
            }
            {/* 로그인이 필요없는 화면의 Route 설정 */}
            {
              publicRoutes.map((prop, key) => {
                return <Route path={prop.path} component={prop.component} key={key} />;
              })
            }
        </Switch>
      </div>
);


ReactDOM.render(
  <Provider store={store}>
      <BrowserRouter>
        <div className="wrap">
          <HeaderContainer/>
                <Routers  history={history}/>
            <Footer/>
        </div>
    </BrowserRouter>
   </Provider>
  , rootElement);

