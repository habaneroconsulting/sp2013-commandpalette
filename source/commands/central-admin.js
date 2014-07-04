/*! 
 *  commands/central-admin.js
 */
var CP = CP || {};

(function () {
    var util = CP.Util;

    CP.CommandList = CP.CommandList || [];

    CP.CommandList = CP.CommandList.concat([
        {
            command: 'Central Administration',
            fn: function () {
                window.open(window.location.origin + ':11111');
            }
        }
    ]);

})();