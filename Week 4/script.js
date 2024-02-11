import * as THREE from "three"

import {OrbitControls} from"OrbitControls"

import * as dat from"lil-gui"



/************
 * 
 * *SETUP**
 * 
 ***********/

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
scene.background = new THREE.Color('grey')


//camera
const camera = new THREE.PerspectiveCamera(
75,
sizes.aspectRatio,
0.1,
100


)
scene.add(camera)
camera.position.set(2,2,4)

//renderer
const renderer = new THREE.WebGLRenderer({

    canvas: canvas
})

renderer.setSize(sizes.width,sizes.height)


// CONTROLS

const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/***********
 * 
 * MESHES
 *********/

//PLANE----------------------------------------------
const planeGeometry = new THREE.PlaneGeometry(10,10, 50,50)
const planeMaterial = new THREE.MeshBasicMaterial({
    color: new THREE.Color('white'),
    side: THREE.DoubleSide,
    wireframe: true
})
const plane = new THREE.Mesh(planeGeometry,planeMaterial)

plane.rotation.x = Math.PI * 0.5
scene.add(plane)

// SHAPE--------------------------------------
const Geometry = new THREE.TorusGeometry(1)
const Material = new THREE.MeshNormalMaterial()
const torus = new THREE.Mesh(Geometry, Material)


scene.add(torus)


/**
 * UI
 */

// UI OBJECT    
const uiObject = {}

uiObject.play = false

const uiObject2 ={}

uiObject2.play = false

// UI

const ui = new dat.GUI()

// plane ui

const planeFolder = ui.addFolder('plane')

planeFolder
            .add(planeMaterial, 'wireframe')

// torus ui


const torusFolder = ui.addFolder('torus')

torusFolder
            .add(torus.position, 'y')
            .min(-5)
            .max(5)
            .step(0.1)
            .name('Position Y')
torusFolder            
            .add(torus.position,'x')
            .min(-5)
            .max(5)
            .step(0.1)
            .name('Position X')
torusFolder
            .add(torus.position, 'z')
            .min(-5)
            .max(5)
            .step(0.1)
            .name('Position Z')
torusFolder
            .add(uiObject, 'play')
            .name('Animate Sphere')
torusFolder
            .add(uiObject2, 'play') 
            .name('Rotate sphere')           
torusFolder
            .add(torus.rotation, 'x') 
            .min(-5)
            .max(5) 
            .step(0.1)
            .name ('X Rotation') 
torusFolder
            .add(torus.rotation, 'y') 
            .min(-5)
            .max(5) 
            .step(0.1)
            .name ('Y Rotation')
      
            
                        
/***************
 * 
 * animation loop
 * 
 ***************/

const clock= new  THREE.Clock()
//amimate

const animation = ()  =>
{
    // return elapsed time
    const elapsedTime = clock.getElapsedTime()

    // CONTROLSS

    controls.update()


    //animation

    if(uiObject.play)
    {
        torus.position.y = Math.sin(elapsedTime * 2)*2
    }

    if(uiObject2.play)
    {
        torus.rotation.y = elapsedTime
        torus.rotation.x = elapsedTime
    }

    

    // renderer
    renderer.render(scene, camera)
    //request next frame
    window.requestAnimationFrame(animation)
}

animation()