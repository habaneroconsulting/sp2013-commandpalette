/*! 
 *  commands/sharepoint-online.js
 */
var CP = CP || {};

(function (constants, util) {
    var siteType = constants.SiteTypes,
        strings = constants.strings,
        versionType = constants.VersionTypes;

    CP.CommandList = CP.CommandList || [];

    CP.CommandList = CP.CommandList.concat([
        {
            command: 'SharePoint Online My Site',
            exclude: [versionType.premise],
            fn: function () {
                util.goToSPOMySite('/');
            }
        },
        {
            command: 'SharePoint Online My Site: Edit Profile',
            exclude: [versionType.premise],
            fn: function () {
                util.goToSPOMySite('/_layouts/15/EditProfile.aspx');
            }
        },
        {
            command: 'SharePoint Online Admin Center: Site Collections',
            exclude: [versionType.premise],
            fn: function () {
                util.goToSPOAdmin('/_layouts/15/online/SiteCollections.aspx');
            }
        },
        {
            command: 'SharePoint Online Admin Center: Infopath',
            exclude: [versionType.premise],
            fn: function () {
                util.goToSPOAdmin('/_layouts/15/TenantForms.FormServer.asp');
            }
        },
        {
            command: 'SharePoint Online Admin Center: User Profiles',
            exclude: [versionType.premise],
            fn: function () {
                util.goToSPOAdmin('/_layouts/15/tenantprofileadmin/manageuserprofileserviceapplication.aspx');
            }
        },
        {
            command: 'SharePoint Admin Online: User Profiles: Manage User Properties',
            exclude: [versionType.premise],
            fn: function () {
                util.goToSPOAdmin('/_layouts/15/tenantprofileadmin/MgrProperty.aspx?ProfileType=User&ApplicationID=00000000-0000-0000-0000-000000000000');
            }
        },
        {
            command: 'SharePoint Admin Online: User Profiles: Manage User Profiles',
            exclude: [versionType.premise],
            fn: function () {
                util.goToSPOAdmin('/_layouts/15/tenantprofileadmin/ProfMngr.aspx?ConsoleView=Active&ProfileType=User&ApplicationID=00000000-0000-0000-0000-000000000000');
            }
        },
        {
            command: 'SharePoint Admin Online: User Profiles: Manage User Sub-types',
            exclude: [versionType.premise],
            fn: function () {
                util.goToSPOAdmin('/_layouts/15/tenantprofileadmin/ManageSubTypes.aspx?ProfileType=User&ApplicationID=00000000-0000-0000-0000-000000000000');
            }
        },
        {
            command: 'SharePoint Admin Online: User Profiles: Manage Audiences',
            exclude: [versionType.premise],
            fn: function () {
                util.goToSPOAdmin('/_layouts/15/tenantprofileadmin/Audience_List.aspx?ApplicationID=00000000-0000-0000-0000-000000000000');
            }
        },
        {
            command: 'SharePoint Admin Online: User Profiles: Manage User Permissions',
            exclude: [versionType.premise],
            fn: function () {
                util.goToSPOAdmin('/_layouts/15/tenantprofileadmin/UserProfileApplicationPermissions.aspx?ApplicationID=00000000-0000-0000-0000-000000000000');
            }
        },
        {
            command: 'SharePoint Admin Online: User Profiles: Manage Policies',
            exclude: [versionType.premise],
            fn: function () {
                util.goToSPOAdmin('/_layouts/15/tenantprofileadmin/ManagePrivacyPolicy.aspx?ApplicationID=00000000-0000-0000-0000-000000000000');
            }
        },
        {
            command: 'SharePoint Admin Online: User Profiles: Manage Organization Properties',
            exclude: [versionType.premise],
            fn: function () {
                util.goToSPOAdmin('/_layouts/15/tenantprofileadmin/MgrProperty.aspx?ProfileType=Organization&ApplicationID=00000000-0000-0000-0000-000000000000');
            }
        },
        {
            command: 'SharePoint Admin Online: User Profiles: Manage Organization Profiles',
            exclude: [versionType.premise],
            fn: function () {
                util.goToSPOAdmin('/_layouts/15/tenantprofileadmin/ProfMngr.aspx?ConsoleView=Active&ProfileType=Organization&ApplicationID=00000000-0000-0000-0000-000000000000');
            }
        },
        {
            command: 'SharePoint Admin Online: User Profiles: Manage Organization Sub-types',
            exclude: [versionType.premise],
            fn: function () {
                util.goToSPOAdmin('/_layouts/15/tenantprofileadmin/ManageSubTypes.aspx?ProfileType=Organization&ApplicationID=00000000-0000-0000-0000-000000000000');
            }
        },
        {
            command: 'SharePoint Admin Online: User Profiles: Setup My Sites',
            exclude: [versionType.premise],
            fn: function () {
                util.goToSPOAdmin('/_layouts/15/tenantprofileadmin/PersonalSites.aspx?ApplicationID=00000000-0000-0000-0000-000000000000');
            }
        },
        {
            command: 'SharePoint Admin Online: User Profiles: Configure Trusted Host Locations',
            exclude: [versionType.premise],
            fn: function () {
                util.goToSPOAdmin('/_layouts/15/tenantprofileadmin/ManageLinks.aspx?LinksType=0&ApplicationID=00000000-0000-0000-0000-000000000000');
            }
        },
        {
            command: 'SharePoint Admin Online: User Profiles: Manage Promoted Sites',
            exclude: [versionType.premise],
            fn: function () {
                util.goToSPOAdmin('/_layouts/15/tenantprofileadmin/ManageLinks.aspx?LinksType=1&ApplicationID=00000000-0000-0000-0000-000000000000');
            }
        },
        {
            command: 'SharePoint Admin Online: User Profiles: Publish Links to Office Client Applications',
            exclude: [versionType.premise],
            fn: function () {
                util.goToSPOAdmin('/_layouts/15/tenantprofileadmin/ManageLinks.aspx?LinksType=2&ApplicationID=00000000-0000-0000-0000-000000000000');
            }
        },
        {
            command: 'SharePoint Admin Online: User Profiles: Manage Social Tags and Notes',
            exclude: [versionType.premise],
            fn: function () {
                util.goToSPOAdmin('/_layouts/15/tenantprofileadmin/ManageSocialItems.aspx?ApplicationID=00000000-0000-0000-0000-000000000000');
            }
        },
        {
            command: 'SharePoint Online Admin Center: BCS',
            exclude: [versionType.premise],
            fn: function () {
                util.goToSPOAdmin('/_layouts/15/bdc/TA_BCSHome.aspx');
            }
        },
        {
            command: 'SharePoint Online Admin Center: Term Store',
            exclude: [versionType.premise],
            fn: function () {
                util.goToSPOAdmin('/_layouts/15/termstoremanager.aspx');
            }
        },
        {
            command: 'SharePoint Online Admin Center: Records Management',
            exclude: [versionType.premise],
            fn: function () {
                util.goToSPOAdmin('/_layouts/15/TA_OfficialFileAdmin.aspx');
            }
        },
        {
            command: 'SharePoint Online Admin Center: Search',
            exclude: [versionType.premise],
            fn: function () {
                util.goToSPOAdmin('/_layouts/15/searchadmin/TA_SearchAdmin.aspx');
            }
        },
        {
            command: 'SharePoint Online Admin Center: Search Admin: Manage Search Schema',
            exclude: [versionType.premise],
            fn: function () {
                util.goToSPOAdmin('/_layouts/15/searchadmin/ta_listmanagedproperties.aspx?level=tenant');
            }
        },
        {
            command: 'SharePoint Online Admin Center: Search Admin: Manage Search Dictionaries',
            exclude: [versionType.premise],
            fn: function () {
                util.goToSPOAdmin('/_layouts/15/searchadmin/_layouts/15/termstoremanager.aspx');
            }
        },
        {
            command: 'SharePoint Online Admin Center: Search Admin: Manage Authoritative Pages',
            exclude: [versionType.premise],
            fn: function () {
                util.goToSPOAdmin('/_layouts/15/searchadmin/editrelevancesettings.aspx?level=tenant');
            }
        },
        {
            command: 'SharePoint Online Admin Center: Search Admin: Query Suggestion Settings',
            exclude: [versionType.premise],
            fn: function () {
                util.goToSPOAdmin('/_layouts/15/searchadmin/querysuggestionsettings.aspx?level=tenant');
            }
        },
        {
            command: 'SharePoint Online Admin Center: Search Admin: Manage Result Sources',
            exclude: [versionType.premise],
            fn: function () {
                util.goToSPOAdmin('/_layouts/15/searchadmin/ManageResultSources.aspx?level=tenant');
            }
        },
        {
            command: 'SharePoint Online Admin Center: Search Admin: Manage Query Rules',
            exclude: [versionType.premise],
            fn: function () {
                util.goToSPOAdmin('/_layouts/15/searchadmin/listqueryrules.aspx?level=tenant');
            }
        },
        {
            command: 'SharePoint Online Admin Center: Search Admin: Manage Query Client Types',
            exclude: [versionType.premise],
            fn: function () {
                util.goToSPOAdmin('/_layouts/15/searchadmin/ManageQueryClientTypes.aspx?level=SPSiteSubscription');
            }
        },
        {
            command: 'SharePoint Online Admin Center: Search Admin: Remove Search Results',
            exclude: [versionType.premise],
            fn: function () {
                util.goToSPOAdmin('/_layouts/15/searchadmin/searchresultremoval.aspx');
            }
        },
        {
            command: 'SharePoint Online Admin Center: Search Admin: View Usage Reports',
            exclude: [versionType.premise],
            fn: function () {
                util.goToSPOAdmin('/_layouts/15/searchadmin//_layouts/15/reporting.aspx?Category=AnalyticsSearch');
            }
        },
        {
            command: 'SharePoint Online Admin Center: Search Admin: Search Center Settings',
            exclude: [versionType.premise],
            fn: function () {
                util.goToSPOAdmin('/_layouts/15/searchadmin/searchcentersettings.aspx');
            }
        },
        {
            command: 'SharePoint Online Admin Center: Search Admin: Export Search Configuration',
            exclude: [versionType.premise],
            fn: function () {
                util.goToSPOAdmin('/_layouts/15/searchadmin/exportsearchconfiguration.aspx?level=tenant');
            }
        },
        {
            command: 'SharePoint Online Admin Center: Search Admin: Import Search Configuration',
            exclude: [versionType.premise],
            fn: function () {
                util.goToSPOAdmin('/_layouts/15/searchadmin/importsearchconfiguration.aspx?level=tenant');
            }
        },
        {
            command: 'SharePoint Online Admin Center: Search Admin: Crawl Log Permissions',
            exclude: [versionType.premise],
            fn: function () {
                util.goToSPOAdmin('/_layouts/15/searchadmin/crawllogreadpermission.aspx');
            }
        },
        {
            command: 'SharePoint Online Admin Center: Secure Store',
            exclude: [versionType.premise],
            fn: function () {
                util.goToSPOAdmin('/_layouts/15/sssvc/TA_ManageSSSvcApplication.aspx');
            }
        },
        {
            command: 'SharePoint Online Admin Center: Apps',
            exclude: [versionType.premise],
            fn: function () {
                util.goToSPOAdmin('/_layouts/15/online/tenantadminapps.aspx');
            }
        },
        {
            command: 'SharePoint Online Admin Center: Settings',
            exclude: [versionType.premise],
            fn: function () {
                util.goToSPOAdmin('/_layouts/15/online/TenantSettings.aspx');
            }
        }
    ]);

})(CP.Constants, CP.Util);