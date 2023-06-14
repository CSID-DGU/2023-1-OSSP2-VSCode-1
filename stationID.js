// 클릭 이벤트 핸들러 함수
function handleClick(event) {
    // 클릭한 역의 id 속성 값 가져오기
    var stationId = event.currentTarget.getAttribute("stationid");
    var stationNM = event.currentTarget.getAttribute("stationname");
    var day = new Date(); //요일 가져오기
    var weekday = new Array(7);
    var weekday = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];// 요일 배열
    var dow = weekday[day.getDay()]; // dow 에 요일 할당
    var hours = day.getHours();
    var hh = ("0" + hours).slice(-2);
    var mm = day.getMinutes();
    // id 출력 (여기서는 콘솔에 출력하도록 함)
    console.log(stationNM);
    console.log(stationId);
    console.log(dow);
    console.log("클릭시간:",hh,":",mm);
    statisticcongestion_info(stationId,dow,hh); // 통계성 혼잡도 api 연동부분 (CORS 오류 발생중)
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
  