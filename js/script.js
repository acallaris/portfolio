let scene, camera, renderer, starGeo, star, stars;

(function () {
  camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000);
  camera.position.z = 1;
  camera.rotation.x = Math.PI / 2;

  scene = new THREE.Scene();

  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);

  document.getElementById('particle').appendChild(renderer.domElement);

  starGeo = new THREE.Geometry();
  for (let i = 0; i < 6000; i++) {
    star = new THREE.Vector3(
      Math.random() * 600 - 300,
      Math.random() * 600 - 300,
      Math.random() * 600 - 300
    );
    star.velocity = 0;
    star.acceleration = 0.02;

    starGeo.vertices.push(star);
  }

  let sprite = new THREE.TextureLoader().load('img/star.png');
  let starMaterial = new THREE.PointsMaterial({
    color: 0xaaaaaa,
    size: 0.7,
    map: sprite
  });

  stars = new THREE.Points(starGeo, starMaterial);
  scene.add(stars);

  function animate() {
    starGeo.vertices.forEach(p => {
      p.velocity += p.acceleration
      p.y -= p.velocity;
      
      if (p.y < -200) {
        p.y = 200;
        p.velocity = 0;
      }
    });
    starGeo.verticesNeedUpdate = true; 
    stars.rotation.y +=0.002;
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
  }

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  animate();
}).call(this);