/*! 
 *  commands/central-admin.js
 */
var CP = CP || {};

(function (util) {
    CP.CommandList = CP.CommandList || [];

    CP.CommandList = CP.CommandList.concat([
        {
            command: 'Central Administration',
            fn: function () {
                window.open(window.location.origin + ':11111');
            }
        }
    ]);

})(CP.Util);