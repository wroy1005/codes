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
