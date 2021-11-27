"use strict";

class Bicycle
{
    constructor(gl, camera)
    {
        this.gl = gl;
        this.camera = camera;
        this.stack = new Stack();

        this.cube1 = null;
        this.cube2 = null;
        this.cube3 = null;

        this.cylinder1 = null;
        this.cylinder2 = null;

        this.frontRotation = 0;
        this.frontRotationsSpeed = 0;

        this.wheelRotation = 0;
        this.wheelRotationSpeed = 0;
    }

    initBuffers()
    {
        this.cube1 = new Cube(this.gl, this.camera, {red:0.5, green:0.5, blue:1, alpha:1});
        this.cube1.initBuffers();
        this.cube2 = new Cube(this.gl, this.camera, {red:0.9, green:0.4, blue:0.4, alpha:1});
        this.cube2.initBuffers();
        this.cube3 = new Cube(this.gl, this.camera, {red:0.2, green:0.4, blue:1, alpha:1});
        this.cube3.initBuffers();

        this.cylinder1 = new Cylinder(this.gl, this.camera, {red:0.1, green:1, blue:0.1, alpha:1}, {red:0.5, green:1, blue:0.5, alpha:1});
        this.cylinder1.initBuffers();
        this.cylinder2 = new Cylinder(this.gl, this.camera, {red:1, green:0.1, blue:0.1, alpha:1}, {red:1, green:0.5, blue:0.5, alpha:1});
        this.cylinder2.initBuffers();
    }

    handleKeys(elapsed, currentlyPressedKeys)
    {
        //Sving på hjulet
        if (currentlyPressedKeys[89])
        { //Y
            this.frontRotation += 1;
            this.frontRotationsSpeed = 10;
        }
        if (currentlyPressedKeys[85])
        { //U
            this.frontRotation -= 1;
            this.frontRotationsSpeed = 10;
        }
        else
        {
            this.frontRotationsSpeed = 0;
        }

        if (currentlyPressedKeys[70])
        { //F
            this.wheelRotation += 1;
            this.wheelRotationSpeed = 10;
        }
        if (currentlyPressedKeys[71])
        { //G
            this.wheelRotation -= 1;
            this.wheelRotationSpeed = 10;
        }
        else
        {
            this.wheelRotationSpeed = 0;
        }
    }

