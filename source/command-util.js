/*!
 *  command-util.js
 */
var CP = CP || {};
CP.Util = {};

(function(module) {
    var siteType = CP.Constants.SiteTypes;

    // Get the web server relative URL
    module.getWebServerRelativeUrl = function() {
        return (_spPageContextInfo.webServerRelativeUrl === '/') ? _spPageContextInfo.webServerRelativeUrl : _spPageContextInfo.webServerRelativeUrl + '/';
    };

    // Run SharePoint's GoToPage functionality, with the relative server URL
    module.goToPage = function(relativePath) {
        GoToPage(_spPageContextInfo.webServerRelativeUrl + relativePath);
    };

    // Returns the site type based on a site template ID
    module.getSiteType = function() {
        if (typeof g_wsaSiteTemplateId !== 'undefined' && g_wsaSiteTemplateId) {
            switch (g_wsaSiteTemplateId) {
                case 'STS#0':
                case 'SPSPERS#6':
                case 'SPSMSITEHOST#0':
                    return siteType.collab;
                case 'BLANKINTERNET#0':
                case 'SRCHCEN#0':
                    return siteType.pub;
            }
        }

        return siteType.pub;
    };

})(CP.Util);