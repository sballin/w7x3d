// r103

const staticAssets = [
	'./',

	'../js/three.js',
	'../js/libs/system.min.js',

	'../js/controls/EditorControls.js',
	'../js/controls/TransformControls.js',

	'../js/libs/jszip.min.js',
	'../js/libs/inflate.min.js',

	'../js/loaders/AMFLoader.js',
	'../js/loaders/AWDLoader.js',
	'../js/loaders/BabylonLoader.js',
	'../js/loaders/ColladaLoader.js',
	'../js/loaders/DRACOLoader.js',
	'../js/loaders/FBXLoader.js',
	'../js/loaders/GLTFLoader.js',
	'../js/loaders/deprecated/LegacyGLTFLoader.js',
	'../js/loaders/KMZLoader.js',
	'../js/loaders/MD2Loader.js',
	'../js/loaders/OBJLoader.js',
	'../js/loaders/MTLLoader.js',
	'../js/loaders/PlayCanvasLoader.js',
	'../js/loaders/PLYLoader.js',
	'../js/loaders/STLLoader.js',
	'../js/loaders/SVGLoader.js',
	'../js/loaders/TGALoader.js',
	'../js/loaders/TDSLoader.js',
	'../js/loaders/VRMLLoader.js',
	'../js/loaders/VTKLoader.js',
	'../js/loaders/ctm/lzma.js',
	'../js/loaders/ctm/ctm.js',
	'../js/loaders/ctm/CTMLoader.js',

	'../js/exporters/ColladaExporter.js',
	'../js/exporters/GLTFExporter.js',
	'../js/exporters/OBJExporter.js',
	'../js/exporters/STLExporter.js',

	'../js/renderers/Projector.js',
	'../js/renderers/RaytracingRenderer.js',
	'../js/renderers/SoftwareRenderer.js',
	'../js/renderers/SVGRenderer.js',

	'./js/libs/codemirror/codemirror.css',
	'./js/libs/codemirror/theme/monokai.css',

	'./js/libs/codemirror/codemirror.js',
	'./js/libs/codemirror/mode/javascript.js',
	'./js/libs/codemirror/mode/glsl.js',

	'./js/libs/esprima.js',
	'./js/libs/jsonlint.js',
	'./js/libs/glslprep.min.js',

	'./js/libs/codemirror/addon/dialog.css',
	'./js/libs/codemirror/addon/show-hint.css',
	'./js/libs/codemirror/addon/tern.css',

	'./js/libs/codemirror/addon/dialog.js',
	'./js/libs/codemirror/addon/show-hint.js',
	'./js/libs/codemirror/addon/tern.js',
	'./js/libs/acorn/acorn.js',
	'./js/libs/acorn/acorn_loose.js',
	'./js/libs/acorn/walk.js',
	'./js/libs/ternjs/polyfill.js',
	'./js/libs/ternjs/signal.js',
	'./js/libs/ternjs/tern.js',
	'./js/libs/ternjs/def.js',
	'./js/libs/ternjs/comment.js',
	'./js/libs/ternjs/infer.js',
	'./js/libs/ternjs/doc_comment.js',
	'./js/libs/tern-threejs/threejs.js',

	'./js/libs/signals.min.js',
	'./js/libs/ui.js',
	'./js/libs/ui.three.js',

	'./js/libs/html2canvas.js',
	'./js/libs/three.html.js',

	'./js/libs/app.js',
	'./js/Player.js',
	'./js/Script.js',

	'../js/vr/WebVR.js',

	//

	'./css/main.css',
	'./css/dark.css',
	'./css/light.css',

	'./js/Storage.js',

	'./js/Editor.js',
	'./js/Config.js',
	'./js/History.js',
	'./js/Loader.js',
	'./js/Menubar.js',
	'./js/Menubar.File.js',
	'./js/Menubar.Edit.js',
	'./js/Menubar.Add.js',
	'./js/Menubar.Play.js',
	// './js/Menubar.View.js',
	'./js/Menubar.Examples.js',
	'./js/Menubar.Help.js',
	'./js/Menubar.Status.js',
	'./js/Sidebar.js',
	'./js/Sidebar.Scene.js',
	'./js/Sidebar.W7X.js',
	'./js/Sidebar.Settings.js',
	'./js/Sidebar.Settings.Shortcuts.js',
	'./js/Sidebar.Settings.Viewport.js',
	'./js/Sidebar.Properties.js',
	'./js/Sidebar.Object.js',
	'./js/Sidebar.Geometry.js',
	'./js/Sidebar.Geometry.Geometry.js',
	'./js/Sidebar.Geometry.BufferGeometry.js',
	'./js/Sidebar.Geometry.Modifiers.js',
	'./js/Sidebar.Geometry.BoxGeometry.js',
	'./js/Sidebar.Geometry.CircleGeometry.js',
	'./js/Sidebar.Geometry.CylinderGeometry.js',
	'./js/Sidebar.Geometry.IcosahedronGeometry.js',
	'./js/Sidebar.Geometry.PlaneGeometry.js',
	'./js/Sidebar.Geometry.SphereGeometry.js',
	'./js/Sidebar.Geometry.TorusGeometry.js',
	'./js/Sidebar.Geometry.TorusKnotGeometry.js',
	'./js/Sidebar.Geometry.TubeGeometry.js',
	'../js/geometries/TeapotBufferGeometry.js',
	'./js/Sidebar.Geometry.TeapotBufferGeometry.js',
	'./js/Sidebar.Geometry.LatheGeometry.js',
	'./js/Sidebar.Material.js',
	'./js/Sidebar.Animation.js',
	'./js/Sidebar.Script.js',
	'./js/Sidebar.History.js',
	'./js/Strings.js',
	'./js/Toolbar.js',
	'./js/Viewport.js',
	'./js/Viewport.Info.js',

	'./js/Command.js',
	'./js/commands/AddObjectCommand.js',
	'./js/commands/RemoveObjectCommand.js',
	'./js/commands/MoveObjectCommand.js',
	'./js/commands/SetPositionCommand.js',
	'./js/commands/SetRotationCommand.js',
	'./js/commands/SetScaleCommand.js',
	'./js/commands/SetValueCommand.js',
	'./js/commands/SetUuidCommand.js',
	'./js/commands/SetColorCommand.js',
	'./js/commands/SetGeometryCommand.js',
	'./js/commands/SetGeometryValueCommand.js',
	'./js/commands/MultiCmdsCommand.js',
	'./js/commands/AddScriptCommand.js',
	'./js/commands/RemoveScriptCommand.js',
	'./js/commands/SetScriptValueCommand.js',
	'./js/commands/SetMaterialCommand.js',
	'./js/commands/SetMaterialValueCommand.js',
	'./js/commands/SetMaterialColorCommand.js',
	'./js/commands/SetMaterialMapCommand.js',
	'./js/commands/SetSceneCommand.js',

	//

	'./examples/arkanoid.app.json',
	'./examples/camera.app.json',
	'./examples/particles.app.json',
	'./examples/pong.app.json',
	'./examples/shaders.app.json'

];

self.addEventListener( 'install', async function ( event ) {

	const cache = await caches.open( 'threejs-editor' );
	cache.addAll( staticAssets );

} );

self.addEventListener( 'fetch', async function ( event ) {

	const request = event.request;
	event.respondWith( cacheFirst( request ) );

} );

async function cacheFirst( request ) {

	const cachedResponse = await caches.match( request );
	return cachedResponse || fetch( request );

}
