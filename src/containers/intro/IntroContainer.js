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
            <IntroImg submenu={submenu}></IntroImg>
         );
    }
}

// 컴포넌트에 리덕스 스토어를 연동해줄 때에는 connect 함수 사용
export default connect(
    (state) => ({

    }), (dispatch) => ({
        MenuActions: bindActionCreators(menuActions, dispatch),
    })
)(IntroContainer);
