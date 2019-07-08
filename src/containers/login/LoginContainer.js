import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import axios from 'axios';
import * as authActions from 'modules/auth';
import * as menuActions from 'modules/menu';
import storage from 'lib/storage';
import { isEmail } from 'validator'; //문자열 검증

class LoginContainer extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            applyUserId: "",
            inputId:"",
            inputEmail:"",
            inputPw:"",
            customInput:true //직접입력이 디폴트
        }
    }

    handleInputChange = (e) => {
        let input = {};
        input[e.target.name] = e.target.value;
        this.setState(input);
    }
    /** 로그인 입력 Validation */
    handleValidate = () => {
        const { inputId, inputPw, inputEmail } = this.state;
        if(!(inputId.length > 0 && inputPw.length > 0 && inputEmail.length > 0)){
            alert("아이디 혹은 패스워드를 입력하세요.")
            return false;
        }
        if(!isEmail(inputId + "@" + inputEmail)) {
            alert('잘못된 이메일 형식 입니다.');
            return false;
        }
        return true;
    }

    // 로그인 클릭 시 //
    handleClickLogin = () => {

        const { AuthActions, MenuActions } = this.props;
        const { inputId, inputPw, inputEmail } = this.state;
        const { handleMoveToMain } = this;

        if(this.handleValidate()){
            axios({
                url: `/login/`,
                method : 'post',
                headers: { "Pragma": 'no-cache' },
                data : {
                    userId: inputId + "@" + inputEmail,
                    userPassword: inputPw
                }
            }).then(
                (res)=>{ //성공된 경우 이후 로직
                    // data return의 headers에 new 토큰 및 유저정보 추가 되어 있음
                    // 1.브라우저의 Session Storage에 토큰 정보 및 유저정보 추가
                    storage.setSessionObj(res.headers);
                    // 2. store에 auth 토큰 정보 및 유저정보 추가
                    AuthActions.login(res.headers);
                    // 3. store의 클릭메뉴에 정보 추가 (로그인 이후에 메인페이지로 이동)
                    MenuActions.setClickMenu("/")
                    // 4. 메인 화면으로 이동
                    handleMoveToMain();
                }
            ).catch(function(e) { //에러 발생시 로직
                AuthActions.logout();
                if(e.response.status === 401) {
                    alert('ID 혹은 패스워드가 일치하지 않습니다');
                }else{
                    alert('서버에러가 발생했습니다. 관리자에게 문의하세요.');
                }
            });
        }
    }

    /** 회원가입 페이지 이동 */
    handleMoveToRegister = () => {
        this.props.history.push("/register")
    }

    /** 메인 페이지 이동 */
    handleMoveToMain = () => {
        this.props.history.push("/");
    }

    /** Enter Key입력시 로그인 동작 */
    handleKeyPress = (e) => {
        if(e.charCode === 13){
            this.handleClickLogin();
        }
    }

    /** 이메일 Domain의 직접입력 checkbox event 직접입력이 디폴트.*/ 
    handleCustomInput = (e) => {
        this.setState({
            customInput: e.target.checked,
            inputEmail:""
        });
    }

    render() {

        const { handleInputChange,
                handleClickLogin,
                handleMoveToRegister,
                handleKeyPress,
                handleCustomInput } = this;
        const { customInput } = this.state

        return (
            <div className="sub-contents">
                <div className="sub-container">
                    <div className="sub_login_box">
                        <h3>로그인</h3>
                        <div className="login_area">
                            <div className="inpt_field v2 ">
                                    <input className="text_inpt_50 v2" type="text" name="inputId" placeholder="아이디" onChange={handleInputChange}/><span> @ </span>
                                    {
                                        !customInput ? 
                                        <select className="sel_inpt_70 margin_right_10" name="inputEmail" onChange={handleInputChange}>
                                            <option value="">선택</option>
                                            <option value="gmail.com">gmail.com</option>
                                            <option value="naver.com">naver.com</option>
                                            <option value="yahoo.com">yahoo.com</option>
                                            <option value="nate.com">nate.com</option>
                                            <option value="daum.net">daum.net</option>
                                        </select> 
                                            :
                                        <input className="text_inpt_70 v2 margin_right_10" type="text" name="inputEmail" placeholder="이메일" onChange={handleInputChange}/>
                                    }
                                    <span>
                                        <input type="checkbox" id="registerDuplicate" checked={customInput} onChange={handleCustomInput}/>
                                        <label htmlFor="registerDuplicate"><em></em>직접입력</label>
                                    </span>
                            </div>

                            <div className="inpt_field v2">
                                <input className="text_inpt v2" type="password" name="inputPw" placeholder="비밀번호" onChange={handleInputChange} onKeyPress={handleKeyPress}/><br/>
                            </div>
                            <div className="login_field">
                                <div className="login_btn" onClick={handleMoveToRegister}><span>회원가입</span></div>
                                <div className="login_btn" onClick={handleClickLogin}><span>로그인</span></div>
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
        //현재 component에서 사용하기 위해 store에서 저장된 값을 꺼내서 할당하는 부분
        userId : state.auth.get("userId"),
        clickedMenu: state.menu.get('clickedMenu'),
    }), (dispatch) => ({
        //현재 component에서 사용하기 위해 reducer에서 가져온 함수를 할당하는 부분
        AuthActions: bindActionCreators(authActions, dispatch),
        MenuActions: bindActionCreators(menuActions, dispatch),
        
    })
)(LoginContainer);
