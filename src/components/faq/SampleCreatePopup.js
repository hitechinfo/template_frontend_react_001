
import React, { Component } from 'react';

const SampleCreatePopup = ({changeContent, saveFaq, code, closePopup}) => {

    


    return (

        <div className="popup_wrap">
            <div>
                <div className="popup_area">
                <div className="popup_header">
                        <div className="popup_title gt-f-l">생성 sample</div>
                        <div className="popup_close" onClick={closePopup}></div>
                        <div className="clear"></div>
                </div>

                <select name="faqCategory" className="" onChange={changeContent}>
                {
                    code.qnaCategoryCodePopup.map((object, i)=> {
                    return (
                        <option key={i} value={object.value}>{object.text}</option>
                    );
                    })
                }
                </select>

                <div style={{"marginTop":"10px"}}>
                    <div>Q.</div>
                    <textarea style={{"width":"500px", "height":"100px"}} name="faqQuestion" onChange={changeContent}></textarea>
                </div>
                <div>
                    <div>A.</div>
                    <textarea style={{"width":"500px", "height":"100px"}} name="faqAnswer" onChange={changeContent} ></textarea>
                </div>
                <button onClick={saveFaq}>저장</button>
                    
                </div>
            </div>
        </div>


    )

}

export default SampleCreatePopup;