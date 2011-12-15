Ext.define('GreenFleet.view.viewport.Center', {

	extend : 'Ext.tab.Panel',

	id : 'content',

	alias : 'widget.viewport.center',
	
	items : [{
		xtype : 'obd',
		closable : false
	}]
});