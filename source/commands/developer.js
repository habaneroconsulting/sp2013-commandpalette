/*! 
 *  commands/developer.js
 */
var CP = CP || {};

(function () {
    var util = CP.Util;

    CP.CommandList = CP.CommandList || [];

    CP.CommandList = CP.CommandList.concat([
        {
            command: 'Log in as a different user',
            fn: function () {
                function forceNewLogin() {
                    window.location.href = CP.Util.getWebServerRelativeUrl() + '_layouts/closeConnection.aspx?loginasanotheruser=true';
                }

                if (_spPageContextInfo) {
                    forceNewLogin();
                }
            }
        }
    ]);

})();