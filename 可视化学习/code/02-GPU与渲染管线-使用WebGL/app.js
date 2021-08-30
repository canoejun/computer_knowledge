const vertex = `
attribute vec2 position;
varying vec3 color;

void main() {
    gl_PointSize = 1.0;
    color = vec3(0.5 + position * 0.5,0);
    gl_Position = vec4(position * 0.5, 1.0, 1.0);
}
`;

const fragment = `
precision mediump float;
varying vec3 color;

void main() {
    gl_FragColor = vec4(color,1.0);
}
`;
/** @type {HTMLCanvasElement} */

const canvas = document.getElementById("tutorial");
const webgl = canvas.getContext("webgl");

//创建shader
const vertexShader = webgl.createShader(webgl.VERTEX_SHADER);
webgl.shaderSource(vertexShader, vertex);
webgl.compileShader(vertexShader);

const fragmentShader = webgl.createShader(webgl.FRAGMENT_SHADER);
webgl.shaderSource(fragmentShader, fragment);
webgl.compileShader(fragmentShader);

//创建program，讲上面两个shader关联到program上
const program = webgl.createProgram();
webgl.attachShader(program, vertexShader);
webgl.attachShader(program, fragmentShader);
webgl.linkProgram(program);
webgl.useProgram(program);

//定义数组顶点，用于和实际的顶点数据进行一一对应
const points = new Float32Array([-1, -1, 0, 1, 1, -1]);
// const points = new Float32Array([-0.5, -0.5, 0, 0.5, 0.5, -0.5]);

//创建缓冲区
const bufferId = webgl.createBuffer();
webgl.bindBuffer(webgl.ARRAY_BUFFER, bufferId);
webgl.bufferData(webgl.ARRAY_BUFFER, points, webgl.STATIC_DRAW);

const vPosition = webgl.getAttribLocation(program, "position");
webgl.vertexAttribPointer(vPosition, 2, webgl.FLOAT, false, 0, 0);
webgl.enableVertexAttribArray(vPosition);

webgl.clear(webgl.COLOR_BUFFER_BIT);
webgl.drawArrays(webgl.TRIANGLES, 0, points.length / 2);
