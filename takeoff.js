var marks = [];

chrome.bookmarks.getTree(function(itemTree){
    itemTree.forEach(function(item){
        processNode(item);
    });
});

function processNode(node) {
	
    // recursively process child nodes
    if(node.children) {
        node.children.forEach(function(child) {
			processNode(child);
        });
    }

    // print leaf nodes URLs to console
    if(node.url) {
		console.log(node.url);
		var book = marks.push(node.url);
    }
}



function setPage(windowObj) {
	bookmark = marks[Math.floor(Math.random() * marks.length)];
	chrome.tabs.getSelected(windowObj.windowId, function(tab) {
		chrome.tabs.update(tab.id, {url: bookmark});
	});
}

chrome.windows.getLastFocused(setPage);