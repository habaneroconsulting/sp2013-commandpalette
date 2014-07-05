/*!
 *  command-util.js
 */
var CP = CP || {};
CP.Util = CP.Util || {};

(function(module) {

    // Get the web server relative URL
    module.getWebServerRelativeUrl = function() {
        return (_spPageContextInfo.webServerRelativeUrl === '/') ? _spPageContextInfo.webServerRelativeUrl : _spPageContextInfo.webServerRelativeUrl + '/';
    };

    // Run SharePoint's GoToPage functionality, with the relative server URL
    module.goToPage = function(relativePath) {
        GoToPage(_spPageContextInfo.webServerRelativeUrl + relativePath);
    };

    // Go to a central administration page
    module.goToCentralAdmin = function(path) {
        window.location = window.location.origin + ':11111' + path;
    };

    // Returns the site type based on a site template ID
    module.getSiteType = function() {
        var siteType = CP.Constants.SiteTypes;

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

            if (g_wsaSiteTemplateId.indexOf('INTERNET') > -1) {
                return siteType.pub;
            }
        }

        return siteType.pub;
    };

    // Returns the SharePoint version type
    module.getVersionType = function() {
        var versionType = CP.Constants.VersionTypes;

        if (typeof _spPageContextInfo !== 'undefined' &&
            _spPageContextInfo.siteClientTag &&
            _spPageContextInfo.siteClientTag.indexOf('$$16') > -1) {
            return versionType.online;
        }

        return versionType.premise;
    };

})(CP.Util);