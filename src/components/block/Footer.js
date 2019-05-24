
import React, { Component } from 'react';
import FooterPopup from './FooterPopup';

class Footer extends Component {

    constructor(props) {
        super(props);
        this.state = { 
            openPopup: false,
            clickName:""
         }
    }

    //푸터 클릭시 팝업 띄움
    clickFooter = (e) => {
        this.setState({
            openPopup: true,
            clickName: e.target.getAttribute("name")
        })
    }

    //닫기버튼
    clickClose = () => {
        this.setState({
            openPopup: false
        })        
    }

    render() { 

        const { clickName, openPopup } = this.state;
        const { clickClose, clickFooter } = this;

        return (         

            <footer className="footer-wrap">
                <div className="footer-wrap_text">
                    <img width="70px" height="35px" src="https://res.cloudinary.com/dlpg5kdj1/image/upload/v1557986079/skhappycampus/intro/logo_bottom_pc_lxobut.png"></img>
                    <div style={{"display":"inline-block", "verticalAlign":"middle", "marginLeft":"15px", "marginBottom":"22px"}} >
                        <span>All rights reserved</span>{' | '}
                        <span style={{"cursor":"pointer"}} name="terms" onClick={clickFooter}>이용약관</span>{' | '}
                        <span style={{"cursor":"pointer"}} name="personalInfo" onClick={clickFooter}>개인정보처리방침</span>{' | '}
                        <span style={{"cursor":"pointer"}} name="email" onClick={clickFooter}>이메일집단수신거부</span>
                    </div>
                </div>
                { openPopup && <FooterPopup type={clickName} clickClose={clickClose}></FooterPopup> }           
            </footer>

    );
    }
}

export default Footer;
