/**
 * @author mrdoob / http://mrdoob.com/
 */

Sidebar.W7XFLTracer = function ( editor ) {

	var strings = editor.strings;

	var signals = editor.signals;

	var container = new UI.Panel();
	container.setBorderTop( '0' );
	container.setPaddingTop( '20px' );
    
    var project = new UI.Span().add(
        new Sidebar.W7XFLTracer( editor ),
        new Sidebar.W7XVMEC( editor )
    );
    container.add( project );

	return container;

};
