import React, { Component } from 'react';
import axios from  'axios';

/** 리덕스 연결을 위해 필요한 모듈  **/
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

/** modules에서 선언한 액션함수 및 reducer를 가져온다 **/
import * as faqActions from 'modules/faq';
import * as authActions from 'modules/auth';

import storage from 'lib/storage';

/* 선언한 component를 가져온다 */
import {  
          SampleModifyPopup, 
          SampleCreatePopup, 
          SampleList 
        } from 'components';

class FaqContainer extends Component {

    /** 생성자 */
    constructor(props) {
        super(props);
        this.state = {

          code : {
            qnaCategoryCode : [],
            qnaCategoryCodePopup : [],
          },
          selectedQuestion : -1,
          lastCategory: '',
          filterText : '',
          filteredData: [],

          /** sample 용 */
          openPopupCreate: false, //추가하기용 팝업 open yn 
          openPopupModify: false, //수정하기용 팝업 open yn
          faqObj: {  //faq obj
            faqCategory:"",
            faqSeq:"",
            faqQuestion:"",
            faqAnswer:""
          }
        };
        
        this.openQuestion = this.openQuestion.bind(this);
    }


    componentWillMount = () => {
      //렌더링 하기 전에 실행되는 함수 (되도록 사용금지 곧 없어짐)
      //질문카테고리 코드데이터 조회
      this.getCodeValue();
    }

    componentDidMount() {
      //렌더링 이후 실행되는 함수
      this.handleGetFaqList();
    }

    /** 저장된 FAQ 글 리스트 조회 */
    handleGetFaqList = () => {

        const { FaqAction } = this.props;

        axios({
          url:"/faq",
          method:"get",
          headers: { "Pragma": 'no-cache',
                    "x-access-token": storage.getToken()} //session storage에서 저장된 token을 빼와서 token을 전달.
        })
        .then( (response) => {
          if (response == null){
              console.log('response null임');
          }else {
              //backend에서 받아온 새로운 token 정보를 다시 브라우져에 저장
              storage.setSessionObj(response.headers);

              //조회한 데이터 store에 셋팅
              FaqAction.setFaqList(response.data);

              this.setState({
                filteredData: response.data
              });
          }
        }).catch(function(error) {
          console.log(error.response);
        });
    }

    /** 질문카테고리 코드데이터 조회 */
    getCodeValue = () => {

      const { code } = this.state;

      //메인 faq 페이지용 카테고리 코드
      axios({
          url: `/commonCode/QUESTION/A`,//코드 URL은 뒤에 주소 대문자 사용함
          method : 'get',
          headers: { Pragma: 'no-cache'}
      }).then(
          (res)=>{
              if(res.data){
                  code["qnaCategoryCode"] = res.data;
                  this.setState({
                      code
                  })
              }
          }
      ).catch(
          (err)=>{ if(err) console.log("코드 get err", err.response); }
      )


      //팝업용 카테고리 코드
      axios({
        url: `/commonCode/QUESTION/S`,//코드 URL은 뒤에 주소 대문자 사용함
        method : 'get',
        headers: { Pragma: 'no-cache'}
      }).then(
          (res)=>{
              if(res.data){
                  code["qnaCategoryCodePopup"] = res.data;
                  this.setState({
                      code
                  })
              }
          }
      ).catch(
          (err)=>{ if(err) console.log("코드 get err", err.response); }
      )


    }

    /** 변경사항 state에 적용 */
    handleSelectChange = (e) => {
      this.setState ({[e.target.name]: e.target.value});
    }

    /** 변경사항 state에 적용 */
    handleChange = (e) => {
      this.setState ({[e.target.name]: e.target.value});
    }
    
