import * as THREE from 'three';

let camera, scene, renderer, geometry, material, mesh;
let clock, delta, cubeSineDriver, light, smokeParticles, smokeTexture, smokeMaterial, smokeGeo;

function init() {
    
    clock = new THREE.Clock();
    
    renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);

    scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x0f0ff, 0.0015)

    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
    camera.position.z = 1000;
    scene.background = new THREE.Color("#000000");
    scene.add(camera);
                
    
    light = new THREE.HemisphereLight(0xd6e6ff, 0xa38c08, 1);
    scene.add(light);

    geometry = new THREE.BoxGeometry(200, 200, 200);
    
    mesh = new THREE.Mesh(geometry, material);cubeSineDriver = 0;

    smokeTexture = new THREE.TextureLoader().load("https://s3-us-west-2.amazonaws.com/s.cdpn.io/95637/Smoke-Element.png");
    
    smokeMaterial = new THREE.MeshLambertMaterial({
        color: 0xffffff,
        emissive: 0x222222,
        opacity: 0.99,
        transparent: true,
        map: smokeTexture,
    });
    
    smokeGeo = new THREE.PlaneGeometry(300, 300);
    smokeParticles = [];
    
    for (let p = 0; p < 150; p++) {
        let particle = new THREE.Mesh(smokeGeo, smokeMaterial);
        particle.position.set(
            Math.random() * 500 - 250,
            Math.random() * 500 - 250,
            Math.random() * 1000 - 100
            );
            
            particle.rotation.z = Math.random() * 360;scene.add(particle);
            smokeParticles.push(particle);
        }
        
        document.body.appendChild(renderer.domElement);
    }
    
    function animate() {
        delta = clock.getDelta();
        requestAnimationFrame(animate);
        evolveSmoke();
        render();
        }
        
    function evolveSmoke() {
        let sp = smokeParticles.length;
        while (sp--) {
            smokeParticles[sp].rotation.z += delta * 0.2;
        }
    }
    
    function render() {
        renderer.setClearColor(0xffffff, 0);
        mesh.rotation.x += 0.005;
        mesh.rotation.y += 0.01;
        cubeSineDriver += 0.01;
        mesh.position.z = 100 + Math.sin(cubeSineDriver) * 500;
        renderer.render(scene, camera);
    }
    
    init();
    animate();