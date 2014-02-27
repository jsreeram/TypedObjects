
var outer_loop = 15;
var len = 1920*16;
function do_test_direct() {
  var BDType = TypedObject.uint8.array(len);
  var bdArray_in = new BDType();
  var bdArray_out = new BDType();
  var jsArray_in = new Array();
  var jsArray_out = new Array();
  for(var i = 0; i < len; i++) {
    bdArray_in[i] = 1;
    jsArray_in[i] = 1;
  }

  var start_time = Date.now();
  for(var k = 0; k < outer_loop; k++) {
    for(i = 0; i < len; i++) {
      bdArray_out[i] = bdArray_in[i];
    }
  }
  var elapsed_bd2bd = Date.now() - start_time;

  start_time = Date.now();
  for(var k = 0; k < outer_loop; k++) {
    for(i = 0; i < len; i++) {
      bdArray_out[i] = jsArray_in[i];
    }
  }
  var elapsed_js2bd = Date.now() - start_time;

  start_time = Date.now();
  for(var k = 0; k < outer_loop; k++) {
    for(i = 0; i < len; i++) {
      jsArray_out[i] = bdArray_in[i];
    }
  }
  var elapsed_bd2js = Date.now() - start_time;

  start_time = Date.now();
  for(var k = 0; k < outer_loop; k++) {
    for(i = 0; i < len; i++) {
      jsArray_out[i] = jsArray_in[i];
    }
  }
  var elapsed_js2js = Date.now() - start_time;

  print("bd2bd: "+elapsed_bd2bd+
        " bd2js: "+elapsed_bd2js+
        " js2bd: "+elapsed_js2bd+
        " js2js: "+elapsed_js2js);
}

function do_test_struct() {
  var Wrap = new TypedObject.StructType({x: TypedObject.uint8});
  var BDType = Wrap.array(len);
  var bdArray_in = new BDType();
  var bdArray_out = new BDType();
  var jsArray_in = new Array();
  var jsArray_out = new Array();
  for(var i = 0; i < len; i++) {
    bdArray_in[i].x = 1;
    jsArray_in[i] = 1;
  }

  var start_time = Date.now();
  for(var k = 0; k < outer_loop; k++) {
    for(i = 0; i < len; i++) {
      bdArray_out[i].x = bdArray_in[i].x;
    }
  }
  var elapsed_bd2bd = Date.now() - start_time;

  start_time = Date.now();
  for(var k = 0; k < outer_loop; k++) {
    for(i = 0; i < len; i++) {
      bdArray_out[i].x = jsArray_in[i];
    }
  }
  var elapsed_js2bd = Date.now() - start_time;

  start_time = Date.now();
  for(var k = 0; k < outer_loop; k++) {
    for(i = 0; i < len; i++) {
      jsArray_out[i] = bdArray_in[i].x;
    }
  }
  var elapsed_bd2js = Date.now() - start_time;

  start_time = Date.now();
  for(var k = 0; k < outer_loop; k++) {
    for(i = 0; i < len; i++) {
      jsArray_out[i] = jsArray_in[i];
    }
  }
  var elapsed_js2js = Date.now() - start_time;

  print("bd2bd: "+elapsed_bd2bd+
        " bd2js: "+elapsed_bd2js+
        " js2bd: "+elapsed_js2bd+
        " js2js: "+elapsed_js2js);
}

print("running binary data/array uint8 direct compare, outer_loop: "+outer_loop+" len: "+len);
do_test_direct();
print("running binary data/array struct uint8 compare, outer_loop: "+outer_loop+" len: "+len);
do_test_struct();
