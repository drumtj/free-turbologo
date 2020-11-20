// const message = new Message();

let tabId;

chrome.webRequest.onBeforeRequest.addListener(function(detail){
  return {
    redirectUrl: chrome.extension.getURL("watermark_cache-1.png")
  }
},{
  urls:["https://assets.turbologo.com/editor/img/watermark_cache-1.png"],
	types:[
    "image"
  ]
},[
  "blocking"
]);


chrome.browserAction.onClicked.addListener(function(tab)
{
  chrome.tabs.create({url:"https://turbologo.com/logo-maker"}, tab=>{
    tabId = tab.id;
    console.error("tabId", tabId);
    setTimeout(()=>{
      chrome.tabs.executeScript(tabId, {
        runAt: "document_end",
        file: chrome.extension.getURL("js/popup.js")
      })
    }, 1000)
  });
});
