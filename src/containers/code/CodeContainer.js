import React, { Component } from 'react';
import axios from 'axios'
import {CodePopup} from 'components'
class CodeContainer extends Component {
    constructor(props) {
        super(props);
        this.state = { 
        }
    }
    /** 렌더링 이후 실행되는 함수 */
    componentDidMount() {
    }

    /** TODO : 코드 리스트 조회 */
    
    /** TODO : 코드 클릭 action */

    /** TODO: 팝업 닫기 */

    /** TODO: 사용자 input에 따라 state 변경 */
    
    /** TODO: 변경된 codeValue 저장 */
    
    render() { 
        return (
            <div className="sub-contents">
                {/* TODO: 팝업 넣을 부분 */}
                <div className="sub-container">
                    <div className="location">
                        <div className="location-inner">
                            <div className="location-item">홈</div>
                            <div className="location-item">></div>
                            <div className="location-item">코드관리</div>
                        </div>
                    </div>
                    <div className="sub-info" style={{"height":"150px"}}>
                        <h2 className="sub_heading">코드 관리</h2>
                        <div className="sub_heading_text">axios와 팝업 예제 페이지 입니다</div>
                    </div>
                    <div className="clear"></div>
                    <div className="sub_box" style={{"heigth":"300px"}}>
                        <div>
                            <table >
                                <tbody>
                                    <tr>
                                        <th>코드명</th>
                                        <th>코드값</th>
                                    </tr>
                                    {/* TODO: List 렌더링할 부분 */}
                                    <tr>
                                        <td>코드명 자리</td>
                                        <td>코드값 자리</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}
 
export default CodeContainer;