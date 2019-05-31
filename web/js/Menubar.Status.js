/**
 * @author mrdoob / http://mrdoob.com/
 */

Menubar.Status = function ( editor ) {

	var strings = editor.strings;

	var container = new UI.Panel();
	container.setClass( 'menu right' );

	var autosave = new UI.THREE.Boolean( editor.config.getKey( 'autosave' ), strings.getKey( 'menubar/status/autosave' ) );
	autosave.text.setColor( '#888' );
	autosave.onChange( function () {

		var value = this.getValue();

		editor.config.setKey( 'autosave', value );

		if ( value === true ) {

			editor.signals.sceneGraphChanged.dispatch();

		}

	} );
	container.add( autosave );
	
	// Disabled by default
	autosave.setValue(false);
	editor.config.setKey( 'autosave', false );

	editor.signals.savingStarted.add( function () {

		autosave.text.setTextDecoration( 'underline' );

	} );

	editor.signals.savingFinished.add( function () {

		autosave.text.setTextDecoration( 'none' );

	} );
	
	var version = new UI.Text( 'r' );
	version.setClass( 'title' );
	version.setOpacity( 0.0 );
	container.add( version );

	return container;

};
