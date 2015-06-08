/*! commands/central-admin.js */

var CP = CP || {};
CP.CommandList = CP.CommandList || [];

(function (constants, util) {
	'use strict';

	var versionType = constants.VersionTypes;

	CP.CommandList = CP.CommandList.concat([
		{
			command: 'Central Admin',
			exclude: [versionType.online],
			fn: function () {
				util.goToCentralAdmin('');
			}
		},
		{
			command: 'Central Admin: Application Management',
			exclude: [versionType.online],
			fn: function () {
				util.goToCentralAdmin('/applications.aspx');
			}
		},
		{
			command: 'Central Admin: Application Management: Manage web applications',
			exclude: [versionType.online],
			fn: function () {
				util.goToCentralAdmin('/_admin/WebApplicationList.aspx');
			}
		},
		{
			command: 'Central Admin: Application Management: Create site collections',
			exclude: [versionType.online],
			fn: function () {
				util.goToCentralAdmin('/_admin/createsite.aspx');
			}
		},
		{
			command: 'Central Admin: Application Management: Manage service applications',
			exclude: [versionType.online],
			fn: function () {
				util.goToCentralAdmin('/_admin/ServiceApplications.aspx');
			}
		},
		{
			command: 'Central Admin: Application Management: Manage content databases',
			exclude: [versionType.online],
			fn: function () {
				util.goToCentralAdmin('/_admin/CNTDBADM.aspx');
			}
		},
		{
			command: 'Central Admin: Monitoring',
			exclude: [versionType.online],
			fn: function () {
				util.goToCentralAdmin('/monitoring.aspx');
			}
		},
		{
			command: 'Central Admin: Monitoring: Review problems and solutions',
			exclude: [versionType.online],
			fn: function () {
				util.goToCentralAdmin('/Lists/HealthReports');
			}
		},
		{
			command: 'Central Admin: Monitoring: Check job status',
			exclude: [versionType.online],
			fn: function () {
				util.goToCentralAdmin('/_admin/Timer.aspx');
			}
		},
		{
			command: 'Central Admin: Security',
			exclude: [versionType.online],
			fn: function () {
				util.goToCentralAdmin('/security.aspx');
			}
		},
		{
			command: 'Central Admin: Security: Manage the farm administrators group',
			exclude: [versionType.online],
			fn: function () {
				util.goToCentralAdmin('/_layouts/15/people.aspx?MembershipGroupId=3');
			}
		},
		{
			command: 'Central Admin: Security: Configure service accounts',
			exclude: [versionType.online],
			fn: function () {
				util.goToCentralAdmin('/_admin/FarmCredentialManagement.aspx');
			}
		},
		{
			command: 'Central Admin: General Application Settings',
			exclude: [versionType.online],
			fn: function () {
				util.goToCentralAdmin('/generalapplicationsettings.aspx');
			}
		},
		{
			command: 'Central Admin: General Application Settings: Configure send to connections',
			exclude: [versionType.online],
			fn: function () {
				util.goToCentralAdmin('/_admin/OfficialFileAdmin.aspx');
			}
		},
		{
			command: 'Central Admin: General Application Settings: Configure content deployment paths and jobs',
			exclude: [versionType.online],
			fn: function () {
				util.goToCentralAdmin('/_admin/Deployment.aspx');
			}
		},
		{
			command: 'Central Admin: General Application Settings: Manage form templates',
			exclude: [versionType.online],
			fn: function () {
				util.goToCentralAdmin('/_admin/ManageFormTemplates.aspx');
			}
		},
		{
			command: 'Central Admin: Configuration Wizards',
			exclude: [versionType.online],
			fn: function () {
				util.goToCentralAdmin('/configurationwizards.aspx');
			}
		},
		{
			command: 'Central Admin: System Settings',
			exclude: [versionType.online],
			fn: function () {
				util.goToCentralAdmin('/systemsettings.aspx');
			}
		},
		{
			command: 'Central Admin: System Settings: Manage servers in this farm',
			exclude: [versionType.online],
			fn: function () {
				util.goToCentralAdmin('/_admin/FarmServers.aspx');
			}
		},
		{
			command: 'Central Admin: System Settings: Manage services on server',
			exclude: [versionType.online],
			fn: function () {
				util.goToCentralAdmin('/_admin/Server.aspx');
			}
		},
		{
			command: 'Central Admin: System Settings: Manage farm features',
			exclude: [versionType.online],
			fn: function () {
				util.goToCentralAdmin('/_admin/ManageFarmFeatures.aspx');
			}
		},
		{
			command: 'Central Admin: System Settings: Configure alternate access mappings',
			exclude: [versionType.online],
			fn: function () {
				util.goToCentralAdmin('/_admin/AlternateUrlCollections.aspx');
			}
		},
		{
			command: 'Central Admin: Backup and Restore',
			exclude: [versionType.online],
			fn: function () {
				util.goToCentralAdmin('/backups.aspx');
			}
		},
		{
			command: 'Central Admin: Backup and Restore: Perform a backup',
			exclude: [versionType.online],
			fn: function () {
				util.goToCentralAdmin('/_admin/Backup.aspx');
			}
		},
		{
			command: 'Central Admin: Backup and Restore: Restore from a backup',
			exclude: [versionType.online],
			fn: function () {
				util.goToCentralAdmin('/_admin/BackupHistory.aspx?restore=1&amp;filter=1');
			}
		},
		{
			command: 'Central Admin: Backup and Restore: Perform a site collection backup',
			exclude: [versionType.online],
			fn: function () {
				util.goToCentralAdmin('/_admin/SiteCollectionBackup.aspx');
			}
		},
		{
			command: 'Central Admin: Upgrade and Migration',
			exclude: [versionType.online],
			fn: function () {
				util.goToCentralAdmin('/upgradeandmigration.aspx');
			}
		},
		{
			command: 'Central Admin: Upgrade and Migration: Convert farm license type',
			exclude: [versionType.online],
			fn: function () {
				util.goToCentralAdmin('/_admin/Conversion.aspx');
			}
		},
		{
			command: 'Central Admin: Upgrade and Migration: Check product and patch installation status',
			exclude: [versionType.online],
			fn: function () {
				util.goToCentralAdmin('/_admin/PatchStatus.aspx');
			}
		},
		{
			command: 'Central Admin: Upgrade and Migration: Check upgrade status',
			exclude: [versionType.online],
			fn: function () {
				util.goToCentralAdmin('/_admin/UpgradeStatus.aspx');
			}
		},
		{
			command: 'Central Admin: Apps',
			exclude: [versionType.online],
			fn: function () {
				util.goToCentralAdmin('/apps.aspx');
			}
		},
		{
			command: 'Central Admin: Apps: Manage App Catalog',
			exclude: [versionType.online],
			fn: function () {
				util.goToCentralAdmin('/_admin/ManageCorporateCatalog.aspx');
			}
		},
		{
			command: 'Central Admin: Apps: Manage App Licenses',
			exclude: [versionType.online],
			fn: function () {
				util.goToCentralAdmin('/_admin/CA_allapplicensesmanagement.aspx');
			}
		},
		{
			command: 'Central Admin: Apps: Monitor Apps',
			exclude: [versionType.online],
			fn: function () {
				util.goToCentralAdmin('/_layouts/15/MonitoredApps.aspx');
			}
		}
	]);

})(CP.Constants, CP.Util);
