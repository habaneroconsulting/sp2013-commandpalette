/*!
 *  command-util.js
 */
var CP = CP || {};
CP.Util = {};

(function(module) {

	module.getWebServerRelativeUrl = function () {
        return (_spPageContextInfo.webServerRelativeUrl === '/') ? _spPageContextInfo.webServerRelativeUrl : _spPageContextInfo.webServerRelativeUrl + '/';
    };

    module.goToPage = function (relativePath) {
    	GoToPage(_spPageContextInfo.webServerRelativeUrl + relativePath);
    };

})(CP.Util);