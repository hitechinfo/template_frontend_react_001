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
  HeaderContainer,
  AuthRoute
        } from 'containers';
import Footer from 'components/block/Footer';

import { privateRoutes, publicRoutes } from 'routes';

//Logging 미들웨어 생성
const logger = createLogger();

// Redux Store 생성
const store = createStore(reducers);
/**
 * Reducer, action의 내용들을 Log로 확인하고 싶은 경우, store 설정을 아래의 내용으로 변경.
 */
// const store = createStore(reducers, applyMiddleware(logger))


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

