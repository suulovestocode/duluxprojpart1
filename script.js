document.addEventListener('DOMContentLoaded', () => {
    const video = document.getElementById('video');
    video.src = 'videoforar.mp4';
  
    // Load the video and set its size
    video.style.width = '320px';
    video.style.height = '240px';
  
    // Setup Three.js
    const threeEntity = document.getElementById('three-model');
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(320, 240);
    renderer.domElement.style.position = 'absolute';
    renderer.domElement.style.top = '0';
    renderer.domElement.style.left = '0';
    document.body.appendChild(renderer.domElement);
  
    // Load 3D models using GLTFLoader
    const loader = new THREE.GLTFLoader();
  
    // Load house model (GLB)
    loader.load('house .glb', (gltf) => {
      const houseModel = gltf.scene;
      houseModel.position.set(0, 0, 0);
      houseModel.scale.set(0.5, 0.5, 0.5);
      scene.add(houseModel);
    });
  
    // Load another 3D model (GLB)
    loader.load('path/to/your/model.glb', (gltf) => {
      const model = gltf.scene;
      model.position.set(1, 0, 0);
      model.scale.set(0.5, 0.5, 0.5);
      scene.add(model);
  
      // Add event listener to 3D model
      model.traverse((child) => {
        if (child.isMesh) {
          child.addEventListener('click', () => {
            const geometry = new THREE.BoxGeometry();
            const material = new THREE.MeshBasicMaterial({ color: 0xff00ff });
            const cube = new THREE.Mesh(geometry, material);
            cube.position.set(1, 1, 1);
            scene.add(cube);
          });
        }
      });
    });
  
    camera.position.z = 5;
  
    function animate() {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    }
  
    animate();
  });
  