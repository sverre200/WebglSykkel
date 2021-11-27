'use strict';

class Cylinder
{
    constructor(gl, camera, color1, color2)
    {
        this.gl = gl;
        this.camera = camera;

        this.color1 = color1!==undefined?color1:{red:1,green:1, blue:0, alpha:1};
        this.color2 = color2!==undefined?color2:{red:0,green:1, blue:1, alpha:1};

        this.red1 = this.color1.red;
        this.blue1 = this.color1.blue;
        this.green1 = this.color1.green;

        this.red2 = this.color2.red;
        this.blue2 = this.color2.blue;
        this.green2 = this.color2.green;

        this.vertexBufferCylTop = null;
        this.vertexBufferCylBottom = null;
        this.vertexBufferCylWalls = null;

        this.cylinderTopVertices = null;
        this.cylinderBottomVertices = null;
        this.cylinderWallsVertices = null;

        this.noVertsTop = 0;
        this.noVertsBottom = 0;
        this.noVertsWalls = 0;

        this.verticesWalls = [];

        this.u_modelviewMatrix = gl.getUniformLocation(gl.program, 'u_modelviewMatrix');
        this.u_projectionMatrix = gl.getUniformLocation(gl.program, 'u_projectionMatrix');
    }

    createRectangleVertices(phi, yVal, step)
    {
        let r = this.red2;
        let g = this.green2;
        let b = this.blue2;
        let a = 1;
        let x, y, z;

        x = Math.cos(phi);
        y = yVal;
        z = -Math.sin(phi);
        this.verticesWalls = this.verticesWalls.concat(x,y,z, r,g,b,a);
        this.noVertsWalls++;

        x = Math.cos(phi);
        y = -yVal;
        z = -Math.sin(phi);
        this.verticesWalls = this.verticesWalls.concat(x,y,z, r,g,b,a);
        this.noVertsWalls++;

        x = Math.cos(phi+step);
        y = -yVal;
        z = -Math.sin(phi+step);
        this.verticesWalls = this.verticesWalls.concat(x,y,z, r,g,b,a);
        this.noVertsWalls++;

        x = Math.cos(phi);
        y = yVal;
        z = -Math.sin(phi);

        this.verticesWalls = this.verticesWalls.concat(x,y,z, r,g,b,a);
        this.noVertsWalls++;

        x = Math.cos(phi+step);
        y = -yVal;
        z = -Math.sin(phi+step);
        this.verticesWalls = this.verticesWalls.concat(x,y,z, r,g,b,a);
        this.noVertsWalls++;

        x = Math.cos(phi+step);
        y = yVal;
        z = -Math.sin(phi+step);
        this.verticesWalls = this.verticesWalls.concat(x,y,z, r,g,b,a);
        this.noVertsWalls++;
    }

    initCylinderVertices()
    {
        let toPI = 2*Math.PI;
        let verticesTop = [];
        let stepGrader = 10;
        let step = (Math.PI / 180) * stepGrader;
        let x=0,y=2,z=0;
        let r=this.red1, g=this.green1, b=this.blue1, a=1;

        x=0;y=2;z=0;
        verticesTop = verticesTop.concat(x,y,z, r,g,b,a);
        this.noVertsTop++;
        for (let phi = 0.0; phi <= toPI; phi += step)
        {
            x = Math.cos(phi);
            y = 2;
            z = Math.sin(phi);

            verticesTop = verticesTop.concat(x,y,z, r,g,b,a);
            this.noVertsTop++;
        }
        this.cylinderTopVertices = new Float32Array(verticesTop);

        x=0;y=-2;z=0;
        let verticesBottom = [];
        verticesBottom = verticesBottom.concat(x,y,z, r,g,b,a);
        this.noVertsBottom++;
        for (let phi = 0.0; phi <= toPI; phi += step)
        {
            x = Math.cos(phi);
            y = -2;
            z = Math.sin(phi);

            verticesBottom = verticesBottom.concat(x,y,z, r,g,b,a);
            this.noVertsBottom++;
        }
        this.cylinderBottomVertices = new Float32Array(verticesBottom);

        let cylinderHeight = 2;
        let phi;
        for (phi=0; phi<=toPI; phi+=step)
        {
            this.createRectangleVertices(phi, cylinderHeight, step);
        }
        this.cylinderWallsVertices = new Float32Array(this.verticesWalls);
    }

