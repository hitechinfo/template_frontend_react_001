import React, { Component } from 'react';

class CompanyContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            <div className="sub-contents">
                <div>company page 내용</div>
                <div>인증(토큰)이 없어도 접근할 수 있는 페이지</div>
            </div>
         );
    }
}
 
export default CompanyContainer;