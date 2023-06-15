function train_loc_info(l_Number) {
    if (l_Number === 2 || l_Number === 3){
        const url = `https://ltvz4aohq7.execute-api.ap-northeast-2.amazonaws.com/test/test?number=${l_Number}`;
        fetch(url)
        .then(response => response.text())
        .then(data => {
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(data, 'application/xml');
            const stations = xmlDoc.getElementsByTagName('row');
            const list = document.getElementById('row');
            for (let i = 0; i < stations.length; i++) {
                const station = stations[i];
                // const lastRecptnDt = station.getElementsByTagName('lastRecptnDt')[0].textContent; - 데이터 수신 날짜
                const recptnDt = station.getElementsByTagName('recptnDt')[0].textContent; // 데이터 수신 시간 (날짜포함)
                const trainNo = station.getElementsByTagName('trainNo')[0].textContent; // 지하철 열차 번호
                const statnNm = station.getElementsByTagName('statnNm')[0].textContent; // 지하철 역 이름
                const statnTnm = station.getElementsByTagName('statnTnm')[0].textContent; // 지하철 종착역 이름
                const updnLine = station.getElementsByTagName('updnLine')[0].textContent; // 상하행 구분
                let updnText = '';
                switch(updnLine) {
                    case '0':
                        updnText = '상행/내선';
                        break;
                    case '1':
                        updnText = '하행/외선';
                        break;
                    default:
                        updnText= '알 수 없음';
                }
                const trainSttus = station.getElementsByTagName('trainSttus')[0].textContent; // 지하철 진입 정보 구분
                let statusText = '';
                switch (trainSttus) {
                    case '0':
                        statusText = '진입중';
                        break;
                    case '1':
                        statusText = '도착';
                        break;
                    case '2':
                        statusText = '출발';
                        break;
                    case '3':
                        statusText = '전역출발';
                        break;
                    default:
                        statusText = '알 수 없음';
                }
                //   const li = document.createElement('li');
                //   li.textContent = `${trainNo} - ${statnNm}`;
                //   list.appendChild(li);
                console.log(`최종 정보 수신 시간 : ${recptnDt}`);
                console.log(`지하철 정보: ${updnText} / ${trainNo} - ${statnNm} / ${statusText}`);
                console.log(`지하철 종착역: ${statnTnm}`);
                livecongestion_info(l_Number, trainNo);
            }
        })
        .catch(error => {
            console.error(error);
        });
    }
    else{
        const url = `https://ltvz4aohq7.execute-api.ap-northeast-2.amazonaws.com/test/test?number=${l_Number}`;
        fetch(url)
        .then(response => response.text())
        .then(data => {
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(data, 'application/xml');
            const stations = xmlDoc.getElementsByTagName('row');
            const list = document.getElementById('row');
            for (let i = 0; i < stations.length; i++) {
                const station = stations[i];
                // const lastRecptnDt = station.getElementsByTagName('lastRecptnDt')[0].textContent; - 데이터 수신 날짜
                const recptnDt = station.getElementsByTagName('recptnDt')[0].textContent; // 데이터 수신 시간 (날짜포함)
                const trainNo = station.getElementsByTagName('trainNo')[0].textContent; // 지하철 열차 번호
                const statnNm = station.getElementsByTagName('statnNm')[0].textContent; // 지하철 역 이름
                const statnTnm = station.getElementsByTagName('statnTnm')[0].textContent; // 지하철 종착역 이름
                const updnLine = station.getElementsByTagName('updnLine')[0].textContent; // 상하행 구분
                let updnText = '';
                switch(updnLine) {
                    case '0':
                        updnText = '상행/내선';
                        break;
                    case '1':
                        updnText = '하행/외선';
                        break;
                    default:
                        updnText= '알 수 없음';
                }
                const trainSttus = station.getElementsByTagName('trainSttus')[0].textContent; // 지하철 진입 정보 구분
                let statusText = '';
                switch (trainSttus) {
                    case '0':
                        statusText = '진입중';
                        break;
                    case '1':
                        statusText = '도착';
                        break;
                    case '2':
                        statusText = '출발';
                        break;
                    case '3':
                        statusText = '전역출발';
                        break;
                    default:
                        statusText = '알 수 없음';
                }
                //   const li = document.createElement('li');
                //   li.textContent = `${trainNo} - ${statnNm}`;
                //   list.appendChild(li);
                console.log(`최종 정보 수신 시간 : ${recptnDt}`);
                console.log(`지하철 정보: ${updnText} / ${trainNo} - ${statnNm} / ${statusText}`);
                console.log(`지하철 종착역: ${statnTnm}`);
            }
        })
        .catch(error => {
            console.error(error);
        });
    }
  }