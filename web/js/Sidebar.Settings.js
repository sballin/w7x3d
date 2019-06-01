/**
 * @author mrdoob / http://mrdoob.com/
 */

Sidebar.Settings = function ( editor ) {

	var config = editor.config;
	var signals = editor.signals;
	var strings = editor.strings;

	var container = new UI.Panel();
	container.setBorderTop( '0' );
	container.setPaddingTop( '20px' );
	container.setPaddingBottom( '20px' );

	// language

	// var options = {
	// 	en: 'English',
	// 	zh: '中文'
	// };

	// var languageRow = new UI.Row();
	// var language = new UI.Select().setWidth( '150px' );
	// language.setOptions( options );

	// if ( config.getKey( 'language' ) !== undefined ) {

	// 	language.setValue( config.getKey( 'language' ) );

	// }

	// language.onChange( function () {

	// 	var value = this.getValue();

	// 	editor.config.setKey( 'language', value );

	// } );

	// languageRow.add( new UI.Text( strings.getKey( 'sidebar/settings/language' ) ).setWidth( '90px' ) );
	// languageRow.add( language );

	// container.add( languageRow );

	// theme

	// var options = {
	// 	'css/light.css': strings.getKey( 'sidebar/settings/theme/light' ),
	// 	'css/dark.css': strings.getKey( 'sidebar/settings/theme/dark' )
	// };

	// var themeRow = new UI.Row();
	// var theme = new UI.Select().setWidth( '150px' );
	// theme.setOptions( options );

	// if ( config.getKey( 'theme' ) !== undefined ) {

	// 	theme.setValue( config.getKey( 'theme' ) );

	// }

	// theme.onChange( function () {

	// 	var value = this.getValue();

	// 	editor.setTheme( value );
	// 	editor.config.setKey( 'theme', value );

	// } );

	// themeRow.add( new UI.Text( strings.getKey( 'sidebar/settings/theme' ) ).setWidth( '90px' ) );
	// themeRow.add( theme );

	// container.add( themeRow );
	
	// Title

	var config = editor.config;
	var titleRow = new UI.Row();
	var title = new UI.Input( config.getKey( 'project/title' ) ).setLeft( '100px' ).onChange( function () {

		config.setKey( 'project/title', this.getValue() );

	} );

	titleRow.add( new UI.Text( strings.getKey( 'sidebar/project/title' ) ).setWidth( '90px' ) );
	titleRow.add( title );

	container.add( titleRow );

	// background
	
	function refreshUI() {

		var camera = editor.camera;
		var scene = editor.scene;

		var options = [];

		options.push( buildOption( camera, false ) );
		options.push( buildOption( scene, false ) );

		( function addObjects( objects, pad ) {

			for ( var i = 0, l = objects.length; i < l; i ++ ) {

				var object = objects[ i ];

				var option = buildOption( object, true );
				option.style.paddingLeft = ( pad * 10 ) + 'px';
				options.push( option );

				addObjects( object.children, pad + 1 );

			}

		} )( scene.children, 1 );

		outliner.setOptions( options );

		if ( editor.selected !== null ) {

			outliner.setValue( editor.selected.id );

		}

		// if ( scene.fog ) {

		// 	fogColor.setHexValue( scene.fog.color.getHex() );

		// 	if ( scene.fog.isFog ) {

		// 		fogType.setValue( "Fog" );
		// 		fogNear.setValue( scene.fog.near );
		// 		fogFar.setValue( scene.fog.far );

		// 	} else if ( scene.fog.isFogExp2 ) {

		// 		fogType.setValue( "FogExp2" );
		// 		fogDensity.setValue( scene.fog.density );

		// 	}

		// } else {

		// 	fogType.setValue( "None" );

		// }

		// refreshFogUI();

	}

	function onBackgroundChanged() {

		signals.sceneBackgroundChanged.dispatch( backgroundColor.getHexValue() );

	}

	var backgroundRow = new UI.Row();

	var backgroundColor = new UI.Color().setValue( '#d8d7d9' ).onChange( onBackgroundChanged );
	backgroundColor.setValue( '#d8d7d9' );

	backgroundRow.add( new UI.Text( strings.getKey( 'sidebar/scene/background' ) ).setWidth( '90px' ) );
	backgroundRow.add( backgroundColor );

	container.add( backgroundRow );
	
	// Grid
	
	container.add( new Sidebar.Settings.Viewport( editor ) );
	
	// Renderer
	
	var rendererTypes = {

		'WebGLRenderer': THREE.WebGLRenderer,
		'SVGRenderer': THREE.SVGRenderer,
		'SoftwareRenderer': THREE.SoftwareRenderer,
		'RaytracingRenderer': THREE.RaytracingRenderer

	};

	var options = {};

	for ( var key in rendererTypes ) {

		if ( key.indexOf( 'WebGL' ) >= 0 && System.support.webgl === false ) continue;

		options[ key ] = key;

	}

	var rendererTypeRow = new UI.Row();
	var rendererType = new UI.Select().setOptions( options ).setWidth( '150px' ).onChange( function () {

		var value = this.getValue();

		config.setKey( 'project/renderer', value );

		updateRenderer();

	} );

	rendererTypeRow.add( new UI.Text( strings.getKey( 'sidebar/project/renderer' ) ).setWidth( '90px' ) );
	// rendererTypeRow.add( rendererType ); // don't show renderer selector

	container.add( rendererTypeRow );

	if ( config.getKey( 'project/renderer' ) !== undefined ) {

		rendererType.setValue( config.getKey( 'project/renderer' ) );

	}

	// Renderer / Antialias

	var rendererPropertiesRow = new UI.Row().setMarginLeft( '90px' );

	var rendererAntialias = new UI.THREE.Boolean( config.getKey( 'project/renderer/antialias' ), strings.getKey( 'sidebar/project/antialias' ) ).onChange( function () {

		config.setKey( 'project/renderer/antialias', this.getValue() );
		updateRenderer();

	} );
	rendererTypeRow.add( rendererAntialias );

	// Renderer / Shadows

	var rendererShadows = new UI.THREE.Boolean( config.getKey( 'project/renderer/shadows' ), strings.getKey( 'sidebar/project/shadows' ) ).onChange( function () {

		config.setKey( 'project/renderer/shadows', this.getValue() );
		updateRenderer();

	} );
	config.setKey( 'project/renderer/shadows', false );
	updateRenderer();
	// rendererTypeRow.add( rendererShadows );

	// container.add( rendererPropertiesRow );

	//

	function updateRenderer() {

		createRenderer( rendererType.getValue(), rendererAntialias.getValue() );

	}

	function createRenderer( type, antialias, shadows ) {

		// rendererPropertiesRow.setDisplay( type === 'WebGLRenderer' ? '' : 'none' );

		var renderer = new rendererTypes[ type ]( { antialias: antialias } );

		if ( shadows && renderer.shadowMap ) {

			renderer.shadowMap.enabled = true;
			// renderer.shadowMap.type = THREE.PCFSoftShadowMap;

		}

		signals.rendererChanged.dispatch( renderer );

	}

	createRenderer( config.getKey( 'project/renderer' ), config.getKey( 'project/renderer/antialias' ), config.getKey( 'project/renderer/shadows' ) );

	container.add( new Sidebar.Settings.Shortcuts( editor ) ); // doesn't add UI element but establishes shortcuts
	// container.add( new Sidebar.Settings.Viewport( editor ) ); // moved to sidebar Scene tab

	// // Editable

	// var editableRow = new UI.Row();
	// var editable = new UI.Checkbox( config.getKey( 'project/editable' ) ).setLeft( '100px' ).onChange( function () {

	// 	config.setKey( 'project/editable', this.getValue() );

	// } );

	// editableRow.add( new UI.Text( strings.getKey( 'sidebar/project/editable' ) ).setWidth( '90px' ) );
	// editableRow.add( editable );

	// container.add( editableRow );

	// // VR

	// var vrRow = new UI.Row();
	// var vr = new UI.Checkbox( config.getKey( 'project/vr' ) ).setLeft( '100px' ).onChange( function () {

	// 	config.setKey( 'project/vr', this.getValue() );

	// } );

	// vrRow.add( new UI.Text( strings.getKey( 'sidebar/project/vr' ) ).setWidth( '90px' ) );
	// vrRow.add( vr );

	// container.add( vrRow );

	return container;

};
