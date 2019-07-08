import React, { Component } from 'react';


/*                                  부모로 부터 받은 props 들                                 */
/*                      ↓             ↓               ↓              ↓              ↓     */
const SampleList = ({faqList, selectedQuestion, openQuestion, openModiPopup, handleDeleteFaq}) => {

    {/* 같은형태의 component는 .map을 이용해서 반복적으로 그린다 */}
    {/* .map 사용시 주의사항 가장 parent tag에 unique key가 반드시 들어가야함  */}
    return (
        faqList.map((object ,i) => (
            <div key={object.faqSeq}>
            <div className="gt-f-l faq_list_box"  onClick={openQuestion(object.faqSeq)}>
                <div className={ selectedQuestion === object.faqSeq ? "gt-f-l faq_section_on" : "gt-f-l faq_section"} >{object.faqCategory}</div>
                <div className={ selectedQuestion === object.faqSeq ? "gt-f-l faq_title_text_on" : "gt-f-l faq_title_text"} > {object.faqQuestion}</div>
                <div className={ selectedQuestion === object.faqSeq ? "gt-f-l faq_img_on" : "gt-f-l faq_img_off"}></div>
            </div>
              { selectedQuestion === object.faqSeq ?
              <div className="gt-f-l faq_list_box_a">
              <div className="faq_title_text_a">{object.faqAnswer}</div>
              <button className="" data-seq={object.faqSeq} onClick={openModiPopup}>답변수정하기</button>
              <button className="" data-seq={object.faqSeq} onClick={handleDeleteFaq}>삭제하기</button>
              </div> : undefined }
            </div>      

          ))
    )

}

export default SampleList;