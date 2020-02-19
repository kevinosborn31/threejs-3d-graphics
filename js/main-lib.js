var app = app || {};

app.createPlane = () => {
  const planeGeometry = new THREE.PlaneGeometry( 120, 20 );
  const planeMaterial = new THREE.MeshLambertMaterial({
    color: 0xCFD8DC
  });

  // Combine th egeometry (shape) and the material (what
  // the surface looks like) into a mesh, the actual
  // 3D oject
  const plane = new THREE.Mesh( planeGeometry, planeMaterial);

  plane.position.set( 15, 0, 0 );
  plane.rotation.x = -0.5 * Math.PI; // because of maths
  plane.receiveShadow = true; // shadows are cast onto this

  return plane;

}; // createPlane()

app.createSpotlight = () => {
  const spotlight = new THREE.SpotLight( 0xFFFFFF );
  spotlight.position.set( -10, 60, 10 );
  spotlight.castShadow = true;
  spotlight.shadow.mapSize.width = 2048;
  spotlight.shadow.mapSize.height = 2048;

  return spotlight;
}; // createSpotlight()
