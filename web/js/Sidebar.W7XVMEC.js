/**
 * @author mrdoob / http://mrdoob.com/
 */

Sidebar.W7XVMEC = function ( editor ) {

	var strings = editor.strings;

	var signals = editor.signals;

	var container = new UI.Panel();
	container.setBorderTop( '1' ); // this gives it the visible border
    
    container.add(new UI.Text('FIELD CONTOURS'));
    container.add(new UI.Break(), new UI.Break());
    
    // VMEC run ID
    
    var runIDLabel = new UI.Text('VMEC run ID ').setWidth('150px');
    runIDLabel.dom.innerHTML = "VMEC run ID (<a href='http://svvmec1.ipp-hgw.mpg.de:8080/vmecrest/v1/geiger/w7x/' target='_blank'>see list</a>)";//.appendChild(link);
    
    var VMECRun = new UI.Input( 'w7x.14000.0_14000.0_13160.0_12950.0_12390.0_-9660.0_-9660.0' ).setWidth('120px');
    
    VMECRow = new UI.Row();
    VMECRow.add(runIDLabel);
    VMECRow.add(VMECRun);
    container.add(VMECRow);
    
    // Toroidal angle

    var toroidalAngle = new UI.Number(180).setStep( 10 ).setUnit( '°' ).setWidth( '50px' );
    
    var toroidalAngleRow = new UI.Row();
    toroidalAngleRow.add( new UI.Text('Toroidal angle').setWidth( '150px' ) );
    toroidalAngleRow.add( toroidalAngle );
    container.add( toroidalAngleRow );
    
    // Psi surfaces
    
    var psis = new UI.Input( '0, 0.05, 0.1, 0.15, 0.2, 0.25, 0.3, 0.35, 0.4, 0.45, 0.5,0.55, 0.6, 0.65, 0.7, 0.75, 0.8, 0.85, 0.9, 0.95, 1' ).setWidth('120px');
    
    psiRow = new UI.Row();
    
    psiRow.add(new UI.Text('ψ contours').setWidth('150px') );
    psiRow.add(psis);
    container.add(psiRow);
    
    // Number of points/steps
    
    var pointsStepsRow = new UI.Row();
    pointsStepsRow.add( new UI.Text('Points per surface').setWidth( '150px' ) );
    var pointsSteps = new UI.Integer(100).setWidth( '50px' ).setRange( 0, Infinity );
    pointsStepsRow.add( pointsSteps );

    container.add( pointsStepsRow );
    
    // Poincare plot and trace lines buttons
    
    var buttonsRow = new UI.Row();
    var addVMEC = new UI.Button('Add').onClick(function() {console.log('asdf');}).setWidth('120px');
    buttonsRow.add( addVMEC );

    container.add( buttonsRow );

	return container;

};
