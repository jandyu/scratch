/**
 * @file library.js

 */
const WSCPARAM="?cid=";
const WSCID="jyu-01";
var wsConnected = false;
var wsdata = {};
var wsconn = null;
/**
 * @constructor
 */
class WebsocketClient {
    constructor () {
        wsconn = null;
        WSConnected = false;
        wsdata = [];
        this.data={};
    }

    /**
     * Reset internal state so future frame analysis does not consider values
     * from before this method was called.
     */
    reset () {
        wsconn = null;
        wsConnected = false;

        console.log('websocket reset');
    }


    onOpen(){
        wsConnected = true;
        console.log('websocket OPENED');

    }

    onClose(){
        console.log('websocket CLOSED');
        this.reset();
    }

    onMessage(event) {
        var data = event.data;

        var d = JSON.parse(data);
        if (wsdata.hasOwnProperty(data.key)){
            wsdata[d.data.key].push(d.data);
        }else {
            wsdata[d.data.key] =[d.data];
        }
        console.log("recv",data,wsdata);
    }

    onError(event) {
        console.error(event.type);
    }

    connect(srv){
        wsconn = new WebSocket(srv+WSCPARAM+WSCID);
        wsconn.onopen = this.onOpen;
        wsconn.onclose = this.onClose;
        wsconn.onmessage = this.onMessage;
        wsconn.onerror = this.onError;

    }
    send(key,val){
        console.log('websocket send ',this);
        if(wsConnected) {
            var payload = {to:WSCID,from:WSCID,data:{key:key,val:val}}
            wsconn.send(JSON.stringify(payload));
            console.log('websocket send',payload);
            return true;
        }else{
            return false;
        }
    }

    getMsg(dict){
        if(wsConnected && wsdata.hasOwnProperty(dict)) {
            // console.log('websocket get',wsdata.length);
            if (wsdata[dict].length>0){
                return wsdata[dict].shift();
            }
        }
        return undefined;

    }

}

module.exports = WebsocketClient;
