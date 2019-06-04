/**
 * @author mrdoob / http://mrdoob.com/
 */

Sidebar.W7XTabs = function ( editor ) {

	var signals = editor.signals;
	var strings = editor.strings;

	var container = new UI.Span();

	var modelsTab = new UI.Text('Models').setTextTransform( 'uppercase' );
	modelsTab.onClick( function () { select( 'MODELS' ); } );

	var magneticsTab = new UI.Text('Magnetics').setTextTransform( 'uppercase' );
	magneticsTab.onClick( function () { select( 'MAGNETICS' ); } );

	var tabs = new UI.Div();
	tabs.setId( 'tabs' );
	tabs.add( modelsTab, magneticsTab );
	container.add( tabs );

	//

	var models = new UI.Span().add(
		new Sidebar.W7XModels( editor )
	);
	container.add( models );

	var magnetics = new UI.Span().add(
		new Sidebar.W7XFLTracer( editor ),
		new Sidebar.W7XVMEC( editor )
	);
	container.add( magnetics );

	function select( section ) {

		modelsTab.setClass( '' );
		magneticsTab.setClass( '' );

		models.setDisplay( 'none' );
		magnetics.setDisplay( 'none' );

		switch ( section ) {
			case 'MODELS':
				modelsTab.setClass( 'selected' );
				models.setDisplay( '' );
				break;
			case 'MAGNETICS':
				magneticsTab.setClass( 'selected' );
				magnetics.setDisplay( '' );
				break;
		}

	}

	select( 'MODELS' );

	return container;

};
