/**
 * @author mrdoob / http://mrdoob.com/
 */

Menubar.Add = function ( editor ) {

	var strings = editor.strings;

	var container = new UI.Panel();
	container.setClass( 'menu' );

	var title = new UI.Panel();
	title.setClass( 'title' );
	title.setTextContent( strings.getKey( 'menubar/add' ) );
	container.add( title );

	var options = new UI.Panel();
	options.setClass( 'options' );
	container.add( options );

	// // Group

	// var option = new UI.Row();
	// option.setClass( 'option' );
	// option.setTextContent( strings.getKey( 'menubar/add/group' ) );
	// option.onClick( function () {

	// 	var mesh = new THREE.Group();
	// 	mesh.name = 'Group';

	// 	editor.execute( new AddObjectCommand( mesh ) );

	// } );
	// options.add( option );

	//

	options.add( new UI.HorizontalRule() );

	// Plane

	var option = new UI.Row();
	option.setClass( 'option' );
	option.setTextContent( strings.getKey( 'menubar/add/plane' ) );
	option.onClick( function () {

		var geometry = new THREE.PlaneBufferGeometry( 1, 1, 1, 1 );
		var material = new THREE.MeshStandardMaterial();
		var mesh = new THREE.Mesh( geometry, material );
		mesh.name = 'Plane';

		editor.execute( new AddObjectCommand( mesh ) );

	} );
	options.add( option );

	// Box

	var option = new UI.Row();
	option.setClass( 'option' );
	option.setTextContent( strings.getKey( 'menubar/add/box' ) );
	option.onClick( function () {

		var geometry = new THREE.BoxBufferGeometry( 1, 1, 1, 1, 1, 1 );
		var mesh = new THREE.Mesh( geometry, new THREE.MeshStandardMaterial() );
		mesh.name = 'Box';

		editor.execute( new AddObjectCommand( mesh ) );

	} );
	options.add( option );

	// Circle

	var option = new UI.Row();
	option.setClass( 'option' );
	option.setTextContent( strings.getKey( 'menubar/add/circle' ) );
	option.onClick( function () {

		var geometry = new THREE.CircleBufferGeometry( 1, 8, 0, Math.PI * 2 );
		var mesh = new THREE.Mesh( geometry, new THREE.MeshStandardMaterial() );
		mesh.name = 'Circle';

		editor.execute( new AddObjectCommand( mesh ) );

	} );
	options.add( option );

	// Cylinder

	var option = new UI.Row();
	option.setClass( 'option' );
	option.setTextContent( strings.getKey( 'menubar/add/cylinder' ) );
	option.onClick( function () {

		var geometry = new THREE.CylinderBufferGeometry( 1, 1, 1, 8, 1, false, 0, Math.PI * 2 );
		var mesh = new THREE.Mesh( geometry, new THREE.MeshStandardMaterial() );
		mesh.name = 'Cylinder';

		editor.execute( new AddObjectCommand( mesh ) );

	} );
	options.add( option );

	// Sphere

	var option = new UI.Row();
	option.setClass( 'option' );
	option.setTextContent( strings.getKey( 'menubar/add/sphere' ) );
	option.onClick( function () {

		var geometry = new THREE.SphereBufferGeometry( 1, 8, 6, 0, Math.PI * 2, 0, Math.PI );
		var mesh = new THREE.Mesh( geometry, new THREE.MeshStandardMaterial() );
		mesh.name = 'Sphere';

		editor.execute( new AddObjectCommand( mesh ) );

	} );
	options.add( option );

	// Torus

	var option = new UI.Row();
	option.setClass( 'option' );
	option.setTextContent( strings.getKey( 'menubar/add/torus' ) );
	option.onClick( function () {

		var geometry = new THREE.TorusBufferGeometry( 1, 0.4, 8, 6, Math.PI * 2 );
		var mesh = new THREE.Mesh( geometry, new THREE.MeshStandardMaterial() );
		mesh.name = 'Torus';

		editor.execute( new AddObjectCommand( mesh ) );

	} );
	options.add( option );

	// // Sprite

	// var option = new UI.Row();
	// option.setClass( 'option' );
	// option.setTextContent( strings.getKey( 'menubar/add/sprite' ) );
	// option.onClick( function () {

	// 	var sprite = new THREE.Sprite( new THREE.SpriteMaterial() );
	// 	sprite.name = 'Sprite';

	// 	editor.execute( new AddObjectCommand( sprite ) );

	// } );
	// options.add( option );

	//

	options.add( new UI.HorizontalRule() );

	// PointLight

	var option = new UI.Row();
	option.setClass( 'option' );
	option.setTextContent( strings.getKey( 'menubar/add/pointlight' ) );
	option.onClick( function () {

		var color = 0xffffff;
		var intensity = 1;
		var distance = 0;

		var light = new THREE.PointLight( color, intensity, distance );
		light.name = 'PointLight';

		editor.execute( new AddObjectCommand( light ) );

	} );
	options.add( option );

	// // SpotLight

	// var option = new UI.Row();
	// option.setClass( 'option' );
	// option.setTextContent( strings.getKey( 'menubar/add/spotlight' ) );
	// option.onClick( function () {

	// 	var color = 0xffffff;
	// 	var intensity = 1;
	// 	var distance = 0;
	// 	var angle = Math.PI * 0.1;
	// 	var penumbra = 0;

	// 	var light = new THREE.SpotLight( color, intensity, distance, angle, penumbra );
	// 	light.name = 'SpotLight';
	// 	light.target.name = 'SpotLight Target';

	// 	light.position.set( 5, 10, 7.5 );

	// 	editor.execute( new AddObjectCommand( light ) );

	// } );
	// options.add( option );

	// // DirectionalLight

	// var option = new UI.Row();
	// option.setClass( 'option' );
	// option.setTextContent( strings.getKey( 'menubar/add/directionallight' ) );
	// option.onClick( function () {

	// 	var color = 0xffffff;
	// 	var intensity = 1;

	// 	var light = new THREE.DirectionalLight( color, intensity );
	// 	light.name = 'DirectionalLight';
	// 	light.target.name = 'DirectionalLight Target';

	// 	light.position.set( 5, 10, 7.5 );

	// 	editor.execute( new AddObjectCommand( light ) );

	// } );
	// options.add( option );

	// // HemisphereLight

	// var option = new UI.Row();
	// option.setClass( 'option' );
	// option.setTextContent( strings.getKey( 'menubar/add/hemispherelight' ) );
	// option.onClick( function () {

	// 	var skyColor = 0x00aaff;
	// 	var groundColor = 0xffaa00;
	// 	var intensity = 1;

	// 	var light = new THREE.HemisphereLight( skyColor, groundColor, intensity );
	// 	light.name = 'HemisphereLight';

	// 	light.position.set( 0, 10, 0 );

	// 	editor.execute( new AddObjectCommand( light ) );

	// } );
	// options.add( option );

	// AmbientLight

	var option = new UI.Row();
	option.setClass( 'option' );
	option.setTextContent( strings.getKey( 'menubar/add/ambientlight' ) );
	option.onClick( function () {

		var color = 0x222222;

		var light = new THREE.AmbientLight( color );
		light.name = 'AmbientLight';

		editor.execute( new AddObjectCommand( light ) );

	} );
	options.add( option );

	//

	options.add( new UI.HorizontalRule() );

	// PerspectiveCamera

	var option = new UI.Row();
	option.setClass( 'option' );
	option.setTextContent( strings.getKey( 'menubar/add/perspectivecamera' ) );
	option.onClick( function () {

		var camera = new THREE.PerspectiveCamera();
		camera.name = 'PerspectiveCamera';

		editor.execute( new AddObjectCommand( camera ) );

	} );
	options.add( option );

	// // OrthographicCamera

	// var option = new UI.Row();
	// option.setClass( 'option' );
	// option.setTextContent( strings.getKey( 'menubar/add/orthographiccamera' ) );
	// option.onClick( function () {

	// 	var camera = new THREE.OrthographicCamera();
	// 	camera.name = 'OrthographicCamera';

	// 	editor.execute( new AddObjectCommand( camera ) );

	// } );
	// options.add( option );

	return container;

};
