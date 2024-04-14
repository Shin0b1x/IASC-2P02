import * as THREE from "three"

import {OrbitControls} from"OrbitControls"

import * as dat from"lil-gui"


/********
 * SETUP
 *******/

//SIZES
 
const sizes ={
    width: window.innerWidth / 4,
    height: window.innerWidth /4,
    aspectRatio: 1

}




/*************
 * 
 * scene
 ************/

//canvas
const canvas = document.querySelector('.webgl')
//scene
const scene = new THREE.Scene()
scene.background = new THREE.Color('bisque')


//camera
const camera = new THREE.PerspectiveCamera(
100,
sizes.aspectRatio,
1,
900


)
scene.add(camera)
camera.position.set(11.5, 4, 13)

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

/******
 * directional light
 ******/

const directionalLight = new THREE.DirectionalLight(0x404040, 100)
scene.add(directionalLight)
//directionalLight.position.set(8.9, 0.9, 0)
directionalLight.rotation.x = Math.random() *2* Math.PI
directionalLight.rotation.y = Math.random() *2* Math.PI
directionalLight.rotation.z = Math.random() *2* Math.PI

const light = new THREE.AmbientLight( 'white' ); // soft white light
scene.add( light );


const light2 = new THREE.PointLight( 'green', 2, 100 );
light2.position.set( 50, 50, 50 );
light2.castShadow = true
scene.add( light2 );


//const lightHelper = new THREE.DirectionalLightHelper(directionalLight)
//scene.add(lightHelper)


/***********
 * 
 * MESHES
 *********/
 
// Cube Geometry 

const cubeGeometry = new THREE.BoxGeometry(0.5, 0.5, 0.5)
// Material
const redMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color('Red'),
    side: THREE.DoubleSide,
    
})

const greenMaterial = new THREE.MeshStandardMaterial({
    color : new THREE.Color('Green'),
    side: THREE.DoubleSide
})

const blueMaterial = new THREE.MeshStandardMaterial({
    color : new THREE.Color('Blue'),
    side: THREE.DoubleSide
})

const drawCube = (i, material) =>
{
    const cube = new THREE.Mesh(cubeGeometry, material)
    cube.position.x = (Math.random()-0.5)*10
    cube.position.z = (Math.random()-0.5)*10
    cube.position.y = i -10

    cube.rotation.x = Math.random() *2* Math.PI
    cube.rotation.y = Math.random() *2* Math.PI
    cube.rotation.z = Math.random() *2* Math.PI
    //cube.rotation.x = Math.PI *  0.5
    scene.add(cube)
    
}






/**
 * text parsers & ui
 */

let present = {}

const uiobj = {
        text : '',
        textArray: [],
        term1: 'dumbledore',
        term2: 'hat',
        term3: 'quirrell',
        rotateCamera: true
        

}




// text parsers

const parseTextandTerm = () =>
{
    // strip periods and downcase text

    const parsedText = uiobj.text.replaceAll(".", "").toLowerCase()

    // tokenize text
    uiobj.textArray = parsedText.split(/[^\w']+/ )

    // find term1
    findTerminParsedText(uiobj.term1, redMaterial)
    
    
    // find term2
    findTerminParsedText(uiobj.term2, greenMaterial)


    // find term3
    findTerminParsedText(uiobj.term3, blueMaterial)
}    
    
const findTerminParsedText = (term,material)=>
    {
     
        for (let i=0;  i < uiobj.textArray.length; i++ )
        {

        

            if(uiobj.textArray[i] === term)
            {
                // convert i into n , which is a value between 0 and 20
               const n = (100 / uiobj.textArray.length) * i * 0.2

               // call draw cube function with connvv value

               for (let a= 0; a<5 ; a++)
               {
                drawCube(n, material)
               }
            }


        }

    }

// load source text

fetch("https://raw.githubusercontent.com/amephraim/nlp/master/texts/J.%20K.%20Rowling%20-%20Harry%20Potter%201%20-%20Sorcerer's%20Stone.txt")
    .then(response => response.text())
    .then((data) =>
    {
        uiobj.text = data
        parseTextandTerm()    
    }

    )

 

/******** UI ******
 ******************/

const ui = new dat.GUI({
    container: document.querySelector('#parent1')
})



//interaction folder



    //cubes Folder

    const cubesFolder = ui.addFolder('Filter terms')

    cubesFolder
        .add(redMaterial, 'visible')
        .name(`${uiobj.term1}`)
    cubesFolder
        .add(greenMaterial, 'visible')
        .name(`${uiobj.term2}`)
    cubesFolder
        .add(blueMaterial, 'visible')
        .name(`${uiobj.term3}`)
    /*cubesFolder
        .add(uiobj, 'animateBubbles')
        .name('Animate Bubbles')
    */
    // camera folder

    const cameraFolder = ui.addFolder('camera')

    cameraFolder
        .add(uiobj, 'rotateCamera')
        .name('Rotate Camera')


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
  
    /*if(uiobj.animateBubbles){
        for (let i=0; i< scene.children.length; i++)
        {
            scene.children[i].scale.x = Math.sin(elapsedTime * 2)
            scene.children[i].scale.y = Math.sin(elapsedTime * 2)
            scene.children[i].scale.z = Math.sin(elapsedTime * 2)
        }
    }
    */ 

    // CONTROLSS

    controls.update()

    //camera rotation
    if (uiobj.rotateCamera){
        camera.position.x = Math.sin(elapsedTime * 0.5)*17
        camera.position.z = Math.cos(elapsedTime * 0.5)*17
    }

    // renderer
    renderer.render(scene, camera)
    //request next frame
    window.requestAnimationFrame(animation)

   
  

  
}
animation()