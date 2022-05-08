

function getElementLeft (element){
    var actualLeft = element.offsetLeft;
    var current = element.offsetparent;

    while (parent != null) {
        actualLeft += parent.offsetLeft;
        current = parent.offsetParent;
    }

    return actualLeft;
}
