import React, { Component } from 'react';

const FooterPopup = ({type, clickClose }) => {

    return (
        type == "terms" ?
        /** 이용약관 **/
        <div className="popup_wrap">
            <div>
                <div className="popup_area">
                    <div className="popup_header">
                        <div className="popup_title gt-f-l"><span>이용약관</span></div>
                        <div className="popup_close" onClick={clickClose}></div>
                        <div className="clear"></div>
                    </div>

                    <div className="popup_contents" >
                        <div className="popup_contents_title">
                            <p>행복성장캠퍼스</p>
                            <p>[이용약관]</p>
                        </div>

                        <div className="popup_contents_text" style={{overflowY:"hidden", textAlign:"left"}}>

                            <p style={{color:"#111", fontSize:"22px", fontWeight:"600"}}>제 1조 (목적)</p>
                            <p>&nbsp; 본 약관은 SK주식회사 C&amp;C(이하 &ldquo;회사&rdquo;)가 제공하는 서비스(이하 &ldquo;서비스&rdquo;) 이용과 관련, 회원과 회사와의 권리와 의무 등 중요 사항을 정하는 것을 목적으로 한다.</p>

                        </div>
                    </div>
                </div>
            </div>
        </div> 
    :
        type === "personalInfo" ?
        /** 개인정보처리방침 **/
        <div className="popup_wrap">
          <div>
            <div className="popup_area">
                <div className="popup_header">
                  <div className="popup_title gt-f-l"><span>개인정보처리방침</span></div>
                  <div className="popup_close" onClick={clickClose}></div>
                  <div className="clear"></div>
                </div>

                <div className="popup_contents" >
                  <div className="popup_contents_title">
                    <p>행복성장캠퍼스</p>
                    <p>[개인정보처리방침]</p>
                  </div>

                  <div className="popup_contents_text" style={{overflowY:"hidden", textAlign:"left"}}>
                                    <p style={{color:"#111", fontSize:"22px", fontWeight:"600"}}>제 1조 총칙</p>
                                    <p>① 개인정보란 생존하는 개인에 관한 정보로서 당해 정보에 포함되어 있는 성명, 생년월일 등의 사항에 의하여 당해 개인을 식별할 수 있는 부호, 문자, 음성, 음향, 영상 등의 정보(당해 정보만으로는 특정 개인을 식별할 수 없더라도 다른 정보와 용이하게 결합하여 식별할 수 있는 것을 포함합니다)를 말합니다.</p>
                                    
                                </div>
                </div>
            </div>
          </div>
        </div> 
        : 
        /** 이메일집단수신거부 **/
         <div className="popup_wrap">
         <div>
           <div className="popup_area">
               <div className="popup_header">
                 <div className="popup_title gt-f-l"><span>이메일집단수신거부</span></div>
                 <div className="popup_close" onClick={clickClose}></div>
                 <div className="clear"></div>
               </div>

               <div className="popup_contents" >
                 <div className="popup_contents_title">
                   <p>행복성장캠퍼스</p>
                   <p>[이메일집단수신거부]</p>
                 </div>
                 <div className="popup_contents_text" style={{overflowY:"hidden", textAlign:"center", fontSize:"12pt"}}>
                 본 '행복성장캠퍼스' 홈페이지에 게시된 이메일 주소가 전자우편 수집 프로그램이나 <br/>그밖의 기술적 장치를 이용하여 무단으로 수집되는 것을 거부하며, <br/>이를 위반시 정보통신망법에 의해 형사처벌됨을 유념하시기 바랍니다.
                 </div>
               </div>
       </div>
   </div>
 </div>

    )
}

export default FooterPopup;
