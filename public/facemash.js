var imgUrl = [
  { url: "김태희.jpg", rank: 0 },
  { url: "다현.jpg", rank: 0 },
  { url: "배수지.jpg", rank: 0 },
  { url: "송혜교.jpg", rank: 0 },
  { url: "수지.jpg", rank: 0 },
  { url: "아이유.jpg", rank: 0 },
  { url: "이효리.jpg", rank: 0 },
  { url: "쯔위.jpg", rank: 0 },
  { url: "표예지.jpg", rank: 0 },
  { url: "황정음.jpg", rank: 0 },
];

var face = new Array;
face[0] = document.getElementById('1');
face[1] = document.getElementById('2');

var insertImgUrl = new Array();

function setFace(imgUrl){
	
	var mRandom = Math.random();
    var ran1 = Math.floor( mRandom * 10 );
    mRandom = Math.random();
    var ran2 = Math.floor( mRandom * 10 );
    while(ran1 == ran2) {
    	mRandom = Math.random();
        ran2 = Math.floor( mRandom * 10 );
    }

    insertImgUrl[0] = "<img src='" + imgUrl[ran1].url + "'" + "width='230' height='200'>";
    insertImgUrl[1] = "<img src='" + imgUrl[ran2].url + "'" + "width='230' height='200'>";
    face[0].innerHTML = insertImgUrl[0];
    face[1].innerHTML = insertImgUrl[1];

    insertImgUrl[0] = imgUrl[ran1].url;
    insertImgUrl[1] = imgUrl[ran2].url;
}

var xhr = new XMLHttpRequest();

function selectFace(face_id){	
    var insert_link = 'http://localhost:3000/ajax_send_rank';    
    var data = {'url' : insertImgUrl[face_id - 1]};
    data = JSON.stringify(data);
      
    xhr.open('POST', insert_link);
    xhr.setRequestHeader('Content-Type', "application/json");
    xhr.send(data);

    setFace(imgUrl);
}

function setResult(){ 
    var resultUrl = []; 
    var result_link = 'http://localhost:3000/ajax_result_rank';
    var data = {'call' : 0};
    data = JSON.stringify(data);

    xhr.open('POST', result_link);
    xhr.setRequestHeader('Content-Type', "application/json");
    xhr.send(data);
    xhr.addEventListener('load',function(){
        var result = JSON.parse(xhr.responseText);   

        for(var i = 0; i < result.length; i++){
            if(result[0].result !== "ok") console.log("your data is not found");
            else resultUrl.push({url : result[i].url, rank : result[i].rank});
        }   
        
        resultUrl.sort(function (a,b){ 
            return b.rank - a.rank	 
        });
 
        var quiz_div = document.getElementById('quiz');
        var txt = "<h1>Ranking</h1> <br> <br>"
        quiz_div.innerHTML = txt;
        
        for(var i = 0; i < resultUrl.length; i++){
            quiz_div.innerHTML += "<img src='" + resultUrl[i].url+ "'" + "width='230' height='200'> <br>";
        }  
    });
}

setFace(imgUrl);