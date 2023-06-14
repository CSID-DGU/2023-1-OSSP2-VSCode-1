// // 클릭 이벤트 핸들러 함수
// function handleClick(event) {
  
//     // 클릭한 역의 id 속성 값 가져오기
//     var stationId = event.currentTarget.getAttribute("stationid");
//     var stationNM = event.currentTarget.getAttribute("stationname");
//     var day = new Date(); //요일 가져오기
//     var weekday = new Array(7);
//     var weekday = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];// 요일 배열
//     var dow = weekday[day.getDay()]; // dow 에 요일 할당
//     var hours = day.getHours();
//     var hh = ("0" + hours).slice(-2);
//     var mm = day.getMinutes();
//     // id 출력 (여기서는 콘솔에 출력하도록 함)
//     console.log(stationNM);
//     console.log(stationId);
//     console.log(dow);
//     console.log("클릭시간:",hh,":",mm);
    
//   }


  /*$(document).ready(function() {
    $('circle[class*="M"]').click(function() {
      //if(subwayLineNumber == 2 || subwayLineNumber == 3) return false;
      var stationId = $(this).attr('stationid')
      var stationNM = $(this).attr('stationname')
      var classes = $(this).attr('class').split(' ');
      console.log(classes.length);
      for (var i = 0; i < classes.length; i++) {
        if (classes[i].startsWith('M') && classes[i].length === 5) {
          console.log(stationId);
          console.log(stationNM);
          var day = new Date(); //요일 가져오기
          var weekday = new Array(7);
          var weekday = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];// 요일 배열
          var dow = weekday[day.getDay()]; // dow 에 요일 할당
          var hours = day.getHours();
          var hh = ("0" + hours).slice(-2);
          var mm = day.getMinutes();


          var jsonData = statisticcongestion_info(stationId,dow,hh);
          
          jsonData.then(function(result) {
            appendStationInfo(result.contents.stat, hh, mm)
          });
          $("#modal_title").text(stationNM+"역");
          $("#station_status").text("텍스트");
          $('#myModal').css('display', 'block');
          break;
        }
      }
    });
    $('g[class*="M"]').click(function() {
      //if(subwayLineNumber == 2 || subwayLineNumber == 3) return false;
      var stationId = $(this).attr('stationid')
      var stationNM = $(this).attr('stationname')
      var classes = $(this).attr('class').split(' ');
      console.log(classes.length);
      for (var i = 0; i < classes.length; i++) {
        if (classes[i].startsWith('M') && classes[i].length === 5) {
          console.log(stationId);
          console.log(stationNM);
          var day = new Date(); //요일 가져오기
          var weekday = new Array(7);
          var weekday = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];// 요일 배열
          var dow = weekday[day.getDay()]; // dow 에 요일 할당
          var hours = day.getHours();
          var hh = ("0" + hours).slice(-2);
          var mm = day.getMinutes();


          var jsonData = statisticcongestion_info(stationId,dow,hh); // 통계성 혼잡도 api 연동부분 (CORS 오류 발생중)
          
          jsonData.then(function(result) {
            appendStationInfo(result.contents.stat, hh, mm)
          });
          $("#modal_title").text(stationNM+"역");
          $("#station_status").text("텍스트");
          $('#myModal').css('display', 'block');
          break;
        }
      }
    }); */
    
    $(document).ready(function() {
      $('circle[class*="M"], g[class*="M"]').click(function() {
        var stationId = $(this).attr('stationid');
        var stationNM = $(this).attr('stationname');
        var classes = $(this).attr('class').split(' ');
        console.log(classes.length);
        for (var i = 0; i < classes.length; i++) {
          if (classes[i].startsWith('M') && classes[i].length === 5) {
            console.log(stationId);
            console.log(stationNM);
            var day = new Date();
            var weekday = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
            var dow = weekday[day.getDay()];
            var hours = day.getHours();
            var hh = ("0" + hours).slice(-2);
            var mm = day.getMinutes();
    
            var jsonData = statisticcongestion_info(stationId, dow, hh);
    
            jsonData.then(function(result) {
              appendStationInfo(result.contents.stat, hh, mm);
            });
    
            $("#modal_title").text(stationNM + "역");
            $("#station_status").text("텍스트");
            $('#myModal').css('display', 'block');
            break;
          }
        }
      });

    function appendStationInfo(result, hh, mm) {
        console.log(result);
        let down = { avg: 0, cnt: 0 };
        let up = { avg: 0, cnt: 0 };
        for(let i = 0; i<result.length; i++){
          let avg = 0;
          for(let j = 0; j<result[i].data.length; j++){
            avg+=result[i].data[j].congestionTrain;
          }
          switch(result[i].updnLine){
            case 0: 
            up.avg += avg;
            up.cnt++;
            break;
            case 1: 
            down.avg += avg;
            down.cnt++;
            break;
          }
        }
        down.avg/=down.cnt;
        up.avg/=up.cnt;



        let htmlSrc = `
          <div class="child">
            <h2>상행</h2>
            <p>정보조회시각 : ${hh}:${Math.floor(mm / 10) * 10}</p>
            <p>열차의 평균 혼잡도 : ${getStatusName(Math.round(up.avg))}</p>
          </div>
          <div class="child">
            <h2>하행</h2>
            <p>정보조회시각 : ${hh}:${Math.floor(mm / 10) * 10}</p>
            <p>열차의 평균 혼잡도 : ${getStatusName(Math.round(down.avg))}</p>
          </div>
        `

        $("#station_status").html(htmlSrc);


    }
    function getStatusName(avg) {
      if(isNaN(avg) || avg < 34){
        return `쾌적(${avg})`;
      } else if(avg >=34 && 99 >= avg){
        return `좋음(${avg})`;
      } else if(avg >99 && 150 >= avg){
        return `혼잡(${avg})`;
      } else {
        return `매우혼잡(${avg})`;
      }
    }
    
  
    $('.close').click(function() {
      $('#myModal').css('display', 'none');
      $("#station_status").empty();
    });
  });


  
  // // 환승역 요소 선택
  // var interchange = document.querySelector(".interchange");
  // // 기존역 요소 선택
  // var markers = document.querySelectorAll(".marker");
  
  // var currents = document.querySelectorAll(".current");
  
  // // 클릭 이벤트 핸들러 추가
  // interchange.addEventListener("click", handleClick);
  // markers.forEach(function(marker) {
  //   marker.addEventListener("click", handleClick);
  // });
  // currents.forEach(function(current) {
  //   currents.addEventListener("click", handleClick);
  // });
  