    drawRoot(elapsed, modelMatrix)
    {
        this.stack.pushMatrix(modelMatrix);
        //FØRSTE RØR
        modelMatrix.translate(2.25, 3.5, 0);
        modelMatrix.rotate(-10, 0, 0, 1);
        modelMatrix.translate(1, 0, 0);
        modelMatrix.scale(8.875, 0.5, 0.5);
        this.cube1.draw(elapsed, modelMatrix);
        //ANDRE RØR
        modelMatrix = this.stack.peekMatrix();
        modelMatrix.translate(4, -2.25, 0);
        modelMatrix.rotate(30, 0, 0, 1);
        modelMatrix.translate(1, 0, 0);
        modelMatrix.scale(8, 0.5, 0.5);
        this.cube1.draw(elapsed, modelMatrix);
        //TREDJE RØR
        modelMatrix = this.stack.peekMatrix();
        modelMatrix.translate(-3.25, -2.25, 0);
        modelMatrix.rotate(110, 0, 0, 1);
        modelMatrix.translate(1, 0, 0);
        modelMatrix.scale(8, 0.5, 0.5);
        this.cube1.draw(elapsed, modelMatrix);
        //FJERDE RØR
        modelMatrix = this.stack.peekMatrix();
        modelMatrix.translate(11.25, 3, 0);
        modelMatrix.rotate(110, 0, 0, 1);
        modelMatrix.rotate(this.frontRotation, -1, 0, 0);
        modelMatrix.translate(1, 0, 0);
        modelMatrix.scale(7, 0.5, 0.5);
        this.cube1.draw(elapsed, modelMatrix);
        //FEMTE RØR
        modelMatrix = this.stack.peekMatrix();
        modelMatrix.translate(-12.75, 0, 0);
        modelMatrix.rotate(35, 0, 0, 1);
        modelMatrix.translate(1, 0, 0);
        modelMatrix.scale(8, 0.5, 0.5);
        this.cube1.draw(elapsed, modelMatrix);
        //SJETTE RØR
        modelMatrix = this.stack.peekMatrix();
        modelMatrix.translate(-11, -4, 0);
        modelMatrix.rotate(-10, 0, 0, 1);
        modelMatrix.translate(1, 0, 0);
        modelMatrix.scale(8.5, 0.5, 0.5);
        this.cube1.draw(elapsed, modelMatrix);
        //SJUNDE RØR
        modelMatrix = this.stack.peekMatrix();
        modelMatrix.translate(14.75, -6.5, 1);
        modelMatrix.rotate(110, 0, 0, 1);
        modelMatrix.rotate(this.frontRotation, -1, 0, 0);
        modelMatrix.translate(1, 0, 0);
        modelMatrix.scale(5.5, 0.5, 0.5);
        this.cube1.draw(elapsed, modelMatrix);
        //ÅTTENDE RØR
        modelMatrix = this.stack.peekMatrix();
        modelMatrix.translate(14.75, -6.5, -1);
        modelMatrix.rotate(110, 0, 0, 1);
        modelMatrix.rotate(this.frontRotation, -1, 0, 0);
        modelMatrix.translate(1, 0, 0);
        modelMatrix.scale(5.5, 0.5, 0.5);
        this.cube1.draw(elapsed, modelMatrix);
        //NIENDE RØR
        modelMatrix = this.stack.peekMatrix();
        modelMatrix.translate(-19, -8, 1);
        modelMatrix.rotate(70, 0, 0, 1);
        modelMatrix.translate(1, 0, 0);
        modelMatrix.scale(3, 0.5, 0.5);
        this.cube1.draw(elapsed, modelMatrix);
        //TIENDE RØR
        modelMatrix = this.stack.peekMatrix();
        modelMatrix.translate(-19, -8, -1);
        modelMatrix.rotate(70, 0, 0, 1);
        modelMatrix.translate(1, 0, 0);
        modelMatrix.scale(3, 0.5, 0.5);
        this.cube1.draw(elapsed, modelMatrix);
        //TRØ RØR MIDTEN
        modelMatrix = this.stack.peekMatrix();
        modelMatrix.translate(-3, -7, 0);
        modelMatrix.rotate(35, 0, 0, 1);
        modelMatrix.translate(1, 0, 0);
        modelMatrix.scale(0.5, 0.5, 6);
        this.cube1.draw(elapsed, modelMatrix);
        //TRØ RØR FREMME
        modelMatrix = this.stack.peekMatrix();
        modelMatrix.translate(-1.75, -6.15, 5.6);
        modelMatrix.rotate(35, 0, 0, 1);
        modelMatrix.translate(1, 0, 0);
        modelMatrix.scale(2, 0.5, 0.5);
        this.cube1.draw(elapsed, modelMatrix);
        //TRØE FREMME
        modelMatrix = this.stack.peekMatrix();
        modelMatrix.translate(0, -5, 5.6);
        modelMatrix.rotate(35, 0, 0, 1);
        modelMatrix.translate(1, 0, 0);
        modelMatrix.scale(0.5, 1.25, 2.5);
        this.cube3.draw(elapsed, modelMatrix);
        //TRØE BAK
        modelMatrix = this.stack.peekMatrix();
        modelMatrix.translate(-6, -9.25, -5.6);
        modelMatrix.rotate(35, 0, 0, 1);
        modelMatrix.translate(1, 0, 0);
        modelMatrix.scale(0.5, 1.25, 2.5);
        this.cube3.draw(elapsed, modelMatrix);
        //TRØ RØR BAK
        modelMatrix = this.stack.peekMatrix();
        modelMatrix.translate(-4.25, -8, -5.6);
        modelMatrix.rotate(35, 0, 0, 1);
        modelMatrix.translate(1, 0, 0);
        modelMatrix.scale(2, 0.5, 0.5);
        this.cube1.draw(elapsed, modelMatrix);
        //SETE
        modelMatrix = this.stack.peekMatrix();
        modelMatrix.translate(-7, 6.5, 0);
        modelMatrix.rotate(10, 0, 0, 1);
        modelMatrix.translate(1, 0, 0);
        modelMatrix.scale(3, 0.5, 2);
        this.cube2.draw(elapsed, modelMatrix);
        //HÅNDTAK
        modelMatrix = this.stack.peekMatrix();
        modelMatrix.translate(7.5, 10, 0);
        modelMatrix.rotate(20, 0, 0, 1);
        modelMatrix.rotate(this.frontRotation, 0, -1, 0);
        modelMatrix.translate(1, 0, 0);
        modelMatrix.scale(0.7, 0.5, 4);
        this.cube2.draw(elapsed, modelMatrix);
        //HJUL FREMME
        modelMatrix = this.stack.peekMatrix();
        modelMatrix.translate(16, -10, 0);
        modelMatrix.rotate(90, 1, 0, 0);
        modelMatrix.rotate(this.frontRotation, 0, 0, 1);
        modelMatrix.rotate(this.wheelRotation, 0, 1, 0);
        modelMatrix.scale(5, 0.5, 5);
        this.cylinder1.draw(elapsed, modelMatrix);
        //HJUL FESTE, FREMME, NEDE
        modelMatrix = this.stack.peekMatrix();
        modelMatrix.translate(16, -10, 0);
        modelMatrix.rotate(90, 1, 0, 0);
        modelMatrix.rotate(this.frontRotation, 0, 0, 1);
        modelMatrix.scale(1, 1, 1);
        this.cylinder2.draw(elapsed, modelMatrix);
        //HJUL FESTE, FREMME, OPPE
        modelMatrix = this.stack.peekMatrix();
        modelMatrix.translate(12.75, -1, 0);
        modelMatrix.rotate(90, 1, 0, 0);
        modelMatrix.rotate(this.frontRotation, 0, 0, 1);
        modelMatrix.scale(1.375, 1, 1.375);
        this.cylinder2.draw(elapsed, modelMatrix);
        //TRØ FESTE
        modelMatrix = this.stack.peekMatrix();
        modelMatrix.translate(-2, -6.5, 0);
        modelMatrix.rotate(90, 1, 0, 0);
        modelMatrix.scale(3, 0.5, 3);
        this.cylinder2.draw(elapsed, modelMatrix);
        //HJUL FESTE, BAK, OPPE
        modelMatrix = this.stack.peekMatrix();
        modelMatrix.translate(-17.5, -3.25, 0);
        modelMatrix.rotate(90, 1, 0, 0);
        modelMatrix.scale(1.375, 1, 1.375);
        this.cylinder2.draw(elapsed, modelMatrix);
        //HJUL FESTE, BAK, NEDE
        modelMatrix = this.stack.peekMatrix();
        modelMatrix.translate(-19.75, -10, 0);
        modelMatrix.rotate(90, 1, 0, 0);
        modelMatrix.scale(1, 1, 1);
        this.cylinder2.draw(elapsed, modelMatrix);
        //HJUL BAK
        modelMatrix = this.stack.peekMatrix();
        modelMatrix.translate(-19.5, -10, 0);
        modelMatrix.rotate(90, 1, 0, 0);
        modelMatrix.rotate(this.wheelRotation, 0, 1, 0);
        modelMatrix.scale(5, 0.5, 5);
        this.cylinder1.draw(elapsed, modelMatrix);
        this.stack.empty();
    }

    draw(elapsed, modelMatrix)
    {
        this.frontRotation = this.frontRotation + (this.frontRotationsSpeed * elapsed);
        this.frontRotation %= 360;
        this.wheelRotation = this.wheelRotation + (this.wheelRotationSpeed * elapsed);
        this.wheelRotation %= 360;
        this.drawRoot(elapsed, modelMatrix);
    }
}