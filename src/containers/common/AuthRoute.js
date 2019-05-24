import React from 'react';
import { Route, Redirect } from "react-router-dom";
import storage from 'lib/storage';

/** 
 * 로그인된 경우, 해당 Component rendering
 * 로그인이 안된 경우, Login 페이지로 Redirect(이동)
 */
const AuthRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      storage.isLogin() ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/login",
            state: { from: props.location }
          }}
        />
      )
    }
  />
);

export default AuthRoute