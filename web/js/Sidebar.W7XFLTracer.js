/**
 * @author mrdoob / http://mrdoob.com/
 */

Sidebar.W7XFLTracer = function ( editor ) {

	var strings = editor.strings;

	var signals = editor.signals;

	var container = new UI.Panel();
	container.setBorderTop( '0' );
	container.setPaddingTop( '20px' );
    
    // Config ID

    var configIDRow = new UI.Row();
    configIDRow.add( new UI.Text('CoilsDB config ID').setWidth( '180px' ) );
    var configID = new UI.Integer(0).setWidth('25px');
    configIDRow.add( configID );

    container.add( configIDRow );
    
    // Pre-calculated B field grid

    var precalcRow = new UI.Row();
    var precalc = new UI.Checkbox( true ).setWidth('25px');

    precalcRow.add(new UI.Text('Pre-calculated B field grid').setWidth('170px'));
    precalcRow.add( precalc );
    container.add( precalcRow );
    
    container.add(new UI.Break());
    
    // Start points

    var startPointsRow = new UI.Row();
    startPointsRow.add(new UI.Text('Start points'));
    container.add( startPointsRow );
    
    // x range

    var xRow = new UI.Row();
    var xMin = new UI.Number( 5.9 ).setPrecision( 5 ).setRange( -Infinity, Infinity ).setWidth( '60px' );
    var xMax = new UI.Number( 6.33 ).setPrecision( 5 ).setRange( -Infinity, Infinity ).setWidth( '60px' );

    xRow.add( new UI.Text('X').setWidth( '25px' ) );
    xRow.add( xMin );
    xRow.add( new UI.Text('to').setWidth( '40px' ) );
    xRow.add( xMax );
    xRow.add( new UI.Text('m').setWidth( '25px' ) );
    container.add( xRow );
    
    // y range

    var yRow = new UI.Row();
    var yMin = new UI.Number( 0 ).setPrecision( 5 ).setRange( -Infinity, Infinity ).setWidth( '60px' );
    var yMax = new UI.Number( 0 ).setPrecision( 5 ).setRange( -Infinity, Infinity ).setWidth( '60px' );

    yRow.add( new UI.Text('Y').setWidth( '25px' ) );
    yRow.add( yMin );
    yRow.add( new UI.Text('to').setWidth( '40px' ) );
    yRow.add( yMax );
    yRow.add( new UI.Text('m').setWidth( '25px' ) );
    container.add( yRow );
    
    // z range

    var zRow = new UI.Row();
    var zMin = new UI.Number( 0 ).setPrecision( 5 ).setRange( -Infinity, Infinity ).setWidth( '60px' );
    var zMax = new UI.Number( 0 ).setPrecision( 5 ).setRange( -Infinity, Infinity ).setWidth( '60px' );

    zRow.add( new UI.Text('Z').setWidth( '25px' ) );
    zRow.add( zMin );
    zRow.add( new UI.Text('to').setWidth( '40px' ) );
    zRow.add( zMax );
    zRow.add( new UI.Text('m').setWidth( '25px' ) );
    container.add( zRow );
    
    // Number of starting points

    var numStartsRow = new UI.Row();
    numStartsRow.add( new UI.Text('Number of start points').setWidth( '180px' ) );
    var numStarts = new UI.Integer(15).setWidth('25px').setRange( 0, Infinity );
    numStartsRow.add( numStarts );

    container.add( numStartsRow );
    
    // Toroidal angle

    var toroidalAngleRow = new UI.Row();
    toroidalAngleRow.add( new UI.Text('Toroidal angle').setWidth( '180px' ) );
    var toroidalAngle = new UI.Number(180).setStep( 10 ).setUnit( '°' ).setWidth( '50px' );
    toroidalAngleRow.add( toroidalAngle );

    container.add( toroidalAngleRow );
    
    // Step size
    
    var stepSizeRow = new UI.Row();
    stepSizeRow.add( new UI.Text('Step size').setWidth( '180px' ) );
    var stepSize = new UI.Number(1.3).setStep( 1 ).setWidth( '50px' );
    stepSizeRow.add( stepSize );

    container.add( stepSizeRow );
    
    // Number of points/steps
    
    var pointsStepsRow = new UI.Row();
    pointsStepsRow.add( new UI.Text('Number of points/steps').setWidth( '180px' ) );
    var pointsSteps = new UI.Integer(205).setWidth( '50px' ).setRange( 0, Infinity );
    pointsStepsRow.add( pointsSteps );

    container.add( pointsStepsRow );
    
    // Poincare plot and trace lines buttons
    
    var buttonsRow = new UI.Row();
    var poincarePlot = new UI.Button('Poincaré plot').onClick(function() {console.log('asdf');}).setWidth('120px');
    var traceLines = new UI.Button('Trace lines').onClick(function() {console.log('asdf2');}).setWidth('120px');
    var separator = new UI.Text('  '); // Special no-break space character
    buttonsRow.add( poincarePlot, separator, traceLines );

    container.add( buttonsRow );

	return container;

};