    /** 검색 버튼 클릭 */
    handleSummit = (e) => {
      const { filterText, lastCategory, selectedQuestion } = this.state;
      const { faqList } = this.props;
      if(filterText.length == 0 && lastCategory.lenth == 0){
          this.setState ({filteredData: faqList});
      }else{
        const rows = [];
        faqList.forEach( (object) => {
          //질문리스트에 검색어가 없는 경우
          if (object.faqAnswer.indexOf(filterText) === -1 ) {
            return;
          }
          if (lastCategory.length != 0 && object.faqCategory !== lastCategory) {
            return;
          }
          rows.push(object);
        });
        this.setState ({filteredData: rows});
      }
    }


    /** 자주하는 질문 클릭시 답변 open */
    openQuestion = (id) =>  (e) => {
      this.setState({
        // 같은 질문을 누른 경우, 해당 답변 닫음/다른 질문을 누른 경우 해당 답변 open
        selectedQuestion: (this.state.selectedQuestion === id ? -1 : id) 
      });
    }

    /** 화면 이동  */
    handleMoveTo = (e) => {
      const self = this;
      if(e.target.getAttribute("data-url")==="/question")  {
        const session = storage.getSessionObj();
        if(session==undefined) {
          //alert("로그인 세션이 만료되었거나 올바른 로그인 정보가 아닙니다. 로그인 페이지로 이동합니다.");
          self.props.history.push("/login");
        }else{
          self.props.history.push(e.target.getAttribute("data-url"));
        }
      }else{
        self.props.history.push(e.target.getAttribute("data-url"));
      }
    }

    /** Enter Key입력시 로그인 동작 */
    handleKeyPress = (e) => {
        if(e.charCode === 13){
            this.handleSummit();
        }
    }


    // 수정하기 버튼 클릭
    openModiPopup = (e) =>{

      // 한가지 정보를 읽어올때 
      // 직접 DB를 key로 조회하는 방법도 있고 
      // 기존에 읽어온 데이터들 중에서 key로 찾는 방법 등 여러가지 방법이 있다

      // 여기서는 처음 화면 렌더링 시(this.handleGetFaqList) 가져온 모든 faq 데이터를 reducer를 통해 store에 넣고(line 67-68)
      // store에서 props 형태로 그 전체 리스트를 꺼내서 그중에 key로 filtering하는 방법을 사용

      console.log("팝업 open 클릭 (수정버튼 클릭)");
      
      /* store에서 저장된 리스트를 가져옴 */
      const { faqList }  = this.props;

      /* 클릭한 행의 seq를 가져와서*/
      const clickFaqSeq = e.target.getAttribute("data-seq");
      
      /**현재 가지고 있는 전체와 비교해서 해당하는 faq를 filtering */
      const clickedObj = faqList.filter((obj)=>{
        return obj.faqSeq == clickFaqSeq
      })

      console.log("클릭한 faq seq " , clickFaqSeq);
      console.log("faq seq로 filtering", clickedObj)
      

      this.setState({
        openPopupModify: true,
        faqObj:{
          faqSeq: clickFaqSeq,
          faqCategory: clickedObj[0].faqCategory,
          faqAnswer: clickedObj[0].faqAnswer,
          faqQuestion: clickedObj[0].faqQuestion,

        }
      })

    }

    //추가하기 버튼 클릭
    openCreatePopup = (e) => {
      console.log("팝업클릭 추가하기 open")
      this.setState({
        openPopupCreate: true,
        selectedQuestion : -1
        
      })
    }


    //추가하기에서 닫기 버튼 클릭
    closeCreatePopup = (e) => {

      console.log("팝업 close 클릭(팝업 내 X 버튼 클릭)")
      this.setState({
        openPopupCreate: false,
        faqObj: {
          faqCategory:"",
          faqSeq:"",
          faqQuestion:"",
          faqAnswer:"",
        },
        selectedQuestion : -1
      })

    }

    //수정하기에서 닫기 버튼 클릭
    closeModiPopup = (e) => {

      console.log("팝업 close 클릭(팝업 내 X 버튼 클릭)")
      this.setState({
        openPopupModify: false,
        faqObj: {
          faqCategory:"",
          faqSeq:"",
          faqQuestion:"",
          faqAnswer:""
        },
        selectedQuestion : -1
      })

    }

    
    //팝업내부에서 내용을 change할때마다 state에 반영해서 나중에 save/update시 state값을 data로 전달
    handleChangePopupContent = (e) => {

      let changeObj = this.state.faqObj;
      changeObj[e.target.name] = e.target.value;

      this.setState({
        faqObj: changeObj
      })

    }

