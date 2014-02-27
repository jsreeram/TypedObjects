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

// 1080p has 1920 x 1080 pixels, but we will use a smaller number
// for testing.
var width = 50;
var height = 50;
var numPixels = width*height;
var numChannels = 4;
var numValues = numPixels*numChannels;
var numIters = 5;

var ArrayType = TypedObject.ArrayType;
var StructType = TypedObject.StructType;
var uint8 = TypedObject.uint8;
var uint8Clamped = TypedObject.uint8Clamped;
var float32 = TypedObject.float32;
var uint32 = TypedObject.uint32;

var StructPixelType = new StructType({
    r: uint8Clamped,
    g: uint8Clamped,
    b: uint8Clamped,
    a: uint8Clamped
});
// 2D array type of struct types
var BDImageType_2DStructs = StructPixelType.array(width, height);

// 3D array type
var ArrayPixelType = uint8Clamped.array(numChannels);
var BDImageType_3D = ArrayPixelType.array(width, height);

// 1D array type
var BDImageType_1D = uint8Clamped.array(numValues);

var BDImage_2DStructs = new BDImageType_2DStructs();
var BDImage_3D = new BDImageType_3D();
var BDImage_1D = new BDImageType_1D();
var JSImage_1D = [];


// Initialize all the input images with 1s.
for(var i = 0; i < width; i++) {
    for(var j = 0; j < height; j++) {
        BDImage_2DStructs[i][j].r = 1;
        BDImage_2DStructs[i][j].g = 1;
        BDImage_2DStructs[i][j].b = 1;
        BDImage_2DStructs[i][j].a = 1;
    }
}
for(i = 0; i < width; i++) {
    for(j = 0; j < height; j++) {
        for(var k = 0; k < numChannels; k++) {
            BDImage_3D[i][j][k] = 1;
        }
    }
}
for(i = 0; i < numValues; i++) {
    BDImage_1D[i] = 1;
    JSImage_1D[i] = 1;
}
var BDImage_2DStructs_out = new BDImageType_2DStructs();
var BDImage_3D_out = new BDImageType_3D();
var BDImage_1D_out = new BDImageType_1D();
var JSImage_1D_out = [];

// Run the test
function do_test() {

    // Measure 2D Array type of Structs case
    var start_time = Date.now();
    for(var n = 0; n < numIters; n++) {
        for(var i = 0; i < width; i++) {
            for(var j = 0; j < height; j++) {
                BDImage_2DStructs_out[i][j].r = BDImage_2DStructs[i][j].r;
                BDImage_2DStructs_out[i][j].g = BDImage_2DStructs[i][j].g;
                BDImage_2DStructs_out[i][j].b = BDImage_2DStructs[i][j].b;
                BDImage_2DStructs_out[i][j].a = BDImage_2DStructs[i][j].a;
            }
        }
    }
    elapsed_2DStructs = Date.now() - start_time;

    // Measure 3D Array type of scalars case
    start_time = Date.now();
    for(n = 0; n < numIters; n++) {
        for(i = 0; i < width; i++) {
            for(j = 0; j < height; j++) {
                for(var k = 0; k < numChannels; k++) {
                    BDImage_3D_out[i][j][k] = BDImage_3D[i][j][k];
                }
            }
        }
    }
    elapsed_3D = Date.now() - start_time;

    // Measure 1D Array type of scalars case
    start_time = Date.now();
    for(n = 0; n < numIters; n++) {
        for(i = 0; i < numValues; i++) {
            BDImage_1D_out[i] = BDImage_1D[i];
        }
    }
    elapsed_1D = Date.now() - start_time;

    // Measure 1D JS Array case
    start_time = Date.now();
    for(n = 0; n < numIters; n++) {
        for(i = 0; i < numValues; i++) {
            JSImage_1D_out[i] = JSImage_1D[i];
        }
    }
    elapsed_JS1D = Date.now() - start_time;

    print(" 2DStructs took: " + elapsed_2DStructs + " ms ---- 3DArray took: " + elapsed_3D + " ms --- 1D Array took: " + elapsed_1D + " ms --- JS 1DArray took: " + elapsed_JS1D + " ms");

    print(BDImage_2DStructs_out[width-1][height-1].r + " === " +
        BDImage_3D_out[width-1][height-1][3] + " === " +
        BDImage_1D_out[numValues-4] + " === " +
        JSImage_1D_out[numValues-4]);
}
do_test();

