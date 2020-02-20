// If the app variable already exists, then reuse it,
// otherwise initialise it to an empty object
// (only works for 'var' because of 'hoisting', google it)
var app = app || {};

app.controls = {
  rotationSpeed: 0.01,
  bouncingSpee: 0.05,
  step: 0 // for controlling the sphere position
};

app.init = () => {
  console.log('Hello 3D world!');

  app.gui = new dat.GUI();
  app.gui.add( app.controls, 'rotationSpeed', 0, 1);

  // The scene stores and keeps track of all the objects we're creating,
  // including the camera and the lights
  app.scene = new THREE.Scene();

  app.camera = new THREE.PerspectiveCamera(
    60, // field of view
    window.innerWidth / window.innerHeight, // screen ratio
    0.1,
    1000
  );

  // Where exactly is the camera in the scene?
  app.camera.position.x = -30;
  app.camera.position.y = 40;
  app.camera.position.z = 30;
  // app.camera.position.set( -30, 40, 30);

  app.camera.lookAt( app.scene.position ) // Look at the origin: x=0, y=0, z=0

  // The renderer calculates how to draw all the objects in the scene,
  // based on the lighting and the camera perspective, and renders
  // it all down to a 2D image
  app.renderer = new THREE.WebGLRenderer();
  app.renderer.setSize( window.innerWidth, window.innerHeight );
  app.renderer.setClearColor( 0x00000 ); // backgroundColor

  app.renderer.shadowMap.enabled = true; // shadows are computationally expensive, and thus disabled by default
  app.renderer.shadowMap.type = THREE.PCFSoftShadowMap; // WTF??

  document.getElementById('output').appendChild( app.renderer.domElement );

  app.axes = new THREE.AxesHelper( 40 );
  app.scene.add( app.axes );

  // Let's add a 2D 'plane', i.e. a sheet, aka "The Runway"
  app.plane = app.createPlane();
  app.scene.add( app.plane );

  app.cube = app.createCube();
  app.scene.add( app.cube );

  app.sphere = app.createSphere();
  app.scene.add( app.sphere );

  // Let there bbe light!
  app.spotlight = app.createSpotlight();
  app.scene.add( app.spotlight );

  app.ambient = new THREE.AmbientLight( 0xFFFFFF );

  // Control camera position and zoom using the mouse
  app.mouseControls = new THREE.OrbitControls(
    app.camera,
    app.renderer.domElement
  );

  app.animate();

}; // app.init()

app.animate = () => {

  app.controls.step += app.controls.bouncingSpeed;

  app.sphere.position.y = 6 + Math.abs( Math.sin( app.controls.step ) * 10);

  app.sphere.position.x = 20 + Math.abs( Math.cos( app.controls.step ) * 10);

  app.cube.rotation.x += app.controls.rotationSpeed;
  app.cube.rotation.y += app.controls.rotationSpeed;

  app.renderer.render( app.scene, app.camera );

  // Get the browser animation API to work out
  // how often to run our animate() method
  // (ideally, 60 times/sec and only when the tab
  // is visible)
  requestAnimationFrame( app.animate );
};



// Like jQuery $(document).ready() - run our function
// after the DOM is loaded
window.onload = app.init;