    //수정하고 저장버튼 클릭시
    handleUpdateContent = (e) => {

      const { faqSeq, faqAnswer } = this.state.faqObj;

      axios({
          url: `/faq/${faqSeq}`,
          method : 'put',
          data: {
            faqAnswer: faqAnswer
          },
          headers: { "Pragma": 'no-cache',
                     "x-access-token": storage.getToken() }  //session storage에서 저장된 token을 빼와서 token을 전달.
      }).then(
        (res)=>{
          if(res.data){
              alert("수정이 완료되었습니다");
              //backend에서 받아온 새로운 token 정보를 다시 브라우져에 저장
              storage.setSessionObj(res.headers);

              //팝업닫기 
              this.setState({
                openPopupModify:false,
                faqObj: {
                  faqCategory:"",
                  faqSeq:"",
                  faqQuestion:"",
                  faqAnswer:""
                },
              });
              //다시 리스트 호출
              this.handleGetFaqList();
          }
        }
      ).catch(
        (err)=>{
          if(err) console.log("err", err)
        }
      );

    }


    //추가하고 저장버튼 클릭시
    handleSaveContent = (e) => {

      const { faqCategory, faqQuestion, faqAnswer } = this.state.faqObj;

      if(faqCategory.length==0 || faqQuestion.length==0 || faqAnswer.length==0){
        alert("입력값을 확인하세요")
        return;
      }

      axios({
          url: `/faq`,
          method : 'post',
          data: {
            faqCategory: faqCategory,
            faqQuestion: faqQuestion,
            faqAnswer: faqAnswer
          },
          headers: { "Pragma": 'no-cache',
                     "x-access-token": storage.getToken() }  //session storage에서 저장된 token을 빼와서 token을 전달.
      }).then(
        (res)=>{
          if(res.data){
              alert("저장이 완료되었습니다");

              //backend에서 받아온 새로운 token 정보를 다시 브라우져에 저장
              storage.setSessionObj(res.headers);
              //팝업닫기 
              this.setState({
                openPopupCreate:false,
                faqObj: {
                  faqCategory:"",
                  faqSeq:"",
                  faqQuestion:"",
                  faqAnswer:""
                },
                selectedQuestion : -1
              });
              //다시 리스트 호출
              this.handleGetFaqList();
          }
        }
      ).catch(
        (err)=>{
          if(err) console.log("err", err.response)
        }
      );

    }

    //삭제버튼 클릭시
    handleDeleteFaq = (e) => {

      const clickFaqSeq = e.target.getAttribute("data-seq");
      if(confirm("선택 질문을 삭제하겠습니까?")){
        axios({
          url: `/faq/${clickFaqSeq}`,
          method : 'delete',
          headers: { "Pragma": 'no-cache',
                      "x-access-token": storage.getToken() } //session storage에서 저장된 token을 빼와서 token을 전달.
        }).then(
          (res)=>{
            if(res.data){
                alert("삭제가 완료되었습니다");

                //backend에서 받아온 새로운 token 정보를 다시 브라우져에 저장
                 storage.setSessionObj(res.headers);

                //다시 리스트 호출
                this.handleGetFaqList();
            }
          }
        ).catch(
          (err)=>{
            if(err) console.log("err", err.response)
          }
        );
      }

    }


