import * as THREE from "three/build/three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js"
import { RectAreaLightUniformsLib } from "three/examples/jsm/lights/RectAreaLightUniformsLib.js"
import "./index.css"

RectAreaLightUniformsLib.init()

// ltc_1 is undefined, it writes into another namespace ...
console.log(THREE.ShaderLib.standard.uniforms)

var renderer, scene, camera
var origin = new THREE.Vector3()
var rectLight
init()
animate()
function init() {
  renderer = new THREE.WebGLRenderer({ antialias: true })
  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.shadowMap.enabled = true
  renderer.shadowMap.type = THREE.PCFSoftShadowMap
  renderer.gammaInput = true
  renderer.gammaOutput = true
  document.body.appendChild(renderer.domElement)
  camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000)
  camera.position.set(0, 20, 35)
  scene = new THREE.Scene()
  var ambient = new THREE.AmbientLight(0xffffff, 0.1)
  scene.add(ambient)
  rectLight = new THREE.RectAreaLight(0xffffff, 1, 10, 10)
  rectLight.position.set(5, 5, 0)
  scene.add(rectLight)
  var rectLightMesh = new THREE.Mesh(new THREE.PlaneBufferGeometry(), new THREE.MeshBasicMaterial({ side: THREE.BackSide }))
  rectLightMesh.scale.x = rectLight.width
  rectLightMesh.scale.y = rectLight.height
  rectLight.add(rectLightMesh)
  var rectLightMeshBack = new THREE.Mesh(new THREE.PlaneBufferGeometry(), new THREE.MeshBasicMaterial({ color: 0x080808 }))
  rectLightMesh.add(rectLightMeshBack)
  var geoFloor = new THREE.BoxBufferGeometry(2000, 0.1, 2000)
  var matStdFloor = new THREE.MeshStandardMaterial({ color: 0x808080, roughness: 0, metalness: 0 })
  var mshStdFloor = new THREE.Mesh(geoFloor, matStdFloor)
  scene.add(mshStdFloor)
  var matStdObjects = new THREE.MeshStandardMaterial({ color: 0xa00000, roughness: 0, metalness: 0 })
  var geoBox = new THREE.BoxBufferGeometry(Math.PI, Math.sqrt(2), Math.E)
  var mshStdBox = new THREE.Mesh(geoBox, matStdObjects)
  mshStdBox.position.set(0, 5, 0)
  mshStdBox.rotation.set(0, Math.PI / 2.0, 0)
  mshStdBox.castShadow = true
  mshStdBox.receiveShadow = true
  scene.add(mshStdBox)
  var geoSphere = new THREE.SphereBufferGeometry(1.5, 32, 32)
  var mshStdSphere = new THREE.Mesh(geoSphere, matStdObjects)
  mshStdSphere.position.set(-5, 5, 0)
  mshStdSphere.castShadow = true
  mshStdSphere.receiveShadow = true
  scene.add(mshStdSphere)
  var geoKnot = new THREE.TorusKnotBufferGeometry(1.5, 0.5, 100, 16)
  var mshStdKnot = new THREE.Mesh(geoKnot, matStdObjects)
  mshStdKnot.position.set(5, 5, 0)
  mshStdKnot.castShadow = true
  mshStdKnot.receiveShadow = true
  scene.add(mshStdKnot)
  var controls = new OrbitControls(camera, renderer.domElement)
  controls.target.copy(mshStdBox.position)
  controls.update()
  window.addEventListener("resize", onResize, false)
}
function onResize() {
  renderer.setSize(window.innerWidth, window.innerHeight)
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
}
function animate() {
  requestAnimationFrame(animate)
  var t = Date.now() / 2000
  var r = 15.0
  var lx = r * Math.cos(t)
  var lz = r * Math.sin(t)
  var ly = 5.0 + 5.0 * Math.sin(t / 3.0)
  rectLight.position.set(lx, ly, lz)
  rectLight.lookAt(origin)
  renderer.render(scene, camera)
}
