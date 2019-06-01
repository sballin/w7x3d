/**
 * @author mrdoob / http://mrdoob.com/
 */

Sidebar.W7X = function ( editor ) {

	var config = editor.config;
	var signals = editor.signals;
	var strings = editor.strings;
	
	var container = new UI.Panel();
	container.setBorderTop( '0' );
	container.setPaddingTop( '20px' );
	container.setDisplay( 'none' );
	
	return container;

};
