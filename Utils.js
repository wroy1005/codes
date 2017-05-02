
var Utils = Utils || {};
Utils.namespace = function(obj, name) {
	if(Utils.namespace){
		return Utils.namespace;
	}

	if(typeof obj == 'string' && name === undefined){
		name = obj;
		obj = {};
	}
	var parts = name.split('.');
	var current = obj;
	for (var i in parts) {
		if (!current[parts[i]]) {
			current[parts[i]] = {};
		}
		current = current[parts[i]];
	}
	return obj;
}

    function loadScriptAsync(url) {
        if (typeof url != 'string') return;
        var s = document.createElement('script');
        s.type = 'text/javascript';
        s.async = true;
        s.src = url;
        var x = document.getElementsByTagName('script')[0];
        x.parentNode.insertBefore(s, x);
    }

    function drawTableOneTime(tableDatas, jTableObj, jPage, currentPage) {
        var keys = ["xuhao", "city", "pid", "product_name", "price", "hospital_id", "hospital_name", "sold_cnt", "gmv", "case_cnt", "case_comment"];
        var tbodyHTML = '';
        if (tableDatas && tableDatas.length > 0) {
            tbodyHTML = tableDatas.map(function(item, index) {
                var lineNum = index + 1;
                return keys.map(function(cv, index) {
                    if (index == 0) {
                        return "<tr><td>" + (lineNum) + "</td>";
                    } else if (index == keys.length - 1) {
                        return "<td>" + item[cv] + "</td></tr>";
                    } else {
                        return "<td>" + item[cv] + "</td>"
                    }
                }).join('');
            }).join("");
        }
        jTableObj.hide().html(tbodyHTML);

        // show content and page
        var len = jTableObj.find('tr').length;
        var pageSize = 30;
        if (len < pageSize) {
            jTableObj.show();
            jPage.hide();
        } else {
            showCurrentTableData(jTableObj, currentPage);
            drawPage(jPage, Math.ceil(len / pageSize), currentPage);
            jPage.show();
        }
    }

    function drawPage(jPage, totalPage, currentPage) {
        var html = '<ul>';
        html += '<li class="first"><a link="#"><<首页</a></li>';
        html += '<li class="previous"><a link="#">< 前页</a></li>';
        centerCurrentPage(totalPage, currentPage, 10).forEach(function(cv) {
            if (cv == current) {
                html += '<li class="page selected"><a link="#">' + cv + '</a></li>';
            } else {
                html += '<li class="page"><a link="#">' + cv + '</a></li>';
            }
        })
        html += '<li class="next"><a link="#">后页></a></li>';
        html += '<li class="last"><a link="#">末页>></a></li>';
        jPage.html(html);
    }

    function showCurrentTableData(jTable, currentPage) {
        var pageSize = 30;
        var start = (currentPage - 1) * pageSize + 1;
        var trs = jTable.find('tr').length;
        var end = Math.min(currentPage * pageSize, trs);

        jTable.hide();
        jTable.find('tr:lt(' + (start - 1) + ')').hide();
        jTable.find('tr:eq(' + (start - 1) + ')').show();
        jTable.find('tr:gt(' + (start - 1) + ')').show();
        jTable.find('tr:gt(' + (end - 1) + ')').hide();
        jTable.show();
    }

    function centerCurrentPage(totalPage, currentPage, showPageCount) {
        if (showPageCount > totalPage) {
            showPageCount = totalPage;
        }
        if (totalPage <= showPageCount) {
            var result = [];
            for (var i = 1; i <= totalPage; i++) {
                if (i == currentPage) {
                    result.push(i);
                } else {
                    result.push(i);
                }
            }
        } else {
            var result = [];
            result.push(currentPage);
            var dir = 'left';
            for (var j = 1; j <= (showPageCount - 1); j++) {
                if (dir == 'left') {
                    if (result[0] - 1 >= 1) {
                        result.unshift(result[0] - 1);
                        dir = 'right'
                        continue;
                    } else {
                        result.push(result[result.length - 1] + 1);
                        dir = 'right'
                        continue;
                    }
                } else {
                    if (result[result.length - 1] + 1 <= totalPage) {
                        result.push(result[result.length - 1] + 1);
                        dir = 'left'
                        continue;
                    } else {
                        result.unshift(result[0] - 1);
                        dir = 'left'
                        continue;
                    }
                }
            }
        }
        return result;
    }

    function getCookie(name) {
        var arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
        if (arr != null) return unescape(arr[2]);
        return null;
    }
// // test
// var myApp = Utils.namespace('dom.style.color.size');
// console.log(myApp);

// var myApp2 = Utils.namespace({},'dom.style.color.size');
// console.log(myApp2);

// var app3 = {name:'app3'};
// var myApp3 = Utils.namespace(app3,'dom.style.color.size');
// console.log(myApp3);
// console.log(myApp3  === app3);

