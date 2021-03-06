/**
 * @author mrdoob / http://mrdoob.com/
 */

Sidebar.W7XFLTracer = function (editor) {

	var strings = editor.strings;

	var signals = editor.signals;

	var container = new UI.Panel();
	container.setBorderTop('0');
	container.setPaddingTop('15px');

	container.add(new UI.Text('POINCARÉ & FIELD LINES'));
	container.add(new UI.Break(), new UI.Break());

	// Config ID

	var configsInfo;
	var configIDRow = new UI.Row();
	configIDRow.add(new UI.Text('Config ID').setWidth('101px'));
	var configIDSelect = new UI.Select().setOptions({
		'0': 'Options not loaded'
	}).setWidth('179px').setFontSize('12px');
	configIDSelect.setValue('0');
	configIDRow.add(configIDSelect);
	container.add(configIDRow);

	editor.setFLTracerConfigIDs = function (configsInfo) {
		var configOptions = {};
		for (var configi in configsInfo) {
			var config = configsInfo[configi];
			var displayString = config.databaseID + ': ' + config.machine + ' ' + config.name;
			configOptions[config.databaseID] = displayString;
		}
		configIDSelect.setOptions(configOptions);
		configIDSelect.setValue(0);
	};

	// Pre-calculated B field grid

	var precalcRow = new UI.Row();
	var precalc = new UI.Checkbox(true).setWidth('25px');
	precalcRow.add(new UI.Text('Pre-calculated B field grid').setWidth('90px'));
	precalcRow.add(precalc);
	
	container.add(precalcRow);

	// Invert B field direction

	var invertBRow = new UI.Row();
	var invertB = new UI.Checkbox(false).setWidth('25px');
	invertBRow.add(new UI.Text('Invert B field').setWidth('90px'));
	invertBRow.add(invertB);
	
	container.add(invertBRow);
	container.add(new UI.Break());

	// Start points

	var startPointsRow = new UI.Row();
	startPointsRow.add(new UI.Text('Start points'));
	container.add(startPointsRow);

	// x range

	var xRow = new UI.Row();
	var xMin = new UI.Number(5.9).setPrecision(5).setRange(-Infinity, Infinity).setWidth('60px');
	var xMax = new UI.Number(6.33).setPrecision(5).setRange(-Infinity, Infinity).setWidth('60px');

	xRow.add(new UI.Text('X').setWidth('25px'));
	xRow.add(xMin);
	xRow.add(new UI.Text('to').setWidth('40px'));
	xRow.add(xMax);
	xRow.add(new UI.Text('m').setWidth('25px'));
	container.add(xRow);

	// y range

	var yRow = new UI.Row();
	var yMin = new UI.Number(0).setPrecision(5).setRange(-Infinity, Infinity).setWidth('60px');
	var yMax = new UI.Number(0).setPrecision(5).setRange(-Infinity, Infinity).setWidth('60px');

	yRow.add(new UI.Text('Y').setWidth('25px'));
	yRow.add(yMin);
	yRow.add(new UI.Text('to').setWidth('40px'));
	yRow.add(yMax);
	yRow.add(new UI.Text('m').setWidth('25px'));
	container.add(yRow);

	// z range

	var zRow = new UI.Row();
	var zMin = new UI.Number(0).setPrecision(5).setRange(-Infinity, Infinity).setWidth('60px');
	var zMax = new UI.Number(0).setPrecision(5).setRange(-Infinity, Infinity).setWidth('60px');

	zRow.add(new UI.Text('Z').setWidth('25px'));
	zRow.add(zMin);
	zRow.add(new UI.Text('to').setWidth('40px'));
	zRow.add(zMax);
	zRow.add(new UI.Text('m').setWidth('25px'));
	container.add(zRow);

	// Number of starting points

	var numStartsRow = new UI.Row();
	numStartsRow.add(new UI.Text('Number of start points').setWidth('180px'));
	var numStartsEntry = new UI.Integer(15).setWidth('25px').setRange(0, Infinity);
	numStartsRow.add(numStartsEntry);

	container.add(numStartsRow);

	container.add(new UI.Break());

	// Toroidal angle

	var toroidalAngleRow = new UI.Row();
	toroidalAngleRow.add(new UI.Text('Toroidal angle').setWidth('180px'));
	var toroidalAngle = new UI.Number(180).setStep(10).setUnit('°').setWidth('50px');
	toroidalAngleRow.add(toroidalAngle);

	container.add(toroidalAngleRow);

	// Step size

	var stepSizeRow = new UI.Row();
	stepSizeRow.add(new UI.Text('Step size').setWidth('180px'));
	var stepSize = new UI.Number(0.3).setStep(1).setWidth('50px');
	stepSizeRow.add(stepSize);

	container.add(stepSizeRow);

	// Number of points/steps

	var pointsStepsRow = new UI.Row();
	pointsStepsRow.add(new UI.Text('Number of points/steps').setWidth('180px'));
	var pointsSteps = new UI.Integer(200).setWidth('50px').setRange(0, Infinity);
	pointsStepsRow.add(pointsSteps);

	container.add(pointsStepsRow);

	// Poincare plot and trace lines buttons

	var buttonsRow = new UI.Row();
	var poincarePlot = new UI.Button('Add Poincaré').onClick(function () {
		callPoincare(this);
	}).setWidth('134px');
	var traceLines = new UI.Button('Add field lines').onClick(function () {
		callServiceTraceLines(this);
	}).setWidth('134px');
	var separator = new UI.Div().setWidth('10px');
	separator.dom.style.display = 'inline-block';
	buttonsRow.add(poincarePlot, separator, traceLines);

	container.add(buttonsRow);

	function linespace(min, max, points) {
		var d = new Array(points);
		for (var i = 0; i < points; i++) {
			d[i] = min + i * (max - min) / (points - 1);
		}
		return d;
	}

	function callPoincare(button) {
		/* 
			Source: http://webservices.ipp-hgw.mpg.de/docs/js/tryit.js 
			Function name in source: callFieldLineTracerService 
		*/

		// Grey out button so the user knows it's working
		var busyOverlay = document.createElement('div');
		busyOverlay.className = 'overlay';
		button.dom.appendChild(busyOverlay);

		var phi = Math.PI / 180 * toroidalAngle.getValue();

		var numStartingPoints = numStartsEntry.getValue();

		var x1min = xMin.getValue();
		var x2min = yMin.getValue();
		var x3min = zMin.getValue();

		var x1max = xMax.getValue();
		var x2max = yMax.getValue();
		var x3max = zMax.getValue();

		var x1 = linespace(x1min, x1max, numStartingPoints);
		var x2 = linespace(x2min, x2max, numStartingPoints);
		var x3 = linespace(x3min, x3max, numStartingPoints);

		var configID = configIDSelect.getValue();
		var step = stepSize.getValue();
		var numPoints = pointsSteps.getValue();

		if (x1.length != x2.length || x1.length != x3.length) {
			alert("Error: length of x1 | x2 | x3 array should be the same!");
			return;
		}

		var x1Tags = "";
		var x2Tags = "";
		var x3Tags = "";

		var fieldperiod = 0; // a removed checkbox in tryit.js allowed changing this to 5

		for (i = 0; i < x1.length; i++) {
			x1Tags += '<x1>' + x1[i] + '</x1>';
			x2Tags += '<x2>' + x2[i] + '</x2>';
			x3Tags += '<x3>' + x3[i] + '</x3>';
		}

		for (var i = 1; i < fieldperiod; i++) {
			var phiTmp = ((i * 2 * Math.PI / fieldperiod) + parseFloat(phi));
			var cos_tmp = Math.cos(phiTmp);
			var sin_tmp = Math.sin(phiTmp);

			for (j = 0; j < x1.length; j++) {

				var tmp_r = x1[j];
				x1Tags += '<x1>' + (x1[j] * cos_tmp) + '</x1>';
				x2Tags += '<x2>' + (x1[j] * sin_tmp) + '</x2>';
				x3Tags += '<x3>' + x3[j] + '</x3>';
			}
		}

		var grid = '';

		if (precalc.getValue()) {
			grid = "<grid><cylindrical><RMin>" + 4.05 + "</RMin><RMax>" + 6.75 + "</RMax><ZMin>" + -1.35 +
				"</ZMin><ZMax>" + 1.35 +
				"</ZMax><numR>" + 181 + "</numR><numZ>" + 181 + "</numZ><numPhi>" + 481 +
				"</numPhi></cylindrical><fieldSymmetry>" + 5 + "</fieldSymmetry></grid>";
		}

		var elementName = 'Poincaré (config ' + configID + ', ' + toroidalAngle.getValue() + ' deg)';

		var payload = '<flt:trace xmlns:flt="fltracer.gsoap.boz.hgw.ipp.mpg.de"><points>';
		payload += x1Tags + x2Tags + x3Tags;
		payload += '</points><config><configIds>' + configID + '</configIds>' + grid + '<inverseField>' +
		           invertB.getValue() + '</inverseField>' + '</config><task><step>' + step + 
		           '</step><poincare><phi0>' + phi + '</phi0><numPoints>' + numPoints + 
		           '</numPoints></poincare></task></flt:trace>';

		var poincareScript = "http://webservices.ipp-hgw.mpg.de/docs/makeWSRequestPoincare.jag";
		$.get(poincareScript, payload, function (json) {
			var vec = [];
			for (var i = 0; i < json.length; i++) {
				vec.push(new THREE.Vector3(json[i][0], json[i][1], json[i][2]));
			}
			var geometry = new THREE.Geometry();
			geometry.vertices = vec;

			var particles = new THREE.Points(geometry, new THREE.PointsMaterial({
				color: 0xFF0000,
				size: 0.03,
				opacity: 1.0
			}));
			particles.name = elementName;
			editor.execute(new AddObjectCommand(particles));
			button.dom.removeChild(busyOverlay);
		}).fail(response => {
			console.log('Poincaré failed', response);
			alert('Operation failed—settings may be invalid. See developer tools console for more info.');
			button.dom.removeChild(busyOverlay);
		});
	}

	function callServiceTraceLines(button) {
		/* 
			Source: http://webservices.ipp-hgw.mpg.de/docs/js/tryit.js 
			Function name in source: callServiceTraceLines 
			Similar to callPoincare in getting UI values, but different otherwise
		*/

		// Grey out button so the user knows it's working
		var busyOverlay = document.createElement('div');
		busyOverlay.className = 'overlay';
		button.dom.appendChild(busyOverlay);

		var phi = Math.PI / 180 * toroidalAngle.getValue();

		var numStartingPoints = numStartsEntry.getValue();

		var x1min = xMin.getValue();
		var x2min = yMin.getValue();
		var x3min = zMin.getValue();

		var x1max = xMax.getValue();
		var x2max = yMax.getValue();
		var x3max = zMax.getValue();

		var x1 = linespace(x1min, x1max, numStartingPoints);
		var x2 = linespace(x2min, x2max, numStartingPoints);
		var x3 = linespace(x3min, x3max, numStartingPoints);

		var configID = configIDSelect.getValue();
		var step = stepSize.getValue();
		var numSteps = pointsSteps.getValue();

		if (x1.length != x2.length || x1.length != x3.length) {
			alert("Error: length of x1 | x2 | x3 array should be the same!");
			return;
		}

		var x1Tags = "";
		var x2Tags = "";
		var x3Tags = "";

		var fieldperiod = 0; // a removed checkbox in tryit.js allowed changing this to 5

		for (i = 0; i < x1.length; i++) {
			x1Tags += '<x1>' + x1[i] + '</x1>';
			x2Tags += '<x2>' + x2[i] + '</x2>';
			x3Tags += '<x3>' + x3[i] + '</x3>';
		}

		for (var i = 1; i < fieldperiod; i++) {
			var phiTmp = (i * 2 * Math.PI / fieldperiod) + parseFloat(phi);

			for (j = 0; j < x1.length; j++) {
				x1Tags += '<x1>' + x1[j] * Math.cos(phiTmp) + '</x1>';
				x2Tags += '<x2>' + x1[j] * Math.sin(phiTmp) + '</x2>';
				x3Tags += '<x3>' + x3[j] + '</x3>';
			}
		}

		var grid = '';

		if (precalc.getValue()) {
			grid = "<grid><cylindrical><RMin>" + 4.05 + "</RMin><RMax>" + 6.75 + "</RMax><ZMin>" + -1.35 +
				"</ZMin><ZMax>" + 1.35 + "</ZMax><numR>" + 181 + "</numR><numZ>" + 181 + "</numZ><numPhi>" +
				481 +
				"</numPhi></cylindrical><fieldSymmetry>" + 5 + "</fieldSymmetry></grid>";
		}

		var elementName = 'Field lines (config ' + configID + ', ' + toroidalAngle.getValue() +
			' deg)';

		var payload = '<flt:trace xmlns:flt="fltracer.gsoap.boz.hgw.ipp.mpg.de"><points>';
		payload += x1Tags + x2Tags + x3Tags;
		payload += '</points><config><configIds>' + configID + '</configIds>' + grid + '<inverseField>' + invertB.getValue() + '</inverseField>' + '</config>' +
			'<task><step>' + step + '</step><lines><numSteps>' + numSteps +
			'</numSteps><globalError>false</globalError><localError>false</localError></lines></task></flt:trace>';

		var FLScript = "http://webservices.ipp-hgw.mpg.de/docs/makeWSRequestTraceLines.jag";
		$.get(FLScript, payload, function (json) {

			var lineObj = new THREE.Group();
			var material = new THREE.LineBasicMaterial({
				color: 0xFF0000,
				linewidth: 1
			});

			for (var i = 0; i < numStartingPoints; i++) {
				var vec = [];

				for (var j = i * (numSteps + 1); j < (i + 1) * (numSteps + 1); j++) {
					vec.push(new THREE.Vector3(json[j][0], json[j][1], json[j][2]));
				}

				var geometry = new THREE.Geometry();
				geometry.vertices = vec;
				var line = new THREE.Line(geometry, material);
				line.name = 'Start X=' + parseFloat(vec[0].x).toFixed(6) + ' Y=' +
					parseFloat(vec[0].y).toFixed(6) + ' Z=' + parseFloat(vec[0].z).toFixed(6);
				lineObj.add(line);
			}

			lineObj.name = elementName;
			editor.execute(new AddObjectCommand(lineObj));
			button.dom.removeChild(busyOverlay);
		}).fail(response => {
			console.log('Field line tracer failed', response);
			alert('Operation failed—settings may be invalid. See developer tools console for more info.');
			button.dom.removeChild(busyOverlay);
		});
	}

	return container;
};
