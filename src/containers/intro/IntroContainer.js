import React, { Component } from 'react';
import {IntroImg} from 'components';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as menuActions from 'modules/menu';

class IntroContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            submenu:""
        }
    }

  
    //componentWillMount : 컴포넌트가 render 되기 전 무조건 실행되는 function
    componentWillMount = () => {

        this.props.MenuActions.setClickMenu("/intro");
        
        this.setState({
            submenu: window.location.href.split("intro/")[1]
        })
    }

    render() {
        const { submenu } = this.state;
        return (
            <div className="sub-contents">
                <IntroImg submenu={submenu}></IntroImg>
            </div>
         );
    }
}
// 컴포넌트에 리덕스 연결시 아래 형태 connect - state - dispatch 사용
export default connect(
    (state) => ({

    }), (dispatch) => ({
        //현재 component에서 사용하기 위해 reducer에서 가져온 함수를 할당하는 부분
        MenuActions: bindActionCreators(menuActions, dispatch),
    })
)(IntroContainer);