    initBuffers()
    {
        this.initCylinderVertices();
        this.vertexBufferCylTop = this.gl.createBuffer();
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.vertexBufferCylTop);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, this.cylinderTopVertices, this.gl.STATIC_DRAW);

        this.vertexBufferCylTop.itemSize = 3 + 4;
        this.vertexBufferCylTop.numberOfItems = this.noVertsTop;
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, null);

        this.vertexBufferCylBottom = this.gl.createBuffer();
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.vertexBufferCylBottom);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, this.cylinderBottomVertices, this.gl.STATIC_DRAW);

        this.vertexBufferCylBottom.itemSize = 3 + 4;
        this.vertexBufferCylBottom.numberOfItems = this.noVertsBottom;
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, null);

        this.vertexBufferCylWalls = this.gl.createBuffer();
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.vertexBufferCylWalls);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, this.cylinderWallsVertices, this.gl.STATIC_DRAW);

        this.vertexBufferCylWalls.itemSize = 3 + 4;
        this.vertexBufferCylWalls.numberOfItems = this.noVertsWalls;
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, null);
    }

    draw(elapsed, modelMatrix)
    {
        this.camera.setCamera();
        let modelviewMatrix = this.camera.getModelViewMatrix(modelMatrix);

        this.gl.uniformMatrix4fv(this.u_modelviewMatrix, false, modelviewMatrix.elements);
        this.gl.uniformMatrix4fv(this.u_projectionMatrix, false, this.camera.projectionMatrix.elements);
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.vertexBufferCylTop);
        let a_Position = this.gl.getAttribLocation(this.gl.program, 'a_Position');
        let stride = (3 + 4) * 4;

        this.gl.vertexAttribPointer(a_Position, 3, this.gl.FLOAT, false, stride, 0);
        this.gl.enableVertexAttribArray(a_Position);
        let a_Color = this.gl.getAttribLocation(this.gl.program, 'a_Color');
        let colorOfset = 3 * 4;

        this.gl.vertexAttribPointer(a_Color, 4, this.gl.FLOAT, false, stride, colorOfset);
        this.gl.enableVertexAttribArray(a_Color);
        this.gl.drawArrays(this.gl.TRIANGLE_FAN, 0, this.vertexBufferCylTop.numberOfItems);
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.vertexBufferCylBottom);

        a_Position = this.gl.getAttribLocation(this.gl.program, 'a_Position');
        stride = (3 + 4) * 4;
        this.gl.vertexAttribPointer(a_Position, 3, this.gl.FLOAT, false, stride, 0);
        this.gl.enableVertexAttribArray(a_Position);

        a_Color = this.gl.getAttribLocation(this.gl.program, 'a_Color');
        colorOfset = 3 * 4;
        this.gl.vertexAttribPointer(a_Color, 4, this.gl.FLOAT, false, stride, colorOfset);
        this.gl.enableVertexAttribArray(a_Color);
        this.gl.drawArrays(this.gl.TRIANGLE_FAN, 0, this.vertexBufferCylBottom.numberOfItems);

        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.vertexBufferCylWalls);
        a_Position = this.gl.getAttribLocation(this.gl.program, 'a_Position');
        stride = (3 + 4) * 4;
        this.gl.vertexAttribPointer(a_Position, 3, this.gl.FLOAT, false, stride, 0);
        this.gl.enableVertexAttribArray(a_Position);

        a_Color = this.gl.getAttribLocation(this.gl.program, 'a_Color');
        colorOfset = 3 * 4;
        this.gl.vertexAttribPointer(a_Color, 4, this.gl.FLOAT, false, stride, colorOfset);
        this.gl.enableVertexAttribArray(a_Color);

        this.gl.drawArrays(this.gl.TRIANGLES, 0, this.vertexBufferCylWalls.numberOfItems);
    }
}



