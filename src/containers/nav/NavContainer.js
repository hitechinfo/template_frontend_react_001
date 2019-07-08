import React, { Component } from 'react';
import axios from  'axios';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import * as menuActions from 'modules/menu';
import { withRouter } from 'react-router-dom';
import * as faqActions from 'modules/faq';
//import devtest from 'lib/devtest';

class NavContainer extends Component {
    /** 생성자 */
    constructor(props) {
        super(props);
        this.state = {
          clicked: "",

        };
    }

    componentDidMount() {
        // 메뉴 리스트 조회
        // this.handleGetMenuList()
    }

    handleScroll() {
        this.setState({scroll: window.scrollY});
    }

    componentDidUpdate() {
        this.state.scroll > this.state.top ?
            document.body.style.paddingTop = `${this.state.height}px` :
            document.body.style.paddingTop = 0;
    }

    /** 저장된 메뉴 리스트 조회 */
    handleGetMenuList = () => {
        const { MenuActions } = this.props;
        axios({
          url:"/menu",
          method:"get",
          headers: { Pragma: 'no-cache'}
        })
        .then( (response) => {
          if (response == null){
            //   console.log('response null');
          }else {
              //조회한 데이터 store에 셋팅
              MenuActions.setMenuList(response.data);
          }
        }).catch(function(error) {
          console.log(error);
        });
    }

    /** 화면 이동  */
    handleMoveTo = (e) => {

        e.stopPropagation();

        const clickUrl =  e.currentTarget.getAttribute("data-url");
        const submenu =  e.currentTarget.getAttribute("data-submenu") || "";


        this.props.MenuActions.setClickMenu(clickUrl);
        this.props.history.push(clickUrl+submenu);

    }

    styleCheck = (clicked, dataUrl) => {
        let style = {
            "textDecoration":"none"
        };
        if(clicked===dataUrl){
            style = {
                "textDecoration":"underLine"
            };
        }
        return style

    }

    

    render() {
      const { menuList, clickedMenu, faqList } = this.props;
      const { handleMoveTo, styleCheck } = this;

    const IntroSubmenu = () => {
        return (
            <ul className="nav__submenu">
                <li className="nav__submenu-item" data-url="/intro" data-submenu="/main" onClick={handleMoveTo}>
                    <a>행복성장캠퍼스란 ?</a>
                </li>
                <li className="nav__submenu-item" data-url="/intro" data-submenu="/programs" onClick={handleMoveTo}>
                    <a>프로그램 구성</a>
                </li>
                <li className="nav__submenu-item" data-url="/intro" data-submenu="/process" onClick={handleMoveTo}>
                    <a>모집대상 및 절차</a>
                </li>
                <li className="nav__submenu-item" data-url="/intro" data-submenu="/curriculum" onClick={handleMoveTo}>
                    <a>교육안내</a>
                </li>
                <li className="nav__submenu-item" data-url="/intro" data-submenu="/benefit" onClick={handleMoveTo}>
                    <a>참여자 혜택</a>
                </li>
            </ul>
        )
        };

      return (
          <nav className="gt-f-l">
            <ul className="">
                <li className="gt-f-l nav__menu-item" data-url="/intro" data-submenu="/main" onClick={handleMoveTo}>
                    <span className="gnb_1depth" style={styleCheck(clickedMenu, "/intro")}>
                        행복성장캠퍼스 소개
                    </span>
                    <IntroSubmenu/>
                </li>
                <li className="gt-f-l nav__menu-item" data-url="/recruit" onClick={handleMoveTo}><span className="gnb_1depth" style={styleCheck(clickedMenu, "/recruit")} >모집공고</span></li>
                <li className="gt-f-l nav__menu-item" data-url="/company" onClick={handleMoveTo}><span className="gnb_1depth" style={styleCheck(clickedMenu, "/company")}>채용희망사 소개</span></li>
                <li className="gt-f-l nav__menu-item" data-url="/faq"     onClick={handleMoveTo}><span className="gnb_1depth" style={styleCheck(clickedMenu, "/faq")}>FAQ(샘플) {faqList.length}개</span>
                </li>
            </ul>
          </nav>
      );
    }
}

// 컴포넌트에 리덕스 스토어를 연동해줄 때에는 connect 함수 사용
export default withRouter(connect(
    (state) => ({
        faqList: state.faq.get('faqList'),
        menuList: state.menu.get('menuList'),
        clickedMenu: state.menu.get('clickedMenu'),
    }), (dispatch) => ({
        MenuActions : bindActionCreators(menuActions, dispatch),
        FaqAction : bindActionCreators(faqActions, dispatch),

    })
)(NavContainer));
