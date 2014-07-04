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
        },
        {
            command: 'CBS to Diagnostic',
            fn: function () {
                (function () {
                    'use strict';

                    var options = {
                        template: '/_catalogs/masterpage/Display Templates/Content Web Parts/Item_Diagnostic.js',
                        templateName: 'Item_Diagnostic'
                    };

                    RegisterSod(options.templateName, options.template);

                    SP.SOD.loadMultiple([options.templateName], function() {
                        var elements = document.querySelectorAll('div[id*="_csr"]');

                        for (var i = 0; i < elements.length; i++) {
                            var cbs = elements[i].control,
                                displayTemplate = '~sitecollection' + options.template;

                            try {
                                cbs.set_itemTemplateId(displayTemplate);
                                cbs.getDataProvider().set_bypassResultTypes(!!displayTemplate);
                                cbs.refresh(new Srch.QueryState());
                            } catch(e) {}
                        }
                    });
                })();
            }
        },
        {
            command: 'Property bag',
            fn: function () {
                window.Hcf = window.Hcf || {};
                Hcf.PropertyBagBookmarklet = Hcf.PropertyBagBookmarklet || {};

                (function (module, window, document, undefined) {
                    'use strict';

                    var ctx, web,  // SP context for CSOM, web object
                        props;


                    /**
                    * Constructor
                    */
                    function init() {
                        // Don't want to do anything if our endpoints modal is already opened
                        if (!module.isModalOpened) {
                            if (typeof SP !== 'undefined') {
                                // Get modal library, then we can use the CSOM and initialize our bookmarklet UI
                                SP.SOD.loadMultiple(['sp.ui.dialog.js'], function () {
                                    initJSOM();
                                    getPropertyBag();
                                });
                            }
                        }
                    }


                    /**
                    * Initialize our context and web objects from the CSOM
                    */
                    function initJSOM() {
                        ctx = new SP.ClientContext.get_current();
                        web = ctx.get_web();
                    }


                    /**
                    * Gets web relative URL
                    * @returns {string} Web relative URL with trailing slash
                    */
                    function getWebRelativeUrl() {
                        return (_spPageContextInfo.webServerRelativeUrl === '/') ? _spPageContextInfo.webServerRelativeUrl : _spPageContextInfo.webServerRelativeUrl + '/';
                    }


                    /**
                    * Load up the current web's property bag
                    */
                    function getPropertyBag() {
                        props = web.get_allProperties();
                        ctx.load(props);
                        ctx.executeQueryAsync(
                            getPropertyBagSuccess,
                            function(sender, args) {
                                if (typeof console !== 'undefined') {
                                    console.log(args.get_message());
                                }
                            }
                        );
                    }


                    /**
                    * Successfully fetched property bag, now iterate through and display them to the user in a modal
                    */
                    function getPropertyBagSuccess() {
                        var allProps = props.get_fieldValues(),
                            container = document.createElement('div'),
                            counter = 0, trStyle, tdStyle = ' style="padding: 5px;"',
                            outputHtml = '<table><thead><tr><th align="left"' + tdStyle + '>Key</th><th align="left"' + tdStyle + '>Value</th></thead>',
                            sortedArray = [];

                        for (var key in allProps) {
                            if (allProps.hasOwnProperty(key)) {
                                sortedArray.push(key);
                            }
                        }

                        sortedArray.sort();

                        for (var i=0; i < sortedArray.length; i++) {
                            trStyle = (i%2 === 0) ? '' : ' style="background: #f0f0f0"';
                            outputHtml += '<tr' + trStyle + '><td' + tdStyle + '>' + sortedArray[i] + '</td><td' + tdStyle + '>' + allProps[sortedArray[i]] + '</td></tr>';
                        }

                        outputHtml += '</table>';
                        container.innerHTML = outputHtml;   

                        var options = {
                            title: 'Property bag (current site)',
                            html: container,
                            dialogReturnValueCallback: function() {
                                module.isModalOpened = false;
                            }
                        };

                        SP.UI.ModalDialog.showModalDialog(options);
                        module.isModalOpened = true;
                    }


                    // Fire initialization
                    init();

                })(Hcf.PropertyBagBookmarklet, window, document);
            }
        },
        {
            command: 'REST Endpoints',
            fn: function () {
                window.Hcf = window.Hcf || {};
                Hcf.RestEndpointsBookmarklet = Hcf.RestEndpointsBookmarklet || {};

                (function (module, window, document, undefined) {
                    'use strict';

                    var relativeToSiteCollectionInput,
                        relativeToSiteCollection = false;


                    /**
                    * Constructor
                    */
                    function init() {
                        // Don't want to do anything if our endpoints modal is already opened
                        if (!module.isModalOpened) {
                            // If our page context object exists, show our UI
                            if (typeof SP !== 'undefined') {
                                // Get modal library, then we can use the CSOM and initialize our bookmarklet UI
                                SP.SOD.loadMultiple(['sp.ui.dialog.js'], function () {
                                    toggleUI();
                                });
                            }
                        }
                    }
                    

                    /**
                    * Shows a flyout to the user that lets them select which endpoint they would like to navigate to. This lets us encapsulate a bunch of links in a single
                    * bookmarklet a bit more easily.
                    */
                    function toggleUI() {
                        var container = document.createElement('div'),
                            endpoints = module.config.endpoints,
                            outputHtml = '<p>The following endpoints are relative to the current site you are browsing. If you want to launch links relative to your current site collection check the "Relative to site collection" box below</p><input type="checkbox" id="hcfRestEndpoints_relativeSiteCollection" value="0" /><label for="hcfRestEndpoints_relativeSiteCollection">&nbsp;Relative to site collection</label><br /><br />';

                        for (var key in endpoints) {
                            outputHtml += '<h3>' + endpoints[key].title + '</h3>';

                            for (var subkey in endpoints[key].links) {
                                outputHtml += '<a href="' + endpoints[key].links[subkey].url + '" onclick="Hcf.RestEndpointsBookmarklet.execLink(this);return false;">' + endpoints[key].links[subkey].title + '</a><br />';
                            }

                            outputHtml += '<br />';
                        }

                        container.innerHTML = outputHtml;   


                        var options = {
                            title: 'REST API endpoints',
                            html: container,
                            dialogReturnValueCallback: function() {
                                module.isModalOpened = false;
                            }
                        };

                        SP.UI.ModalDialog.showModalDialog(options);
                        module.isModalOpened = true;
                    }


                    /**
                    * Gets base URL relative to site collection or site depending on user setting
                    * @returns {string} URL relative to either site collection or site
                    */
                    function getBaseRelativeUrl() {
                        var url;

                        if (relativeToSiteCollection) {
                            url = (_spPageContextInfo.siteServerRelativeUrl === '/') ? _spPageContextInfo.siteServerRelativeUrl : _spPageContextInfo.siteServerRelativeUrl + '/';
                        }
                        else {
                            url = (_spPageContextInfo.webServerRelativeUrl === '/') ? _spPageContextInfo.webServerRelativeUrl : _spPageContextInfo.webServerRelativeUrl + '/';
                        }

                        return url;
                    }


                    /**
                    * Returns a scope based on whether user has selected relative to site collection or not
                    */
                    function getScope() {
                        return (relativeToSiteCollection) ? 'site' : 'web';
                    }


                    /**
                    * Activates on click of any API link. Evaluates whether we are going to link relative to current site collection or current site/web. Then opens in new window/tab.
                    */
                    module.execLink = function(el) {
                        var linkUrl = el.getAttribute('href'),
                            newUrl; 

                        if (!relativeToSiteCollectionInput) {
                            relativeToSiteCollectionInput = document.getElementById('hcfRestEndpoints_relativeSiteCollection');
                        }

                        relativeToSiteCollection = (relativeToSiteCollectionInput.checked);
                        newUrl = getBaseRelativeUrl() + module.config.apiPrefix + linkUrl.replace('~scope', getScope());

                        window.open(newUrl,'_blank');

                        return false;
                    };


                    /**
                    * Configuration
                    */
                    module.config = {
                        apiPrefix: '_api/',
                        endpoints: {
                            lists: {
                                title: 'Lists',
                                links: {
                                    allLists: {
                                        url: '~scope/lists',
                                        title: 'All lists',
                                    },
                                    listByTitle: {
                                        title: 'List by title',
                                        url: '~scope/lists/GetByTitle(\'Documents\')'
                                    },
                                    listItemsByTitle: {
                                        title: 'List items by title',
                                        url: '~scope/lists/GetByTitle(\'Documents\')/items'
                                    },
                                    listItemsByTitleSort: {
                                        title: 'List items by title (with sort order)',
                                        url: '~scope/lists/getByTitle(\'Documents\')/items?$orderby=Title asc'
                                    },
                                    listItemsByTitleFilter: {
                                        title: 'List items by title (with filter and top 10 results)',
                                        url: '~scope/lists/getByTitle(\'Documents\')/items?$filter=Title eq \'Test\'&$top=10'
                                    },
                                    listByGuid: {
                                        title: 'List by GUID',
                                        url: '~scope/lists(guid\'b70c7a25-f0e2-494b-83f6-5b13ab840ad2\')'
                                    },
                                    listItemsByGuid: {
                                        title: 'List items by GUID',
                                        url: '~scope/lists(guid\'b70c7a25-f0e2-494b-83f6-5b13ab840ad2\')/items'
                                    }
                                }
                            },
                            search: {
                                title: 'Search',
                                links: {
                                    search: {
                                        title: 'Search query',
                                        url: 'search/query?queryText=\'term\''
                                    }
                                }
                            },
                            social: {
                                title: 'Social',
                                links: {
                                    followed: {
                                        title: 'Followed',
                                        url: 'social.following/followed'
                                    },
                                    usersImFollowing: {
                                        title: 'Users I\'m following',
                                        url: 'social.following/my/followed(types=1)'
                                    },
                                    sitesImFollowing: {
                                        title: 'Sites I\'m following',
                                        url: 'social.following/my/followed(types=4)'
                                    },
                                    myFollowers: {
                                        title: 'My followers',
                                        url: 'social.following/my/followers'
                                    }
                                }
                            },
                            files: {
                                title: 'Files / Folders',
                                links: {
                                    folder: {
                                        title: 'Folder',
                                        url: 'web/GetFolderByServerRelativeUrl(\'Documents\')'
                                    },
                                    files: {
                                        title: 'Files',
                                        url: 'web/GetFolderByServerRelativeUrl(\'Documents\')/Files'
                                    },
                                    file: {
                                        title: 'Specific file',
                                        url: 'web/GetFolderByServerRelativeUrl(\'Documents\')/Files(\'test.txt\')'
                                    }
                                }
                            }
                        }
                    };

                    // Fire initialization
                    init();

                })(window.Hcf.RestEndpointsBookmarklet, window, document);
            }
        }
    ]);

})();