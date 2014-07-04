/*! 
 *  command-list.js
 */
var CP = CP || {};

(function () {
    var util = CP.Util,
        strings = {
            siteSettings: 'Site Settings',
            lookAndFeel: 'Look & Feel',
            siteCollectionAdmin: 'Site Collection Admin',
            usersAndPermissions: 'Users & Permissions',
            webDesignerGalleries: 'Web Designer Galleries'            
        };

    CP.CommandList = [
        {
            command: 'Central Administration',
            fn: function () {
                window.open(window.location.origin + ':11111');
            }
        },
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
        },
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
        },
        {
            command: strings.siteSettings + '',
            fn: function () {
                util.goToPage('/_layouts/15/settings.aspx');
            }
        },
        {
            command: 'Edit page',
            fn: function () {
                SuiteOnClick("javascript:SP.SOD.executeFunc('sp.ui.pub.ribbon.js', 'Pub.Ribbon.PubCommands', function() {Pub.Ribbon.PubCommands.notifyProgress(SP.Publishing.Resources.notificationMessageLoading);if (document.forms['aspnetForm']['MSOLayout_InDesignMode'] != null) document.forms['aspnetForm']['MSOLayout_InDesignMode'].value = 1;if (document.forms['aspnetForm']['MSOAuthoringConsole_FormContext'] != null) document.forms['aspnetForm']['MSOAuthoringConsole_FormContext'].value = 1;if (document.forms['aspnetForm']['MSOSPWebPartManager_DisplayModeName'] != null) document.forms['aspnetForm']['MSOSPWebPartManager_DisplayModeName'].value = 'Design';__doPostBack('ctl05','edit')});");
            }
        },
        {
            command: 'Edit properties',
            fn: function () {
                EnsureScriptParams('ribbon', 'ChangeWikiPageMode', true);
            }
        },
        {
            command: 'Add a page',
            fn: function () {
                OpenCreateWebPageDialog('/_layouts/15/createwebpage.aspx');
            }
        },
        {
            command: 'Add an app',
            fn: function () {
                util.goToPage('/_layouts/15/addanapp.aspx');
            }
        },
        {
            command: 'Site contents',
            fn: function () {
                util.goToPage('/_layouts/15/viewlsts.aspx');
            }
        },
        {
            command: strings.siteSettings + ': ' + strings.usersAndPermissions + ': People and groups',
            fn: function () {
                util.goToPage('/_layouts/15/people.aspx');
            }
        },
        {
            command: strings.siteSettings + ': ' + strings.usersAndPermissions + ': Site permissions',
            fn: function () {
                util.goToPage('/_layouts/15/user.aspx');
            }
        },
        {
            command: strings.siteSettings + ': ' + strings.usersAndPermissions + ': Site collection administrators',
            fn: function () {
                util.goToPage('/_layouts/15/mngsiteadmin.aspx');
            }
        },
        {
            command: strings.siteSettings + ': ' + strings.usersAndPermissions + ': Site app permissions',
            fn: function () {
                util.goToPage('/_layouts/15/appprincipals.aspx?Scope=Web');
            }
        },
        {
            command: strings.siteSettings + ': ' + strings.webDesignerGalleries + ': Site columns',
            fn: function () {
                util.goToPage('/_layouts/15/mngfield.aspx');
            }
        },
        {
            command: strings.siteSettings + ': ' + strings.webDesignerGalleries + ': Site content types',
            fn: function () {
                util.goToPage('/_layouts/15/mngctype.aspx');
            }
        },
        {
            command: strings.siteSettings + ': ' + strings.webDesignerGalleries + ': Web parts',
            fn: function () {
                util.goToPage('/_catalogs/wp/Forms/AllItems');
            }
        },
        {
            command: strings.siteSettings + ': ' + strings.webDesignerGalleries + ': List templates',
            fn: function () {
                util.goToPage('/_catalogs/lt/Forms/AllItems');
            }
        },
        {
            command: strings.siteSettings + ': ' + strings.webDesignerGalleries + ': Master pages',
            fn: function () {
                util.goToPage('/_catalogs/masterpage/Forms/AllItems');
            }
        },
        {
            command: strings.siteSettings + ': ' + strings.webDesignerGalleries + ': Themes',
            fn: function () {
                util.goToPage('/_catalogs/theme/Forms/AllItems');
            }
        },
        {
            command: strings.siteSettings + ': ' + strings.webDesignerGalleries + ': Solutions',
            fn: function () {
                util.goToPage('/_catalogs/solutions/Forms/AllItems');
            }
        },
        {
            command: strings.siteSettings + ': ' + strings.webDesignerGalleries + ': Composed looks',
            fn: function () {
                util.goToPage('/_catalogs/design/AllItems.aspx');
            }
        },
        {
            command: strings.siteSettings + ': Site Administration: Regional settings',
            fn: function () {
                util.goToPage('/_layouts/15/regionalsetng.aspx');
            }
        },
        {
            command: strings.siteSettings + ': Site Administration: Language settings',
            fn: function () {
                util.goToPage('/_layouts/15/muisetng.aspx');
            }
        },
        {
            command: strings.siteSettings + ': Site Administration: Site libraries and lists',
            fn: function () {
                util.goToPage('/_layouts/15/mcontent.aspx');
            }
        },
        {
            command: strings.siteSettings + ': Site Administration: User alerts',
            fn: function () {
                util.goToPage('/_layouts/15/sitesubs.aspx');
            }
        },
        {
            command: strings.siteSettings + ': Site Administration: RSS',
            fn: function () {
                util.goToPage('/_layouts/15/siterss.aspx');
            }
        },
        {
            command: strings.siteSettings + ': Site Administration: Sites and workspaces',
            fn: function () {
                util.goToPage('/_layouts/15/mngsubwebs.aspx');
            }
        },
        {
            command: strings.siteSettings + ': Site Administration: Workflow settings',
            fn: function () {
                util.goToPage('/_layouts/15/wrksetng.aspx');
            }
        },
        {
            command: strings.siteSettings + ': Site Administration: Site Closure and Deletion',
            fn: function () {
                util.goToPage('/_layouts/15/ProjectPolicyAndLifecycle.asp');
            }
        },
        {
            command: strings.siteSettings + ': Site Administration: Popularity Trends',
            fn: function () {
                util.goToPage('/_layouts/15/Reporting.aspx');
            }
        },
        {
            command: strings.siteSettings + ': Site Administration: Term store management',
            fn: function () {
                util.goToPage('/_layouts/15/termstoremanager.aspx');
            }
        },
        {
            command: strings.siteSettings + ': Search: Result Sources',
            fn: function () {
                util.goToPage('/_layouts/15/manageresultsources.aspx');
            }
        },
        {
            command: strings.siteSettings + ': Search: Result Types',
            fn: function () {
                util.goToPage('/_layouts/15/manageresulttypes.aspx');
            }
        },
        {
            command: strings.siteSettings + ': Search: Query Rules',
            fn: function () {
                util.goToPage('/_layouts/15/listqueryrules.aspx');
            }
        },
        {
            command: strings.siteSettings + ': Search: Schema',
            fn: function () {
                util.goToPage('/_layouts/15/listmanagedproperties.aspx');
            }
        },
        {
            command: strings.siteSettings + ': Search: Search Settings',
            fn: function () {
                util.goToPage('/_layouts/enhancedSea/ch/aspx?level');
            }
        },
        {
            command: strings.siteSettings + ': Search: Searchable columns',
            fn: function () {
                util.goToPage('/_layouts/15/NoCrawlSettings.aspx');
            }
        },
        {
            command: strings.siteSettings + ': Search: Search and offline availability',
            fn: function () {
                util.goToPage('/_layouts/15/srchvis.aspx');
            }
        },
        {
            command: strings.siteSettings + ': Search: Configuration Import',
            fn: function () {
                util.goToPage('/_layouts/15/importsearchconfiguration.aspx');
            }
        },
        {
            command: strings.siteSettings + ': Search: Configuration Import',
            fn: function () {
                util.goToPage('/_layouts/15/importsearchconfiguration.aspx');
            }
        },
        {
            command: strings.siteSettings + ': Search: Configuration Export',
            fn: function () {
                util.goToPage('/_layouts/15/exportsearchconfiguration.aspx');
            }
        },
        {
            command: strings.siteSettings + ': ' + strings.lookAndFeel + ': Design Manager',
            fn: function () {
                util.goToPage('/_layouts/15/RedirectPage.aspx?Target={SiteCollectionUrl}{LayoutsFolder}DesignSite.aspx');
            }
        },
        {
            command: strings.siteSettings + ': ' + strings.lookAndFeel + ': Master page',
            fn: function () {
                util.goToPage('/_layouts/15/ChangeSiteMasterPage.aspx');
            }
        },
        {
            command: strings.siteSettings + ': ' + strings.lookAndFeel + ': Title, description, and logo',
            fn: function () {
                util.goToPage('/_layouts/15/prjsetng.aspx');
            }
        },
        {
            command: strings.siteSettings + ': ' + strings.lookAndFeel + ': Page layouts and site templates',
            fn: function () {
                util.goToPage('/_layouts/15/AreaTemplateSettings.aspx');
            }
        },
        {
            command: strings.siteSettings + ': ' + strings.lookAndFeel + ': Welcome Page',
            fn: function () {
                util.goToPage('/_layouts/15/AreaWelcomePage.aspx');
            }
        },
        {
            command: strings.siteSettings + ': ' + strings.lookAndFeel + ': Device Channels',
            fn: function () {
                util.goToPage('/_layouts/15/RedirectPage.aspx?Target={SiteCollectionUrl}DeviceChannels');
            }
        },
        {
            command: strings.siteSettings + ': ' + strings.lookAndFeel + ': Tree view',
            fn: function () {
                util.goToPage('/_layouts/15/navoptions.aspx');
            }
        },
        {
            command: strings.siteSettings + ': ' + strings.lookAndFeel + ': Change the look',
            fn: function () {
                util.goToPage('/_layouts/15/designgallery.aspx');
            }
        },
        {
            command: strings.siteSettings + ': ' + strings.lookAndFeel + ': Import Design Package',
            fn: function () {
                util.goToPage('/_layouts/15/DesignPackageInstall.aspx');
            }
        },
        {
            command: strings.siteSettings + ': ' + strings.lookAndFeel + ': Navigation',
            fn: function () {
                util.goToPage('/_layouts/15/AreaNavigationSettings.aspx');
            }
        },
        {
            command: strings.siteSettings + ': ' + strings.lookAndFeel + ': Image Renditions',
            fn: function () {
                util.goToPage('/_layouts/15/ImageRenditionSettings.aspx');
            }
        },
        {
            command: strings.siteSettings + ': Site Actions: Manage site features',
            fn: function () {
                util.goToPage('/_layouts/15/ManageFeatures.aspx');
            }
        },
        {
            command: strings.siteSettings + ': Site Actions: Reset to site definition',
            fn: function () {
                util.goToPage('/_layouts/15/reghost.aspx');
            }
        },
        {
            command: strings.siteSettings + ': Site Actions: Delete this site',
            fn: function () {
                util.goToPage('/_layouts/15/deleteweb.aspx');
            }
        },
        {
            command: strings.siteSettings + ': ' + strings.siteCollectionAdmin + ': Recycle bin',
            fn: function () {
                util.goToPage('/_layouts/15/AdminRecycleBin.aspx');
            }
        },
        {
            command: strings.siteSettings + ': ' + strings.siteCollectionAdmin + ': Search Result Sources',
            fn: function () {
                util.goToPage('/_layouts/15/manageresultsources.aspx?level=sitecol');
            }
        },
        {
            command: strings.siteSettings + ': ' + strings.siteCollectionAdmin + ': Search Result Types',
            fn: function () {
                util.goToPage('/_layouts/15/manageresulttypes.aspx?level=sitecol');
            }
        },
        {
            command: strings.siteSettings + ': ' + strings.siteCollectionAdmin + ': Search Query Rules',
            fn: function () {
                util.goToPage('/_layouts/15/listqueryrules.aspx?level=sitecol');
            }
        },
        {
            command: strings.siteSettings + ': ' + strings.siteCollectionAdmin + ': Search Schema',
            fn: function () {
                util.goToPage('/_layouts/15/listmanagedproperties.aspx?level=sitecol');
            }
        },
        {
            command: strings.siteSettings + ': ' + strings.siteCollectionAdmin + ': Search Settings',
            fn: function () {
                util.goToPage('/_layouts/enhancedSearch.aspx?level=sitecol');
            }
        },
        {
            command: strings.siteSettings + ': ' + strings.siteCollectionAdmin + ': Search Configuration Import',
            fn: function () {
                util.goToPage('/_layouts/15/importsearchconfiguration.aspx?level=sitecol');
            }
        },
        {
            command: strings.siteSettings + ': ' + strings.siteCollectionAdmin + ': Search Configuration Export',
            fn: function () {
                util.goToPage('/_layouts/15/exportsearchconfiguration.aspx?level=sitecol');
            }
        },
        {
            command: strings.siteSettings + ': ' + strings.siteCollectionAdmin + ': Site collection features',
            fn: function () {
                util.goToPage('/_layouts/15/ManageFeatures.aspx?Scope=Site');
            }
        },
        {
            command: strings.siteSettings + ': ' + strings.siteCollectionAdmin + ': Site hierarchy',
            fn: function () {
                util.goToPage('/_layouts/15/vsubwebs.aspx');
            }
        },
        {
            command: strings.siteSettings + ': ' + strings.siteCollectionAdmin + ': Search engine optimization settings',
            fn: function () {
                util.goToPage('/_layouts/15/SEOSettings.aspx');
            }
        },
        {
            command: strings.siteSettings + ': ' + strings.siteCollectionAdmin + ': Site collection navigation',
            fn: function () {
                util.goToPage('/_layouts/15/SiteNavigationSettings.aspx');
            }
        },
        {
            command: strings.siteSettings + ': ' + strings.siteCollectionAdmin + ': Site collection audit settings',
            fn: function () {
                util.goToPage('/_layouts/15/AuditSettings.aspx');
            }
        },
        {
            command: strings.siteSettings + ': ' + strings.siteCollectionAdmin + ': Audit log reports',
            fn: function () {
                util.goToPage('/_layouts/15/Reporting.aspx?Category=Auditing');
            }
        },
        {
            command: strings.siteSettings + ': ' + strings.siteCollectionAdmin + ': Portal site connection',
            fn: function () {
                util.goToPage('/_layouts/15/portal.aspx');
            }
        },
        {
            command: strings.siteSettings + ': ' + strings.siteCollectionAdmin + ': Content Type Policy Templates',
            fn: function () {
                util.goToPage('/_layouts/15/Policylist.aspx');
            }
        },
        {
            command: strings.siteSettings + ': ' + strings.siteCollectionAdmin + ': Storage Metrics',
            fn: function () {
                util.goToPage('/_layouts/15/storman.aspx');
            }
        },
        {
            command: strings.siteSettings + ': ' + strings.siteCollectionAdmin + ': Site collection app permissions',
            fn: function () {
                util.goToPage('/_layouts/15/appprincipals.aspx');
            }
        },
        {
            command: strings.siteSettings + ': ' + strings.siteCollectionAdmin + ': Content type publishing',
            fn: function () {
                util.goToPage('/_layouts/15/contenttypesyndicationhubs.aspx');
            }
        },
        {
            command: strings.siteSettings + ': ' + strings.siteCollectionAdmin + ': Site collection output cache',
            fn: function () {
                util.goToPage('/_layouts/15/sitecachesettings.aspx');
            }
        },
        {
            command: strings.siteSettings + ': ' + strings.siteCollectionAdmin + ': Popularity and Search Reports',
            fn: function () {
                util.goToPage('/_layouts/15/Reporting.aspx?Category=AnalyticsSiteCollection');
            }
        },
        {
            command: strings.siteSettings + ': ' + strings.siteCollectionAdmin + ': Variations Settings',
            fn: function () {
                util.goToPage('/_layouts/15/VariationSettings.aspx');
            }
        },
        {
            command: strings.siteSettings + ': ' + strings.siteCollectionAdmin + ': Variation labels',
            fn: function () {
                util.goToPage('/_layouts/15/VariationLabels.aspx');
            }
        },
        {
            command: strings.siteSettings + ': ' + strings.siteCollectionAdmin + ': Translatable columns',
            fn: function () {
                util.goToPage('/_layouts/15/SiteTranslatableColumns.aspx');
            }
        },
        {
            command: strings.siteSettings + ': ' + strings.siteCollectionAdmin + ': Variation logs',
            fn: function () {
                util.goToPage('/_layouts/15/VariationLogs.aspx');
            }
        },
        {
            command: strings.siteSettings + ': ' + strings.siteCollectionAdmin + ': Suggested Content Browser Locations',
            fn: function () {
                util.goToPage('/PublishedLinks/');
            }
        },
        {
            command: strings.siteSettings + ': ' + strings.siteCollectionAdmin + ': HTML Field Security',
            fn: function () {
                util.goToPage('/_layouts/15/HtmlFieldSecurity.aspx');
            }
        },
        {
            command: strings.siteSettings + ': ' + strings.siteCollectionAdmin + ': SharePoint Designer Settings',
            fn: function () {
                util.goToPage('/_layouts/15/SharePointDesignerSettings.aspx');
            }
        },
        {
            command: strings.siteSettings + ': ' + strings.siteCollectionAdmin + ': Site collection health checks',
            fn: function () {
                util.goToPage('/_layouts/15/sitehealthcheck.aspx');
            }
        },
        {
            command: strings.siteSettings + ': ' + strings.siteCollectionAdmin + ': Site collection upgrade',
            fn: function () {
                util.goToPage('/_layouts/15/siteupgrade.aspx');
            }
        }
    ];

})();