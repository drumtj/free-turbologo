// https://github.com/drumtj/Message

class Message {
  cbs = {};
  coms = {};
  constructor(receivers){
    if(typeof receivers === "object"){
      Object.keys(receivers).forEach(name=>this.setReceiver(name, receivers[name]));
    }
    chrome.runtime.onMessage.addListener(async (message, sender)=>{
      let {com, data, cbn, rcbn} = message;
      if(rcbn){
        let cb = this.getCb(rcbn);
        if(cb){
          this.deleteCb(rcbn);
          cb(data);
        }
      }else{
        let result;
        if(com && this.coms[com]){
          result = this.coms[com](...[data, (com, data)=>{
            return this.send(com, data, sender.tab?sender.tab.id:null);
          }, sender.tab?sender.tab.id:null]);
          if(result instanceof Promise){
            result = await result;
          }
        }
        if(cbn){
          if(chrome.tabs && sender.tab){
            chrome.tabs.sendMessage(sender.tab.id, {rcbn:cbn, data:result});
          }else{
            chrome.runtime.sendMessage({rcbn:cbn, data:result});
          }
        }
      }
    })
  }


  setReceiver(name, cb){
    this.coms[name] = cb;
  }

  send(com, data, tabId){
    //console.error("?", message, sender);
    if(chrome.tabs && tabId){
      return new Promise(resolve=>{
        let cbn = this.setCb(resolve);
        chrome.tabs.sendMessage(tabId, {com, data, cbn});
      })
    }else{
      return new Promise(resolve=>{
        let cbn = this.setCb(resolve);
        chrome.runtime.sendMessage({com, data, cbn});
      })
    }
  }

  setCb(cb){
    let r = this.rand();
    this.cbs[r] = cb;
    return r;
  }

  getCb(cbn){
    return this.cbs[cbn];
  }

  deleteCb(cbn){
    delete this.cbs[cbn];
  }

  rand(){
    return '_' + Date.now() + Math.floor(Math.random()*5);
  }
}
