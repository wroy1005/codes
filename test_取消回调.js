function timeoutify(fn, delay) {
    var tid = setTimeout(function() {
        tid = null;
        fn(new Error('time out'));
    }, delay);

    return function() {
        if (tid) {
            clearTimeout(tid);
            fn.apply(this, arguments);
        }
    }
}

function foo(err, data) {
    if (err) {
        console.log(err);
    } else  {
        console.log(data);
    }
}

$.get("https://www.baidu.com", timeoutify(foo, 50));
