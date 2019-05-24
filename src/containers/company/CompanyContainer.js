import React, { Component } from 'react';

class CompanyContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            <div className="sub-contents">
                <div className="sub-container">
                    <div className="location">
                        <div className="location-inner">
                            <div className="location-item">홈</div>
                            <div className="location-item">></div>
                            <div className="location-item">채용희망사 소개</div>
                        </div>
                    </div>
                    <div className="sub-info" style={{"height":"150px"}}>
                        <h2 className="sub_heading">채용희망사 소개</h2>
                        <div className="sub_heading_text">채용을 희망하는 회사들을 확인해보세요.</div>
                        
                    </div>
                    <div className="clear"></div>
                    <div className="sub_box" style={{"heigth":"300px"}}>
                        <div>해당 페이지는 인증(토큰)이 없어도 접근할 수 있는 예시 페이지입니다.</div>
                    </div>
                </div>
            </div>
         );
    }
}
 
export default CompanyContainer;