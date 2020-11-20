console.error("free logo extension loaded");
// $(document).ready(function(){

  // const message = new Message({
  //   down: download
  // });
  //
  let bt = document.createElement("button");
  bt.textContent = "Logo Download All";
  bt.onclick = download;
  bt.style.fontSize = "32pt";
  bt.style.position = "absolute";
  bt.style.left = "50px";
  bt.style.top = "50px";
  bt.style.zIndex = 9999;
  document.body.appendChild(bt);

  function download(){
    var canvasList = document.querySelectorAll(".lower-canvas");
    if(canvasList.length == 0){
      alert("이 페이지에서는 캔버스가 안보입니다.");
      return;
    }
    var a = document.createElement('a');
    canvasList.forEach((canvas,i)=>{
      a.download = 'logo'+i+".png";
      a.href = canvas.toDataURL("image/png");
      a.click();
    })
  }

  // message.send("init");
  // alert("logo download ready");
// })