    render() {

      const { selectedQuestion, 
              code, 
              openPopupModify,
              openPopupCreate, 
              faqObj } = this.state;

      const { handleChange, 
              handleSummit, 
              handleKeyPress,
              handleChangePopupContent,
              handleUpdateContent,
              handleDeleteFaq,
              handleSaveContent,
              closeCreatePopup,
              openModiPopup,
              openCreatePopup,
              closeModiPopup,
              openQuestion  } = this;

      const { faqList } = this.props;

        return (

          <div>

              <div className="sub-contents">
                <div className="sub-container">
                    <div className="location">
                        <div className="location-inner">
                            <div className="location-item">홈</div>
                            <div className="location-item">></div>
                            <div className="location-item">FAQ</div>
                        </div>
                    </div>
                    <div className="sub-info" style={{"height":"150px"}}>
                        <h2 className="sub_heading">FAQ</h2>
                        <div className="sub_heading_text">채용관련 궁금한 점을 확인해보세요</div>
                        <div className="search_area">
                            <div className="searchsearch">
                                <div className="gt-f-l">
                                    <select name="lastCategory" className="text_sel_10" onChange={handleChange}>
                                    {
                                      code.qnaCategoryCode.map((object, i)=> {
                                        return (
                                          <option key={i} value={object.value}>{object.text}</option>
                                        );
                                      })
                                    }
                                  </select>
                                </div>
                                <input placeholder="검색어" type="text" name="filterText" className="selectric_input_01" onChange={handleChange}  onKeyPress={handleKeyPress}/>
                                <button className="selectric_search_button" style={{marginLeft: "5px"}} onClick={handleSummit}><span>검색</span></button>
                            </div>
                        </div>
                    </div>
                    <div className="clear"></div>
                    <div className="sub_box">
                        
                        <div className="apply_step4">
                            <div className="apply_step4_list">
                                <div className="apply_step4_table_title">전체</div>
                                <button onClick={openCreatePopup}>추가하기</button>
                                <div>
                                    <div className="line_2_gray"></div>
                                    {/* 리스트 생성 */}
                                    { 
                                      <SampleList 
                                          faqList={faqList} 
                                          selectedQuestion={selectedQuestion} 
                                          openQuestion={openQuestion}
                                          openModiPopup={openModiPopup}
                                          handleDeleteFaq={handleDeleteFaq}
                                      />
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* 수정하기용 팝업 */}
            { openPopupModify ? <SampleModifyPopup closePopup={closeModiPopup} contentObj={faqObj} changeContent={handleChangePopupContent} saveContent={handleUpdateContent}/> : undefined }
            
            {/* 추가하기용 팝업 */}
            { openPopupCreate ? <SampleCreatePopup closePopup={closeCreatePopup} code={code} changeContent={handleChangePopupContent} saveFaq={handleSaveContent}/> : undefined }

            </div>
        );
    }
}

// 컴포넌트에 리덕스 연결시 아래 형태 connect - state - dispatch 사용
export default connect(
    //component에서 사용하기 위해 store에서 저장된 값을 꺼내서 할당하는 부분
    //this.props.faqList
    //this.props.userId 이런식으로 접근
    (state) => ({
        /* ↓ 현재 component에서 사용될 props 명 */
        faqList: state.faq.get('faqList'), /* faqList라는 props 내부 변수에 store에 저장되어 있는 faqList를 get해서 저장 */
                  /* ↑ store의 state에서 꺼내는 부분 */             
        userId : state.auth.get("userId") /* userId props 내부 변수에 store에 저장되어 있는 userId get해서 저장 */
    })
    //현재 component에서 사용하기 위해 reducer에서 가져온 함수를 할당하는 부분
    //this.props.FaqAction
    //this.props.AuthAction 이런식으로 접근
    , (dispatch) => ({
        /* ↓ 현재 component에서 사용될 props 명 */
        FaqAction : bindActionCreators(faqActions, dispatch), /*상단에서 선언한 faqActions(modules)에 만들어놓은를 가져와서 FaqAction에 넣는다 */
                                        /* ↑ modules 폴더에서 선언한 내용 */
        AuthAction: bindActionCreators(authActions, dispatch) /*상단에서 선언한 authActions(modules)에 만들어놓은를 가져와서 AuthAction 넣는다 */
    })
)(FaqContainer);
