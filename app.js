import { OrbitControls } from "./OrbitControls.js";

let container, camera, renderer, scene, car, controls;

function init() {
	container = document.querySelector(".scene");
  
	scene = new THREE.Scene();
  
	const fov = 75;
	const aspect = container.clientWidth / container.clientHeight;
	const near = 0.1;
	const far = 1000;

	camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
	camera.position.set(0, 0, 15);
  
	const ambient = new THREE.AmbientLight(0x040404, 11);
	scene.add(ambient);
  
	const light = new THREE.DirectionalLight(0x404040, 3);
	light.position.set(180, 180, 270);
	scene.add(light);
	light.castShadow = true

	renderer = new THREE.WebGLRenderer({ antialias: true });
	renderer.setSize(container.clientWidth, container.clientHeight);
	renderer.setPixelRatio(window.devicePixelRatio);
  
	container.appendChild(renderer.domElement);
  
	controls = new OrbitControls(camera, renderer.domElement);
	controls.target.set(0, 0, 0);
	controls.enableDamping = true;
	controls.enablePan = true;

	let loader = new THREE.GLTFLoader();
	loader.load("./3d/scene.glb", function(gltf) {
	  scene.add(gltf.scene);
	  car = gltf.scene.children[0];
	  animate();
	});
  }
  
  function animate(){
	controls.update();
	requestAnimationFrame( animate );
	car.rotation.z -= 0.0003;
	renderer.render(scene, camera);
  }
  init();
  
  function onWindowResize() {
	camera.aspect = container.clientWidth / container.clientHeight;
	camera.updateProjectionMatrix();
  }
