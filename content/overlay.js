var Telerender = {

	connected: false,
	
	manifest: {
		name: "telerender",
		key: "demo talk",
		permissions: ["com.intel.dleyna-renderer"]
	},

	renderers: [],
	
	renderURI: null,
	
	postInit: function() {
		mediarenderer.setRendererListener(
				{
					onrendererfound: function(renderer) {
						if (renderer.friendlyName)
							Telerender.renderers.push(renderer);
					}, 
					
					onrendererlost: function(id) {
						for (var i=0; i<Telerender.renderers.length; i++) {
							if (Telerender.renderers[i].id == id) {
								Telerender.renderers.splice(i,1);
								return;
							}
						}
					}
				});
		this.initialized = Telerender.connected = true;		
	},
	
	onPopupShowing: function() {
		var contextSubMenu = document.getElementById("contentAreaContextSubMenu");
		Telerender.renderURI = null;
		if (Telerender.connected && document.popupNode.currentURI && document.popupNode.currentURI.spec)
			Telerender.renderURI = document.popupNode.currentURI.spec;
		else if (gContextMenu.linkURL)
			Telerender.renderURI = gContextMenu.linkURL;
		if (Telerender.renderURI) {
			contextSubMenu.disabled=false;
			var contextSubMenuPopup = document.getElementById("contentAreaContextSubMenuPopup");
			while (contextSubMenuPopup.firstChild)
				contextSubMenuPopup.removeChild(contextSubMenuPopup.firstChild);
			for (var i=0; i<Telerender.renderers.length; i++) {
				var item = document.createElement("menuitem");
				item.setAttribute("label",Telerender.renderers[i].friendlyName);
				item.setAttribute("onclick","Telerender.onMenuItemCommand(" + i + ")");
				contextSubMenuPopup.appendChild(item);
			}
		}
		else {
			contextSubMenu.disabled=true;
		}
	},
	
	onLoad: function() {
		// initialization code
		mediarenderer.init("ws://localhost:9000", this.manifest, this.postInit);
		// dynamic popup menu
		var contextMenu = document.getElementById("contentAreaContextMenu");
		contextMenu.addEventListener("popupshowing", function() { Telerender.onPopupShowing(); }, false);
	},

	onMenuItemCommand: function(index) {
		var renderer = Telerender.renderers[index];
		renderer.openURI(Telerender.renderURI, null, // no meta data
			function() {
				renderer.controller.play();
			},
			function(err) {
				alert(renderer.friendlyName + " failed to load " + Telerender.renderURI + "\n" + err);
			});
	}

};

window.addEventListener("load", function() { Telerender.onLoad(); }, false); 
