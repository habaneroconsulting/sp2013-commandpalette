/*!
 *  command-constants.js
 */
var CP = CP || {};
CP.Constants = CP.Constants || {};

(function(module) {
    'use strict';

    module.Strings = {
        siteSettings: 'Site Settings',
        lookAndFeel: 'Look and Feel',
        siteCollectionAdmin: 'Site Collection Admin',
        siteAdmin: 'Site Administration',
        usersAndPermissions: 'Users and Permissions',
        webDesignerGalleries: 'Web Designer Galleries',
        layouts: '/_layouts/15/'
    };

    module.SiteTypes = {
        collab: 'collaboration',
        pub: 'publishing'
    };

    module.Version = {
    	online: 'online',
    	premise: 'premise'
    };

    module.Role = {
    	approver: 'approver',
    	designer: 'designer'
    };

})(CP.Constants);