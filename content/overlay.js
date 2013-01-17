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
	
	onLoad: function() {
		// initialization code
		mediarenderer.init("ws://localhost:9000", this.manifest, this.postInit, 
			function(err) {
				alert("Failed to initialize server: " + err);
		});
	},

	onMenuItemCommand: function() {
		if (document.popupNode.currentURI && document.popupNode.currentURI.spec) {
			for (var i=0; i<Telerender.renderers.length; i++) {
				var renderer = Telerender.renderers[i];
				renderer.openURI(document.popupNode.currentURI.spec,
					function() {
						renderer.controller.play();
					},
					function(err) {
						alert(renderer.friendlyName + " failed to load " + document.popupNode.currentURI.spec + "\n" + err);
					});
			}
		}
	}

};

window.addEventListener("load", function(e) { Telerender.onLoad(e); }, false); 
