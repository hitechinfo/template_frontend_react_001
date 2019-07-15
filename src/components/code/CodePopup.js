
import React, { Component } from 'react';

const CodePopup = ({}) => {
    return (

        <div className="popup_wrap">
            <div>
                <div className="popup_area">
                <div className="popup_header">
                        <div className="popup_title gt-f-l">코드 수정</div>
                        <div className="popup_close" onClick={closePopup}></div>
                        <div className="clear"></div>
                </div>
                <div>
                    <span>코드명</span>
                    <input name='codeName' readOnly></input>
                    <br/>
                    <span>코드값</span>
                    <input name='codeValue' ></input>
                </div>
                <button>저장</button>
                    
                </div>
            </div>
        </div>


    )

}

export default CodePopup;