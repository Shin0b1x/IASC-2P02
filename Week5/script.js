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
camera.position.set(13.7, 4.5, 14.7)

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

// CaveWall
const caveWallGeometry = new THREE.PlaneGeometry(10,5)
const caveWall = new THREE.Mesh(caveWallGeometry, caveMaterial)
caveWall.rotation.y = Math.PI *0.5
caveWall.position.set(-5,0,0)
caveWall.receiveShadow = true
scene.add(caveWall)
 // BarrierWall
const barrierWallGeometry = new THREE.PlaneGeometry(10,2)
const barrierWall = new THREE.Mesh(barrierWallGeometry, caveMaterial)
barrierWall.rotation.y = Math.PI *0.5
barrierWall.position.set(5,-1.5,0)
barrierWall.receiveShadow = true
scene.add(barrierWall)
// CaveFloor
const caveFloorGeometry = new THREE.PlaneGeometry(10,10)
const caveFloor = new THREE.Mesh(caveFloorGeometry, caveMaterial)
caveFloor.rotation.x = Math.PI *0.5
caveFloor.position.set(0,-2.5,0)
//caveFloor.receiveShadow = true
scene.add(caveFloor)

//OBJECT
const torusKnotGeometry = new THREE.TorusKnotGeometry(1,0.25)
const torusKnotMaterial = new THREE.MeshNormalMaterial()
const torusKnot = new THREE.Mesh(torusKnotGeometry,torusKnotMaterial)
torusKnot.position.set(5,1.25,0)
torusKnot.castShadow = true
scene.add(torusKnot)


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

const light = new THREE.DirectionalLight()
light.position.set(8.9, .9, 0)
light.castShadow = true
light.shadow.mapSize.width = 6000
light.shadow.mapSize.height = 6000
light.target = caveWall
scene.add(light)

// DirectionaLightHelper

//const helper = new THREE.DirectionalLightHelper(light,2)

//scene.add(helper)

/**
 * UI
 */
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
    torusKnot.rotation.y = elapsedTime
    torusKnot.position.z = Math.sin(elapsedTime*1.2)*2

    // LightUpate
        //console.log(camera.position)
    //helper.update()

    // CONTROLSS

    controls.update()
    // renderer
    renderer.render(scene, camera)
    //request next frame
    window.requestAnimationFrame(animation)
}
animation()