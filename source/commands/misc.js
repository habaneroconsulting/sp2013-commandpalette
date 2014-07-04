/*! 
 *  commands/misc.js
 */
var CP = CP || {};

(function (util) {
    CP.CommandList = CP.CommandList || [];

    CP.CommandList = CP.CommandList.concat([
        {
            command: 'View all site content',
            fn: function () {
                window.open(window.location.origin + '/' + _spPageContextInfo.webServerRelativeUrl + '/_layouts/viewlsts.aspx');
            }
        },
        {
            command: 'Manage service applications',
            fn: function () {
                window.open(window.location.origin + ':11111/_admin/ServiceApplications.aspx');
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

})(CP.Util);