/** 토큰 인증 및 로그인 관련 공통 코드 */
class AuthService {

    /** 로그인 여부 체크 */
    isLogin = () => {
        return (this.getSessionObj() !== null? true : false);
    }

    /* session 정보 반환 */
    getSessionObj = () => {
        if(sessionStorage["sessionObj"]){
            const sessionObj = JSON.parse(sessionStorage["sessionObj"]);
            return sessionObj;
        }else{
            return null;
        }
    }

    /** sessionStorage에 인증 정보 저장 
     * token: 토큰 인증서버에서 받은 토큰
     * userId: 로그인한 userId 정보
     * userType: 로그인한 user의 타입(일반사용자/관리자 등등 여러 type을 주어 관리할 수 있습니다.)
    */
    setSessionObj = (res) => {
        const data = {
            "token": res.newtoken,
            "userId": res.userid,
            "userType": res.usertype,
        };

        //sessionStorage에는 문자열만 저장 가능
        sessionStorage.setItem("sessionObj", JSON.stringify(data))
    }



    /** sessionStorage에 담긴 토큰정보 반환 */
    getToken = () => {
        if(!sessionStorage) return null;

        if(!sessionStorage["sessionObj"]){
            return null;
        }
        try {
            const sessionObj = JSON.parse(sessionStorage["sessionObj"]);
            return sessionObj.token;
        } catch(e) {
            return null;
        }
    }


    /** sessionStorage에 담긴 userId 반환 */
    getUserInfo = () => {

        if(sessionStorage["sessionObj"]){
            const sessionObj = JSON.parse(sessionStorage["sessionObj"]);

            // console.log("getuserIfo", sessionObj)

            let userId = null ;
            if( sessionObj.token && sessionObj.userId ){
                userId = sessionObj.userId;
            }

            return userId;
        }
    }
    /** sessionStorage에 담긴정보 삭제 */
    removeSessionObj = () => {
        if(!sessionStorage) return null;

        if(sessionStorage["sessionObj"]) {
            sessionStorage.removeItem("sessionObj");
        }
    }

    /**
     * (Customized 기능)
     * 기능에서 필요한 정보를 브라우저의 SessionStorage에 저장/조회/삭제 하기 위한 기능 
     * serial number(공고번호)를 session storage에 저장
     */
    setSerialNumber = (num) => {
        sessionStorage.setItem("serialNumber", num);
    }

    /**
     * (Customized 기능)
     * 기능에서 필요한 정보를 브라우저의 SessionStorage에 저장/조회/삭제 하기 위한 기능 
     * serial number(공고번호)를 session storage에서 Get
     */
    getSerialNumber = () => {
        if(!sessionStorage["serialNumber"]) {
           // window.location.href="recruit"
            return "null";
        }else{
            return sessionStorage.getItem("serialNumber");
        }
    }

    /**
     * (Customized 기능)
     * 기능에서 필요한 정보를 브라우저의 SessionStorage에 저장/조회/삭제 하기 위한 기능 
     * serial number(공고번호)를 session storage에서 Remove
     */
     removeSerialNumber = () => {
        sessionStorage.removeItem("serialNumber");
    }
}

export default new AuthService()