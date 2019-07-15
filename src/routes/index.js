import {
  IntroContainer,
  LoginContainer,
  RecruitContainer,
  RegisterContainer,
  CompanyContainer,
  FaqContainer,
  CodeContainer
        } from 'containers';
        
// 로그인이 필요한 서비스 url
export const privateRoutes = [
  { /** faq 페이지 */
    path: "/faq",
    component: FaqContainer
  },

];

// 로그인이 필요없는 서비스 url
export const publicRoutes = [

  {/** 소개페이지  */
    path: "/intro/main",
    component: IntroContainer
  },
  {/** 소개페이지 */
    path: "/intro/programs",
    component: IntroContainer
  },
  {/** 소개페이지 */
    path: "/intro/process",
    component: IntroContainer
  },
  {/** 소개페이지 */
    path: "/intro/curriculum",
    component: IntroContainer
  },
  {/**  소개페이지*/
    path: "/intro/benefit",
    component: IntroContainer
  },
  {/** 로그인 */
    path: "/login",
    component: LoginContainer
  },
  {/** 회원가입 */
    path: "/register",
    component: RegisterContainer
  },
  {/** 회사 리스트 */
    path: "/company",
    component: CompanyContainer
  },
  {/** 모집공고 페이지 */
    path: "/recruit",
    component: RecruitContainer
  },
  {/** 코드 관리 */
    path: "/code",
    component: CodeContainer
  },
  
];