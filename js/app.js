/**
 * Created by Andrey on 01.02.2015.
 * skype: snaipi91;
 * mail: snaipi91@rambler.ru
 */
// stats.js
window.onload = function() {

    var stats = new Stats();
    stats.setMode(0); // 0: fps, 1: ms

// align top-left
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.left = '0px';
    stats.domElement.style.top = '0px';

    document.body.appendChild(stats.domElement);

    var update = function () {

        stats.begin();

        // monitored code goes here

        stats.end();

        requestAnimationFrame(update);

    };

    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 10000);

    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    var geometry = new THREE.SphereGeometry(70, 32, 32);
    var material = new THREE.MeshLambertMaterial({color: 0xffffff});
    var planGeometry = new THREE.PlaneGeometry(320, 320, 4, 4);
    var plane = new THREE.Mesh(planGeometry, material);
    var sphere = new THREE.Mesh(geometry, material);

    var spotLight = new THREE.PointLight(0xFF0000); // Set the color of the light source (white).
    spotLight.position.set(150, 0, 50); // Position the light source at (x, y, z).
    scene.add(spotLight);
    scene.add(sphere);
    scene.add(plane);


// GUI
    var gui = new dat.GUI();
    var controls = new function () {
        this.positionZ = 600;
        this.bright = 1;
    };
    gui.add(controls, "positionZ", 300, 3000);
    gui.add(controls, 'bright', 0.1, 1.3);

    renderer.shadowMapEnabled = true;
    plane.receiveShadow = true;
    sphere.castShadow = true;

    var render = function () {
        requestAnimationFrame(render);

        spotLight.intensity = controls.bright;
        camera.position.z = controls.positionZ;
        sphere.rotation.y += 0.05;
        stats.update();

        renderer.render(scene, camera);
    };

    render();
};