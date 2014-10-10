var rootNodesRenderedItems = false;
var nodeIdItems = 0;

window.treeDataSourceItems = function(options, callback) {
	var nodes = [];

	if(options.children) {
		nodes = options.children;

//		if(folderSelect) {
//			// remove any items, only show folders
//			nodes = _.filter(nodes, function(node) {
//				return node.type === 'folder';
//			});
//		}
	}
	else if(!rootNodesRenderedItems) {
		// render root nodes
		nodes = window.foldersAndItems;
		rootNodesRenderedItems = true;
	}

	_.each(nodes, function(node, index) {
		if(!node.dataAttributes) {
			node.dataAttributes = {};
		}
		if(!node.dataAttributes.id) {
			// ensure each node has an identifier
			node.dataAttributes.id = 'node' + (nodeIdItems += 1);
		}
		if(!node.value) {
			// ensure each node has a value (sync with id if needed)
			node.value = node.dataAttributes.id;
		}

		// determine whether the node has children
		// note: this will be used to hide the caret if necessary
		node.dataAttributes.hasChildren = (node.children && node.children.length > 0) ? true : false;
	});

	var dataSource = {
		data: nodes
	}

	// simulate delay
	window.setTimeout(function() {
		callback(dataSource), 2000
	}, 500);
};