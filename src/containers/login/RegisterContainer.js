import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import axios from 'axios';
import {isEmail, isLength, isAlphanumeric} from 'validator'; //문자열 검증
import * as registerActions from 'modules/register';

class RegisterContainer extends Component {
    
    constructor(props) {
        super(props);
        this.state = { 
            customInput:false,
            inputId:"",
            customDomain : "",
            domain: "",
            email:"",
            password:"",
            passwordConfirm:"",
            duplicatePass: false
        }
    }

    //validation check
    validate = () =>{
        const { email, password, passwordConfirm, duplicatePass } = this.state;
        const agreeChk = document.getElementById("agreement");

        //정규식 대문자1개이상, 소문자1개이상, 숫자1개이상
        const pwCheck = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])");


        if(!duplicatePass){
            alert('이메일 중복확인을 해주십시오.');
            return false;
        }
        if(!isEmail(email)) {
            alert('잘못된 이메일 형식 입니다.');
            return false;
        }
        if(!isLength(password, { min: 8 })) {
            alert('비밀번호를 8자 이상 입력하세요.');
            return false;
        }
        if(!pwCheck.test(password)){
            alert("비밀번호는 대문자, 소문자, 숫자가 각각 1개 이상씩 포함되어야 합니다.");
            return false;
        }
        if(password !== passwordConfirm) {
            alert('비밀번호가 일치하지 않습니다.');
            return false;
        }
        if(!agreeChk.checked){
            alert('필수 동의에 동의하지 않았습니다.');
            return false;
        }
        return true;
    }

    /** 회원가입  */
    handleRegisterClick = () => {
        const self = this;
        const { email, password, passwordConfirm } = this.state;
        //검증작업
        if(this.validate()){
            axios({
                url: `/user`,   //rest call url 옵션
                data: {         //backend로 전달할 데이터 
                    userId: email,
                    userPassword: password
                },
                method : 'post', //rest type 옵션 (get, post, put, delete)
                headers: { Pragma: 'no-cache'} //IE에서 캐싱된 axios를 사용하지 않도록 하는 옵션 (항상 필요)
            }).then(            // then 성공한 경우 타는 로직
                (res)=>{
                    if(res.data) {
                        alert("회원가입에 성공했습니다.");
                        self.props.history.push(`/login`);
                    }
                }
            ).catch(function(e) { // error 발생시 타는 로직
                if(e.response.status === 400) {
                    alert('이메일 중복확인을 해주십시오.');
                }else if(e.response.status === 409){
                    alert('이메일, 비밀번호 형식이 맞지 않습니다.');
                }else{
                    alert('서버에러가 발생했습니다. 관리자에게 문의하세요.');
                }
            });
        }
    }

    /** 이메일 Domain의 직접입력 checkbox event */
    handleCustomInput = (e) => {
        this.setState({
            customInput: e.target.checked,
        });
    }

    //입력이 변할때 실행되는 function
    handleInputChange = (e) => {
        const regExp = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*$/;
        //이메일을 변경한 경우, duplicatePass(중복체크) False
        if(e.target.name === "inputId" || e.target.name === "customDomain" || e.target.name === "domain"){
            
            this.setState({
                duplicatePass: false
            })
        }
        let input = {};
        input[e.target.name] = e.target.value;
        this.setState(input);
       
    }

    /** 이메일 중복 체크 */
    handleDuplicateCheck = () => {
        const self = this;
        const domain = (this.state.customInput? this.state.customDomain : this.state.domain);
        const inputEmail = `${this.state.inputId}@${domain}`;
        if(domain === "" || this.state.inputId === "") {
            alert('이메일을 입력하세요');
            return false;
        }
        if(!isEmail(inputEmail)) {
            alert('잘못된 이메일 형식 입니다.');
            return false;
        }
        
        axios({
            url: `/user/dupleCheck/${inputEmail}`,
            method : 'get',
            headers: { Pragma: 'no-cache'}
        }).then(
            (res)=>{
                if(res.data.row ==="0"){
                    self.setState({
                        duplicatePass: true,
                        email : inputEmail
                    })
                    alert("사용하실 수 있는 이메일입니다.")
                }else{
                    alert("중복된 이메일입니다. 다른 이메일을 사용해주세요.")
                }
            }
        )
    }

    /** 취소버튼 */
    handleCancel = () => {
        this.props.history.push(`/`);
    }

    render() { 

        const { handleRegisterClick,
                handleCustomInput,
                handleInputChange,
                handleDuplicateCheck,
                handleCancel } = this;
        const { customInput } = this.state;

        return ( 
            <div className="sub-contents">
                <div className="sub-container">
                    <div className="sub-info">
                        <h2 className="sub_heading">회원가입</h2>
                    </div>
                    <div className="sub_register_box">
                        <div className="register_area">
                            <table className="register_table_contents">
                                <tbody>
                                    <tr>
                                        <td><span>아이디</span></td>
                                        <td>
                                        <input className="text_inpt" type="text" name="inputId" placeholder="아이디" onChange={handleInputChange}  style={{imeMode:"disabled"}}/>
                                        <span> @ </span>
                                            { customInput ? 
                                                <input className="text_inpt" type="text" name="customDomain" onChange={handleInputChange}/> : 
                                                <select className="text_inpt" style={{width:"173px"}} name="domain" onChange={handleInputChange}>
                                                    <option value="">선택</option>
                                                    <option value="gmail.com">gmail.com</option>
                                                    <option value="naver.com">naver.com</option>
                                                    <option value="yahoo.com">yahoo.com</option>
                                                    <option value="nate.com">nate.com</option>
                                                    <option value="daum.net">daum.net</option>
                                                </select> 
                                            }
                                            <span>
                                                <input type="checkbox" id="registerDuplicate" onClick={handleCustomInput}/>
                                                <label htmlFor="registerDuplicate"><em></em>직접입력</label>
                                            </span>
                                            <button className="normal_red_right_btn" onClick={handleDuplicateCheck}>중복확인</button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td><span>비밀번호</span></td>
                                        <td>
                                            <input className="text_inpt" type="password" name="password" placeholder="비밀번호 (8자이상)" onChange={handleInputChange}/>
                                            <span>(대문자, 소문자, 숫자가 각각 1개이상 포함 필수)</span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td><span>비밀번호 확인</span></td>
                                        <td>
                                            <input className="text_inpt" type="password" name="passwordConfirm"  placeholder="비밀번호 확인" onChange={handleInputChange}/>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <div className="register_field">
                                <div className="term_of_service" style={{marginTop:"10px", border:"solid 1px #ccc", width:"90%",height:"500px", overflowY:"auto"}}>
                                    <p style={{color:"#111", fontSize:"22px", fontWeight:"600"}}>제 1조 (목적)</p>
                                    <p>&nbsp; 본 약관은 SK주식회사 C&amp;C(이하 &ldquo;회사&rdquo;)가 제공하는 서비스(이하 &ldquo;서비스&rdquo;) 이용과 관련, 회원과 회사와의 권리와 의무 등 중요 사항을 정하는 것을 목적으로 한다.</p>

                                </div>

                                </div>
                            <div className="gt-f-l">
                                <div>
                                    <input type="checkbox" id="agreement"/>
                                    <label htmlFor="agreement"><em></em>이용약관 동의 (필수)</label>
                                </div>
                            </div>
                            <div className="clear" />
                            <div style={{"width":"95%", "marginTop":"20px"}}>
                                <button className="normal_gray_center_btn" onClick={handleRegisterClick}>가입</button>
                                <button className="normal_gray_center_btn" onClick={handleCancel}>취소</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
         );
    }
}
 

// 컴포넌트에 리덕스 연결시 아래 형태 connect - state - dispatch 사용
export default connect(
    (state) => ({
    }), (dispatch) => ({
        //현재 component에서 사용하기 위해 reducer에서 가져온 함수를 할당하는 부분
        RegisterActions: bindActionCreators(registerActions, dispatch),
    })
)(RegisterContainer);
