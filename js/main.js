// If the app variable already exists, then reuse it,
// otherwise initialise it to an empty object
// (only works for 'var' because of 'hoisting', google it)
var app = app || {};

app.init = () => {
  console.log('Hello 3D world!');

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

  // Let there bbe light!
  app.spotlight = app.createSpotlight();
  app.scene.add( app.spotlight );

  // Finally, actually render everything once
  app.renderer.render( app.scene, app.camera );

}; // app.init()

// Like jQuery $(document).ready() - run our function
// after the DOM is loaded
window.onload = app.init;
