import React, { Component } from 'react';
import {MypageContent} from 'components';


class MypageContainer extends Component {
    constructor(props) {
        super(props);
        this.state = { 
         }
    }
    render() { 


        return ( <div style={{"paddingTop": "100px"}}>
                    <h1>Mypage</h1>
                    <MypageContent />
                </div> 
                );
    }
}
 

// 컴포넌트에 리덕스 연결시 아래 형태 connect - state - dispatch 사용
export default MypageContainer
