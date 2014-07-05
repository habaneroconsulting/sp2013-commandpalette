/*! 
 *  commands/misc.js
 */
var CP = CP || {};

(function (constants, util) {    
    CP.CommandList = CP.CommandList || [];

    CP.CommandList = CP.CommandList.concat([
        {
            command: 'View all site content',
            fn: function () {
                window.open(window.location.origin + '/' + _spPageContextInfo.webServerRelativeUrl + '/_layouts/viewlsts.aspx');
            }
        },
        {
            command: 'Web part maintance page',
            fn: function () {
                window.location = window.location + '?contents=1';
            }
        },
        {
            command: 'Dialog version',
            fn: function () {
                window.location = window.location + '?isDlg=1';
            }
        }
    ]);

})(CP.Constants, CP.Util);