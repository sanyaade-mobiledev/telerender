var Telerender = {

	manifest: {
		name: "telerender",
		key: "demo talk",
		permissions: ["com.intel.renderer-service-upnp"]
	},

	renderers: [],
	
	postInit: function() {
		mediarenderer.setRendererListener(
				{
					onrendererfound: function(renderer) {
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
		this.initialized = true;		
	},
	
	onPopupShowing: function() {
		var contextSubMenu = document.getElementById("contentAreaContextSubMenu");
		if (document.popupNode.currentURI && document.popupNode.currentURI.spec) {
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
		mediarenderer.init("ws://localhost:9000", this.manifest, this.postInit, 
			function(err) {
				alert("Failed to initialize server: " + err);
		});
		// dynamic popup menu
		var contextMenu = document.getElementById("contentAreaContextMenu");
		contextMenu.addEventListener("popupshowing", function() { Telerender.onPopupShowing(); }, false);
	},

	onMenuItemCommand: function(index) {
		var renderer = Telerender.renderers[index];
		renderer.openURI(document.popupNode.currentURI.spec,
			function() {
				renderer.controller.play();
			},
			function(err) {
				alert(renderer.friendlyName + " failed to load " + document.popupNode.currentURI.spec + "\n" + err);
			});
	}

};

window.addEventListener("load", function() { Telerender.onLoad(); }, false); 
