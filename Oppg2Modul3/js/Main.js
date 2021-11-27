'use strict';

class Main
{
    constructor()
    {
        this.gl = null;
        this.canvas = null;
        this.camera = null;
        this.currentlyPressedKeys = [];
        this.lastTime = 0.0;
        this.fpsData = new Object();
    }

    start()
    {
        this.initContext();

        let uri = document.baseURI;
        document.getElementById('uri').innerHTML = uri;

        let vertexShaderSource = document.getElementById('my-vertex-shader').innerHTML;
        let fragmentShaderSource = document.getElementById('my-fragment-shader').innerHTML;
        if (!initShaders(this.gl, vertexShaderSource, fragmentShaderSource))
        {
            console.log('Feil ved initialisering av shaderkoden - se over koden på nytt.');
            return;
        }
        this.gl.enable(this.gl.DEPTH_TEST);
        this.gl.depthFunc(this.gl.LESS);

        this.camera = new Camera(this.canvas, this.currentlyPressedKeys);
        this.camera.setCamera();

        this.bicycle = new Bicycle(this.gl, this.camera);
        this.bicycle.initBuffers();

        this.gl.clearColor(0, 0, 0, 1); //RGBA

        this.fpsData.antallFrames = 0;
        this.fpsData.forrigeTidsstempel = 0;

        this.draw();
    }

    initContext()
    {
        this.canvas = document.getElementById('webgl');
        this.gl = this.canvas.getContext('webgl');

        if (!this.gl)
        {
            console.log('Fikk ikke tak i rendering context for WebGL');
            return false;
        }

        this.gl.viewport(0,0,this.canvas.width,this.canvas.height);

        document.addEventListener('keyup', this.handleKeyUp.bind(this), false);
        document.addEventListener('keydown', this.handleKeyDown.bind(this), false);
    }

    handleKeyUp(event) {this.currentlyPressedKeys[event.which] = false;}
    handleKeyDown(event) {this.currentlyPressedKeys[event.which] = true;}

    handleKeys(elapsed)
    {
        this.camera.handleKeys(elapsed);
        this.bicycle.handleKeys(elapsed, this.currentlyPressedKeys);
    }

    draw(currentTime)
    {
        window.requestAnimationFrame(this.draw.bind(this));
        if (currentTime === undefined)
        {
            currentTime = 0;
        }

        if (currentTime - this.fpsData.forrigeTidsstempel >= 1000)
        {
            document.getElementById('fps').innerHTML = this.fpsData.antallFrames;
            this.fpsData.antallFrames = 0;
            this.fpsData.forrigeTidsstempel = currentTime;
        }

        let elapsed = 0.0;
        if (this.lastTime !== 0.0)
        {
            elapsed = (currentTime - this.lastTime)/1000;
        }
        this.lastTime = currentTime;

        this.gl.clear(this.gl.COLOR_BUFFER_BIT);
        this.gl.enable(this.gl.BLEND);
        this.gl.blendFunc(this.gl.SRC_ALPHA, this.gl.ONE_MINUS_SRC_ALPHA);

        let modelMatrix2 = new Matrix4();
        modelMatrix2.setIdentity();
        this.bicycle.draw(elapsed, modelMatrix2);

        this.handleKeys(elapsed);
        this.fpsData.antallFrames++;
    }
}