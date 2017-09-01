var WSC = (function ($) {
    'use strict';
    var wsIns;

    if (!$){
        throw new Error('需要先加载jQuery.');
    }

    if (WSC){
        console.log("WSC已经存在，不用再次加载。");
        return WSC;
    }

    if (!'WebSocket' in window) {
        $(document).trigger("wsunsupported");
        throw new Error('改浏览器不支持WebSocket.');
    }
    if (isLogin() === false) {
        console.log("当前用户没有登录！不进行 websocket 连接");
        return wsIns;
    }

    function getCookie(name) {
        var arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
        if (arr != null) return unescape(arr[2]);
        return null;
    }

    function isLogin() {
        var uid = getCookie('login_uid'),
            token = getCookie('login_token');
        return uid && token && parseInt(uid) > 0;
    }

    function init() {
        var socket = null,
            pingTime = 50 * 1000,
            checkLoginTime = 5 * 1000,
            reConnectTime = 30 * 1000,
            isConnected = false;

        function connectWebSocket() {
            var uri = 'ws://dev.yourWsServer.com/';
            socket = new WebSocket(uri);
            socket.addEventListener('open', openHandler);
            socket.addEventListener('message', messageHandler);
            socket.addEventListener('close', closeHandler);
            socket.addEventListener('error', errorHandler);
        }
        function openHandler() {
            isConnected = true;
            // 注册
            var uid = getCookie('login_uid'),
                token = getCookie('login_token'),
                room_id = 'default',
                host_uid = window.host_uid || '';
            socket.send(JSON.stringify({
                "action": "user/login",
                "data": { uid: uid, token: token, room_id: room_id, host_uid: host_uid }
            }))
            // pingpong
            setTimeout(function cur() {
                if(isConnected){
                    socket.send(JSON.stringify({ "action": "heartbeat/ping" }));
                    setTimeout(cur, pingTime)
                }
            }, pingTime);
            // 检查登录状态
            setTimeout(function cur() {
                if (isLogin() === false) {
                    console.log('用户退出登录状态，关闭长连接');
                    return socket.close();
                }
                setTimeout(cur, checkLoginTime)
            }, checkLoginTime);
            // 触发事件
            $(document).trigger('wsopen');
        }
        function messageHandler(event) {
            var data = JSON.parse(event.data);
            var action = data.action.toLowerCase();
            if (action == 'heartbeat/ping') {
                return socket.send(JSON.stringify({ "action": "heartbeat/pong" }));;
            }
            if (action == 'connection/close') {
                return socket.close();
            }
            $(document).trigger("wsmessage", data);
        }
        function errorHandler(event) {
            $(document).trigger("wserror");
        }
        function closeHandler(event) {
            isConnected = false;
            socket.removeEventListener('open', openHandler);
            socket.removeEventListener('message', messageHandler);
            socket.removeEventListener('close', closeHandler);
            socket.removeEventListener('error', errorHandler);
            socket = null;
            $(document).trigger("wsclose");
            // 重连
            setTimeout(connectWebSocket, reConnectTime);
        }
        return {
            isConnected: function(){
                return socket ? socket.readyState === WebSocket.OPEN : false;
            },
            connect: function () {
                if (!socket) {
                    connectWebSocket();
                }
            }
        };
    }
    return {
        getInstance: function () {
            if (!wsIns) {
                wsIns = init();
            }
            return wsIns;
        }
    }
}(jQuery));

/*
$(document).on("wsopen", function(event){
    console.log("wsopen ===>");
    console.log(arguments);
    console.log("<=== wsopen");
});
$(document).on("wsmessage", function(event){
    console.log("wsmessage ===>");
    console.log(arguments);
    console.log("<=== wsmessage");
});
$(document).on("wsclose", function(event){
    console.log("wsclose ===>");
    console.log(arguments);
    console.log("<=== wsclose");
});
$(document).on("wserror", function(event){
    console.log("wserror ===>");
    console.log(arguments);
    console.log("<=== wserror");
});
*/
