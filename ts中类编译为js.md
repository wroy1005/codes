ts
```
class Shape {
 
    area: number;
    color: string;
 
    constructor ( name: string, width: number, height: number ) {
        this.area = width * height;
        this.color = "pink";
    };
 
    shoutout() {
        return "I'm " + this.color + " " + this.name +  " with an area of " + this.area + " cm squared.";
    }
}
 
var square = new Shape("square", 30, 30);
 
console.log( square.shoutout() );
```
js
```
var Shape = (function () {
    function Shape(name, width, height) {
        this.area = width * height;
        this.color = "pink";
    }
    ;
    Shape.prototype.shoutout = function () {
        return "I'm " + this.color + " " + this.name + " with an area of " + this.area + " cm squared.";
    };
    return Shape;
}());
var square = new Shape("square", 30, 30);
console.log(square.shoutout());

// I'm pink undefined with an area of 900 cm squared.
// 只能得到 color 和 area 的值。
// 另外注意这种创建类的方法
```
