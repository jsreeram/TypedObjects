/* Convolution on an image type with a fixed 5x5 filter
*  Author: Jaswanth Sreeram
*/


var Convolution = function(input, output, width, height, channels) {
    this.w = width;
    this.h = height;
    this.c = channels;
    this.input = input;
    this.output = output;
    this.filter = [[1,1,1,1,1], [1,2,2,2,1], [1,2,-32,2,1], [1,2,2,2,1], [1,1,1,1,1]];
}

Convolution.prototype.run = function () {
    var filter_width = (this.filter.length-1)/2;
    var neighbor_sum = 0;
    var w = this.w; var h = this.h;
    var input_image = this.input;
    var output_image = this.output;
    var filter = this.filter;
    var x, y;
    var weight;

    for(var m = 0; m < w; m++) {
        for(var n = 0; n < h; n++) {
            for(var i = -1*filter_width; i <= filter_width; i++) {
                for(var j = -1*filter_width; j <= filter_width; j++) {
                    x = m+i; y = n+j;
                    x = (x < 0 || x > w-1) ? 0 : x;
                    y = (y < 0 || y > h-1) ? 0 : y;
                    weight = filter[i+filter_width][j+filter_width];
                    neighbor_sum += input_image[x][y][0] * weight;
                }
            }
            output_image[m][n][0] = neighbor_sum;
        }
    }
}

function getTypedObjectImage(w, h, c) {
    var ImgType = TypedObject.int32.array(w, h, c);
    var img = new ImgType();
    for(var i = 0; i < w; i++) {
        for(var j = 0; j < h; j++) {
            for(var k = 0; k < c; k++) {
                img[i][j][k] = i+j+k;
            }
        }
    }
    return img;
}

function getJSArrayImage(w, h, c) {
    var img = [];
    for(var i = 0; i < w; i++) {
        img[i] = [];
        for(var j = 0; j < h; j++) {
            img[i][j] = [];
            for(var k = 0; k < c; k++) {
                img[i][j][k] = i+j+k;
            }
        }
    }
    return img;
}


function runTest() {
    var w = 50; var h = 50; var c = 4; var numIters = 5;

    var typedObject_input =  getTypedObjectImage(w, h, c);
    var typedObject_output = getTypedObjectImage(w, h, 1);
    var cTO = new Convolution(typedObject_input, typedObject_output, w, h, c);
    //Warmup
    cTO.run();
    var start_time = Date.now();
    for(var i = 0; i < numIters; i++) {
        cTO.run();
    }
    print("[Typed Objects] Time elapsed for " + numIters + " runs =  " + (Date.now() - start_time) + " ms");

    var jsArray_input = getJSArrayImage(w, h, c);
    var jsArray_output = getJSArrayImage(w, h, c);
    var jsTO = new Convolution(jsArray_input, jsArray_output, w, h, c);
    //Warmup
    jsTO.run();
    start_time = Date.now();
    for(var i = 0; i < numIters; i++) {
        jsTO.run();
    }
    print("[JS Arrays] Time elapsed for " + numIters + " runs =  " + (Date.now() - start_time) + " ms");
    print(cTO.output[2][3][0] + " == " + jsTO.output[2][3][0]);
}

runTest();
