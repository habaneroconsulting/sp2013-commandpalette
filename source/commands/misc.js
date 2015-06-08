/*! commands/misc.js */

var CP = CP || {};
CP.CommandList = CP.CommandList || [];

(function (constants, util) {
	'use strict';

	CP.CommandList = CP.CommandList.concat([
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
