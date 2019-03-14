;var templates = {};
(function(templates){
	var getTemplates = function(){
		var list = {
	        root: 'template.html',
	    };
	    for (var key in list) {
	    	var url = list[key];
	    	var xhr = new XMLHttpRequest();
	    	xhr.open('get', url, false);
	    	xhr.onreadystatechange = function(){
	    		if (xhr.readyState == 4 && xhr.status == 200) {
	    			templates[key] = xhr.responseText;
	    		}
	    	}
	    	xhr.send(null);
	    }
	}
	getTemplates();
})(templates);
