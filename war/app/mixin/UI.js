Ext.define('GreenFleet.mixin.UI', {
	addDockingNav : function(view, config) {
		var defaults = {
			tabConfig : {
				width : 29,
				height : 22,
				padding : '0 0 0 2px'
			}
		};

		try {
			Ext.getCmp('docked_nav').add(Ext.create(view, Ext.merge(defaults, config)));
		} catch (e) {
			console.log(e);
			console.trace();
		}
	},

	addSystemMenu : function(view, config) {
		try {
			var system_menu = Ext.getCmp('system_menu');
			var menu = Ext.create(view, config);

			system_menu.insert(0, menu);

			var width = 6; // TODO should be more systemic.

			system_menu.items.each(function(el) {
				width += el.getWidth();
			});

			system_menu.setSize(width, system_menu.getHeight());
		} catch (e) {
			// console.log(e);
		}
	},

	addContentView : function(view) {
		this.showBusy();
		var comp;

		if (typeof (view) === 'string') {
			comp = Ext.create(view, {
				closable : true
			});
		} else {
			comp = view;
		}
		
		Ext.getCmp('content').add(comp).show();
		
		this.clearStatus();
	},

	setStatus : function(state) {
		Ext.getCmp('statusbar').setStatus(state);
	},

	showBusy : function(o) {
		Ext.getCmp('statusbar').showBusy(o);
	},

	clearStatus : function() {
		Ext.getCmp('statusbar').clearStatus();
	},

	doMenu : function(menu) {
		if (menu.viewModel) {
			Ext.require(menu.viewModel, function() {
				GreenFleet.addContentView(Ext.create(menu.viewModel, {
					title : menu.text,
					tabConfig : {
						tooltip : menu.tooltip
					},
					closable : true
				}));
			});
		} else {
			GreenFleet.status.set({
				text : 'View Not Found!',
				iconCls : 'x-status-error',
				clear : true
			// auto-clear after a set interval
			});
		}
	}
});
