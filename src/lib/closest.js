// .closest()는 ie에서 동작하지 않으므로 custom 으로 만들어서 사용
// event: 발생한 이벤트, findeNode: 찾을 tag
// 발생한 위치에서 가장 가까운 tag를 찾는다.
const closest = (event, findNode) => {

    let closest = event.target;
    while ((closest = closest.parentElement) && closest.nodeName.toUpperCase() !== findNode.toUpperCase());
    return closest;

}

export default closest