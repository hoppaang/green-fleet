/*
Copyright(c) 2011 HeartyOh.com
*/
Ext.define('GreenFleet.mixin.Msg', function(){
	var msgCt;

	function createBox(t, s) {
		return '<div class="msg"><h3>' + t + '</h3><p>' + s + '</p></div>';
	}
	
	function showMessage(t, s) {
		if (!msgCt) {
			msgCt = Ext.core.DomHelper.insertFirst(document.body, {
				id : 'msg-div'
			}, true);
		}
		var s = Ext.String.format.apply(String, Array.prototype.slice.call(arguments, 1));
		var m = Ext.core.DomHelper.append(msgCt, createBox(t, s), true);
		m.hide();
		m.slideIn('t').ghost("t", {
			delay : 1000,
			remove : true
		});
	}

	return {
		msg : showMessage
	};
}());

Ext.define('GreenFleet.mixin.User', function() {
	var current_user = login.username;

	function currentUser(user) {
		if (user !== undefined)
			current_user = user;
		return current_user;
	}

	return {
		login : {
			id : currentUser,
			name : currentUser
		}
	};
}());
Ext.define('GreenFleet.mixin.Mixin', {
	mixin : function(clazz, config) {
		try {
			switch (typeof (clazz)) {
			case 'string':
				Ext.apply(Ignite, Ext.create(clazz, config));
				return;
			case 'object':
				Ext.apply(Ignite, clazz);
			}
		} catch (e) {
			console.log(e.stack);
		}
	}
});
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

Ext.define('GreenFleet.view.Viewport', {
	extend : 'Ext.container.Viewport',

	layout : 'border',

	defaults : {
		split : false,
		collapsible : false
	},

	items : [ {
		xtype : 'viewport.north',
		region : 'north',
		height : 48
	}, {
		xtype : 'viewport.west',
		region : 'west',
		width : 70
	}, {
		xtype : 'viewport.center',
		region : 'center'
	} ]
});

Ext.define('GreenFleet.controller.ApplicationController', {
	extend: 'Ext.app.Controller'
});
Ext.define('GreenFleet.view.viewport.Center', {

	extend : 'Ext.tab.Panel',

	id : 'content',

	alias : 'widget.viewport.center',
	
	items : [{
		xtype : 'obd',
		closable : false
	}]
});
Ext.define('GreenFleet.view.viewport.North', {
	extend : 'Ext.panel.Panel',

	alias : 'widget.viewport.north',

	layout : {
		type : 'hbox',
		align : 'stretch'
	},
	
	items : [ {
		xtype : 'brand',
		width : 100
	}, {
		xtype : 'main_menu',
		flex : 1
	}, {
		xtype : 'system_menu',
		width : 130
	} ]
});
Ext.define('GreenFleet.view.viewport.West', {
	extend : 'Ext.panel.Panel',

	alias : 'widget.viewport.west'
});
Ext.define('GreenFleet.view.Brand', {
	extend : 'Ext.panel.Panel',
	
	alias : 'widget.brand',
	
	html : '<h1>Green Fleet</h1>'
});
Ext.create('Ext.data.Store', {
    id:'menustore',

    fields : [{
    	name : 'text'
    }],

	data : [ {
		text : 'Vehicle'
	}, {
		text : 'Employees'
	}, {
		text : 'Allocation'
	}, {
		text : 'Incidents'
	}, {
		text : 'Maintenance'
	}, {
		text : 'Risk Assessment'
	}, {
		text : 'Purchase Order'
	} ],

});

//Ext.define('GreenFleet.view.MainMenu', {
//	extend : 'Ext.view.View',
//
//	alias : 'widget.main_menu',
//	
//	store : Ext.data.StoreManager.lookup('menustore'),
//
//	itemSelector : 'div.mainmenu',
//	
//	tpl : '<tpl for="."><div class="mainmenu"><span>{text}</span></div></tpl>'
//
//});

Ext.define('GreenFleet.view.MainMenu', {
	extend : 'Ext.toolbar.Toolbar',

	alias : 'widget.main_menu',
	
	items : [{
		text : 'Vehicle'
	}, {
		text : 'Employees'
	}, {
		text : 'Allocation'
	}, {
		text : 'Incidents'
	}, {
		text : 'Maintenance'
	}, {
		text : 'Risk Assessment'
	}, {
		text : 'Purchase Order'
	}]
});
Ext.define('GreenFleet.view.SystemMenu', {
	extend : 'Ext.toolbar.Toolbar',

	alias : 'widget.system_menu',

	items : [ {
		type : 'help',
		text : 'help',
		handler : function() {
		}
	}, {
		itemId : 'refresh',
		type : 'refresh',
		text : 'refresh',
		handler : function() {
		}
	}, {
		type : 'search',
		text : 'search',
		handler : function(event, target, owner, tool) {
		}
	} ]
});
Ext.define('GreenFleet.view.vehicle.OBDCollector', {
	extend : 'Ext.form.Panel',
	
	alias : 'widget.obd',
	
	title : 'Collection OBD Information',
	
//    url: 'obd',

    layout: 'anchor',
    defaults: {
        anchor: '100%'
    },
    
    items : [{
		xtype : 'textfield',
		name : 'vehicle',
		fieldLabel : 'Vehicle',
		value : '1234567890'
	}, {
		xtype : 'textfield',
		name : 'speed',
		fieldLabel : 'Speed',
		value : 120
	}, {
		xtype : 'textfield',
		name : 'gas',
		fieldLabel : 'Gas',
		value : 65
	}, {
		xtype : 'textfield',
		name : 'tirePressure',
		fieldLabel : 'Tire Pressure',
		value : 23
	}, {
		xtype : 'textfield',
		name : 'longitude',
		fieldLabel : 'Longitude',
		value : '126°58\'40.63"E'
	}, {
		xtype : 'textfield',
		name : 'latitude',
		fieldLabel : 'Latitude',
		value : '37°33\'58.87"N'
	}],
	
    buttons: [{
        text: 'Reset',
        handler: function() {
            this.up('form').getForm().reset();
        }
    }, {
        text: 'Submit',
        formBind: true, //only enabled once the form is valid
        disabled: true,
        handler: function() {
            var form = this.up('form').getForm();
            console.log(form);
            if (form.isValid()) {
                form.submit({
                	url : 'obd',
                    success: function(form, action) {
                       GreenFleet.msg('Success', action.result.msg);
                    },
                    failure: function(form, action) {
                        GreenFleet.msg('Failed', action.result.msg);
                    }
                });
            }
        }
    }]
});

Ext.define('GreenFleet.controller.FrameController', {
	extend : 'Ext.app.Controller',

	stores : [],
	models : [],
	views : [ 'viewport.Center', 'viewport.North', 'viewport.West', 'Brand', 'MainMenu', 'SystemMenu' ],

	init : function() {
		this.control({
			'viewport' : {
				afterrender : this.onViewportRendered
			}
		});

		// GreenFleet.mixin('GreenFleet.mixin.Selector');
	},

	onViewportRendered : function() {
	}

});
Ext.define('GreenFleet.controller.VehicleController', {
	extend : 'Ext.app.Controller',

	stores : [],
	models : [],
	views : [ 'vehicle.OBDCollector' ],

	init : function() {
		this.control({
			'viewport' : {
				afterrender : this.onViewportRendered
			}
		});

		// GreenFleet.mixin('GreenFleet.mixin.Selector');
	},

	onViewportRendered : function() {
	}

});


