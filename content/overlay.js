var PushContent = {
  onLoad: function() {
    // initialization code
    this.initialized = true;
  },

  onMenuItemCommand: function() {
    window.open("chrome://pushcontent/content/pushcontent.xul", "", "chrome");
  }
};

window.addEventListener("load", function(e) { PushContent.onLoad(e); }, false); 
