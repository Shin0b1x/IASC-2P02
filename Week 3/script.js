import * as THREE from "three"

console.log(THREE)

/***********
 * 
 * SCENE
 * 
 ***********/
//canvas

const canvas = document.querySelector('.webgl')

//scene
const scene = new THREE.Scene()
scene.background = new THREE.Color('grey')
scene.testSphere = new THREE.Color('red')

//camera
const camera =  new THREE.PerspectiveCamera(
    75,
window.innerWidth / window.innerHeight,
0.1,
100
)

camera.position.set(0,0,5)
scene.add(camera)


//renderer
const renderer = new THREE.WebGLRenderer({

    canvas: canvas 

})

renderer.setSize(window.innerWidth, window.innerHeight)

/*****************
 * MESHES
 ****************/

//TESTsphere
const sphereGeometry = new THREE.SphereGeometry(1)
const sphereMaterial = new THREE.MeshNormalMaterial()
const testSphere = new THREE.Mesh(sphereGeometry, sphereMaterial)

scene.add(testSphere)

/************
 * 
 * AnImATiOn L00p
 * 
 ***********/

const clock = new THREE.Clock()


// animate
 
const animation = () =>
 {
    // return ElapsedTime
        const elapsedTime = clock.getElapsedTime()

    // ANIMATE TESTSPEHERE
        testSphere.position.z = Math.sin(elapsedTime)
     
    // renderer
    renderer.render (scene,camera)

    //request next frame
    window.requestAnimationFrame(animation)

}
 
animation()
