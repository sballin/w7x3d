/**
 * @author mrdoob / http://mrdoob.com/
 */

Sidebar.W7XModels = function ( editor ) {

	var config = editor.config;
	var strings = editor.strings;
	var signals = editor.signals;

	var container = new UI.Panel();
	container.setBorderTop( '0' );
	container.setPaddingTop( '20px' );
	container.setDisplay( 'none' );
	
	// Used for building an assembly fetch by fetch
	var componentCount;
	var constructionObject = new THREE.Object3D();

	var container = new UI.Panel();
	container.setBorderTop( '0' );
	container.setPaddingTop( '20px' );
	
	// Surface category selection
	
	var categoryRow = new UI.Row();
	categoryRow.add( new UI.Text( 'Category' ).setWidth( '90px' ) );
	var categorySelect = new UI.Select().setOptions( {
		'Assemblies': 'Assemblies',
		'Components': 'Components',
		'Coils': 'Coils',
		'Plasma': 'Plasma',
		'Diagnostics': 'Diagnostics'
	} ).setWidth( '189px' ).setFontSize( '12px' ).onChange( function () { 
		var category = this.getValue();
		config.setKey('Category', category); 
		
		objectsList.clear();
		if (category == 'Assemblies') {
			addAssembliesToSidebar(assembliesInfo);
		}
		else if (category == 'Components') {
			addComponentsToSidebar(componentsInfo);
		}
		else if (category == 'Coils') {
			addCoilsToSidebar(configsInfo);
		}
		searchInput.setValue('');
	} );
	categorySelect.setValue('Assemblies');
	categoryRow.add(categorySelect);
	container.add( categoryRow );

	// Components search bar
	
	var currentCategoryListFunction;

	var searchRow = new UI.Row();
	searchRow.add( new UI.Text( 'Search' ).setWidth( '90px' ) );
	var searchInput = new UI.Input( '' ).setWidth('183px').onKeyUp( function () {
		
		var searchString = this.getValue().toUpperCase();
		
		if (categorySelect.getValue() == 'Assemblies') {
			var info = assembliesInfo;
			var addingFunction = addAssembliesToSidebar;
		}
		else if (categorySelect.getValue() == 'Components') {
			var info = componentsInfo;
			var addingFunction = addComponentsToSidebar;
		}
		else if (categorySelect.getValue() == 'Coils') {
			var info = configsInfo;
			var addingFunction = addCoilsToSidebar;
		}
		
		var filteredInfo = [];
		for (var i = 0; i < info.length; i++) {
			info[i].databaseID = i;
			var textToSearch = info[i].name.toUpperCase() + ' ' + 
							   info[i].machine.toUpperCase() + ' #' + i + ' ' + 
							   info[i].comment.toUpperCase();
			if (textToSearch.includes(searchString)) {
				filteredInfo.push(info[i]);
			}
		}
		
		objectsList.clear();
		addingFunction(filteredInfo);
	} );

	searchRow.add( searchInput );
	
	container.add( searchRow );
	
	// Objects list
	
	var objectsList = new UI.Div();
	
	// // Give list of objects its own scrollbar
	// objectsList.dom.style.height = '500px';
	// objectsList.dom.style.overflow = 'auto';
	
	container.add( objectsList );
	
	var assembliesInfo;
	var assembliesInfoUrl = 'http://esb.ipp-hgw.mpg.de:8280/services/ComponentsDbRest/assemblies';
    fetch(assembliesInfoUrl).then(response => { if (response.ok) return response.json(); else throw Error('Request rejected with status ${response.status}'); }).then(json => {
        assembliesInfo = json;
        for (var i in assembliesInfo) {
        	assembliesInfo[i].databaseID = i;
        }
        addAssembliesToSidebar(assembliesInfo); 
    });
    
    var componentsInfo;
    var componentsInfoUrl = 'http://esb.ipp-hgw.mpg.de:8280/services/ComponentsDbRest/components';
    fetch(componentsInfoUrl).then(response => { if (response.ok) return response.json(); else throw Error('Request rejected with status ${response.status}'); }).then(json => {
        componentsInfo = json;
        for (var i in componentsInfo) {
        	componentsInfo[i].databaseID = i; 
        }
    });
    
    var configsInfo;
    var coilsInfoUrl = 'http://esb.ipp-hgw.mpg.de:8280/services/CoilsDBRest/configs';
    fetch(coilsInfoUrl).then(response => { if (response.ok) return response.json(); else throw Error('Request rejected with status ${response.status}'); }).then(json => {
        configsInfo = json;
        for (var i in configsInfo) {
        	configsInfo[i].databaseID = i;
        }
    });
	
	function addAssembliesToSidebar(info) {
		for (var i = 0; i < info.length; i++) {
			var objectInfo = {};
			objectInfo.title = info[i].name;
			objectInfo.subtitle = info[i].machine + ' assembly #' + info[i].databaseID +
			                      ' (' + info[i].subids.length + ' components)';
			objectInfo.description = info[i].comment.replace('Copied to new database (ComponentsDB2)', '');
			objectInfo.outlinerTitle = info[i].name + ' (assembly #' + info[i].databaseID + ')';
			objectInfo.subids = info[i].subids;
			objectInfo.addToSceneFunction = addAssembly;
			
			var objectButton = new UI.ObjectButton(objectInfo);
			var row = new UI.Row();
			row.add(objectButton);
			objectsList.add(row);
		}
	}
	
	function addComponentsToSidebar(info) {
		for (var i = 0; i < info.length; i++) {
			var objectInfo = {};
			objectInfo.title = info[i].name;
			objectInfo.subtitle = info[i].machine + ' component #' + info[i].databaseID;
			objectInfo.description = info[i].comment.replace('Copied to new database (ComponentsDB2)', '');
			objectInfo.outlinerTitle = info[i].name + ' (component #' + info[i].databaseID + ')';
			objectInfo.subids = [info[i].databaseID];
			objectInfo.addToSceneFunction = addSingleComponent;
			
			var row = new UI.Row();
			var objectButton = new UI.ObjectButton(objectInfo);
			row.add(objectButton);
			objectsList.add(row);
		}
	}
	
	function addCoilsToSidebar(info) {
		for (var i = 0; i < info.length; i++) {
			var objectInfo = {};
			objectInfo.title = info[i].name;
			objectInfo.subtitle = info[i].machine + ' config #' + info[i].databaseID + ' (' + info[i].subids.length + ' components)';
			objectInfo.description = info[i].comment.replace('Copied to the new database (CoilsDB2).', '');
			objectInfo.outlinerTitle = info[i].name + ' (config #' + info[i].databaseID + ')';
			objectInfo.subids = info[i].subids;
			objectInfo.addToSceneFunction = addCoils;
			
			var row = new UI.Row();
			var objectButton = new UI.ObjectButton(objectInfo);
			row.add(objectButton);
			objectsList.add(row);
		}
	}
	
	function addAssembly(assemblyName, subids) {
		componentCount = 0;
		for (var subidi in subids) {
			addComponentById(subids[subidi], subids.length, assemblyName);
		}
	}
	
	function addSingleComponent(unusedName, arrayWithOnlyID) {
		addComponentById(arrayWithOnlyID[0], 1, '');
	}
	
	function addCoils(configName, subids) {
		componentCount = 0;
		for (var subidi in subids) {
			addCoilById(subids[subidi], subids.length, configName);
		}
	}
	
    function addComponentById(id, numComponents, assemblyName) {
        fetch('http://esb.ipp-hgw.mpg.de:8280/services/ComponentsDbRest/component/' + id + '/data').then(response => { if (response.ok) return response.json(); else throw Error('Request rejected with status ${response.status}'); }).then(json => addObject('component', json, id, numComponents, assemblyName, makeMesh));
    }
    
	function addCoilById(id, numCoils, configName) {
		fetch('http://esb.ipp-hgw.mpg.de:8280/services/CoilsDBRest/coil/' + id + '/data').then(response => { if (response.ok) return response.json(); else throw Error('Request rejected with status ${response.status}'); }).then(json => addObject('coil', json, id, numCoils, configName, makeLine));
	}
	
    function addObject(type, json, id, numComponents, assemblyName, makeObjectFunction) {
    	var object = makeObjectFunction(json);
    	if (type == 'component') {
	    	component.name = componentsInfo[id].name + ' (component #' + id + ')';
		}
		else if (type == 'coil') {
			object.name = 'coil #' + id;
		}
	    
	    if (numComponents == 1) {
	    	editor.execute( new AddObjectCommand( object  ) );
	    }
	    else if (numComponents > 1) {
	    	// Add to construction object
	    	constructionObject.add(object);
	    	componentCount += 1;
	    }
	    
	    // Add to scene after last component is loaded
	    if (componentCount == numComponents) {
	    	constructionObject.name = assemblyName;
	        editor.execute( new AddObjectCommand( constructionObject.clone() ) );
	        while (constructionObject.children.length > 0) {
	        	constructionObject.remove(constructionObject.children[0]);
	        }
	    }
	}
	
    function makeMesh(json) {
	    var data = json.surfaceMesh;

	    if (data == undefined) {
	        data = json.volumeMesh.faces;
	    }

	    var vec = [];
	    var faces = [];

	    for (var i = 0; i < data.nodes.x1.length; i++) {
	        vec.push(new THREE.Vector3(data.nodes.x1[i], data.nodes.x2[i], data.nodes.x3[i]));
	    }

	    if (data.numVertices[0] == 3) {
	        for (var i = 0; i < data.polygons.length; i++) {
	            faces.push(new THREE.Face3(data.polygons[i++] - 1, data.polygons[i++] - 1, data.polygons[i] - 1));
	        }
	    }
	    else {
	        for (var i = 0; i < data.polygons.length; i++) {
	            v1 = data.polygons[i++] - 1;
	            v2 = data.polygons[i++] - 1;
	            v3 = data.polygons[i++] - 1;
	            v4 = data.polygons[i] - 1;
	            faces.push(new THREE.Face3(v1, v2, v3));
	            faces.push(new THREE.Face3(v1, v3, v4));
	        }
	    }

	    var geometry = new THREE.Geometry();
	    geometry.vertices = vec;
	    geometry.faces = faces;
	    geometry.computeFaceNormals();
	    
    	var material = new THREE.MeshStandardMaterial({
            color: 0xAAAAAA,
            side: THREE.DoubleSide
        });
	    
	    return new THREE.Mesh(geometry, material);
    }
    
	function makeLine(json) {
        data = json.polylineFilament; 
        var vec = [];
        for (var i = 0; i < data.vertices.x1.length; i++) {
	    	vec.push(new THREE.Vector3(data.vertices.x1[i], data.vertices.x2[i], data.vertices.x3[i]));
        }
 
        var geometry = new THREE.Geometry();
        geometry.vertices = vec;
        var material = new THREE.LineBasicMaterial( { color: 0xFF0000, linewidth: 10 } );
        return new THREE.Line( geometry, material );
	}

	return container;

};
