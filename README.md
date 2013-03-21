Telerender
===========

Push media content to a remote DLNA renderer with a popup menu.


Usage
-----

Right click a media element on the current web page, or a link to a media element. 
The "Telerender" popup menu will open a list of all DLNA renderers known on the network,
and send the URI of that element to the selected renderer.


Install
-------

  * Edit the telerender@intel.com file, replace content with its folder path on your machine.
  * Copy telerender@intel.com to your firefox extensions folder, for instance ~/.mozilla/firefox/cvvhptkl.default/extensions


Requirements
------------

  * [dleyna-renderer](https://github.com/01org/dleyna-renderer)
  * [Cloudeebus](https://github.com/01org/cloudeebus)


Running the server
------------------

	cd server
	./cloudeebus.sh


Acknowledgements
----------------

Telerender includes libraries from the following open-source projects:

  * [cloud-dLeyna](https://github.com/01org/cloud-dleyna) ([Apache 2.0](http://opensource.org/licenses/Apache-2.0) License)
  * [Cloudeebus](https://github.com/01org/cloudeebus) ([Apache 2.0](http://opensource.org/licenses/Apache-2.0) License)
  * [AutobahnJS](http://autobahn.ws/js) ([MIT](http://opensource.org/licenses/MIT) License)
