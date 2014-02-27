/*
 * Copyright (c) 2011, Intel Corporation
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without 
 * modification, are permitted provided that the following conditions are met:
 *
 * - Redistributions of source code must retain the above copyright notice, 
 *   this list of conditions and the following disclaimer.
 * - Redistributions in binary form must reproduce the above copyright notice, 
 *   this list of conditions and the following disclaimer in the documentation 
 *   and/or other materials provided with the distribution.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
 * ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE 
 * LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR 
 * CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF 
 * SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS 
 * INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
 * CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) 
 * ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF 
 * THE POSSIBILITY OF SUCH DAMAGE.
 *
 */
/*  Convolution on an image type with a fixed 5x5 filter
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
    print("Time elapsed for " + numIters + " runs =  " + (Date.now() - start_time) + " ms");
    //print(cTO.output[2][3][0]);
}

runTest();
