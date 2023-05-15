import { render } from 'react-dom/cjs/react-dom.production.min';
import './style.css'
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"

//scene
const scene = new THREE.Scene()

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
}
//camera
const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height)
camera.position.z = 20
camera.position.y = 5
scene.add(camera)

//renderer
const canvas = document.querySelector("#bg")
const renderer = new THREE.WebGL1Renderer({canvas}, {alpha : true}) //clear bg
renderer.setClearColor( 0xffffff, 0 ) //clear bg
renderer.setPixelRatio(window.devicePixelRatio)
renderer.setSize(window.innerWidth, window.innerHeight)


renderer.render(scene, camera)

//light
const light = new THREE.PointLight(0xffffff, 1, 100)
light.position.set(0, 10, 10)
scene.add(light)
const lighttwo = new THREE.AmbientLight( 0x404040 ); // soft white light
scene.add( lighttwo );
const lightthree = new THREE.PointLight(0xffffff, 1, 100)
lightthree.position.set(5, -5, -10)
scene.add(lightthree)
const lightfour = new THREE.PointLight(0xffffff, 1, 100)
lightfour.position.set(-5, 5, 10)
scene.add(lightfour)

//object
let loadedModel;
const loader = new GLTFLoader();

loader.load( "capybara_low_poly/scene.gltf", function( gltf ) {
  loadedModel = gltf
  gltf.scene.scale.set(10, 10, 10);
  gltf.scene.position.y = -5
  gltf.scene.position.x = -3
  gltf.scene.rotation.y = Math.PI/8
	scene.add( gltf.scene );
  renderer.render(scene, camera)

}, undefined, function ( error ) {

	console.error( error );

} );

//animate object
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true
controls.enablePan = false
controls.enableZoom = false
controls.autoRotate = true
controls.autoRotateSpeed = 5

window.addEventListener('resize', () => {
  //update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight
  //update camera
  camera.aspect = sizes.width / sizes.height
  camera.updateProjectionMatrix()
  renderer.setSize(sizes.width, sizes.height)
})

const loop = () => {
  controls.update()
  renderer.render(scene, camera)
  window.requestAnimationFrame(loop)
}
loop()


//controll scroll to page on click of nav buttons
window.smoothScroll = function(target) {
  var scrollContainer = target;
  do { //find scroll container
      scrollContainer = scrollContainer.parentNode;
      if (!scrollContainer) return;
      scrollContainer.scrollTop += 1;
  } while (scrollContainer.scrollTop == 0);

  var targetY = 0;
  do { //find the top of target relatively to the container
      if (target == scrollContainer) break;
      targetY += target.offsetTop;
  } while (target = target.offsetParent);

  scroll = function(c, a, b, i) {
      i++; if (i > 30) return;
      c.scrollTop = a + (b - a) / 30 * i;
      setTimeout(function(){ scroll(c, a, b, i); }, 20);
  }
  // start scrolling
  scroll(scrollContainer, scrollContainer.scrollTop, targetY, 0);
}
