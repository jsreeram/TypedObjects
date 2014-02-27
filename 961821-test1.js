function do_test() {
    var len = 192 * 108;
    var BDType = TypedObject.uint8.array(len);
    var bdArray_in = new BDType();
    var bdArray_out = new BDType();
    var jsArray_in = new Array();
    var jsArray_out = new Array();
    for(var i = 0; i < len; i++) {
        bdArray_in[i] = 1;
        jsArray_in[i] = 1;
    }
    var sum = 0;
    var start_time = Date.now();
    for(var k = 0; k < 15; k++) {
        for(i = 0; i < len; i++) {
            bdArray_out[i] = bdArray_in[i];
            //sum += bdArray_in[i];
        }
    }
    var elapsed_bd = Date.now() - start_time;
    sum = 0;
    start_time = Date.now();
    for(k = 0; k < 15; k++) {
        for(i = 0; i < len; i++) {
            jsArray_out[i] = jsArray_in[i];
            //sum += jsArray_in[i];
        }
    }

    var elapsed_js = Date.now() - start_time;

    print("Binary Data took " + elapsed_bd + " ms....JS Arrays took " + elapsed_js + "ms");
    //document.getElementById("result").innerHTML = "BD: " + bdArray_out[len-1] + " -- JS: " + jsArray_out[len-1];
}
do_test();

