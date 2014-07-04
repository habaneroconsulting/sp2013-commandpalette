/*!
 *  command-util.js
 */
var CP = CP || {};
CP.Util = {};

(function(module) {

	// Get the web server relative URL
	module.getWebServerRelativeUrl = function () {
        return (_spPageContextInfo.webServerRelativeUrl === '/') ? _spPageContextInfo.webServerRelativeUrl : _spPageContextInfo.webServerRelativeUrl + '/';
    };

    // Run SharePoint's GoToPage functionality, with the relative server URL
    module.goToPage = function (relativePath) {
    	GoToPage(_spPageContextInfo.webServerRelativeUrl + relativePath);
    };

})(CP.Util);