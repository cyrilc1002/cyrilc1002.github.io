let container, camera, renderer, scene, car, controls;

function init() {
	container = document.querySelector(".scene");
  
	scene = new THREE.Scene();
  
	const fov = 55;
	const aspect = container.clientWidth / container.clientHeight;
	const near = 1;
	const far = 2000;

	camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
	camera.position.set(0, 0, 50);
  
	const ambient = new THREE.AmbientLight(0x404040, 8);
	scene.add(ambient);
  
	const light = new THREE.DirectionalLight(0xffffff, 10);
	light.position.set(50, 50, 100);
	scene.add(light);

	renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
	renderer.setSize(container.clientWidth, container.clientHeight);
	renderer.setPixelRatio(window.devicePixelRatio);
  
	container.appendChild(renderer.domElement);
  

	let loader = new THREE.GLTFLoader();
	loader.load("./3d/scene.gltf", function(gltf) {
	  scene.add(gltf.scene);
	  car = gltf.scene.children[0];
	  animate();
	});
  }
  
  function animate(){
	  requestAnimationFrame( animate );
	  car.rotation.z -= 0.01;
	  renderer.render(scene, camera);
  }
  init();
  
  function onWindowResize() {
	camera.aspect = container.clientWidth / container.clientHeight;
	camera.updateProjectionMatrix();
  }
