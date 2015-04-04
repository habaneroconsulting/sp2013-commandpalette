/*!
 *  commands/site-actions.js
 */
var CP = CP || {};

(function (constants, util) {
	var siteType = constants.SiteTypes,
		strings = constants.Strings,
		versionType = constants.VersionTypes;

	CP.CommandList = CP.CommandList || [];

	CP.CommandList = CP.CommandList.concat([
		{
			command: 'Show Ribbon',
			fn: function () {
				// jscs:disable
				SuiteOnClick('javascript:__doPostBack\u0028\u0027ctl00$ctl52$ctl03$SiteActionsMenuMainData$ctl00$wsaShowMenu_CmsActionControl\u0027,\u0027reviewPage\u0027\u0029');
				// jscs:enable
			}
		},
		{
			command: 'Shared with...',
			fn: function () {
				// jscs:disable
				SuiteOnClick('EnsureScriptFunc\u0028\u0027sharing.js\u0027, \u0027DisplaySharedWithDialog\u0027, function \u0028\u0029 { DisplaySharedWithDialog\u0028\u0027\\u002fsites\\u002fpublishing-portal\\u002f\u0027\u0029; }\u0029');
				// jscs:enable
			}
		},
		{
			command: 'Edit page',
			fn: function () {
				// jscs:disable
				SuiteOnClick('javascript:SP.SOD.executeFunc(\'sp.ui.pub.ribbon.js\', \'Pub.Ribbon.PubCommands\', function () {Pub.Ribbon.PubCommands.notifyProgress(SP.Publishing.Resources.notificationMessageLoading);if (document.forms[\'aspnetForm\'][\'MSOLayout_InDesignMode\'] != null) document.forms[\'aspnetForm\'][\'MSOLayout_InDesignMode\'].value = 1;if (document.forms[\'aspnetForm\'][\'MSOAuthoringConsole_FormContext\'] != null) document.forms[\'aspnetForm\'][\'MSOAuthoringConsole_FormContext\'].value = 1;if (document.forms[\'aspnetForm\'][\'MSOSPWebPartManager_DisplayModeName\'] != null) document.forms[\'aspnetForm\'][\'MSOSPWebPartManager_DisplayModeName\'].value = \'Design\';__doPostBack(\'ctl05\',\'edit\')});');
				// jscs:enable
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
				util.goToPage(strings.layouts + 'addanapp.aspx');
			}
		},
		{
			command: 'Site contents',
			fn: function () {
				util.goToPage(strings.layouts + 'viewlsts.aspx');
			}
		},
		{
			command: 'Office 365 settings',
			exclude: [versionType.premise],
			fn: function () {
				util.goTo('https://portal.microsoftonline.com/EditProfile15.aspx');
			}
		}
	]);

})(CP.Constants, CP.Util);
