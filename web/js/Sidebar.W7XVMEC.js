/**
 * @author mrdoob / http://mrdoob.com/
 */

Sidebar.W7XVMEC = function(editor) {

	var strings = editor.strings;

	var signals = editor.signals;

	var container = new UI.Panel();
	container.setBorderTop('1'); // this gives it the visible border

	container.add(new UI.Text('FLUX SURFACES'));
	container.add(new UI.Break(), new UI.Break());

	// VMEC run ID

	var runIDLabel = new UI.Text('VMEC run ID ').setWidth('150px');
	runIDLabel.dom.innerHTML =
		"VMEC run ID (<a href='http://svvmec1.ipp-hgw.mpg.de:8080/vmecrest/v1/run/' target='_blank'>list</a>)"; //.appendChild(link);

	var VMECRun = new UI.Input('w7x.14000.0_14000.0_13160.0_12950.0_12390.0_-9660.0_-9660.0').setWidth(
		'120px');

	VMECRow = new UI.Row();
	VMECRow.add(runIDLabel);
	VMECRow.add(VMECRun);
	container.add(VMECRow);

	// Toroidal angle

	var toroidalAngle = new UI.Number(180).setStep(10).setUnit('°').setWidth('50px');

	var toroidalAngleRow = new UI.Row();
	toroidalAngleRow.add(new UI.Text('Toroidal angle').setWidth('150px'));
	toroidalAngleRow.add(toroidalAngle);
	container.add(toroidalAngleRow);

	// Psi surfaces

	var psis = new UI.Input(
		'0, 0.05, 0.1, 0.15, 0.2, 0.25, 0.3, 0.35, 0.4, 0.45, 0.5,0.55, 0.6, 0.65, 0.7, 0.75, 0.8, 0.85, 0.9, 0.95, 1'
	).setWidth('120px');

	psiRow = new UI.Row();

	psiRow.add(new UI.Text('ψ contours').setWidth('150px'));
	psiRow.add(psis);
	container.add(psiRow);

	// Points per surface

	var numPointsRow = new UI.Row();
	numPointsRow.add(new UI.Text('Points per surface').setWidth('150px'));
	var pointsPerSurface = new UI.Integer(100).setWidth('50px').setRange(0, Infinity);
	numPointsRow.add(pointsPerSurface);

	container.add(numPointsRow);

	// Poincare plot and trace lines buttons

	var buttonsRow = new UI.Row();
	var addVMEC = new UI.Button('Add').onClick(callVMECService).setWidth('120px');
	buttonsRow.add(addVMEC);

	container.add(buttonsRow);

	function callVMECService() {
		/* 
			Source: http://webservices.ipp-hgw.mpg.de/docs/js/tryit.js 
			Function name in source: callVMECService 
		*/

		var id = VMECRun.getValue();
		var s = psis.getValue().split(",");
		var phi = Math.PI / 180 * toroidalAngle.getValue();
		var points = pointsPerSurface.getValue();

		var sTags = "";

		for (i = 0; i < s.length; i++) {
			sTags += '<s>' + s[i] + '</s>';
		}

		var payload = '<ser:getFluxSurfaces xmlns:ser="http://ipp/w7x/vmec/server"><identifier>' + id +
			'</identifier><toroidalAngle>' +
			phi + '</toroidalAngle>' + sTags + '<numPointsPerSurface>' + points +
			'</numPointsPerSurface></ser:getFluxSurfaces>';

		var elementName = 'Flux surfaces (' + id + ", " + toroidalAngle.getValue() + ' deg)';

		var VMECScript = "http://webservices.ipp-hgw.mpg.de/docs/makeWSRequest.jag";
		$.get(VMECScript, payload, function(json) {

			var lineObj = new THREE.Object3D();
			var material = new THREE.LineBasicMaterial({
				color: 0xFF0000,
				linewidth: 1
			});

			for (var j = 0; j < json.length; j++) {
				var vec = [];

				for (var i = 0; i < json[j].data.length; i++) {
					vec.push(new THREE.Vector3(json[j].data[i][0] * Math.cos(phi),
						json[j].data[i][0] * Math.sin(phi),
						json[j].data[i][1]));
				}

				var geometry = new THREE.Geometry();
				geometry.vertices = vec;
				var contour = new THREE.Line(geometry, material);
				contour.name = 'ψ_norm = ' + s[j];
				lineObj.add(contour);
			}
			lineObj.name = elementName;
			editor.execute(new AddObjectCommand(lineObj));
		}).fail(response => {
			console.log('Flux surface addition failed', response);
		});
	}

	return container;

};
