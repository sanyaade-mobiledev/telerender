var PushContent = {
		
		onLoad: function() {
			// initialization code
			this.initialized = true;
		},

		onMenuItemCommand: function() {
			if (document.popupNode.currentURI)
				alert(JSON.stringify(document.popupNode.currentURI));
		},

};

window.addEventListener("load", function(e) { PushContent.onLoad(e); }, false); 
