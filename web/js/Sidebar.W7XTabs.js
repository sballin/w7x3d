/**
 * @author mrdoob / http://mrdoob.com/
 */

Sidebar.W7XTabs = function ( editor ) {

	var signals = editor.signals;
	var strings = editor.strings;

	var container = new UI.Span();

	var modelsTab = new UI.Text('Models').setTextTransform( 'uppercase' );
	modelsTab.onClick( function () { select( 'MODELS' ); } );

	var FLTracerTab = new UI.Text('FL Tracer').setTextTransform( 'uppercase' );
	FLTracerTab.onClick( function () { select( 'FL TRACER' ); } );

	var VMECTab = new UI.Text('VMEC').setTextTransform( 'uppercase' );
	VMECTab.onClick( function () { select( 'VMEC' ); } );

	var tabs = new UI.Div();
	tabs.setId( 'tabs' );
	tabs.add( modelsTab, FLTracerTab, VMECTab );
	container.add( tabs );

	//

	var models = new UI.Span().add(
		new Sidebar.W7XModels( editor )
	);
	container.add( models );

	var FLTracer = new UI.Span().add(
		new Sidebar.W7XFLTracer( editor )
	);
	container.add( FLTracer );

	var VMEC = new UI.Span().add(
		new Sidebar.W7XVMEC( editor )
	);
	container.add( VMEC );

	//

	function select( section ) {

		modelsTab.setClass( '' );
		FLTracerTab.setClass( '' );
		VMECTab.setClass( '' );

		models.setDisplay( 'none' );
		FLTracer.setDisplay( 'none' );
		VMEC.setDisplay( 'none' );

		switch ( section ) {
			case 'MODELS':
				modelsTab.setClass( 'selected' );
				models.setDisplay( '' );
				break;
			case 'FL TRACER':
				FLTracerTab.setClass( 'selected' );
				FLTracer.setDisplay( '' );
				break;
			case 'VMEC':
				VMECTab.setClass( 'selected' );
				VMEC.setDisplay( '' );
				break;
		}

	}

	select( 'MODELS' );

	return container;

};
