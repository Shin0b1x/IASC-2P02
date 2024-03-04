import * as THREE from "three"

import {OrbitControls} from"OrbitControls"

import * as dat from"lil-gui"


/********
 * SETUP
 *******/

//SIZES
 
const sizes ={
    width: window.innerWidth,
    height: window.innerHeight,
    aspectRatio: window.innerWidth / window.innerHeight

}




/*************
 * 
 * scene
 ************/

//canvas
const canvas = document.querySelector('.webgl')
//scene
const scene = new THREE.Scene()
scene.background = new THREE.Color('black')


//camera
const camera = new THREE.PerspectiveCamera(
75,
sizes.aspectRatio,
0.1,
100


)
scene.add(camera)
camera.position.set(20.4, -2.7, 0)

//renderer
const renderer = new THREE.WebGLRenderer({

    canvas: canvas,
    antialias: true
})

renderer.setSize(sizes.width,sizes.height)

renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap


// CONTROLS

const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/***********
 * 
 * MESHES
 *********/

const caveMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color('white'),
    side: THREE.DoubleSide
})

const caveMaterial2 = new THREE.MeshStandardMaterial({
    color : new THREE.Color('Brown'),
    side: THREE.DoubleSide
})

// CaveWall
const caveWallGeometry = new THREE.PlaneGeometry(20,15)
const caveWall = new THREE.Mesh(caveWallGeometry, caveMaterial)
caveWall.rotation.y = Math.PI *0.5
caveWall.position.set(-5,0,0)
caveWall.receiveShadow = true
scene.add(caveWall)

// CaveFloor
const caveFloorGeometry = new THREE.PlaneGeometry(5,20)
const caveFloor = new THREE.Mesh(caveFloorGeometry, caveMaterial2)
caveFloor.rotation.x = Math.PI *0.5
caveFloor.position.set(-2.5,-7.5,0)
caveFloor.receiveShadow = true
scene.add(caveFloor)
    
//OBJECT

/*const torusKnotGeometry = new THREE.TorusKnotGeometry(1,0.25)
const torusKnotMaterial = new THREE.MeshNormalMaterial()
const torusKnot = new THREE.Mesh(torusKnotGeometry,torusKnotMaterial)
torusKnot.position.set(10,5,0)
torusKnot.castShadow = true
scene.add(torusKnot)
*/

const sphereGeometry = new THREE.SphereGeometry(0.5)
const sphere = new THREE.Mesh(sphereGeometry, caveMaterial2)
sphere.castShadow = true
scene.add(sphere)

const sphere2Geometry = new THREE.SphereGeometry(0.5)
const sphere2 = new THREE.Mesh(sphere2Geometry, caveMaterial2)
sphere2.castShadow = true
scene.add(sphere2)

const sphere3Geometry = new THREE.SphereGeometry(0.5)
const sphere3 = new THREE.Mesh(sphere3Geometry, caveMaterial2)
sphere3.castShadow = true
scene.add(sphere3)

/*****************
 * ****************
 * LIGHTSSSSSSSS
 * ********************
 *****************/

// amnbient light
/*const ambientLight = new THREE.AmbientLight (
    new THREE.Color('red')
)
scene.add(ambientLight)
*/

// directional light 

const light = new THREE.DirectionalLight(
    new THREE.Color('Orange')
)
light.position.set(8.9, .9, 0)
light.castShadow = true
light.shadow.mapSize.width = 8000
light.shadow.mapSize.height = 8000
//light.target = sphere
scene.add(light)



// DirectionaLightHelper

//const helper = new THREE.DirectionalLightHelper(light,2)

//scene.add(helper)

/**
 * UI
 
// UI

const ui = new dat.GUI()

//UI OBJECT    
const uiObject = {}

uiObject.reset = () =>
{
    light.position.set(8.9, .9, 0)
  
}




// Directional light

const lightPositionFolder = ui.addFolder('Directional Light Position')

lightPositionFolder 
            .add(light.position, 'x')
            .min(-10)            
            .max(20)
            .step(0.1)

lightPositionFolder 
            .add(light.position, 'y')
            .min(-10)            
            .max(10)
            .step(0.1)            
                
lightPositionFolder 
            .add(light.position, 'z')
            .min(-10)            
            .max(10)
            .step(0.1)        

lightPositionFolder
            .add(uiObject, 'reset')
            .name('Reset Position')
*/


/**
 *  ANIMATION LOOP
 */
const clock= new  THREE.Clock()
//amimate

const animation = ()  =>
{
    // return elapsed time
    const elapsedTime = clock.getElapsedTime()

    // Animate Object
    //torusKnot.rotation.y = elapsedTime
    //torusKnot.position.z = Math.sin(elapsedTime*1.2)*2

    sphere.position.x = Math.sin(elapsedTime*3.0)*2
    sphere.position.y = Math.cos(elapsedTime*3.0)*2
    sphere.position.z = Math.tan(elapsedTime*1.2)*2

    sphere2.position.x = Math.sin(elapsedTime*4.0)*2
    sphere2.position.y = Math.cos(elapsedTime*1.5)*4
    sphere2.position.z = Math.tan(elapsedTime*1.2)*2

    sphere3.position.x = Math.sin(elapsedTime*1.2)*2
    sphere3.position.y = Math.cos(elapsedTime*2.0)*3
    sphere3.position.z = Math.tan(elapsedTime*1.2)*2

    // LightUpate
       // console.log(camera.position)
   // helper.update()

    // CONTROLSS

    controls.update()
    // renderer
    renderer.render(scene, camera)
    //request next frame
    window.requestAnimationFrame(animation)
}
animation()