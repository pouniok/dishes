Ext.define('Dishes.view.phone.Employees', {
    extend: 'Ext.Panel',
    requires: ['Dishes.store.Dishes', 'Ext.dataview.DataView'],

    config: {
        layout: {
            type: 'vbox',
            align: 'stretch'
        },
        items: [{
            xtype: 'panel',
            layout: {
                type: 'hbox',
                align: 'stretch'
            },
			height: 150,
            items: [{
				xtype: 'panel',
				height: 140,
				flex: 1,
				id: 'employee',
				data: {},
				tpl: '<div style="height: 110px; text-align: center;">' +
					'<tpl if=\"values.id == null\">' +
						'<span style="width: 100%; display: inline-block; height: 100px; font-size: 20px; padding-top: 30px; color: #CCC; line-height: 20px; text-align: center;">' +
						'Sélectionnez un employé...</span>' +
					'<tpl else>' +
						'<tpl if="values.picture == null"><span style="width: 80px; height: 80px; font-size: 80px; line-height: 80px;" class="fa-stack">' +
						'<i style="color: #333;" class="fa fa-circle fa-stack-1x"></i>' +
						'<i style="font-size: 40px; color: #EEE;" class="fa <tpl if=\"values.id == null\">fa-hand-pointer-o<tpl else>fa-user</tpl> fa-stack-1x"></i>' +
						'</span></tpl>' +
						'<tpl if="values.picture != null"><img style="border-radius: 50%;" src="ws.php?action=picture&employeeId={id}" width="80" height="80" /></tpl>' +
						'<div style="color: #333; height: 100%; font-size: 20px;"><b>{firstname}</b><br/><span style="color: #887251;">{lastname}</span></div>' +
					'</tpl>' +
					'</div>'
			},{
				xtype: 'panel',
				flex: 1,
				id: 'infobirth',
				style: 'text-align: center; color: #333; font-size: 20px;',
				data: {},
				tpl: '<img src="resources/images/cake.png" height="80" /><br/><span style="color: #887251;">{birthday:date("d/m/Y")}</span><br/>' +
					'<tpl if="values.ecart &gt; 0">J-{ecart}' +
					'<tpl elseif="values.ecart == undefined">&nbsp;' +
					'<tpl else><span style="color: #887251;">Joyeux</span><br/><b>Anniversaire</b></tpl>'
			}]
        },{
			xtype: 'list',
			store: Ext.create('Dishes.store.Dishes', {
				sorters: [{
					property : "date",
					direction: "DESC"
				}]
			}),
			flex: 1,
			id: 'listdishes',
			emptyText: 'Aucune donnée',
			inline: true,
			disableSelection: true,
			style: 'color: #333; font-size: 20px;',
			itemTpl: new Ext.XTemplate('<span style="width: 80px; font-size: 16px; padding-right: 10px;">{date:date("d/m")}</span>' +
					'<span style="width: 80px; padding: 0 10px;">{couverts} <i style="color: #DDD;" class="fa fa-cutlery" aria-hidden="true"></i></span>' +
					'<span style="width: 80px; padding: 0 10px;">{boites} <i style="color: #DDD;" class="fa fa-archive" aria-hidden="true"></i></span>' +
					'<span style="width: 80px; padding: 0 10px;">{cafes} <i style="color: #DDD;" class="fa fa-coffee" aria-hidden="true"></i></span>' +
					'<span style="width: 80px; padding: 0 10px;">{verres} <i style="color: #DDD;" class="fa fa-glass" aria-hidden="true"></i></span>' +
					'<span style="width: 80px; text-align: right;"><span style="font-size: 20px; color: #887251;"><b>{note}</b></span></span>')
		},{
			xtype: 'dataview',
			mode: 'SINGLE',
			selectedCls: 'employee-selected',
			id: 'employeeselection',
			inline: {
				wrap: false
			},
			style: 'border-top: 1px solid #CCC;',
			store: Ext.create('Dishes.store.Employee', {
				load: function(){
					if (Ext.getCmp('employeeselection')) {
						Ext.getCmp('employeeselection').select(0);
					}
				}
			}),
			height: 100,
			scrollable: {
				direction: 'horizontal',
				directionLock: true
			},
			itemTpl: '<div class="present-item" style="cursor: pointer; margin: 5px; margin-top: 10px;">' +
				'<tpl if="values.picture != null"><img style="border-radius: 50%;" src="ws.php?action=picture&employeeId={id}" width="50" height="50" /></tpl>' +
				'<tpl if="values.picture == null"><span style="width: 50px; height: 50px; font-size: 50px; line-height: 50px;" class="fa-stack">' +
				'<i style="color: #333;" class="fa fa-circle fa-stack-1x"></i>' +
				'<i style="font-size: 26px; color: #EEE;" class="fa fa-user fa-stack-1x"></i>' +
				'</span></tpl><br/>' +
				'{firstname}<br/>{lastname}</div>',
			listeners: {
				select: function(dv, rec) {
					var d = rec.data;
					
					var dob = new Date(d.birthday);
					var now = new Date();
					dob.setFullYear(now.getFullYear());
					var ecart = Ext.Date.diff(now, dob, Ext.Date.DAY) + 1;
					if (ecart < 0) {
						ecart = Ext.Date.diff(now, dob.setFullYear(dob.getFullYear()+1), Ext.Date.DAY) + 1;
					}
					d.ecart = ecart;
					
					Ext.getCmp('employee').setData(d);
					Ext.getCmp('infobirth').setData(d);
					
					var s = Ext.getCmp('listdishes').getStore();
					s.setParams({employeeId: d.id});
					s.load();
				}
			}
        }]
    }
});