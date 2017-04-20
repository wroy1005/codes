/*
 * total 总页数
 * current 当前页
 * numbers 显示页数
 */
function centerCurrentPage (total, current, numbers) {
	if(numbers > total){
		numbers = total;
	}
    if (total <= numbers) {
        var result = [];
        for(var i = 1; i <= total; i++){
        	if(i == current){
        		result.push('>'+i+'<');
        	} else{
        		result.push(i);
        	}
        }
    } else {
        var result = [];
        result.push(current);
        var dir = 'left';
        for (var j = 1; j <= (numbers-1); j++) {
        	if(dir == 'left'){
        		if (result[0] - 1 >= 1) {
                	result.unshift(result[0] - 1);
                	dir = 'right'
                	continue;
            	} else {
            		result.push(result[result.length-1] + 1);
            		dir = 'right'
                	continue;
            	}
        	} else {
        		if(result[result.length-1] + 1 <= total){
        			result.push(result[result.length-1] + 1);
        			dir = 'left'
        			continue;
        		} else {
        			result.unshift(result[0] - 1);
        			dir = 'left'
        			continue;
        		}
        	}
        }
        result[result.indexOf(current)] = '>'+ current + '<';
    }
    return result.join();
}


// 方法二
function show_page(cur_pc) {
    var cp = cur_pc; //curent page count
    var tp = this.p; //total page count
    var sp = this.pc; //show page count
    var bp; //begin page count
    var ep; //end page count
    if (sp % 2 == 0) sp = sp + 1; //this process need an odd number
    var dp = Math.floor(sp / 2); //each side count to show
    var dif = tp - sp; //check weather it have enough page to make mid-show
    var f = cp - dp; //to check weather it has enough page to make mid-show from the begin
    var g = tp - (cp + dp); //to check weather it has enough page to make mid-show from the end
    if (sp && dif >= 0) {
        if (g > 0) {
            if (f > 0) {
                bp = f;
                ep = cp + dp;
            } else {
                bp = 1;
                ep = 2 * dp + 1;
            }
        } else {
            bp = tp - 2 * dp;
            ep = tp;
        }
    } else {
        bp = 1;
        ep = tp;
    }
    var buf = [];
    for (var i = bp; i <= ep; i++) {
        if (i == cur_pc) {
            buf.push("<a href='javascript:;' class='current'>", i, "</a>");
        } else {
            buf.push("<a href='javascript:;' class='normal'>", i, "</a>");
        }
    }
    document.write(buf);
}
