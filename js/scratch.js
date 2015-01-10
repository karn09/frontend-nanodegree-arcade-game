function deepEqual(a, b) {
    //filter out null objects
    if ((typeof a === "object" && a != null) && (typeof b === "object" && b != null)) {
               countPropNames(a, b);
    } else {
        //if typeof returns "object" in case of null
        return false;
    }
}

function countPropNames(a, b) {
    var propNamesA = "", propNamesB = "";
    //loop through obj a
    for (var i in a) {
        // if property is present, count++
        if (a[i]) propNamesA++;
    }
    //loop thru obj b
    for (var i in b) {
        // if property is present, count++
        if (b[i]) propNamesB++;
    }
    //if property count not equal, return false
    if (propNamesA != propNamesB) return false;
    else {
        //recursive call to countPropNames function;
        // if results not equal, return false
        return (countPropNames(a) === countPropNames(b));
    }
}
