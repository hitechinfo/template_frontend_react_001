
import React, { Component } from 'react';

const SampleModifyPopup = ({closePopup, contentObj, changeContent, saveContent}) => {

    return (

        <div className="popup_wrap">
            <div>
                <div className="popup_area">
                <div className="popup_header">
                        <div className="popup_title gt-f-l">수정 sample</div>
                        <div className="popup_close" onClick={closePopup}></div>
                        <div className="clear"></div>
                </div>
                <div>
                    <textarea style={{"width":"500px", "height":"300px"}} name="faqAnswer" value={contentObj.faqAnswer} onChange={changeContent}></textarea>
                </div>
                <button data-faqseq={contentObj.faqSeq} onClick={saveContent}>저장</button>
                    
                </div>
            </div>
        </div>


    )

}

export default SampleModifyPopup;