// 클릭 이벤트 핸들러 함수
function handleClick(event) {
  // 클릭한 역의 id 속성 값 가져오기
  var id = event.currentTarget.getAttribute("id");

  // id 출력 (여기서는 콘솔에 출력하도록 함)
  console.log(id);
}

// 환승역 요소 선택
var interchange = document.querySelector(".interchange");
// 기존역 요소 선택
var markers = document.querySelectorAll(".marker");

var currents = document.querySelectorAll(".current");

// 클릭 이벤트 핸들러 추가
interchange.addEventListener("click", handleClick);
markers.forEach(function(marker) {
  marker.addEventListener("click", handleClick);
});
currents.forEach(function(current) {
  currents.addEventListener("click", handleClick);
});
