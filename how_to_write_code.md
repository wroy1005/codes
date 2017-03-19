
```
// use sea.js
define(function(require, exports, module){

    // 模块化,传参数
    (function(win, undefined){

        /*
         *导出接口
         * 参数: el, type, fn, capture 
         * 返回值: function
         */
        exports.addEvent = function(el, type, fn, capture){
            return function(){
                // 封装原有的监听事件
                el.addEventListener(type, function(event){
                    // 不直接使用fn, 为了获得event参数
                    fn.call(el, event);
                }, capture);
            }
        }
    })(window)

})
```