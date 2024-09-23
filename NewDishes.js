Ext.define('Dishes.view.NewDishes', {
    extend: 'Ext.Panel',
    requires: ['Dishes.store.Employee', 'Ext.dataview.DataView', 'Ext.Toast'],

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
            flex: 1,
            items: [{
                width: 300,
                html: '<div style="color: #CCC; font-size: 36px;">' +
						'<div style="float: left; text-align: right; margin: 20px; margin-left: 70px;">Vaisselle<br/>faite par </div>' +
                    '<i style="float: right; margin-top: 45px;" class="fa fa-long-arrow-right" aria-hidden="true"></i>' +
                    '</div>',
            }, {
                xtype: 'panel',
                flex: 1,
				id: 'disher',
                data: {},
                tpl: '<div style="cursor: pointer; height: 110px; padding-top: 20px; ">' +
                    '<tpl if=\"values.id == null\">' +
						'<span style="width: 100%; height: 100px; font-size: 100px; line-height: 100px; text-align: center;" class="fa-stack">' +
						'<i style="color: #DDD;" class="fa fa-circle-thin fa-stack-1x"></i>' +
						'<i style="font-size: 40px; color: #DDD;" class="fa fa-hand-pointer-o fa-stack-1x" aria-hidden="true"></i>' +
						'</span>' +
                    '<tpl else>' +
						'<tpl if="values.picture == null"><span style="float: left; margin-left: 50px;  width: 100px; height: 100px; font-size: 100px; line-height: 100px;" class="fa-stack">' +
						'<i style="color: #333;" class="fa fa-circle fa-stack-1x"></i>' +
						'<i style="font-size: 40px; color: #EEE;" class="fa <tpl if=\"values.id == null\">fa-hand-pointer-o<tpl else>fa-user</tpl> fa-stack-1x"></i>' +
						'</span></tpl>' +
						'<tpl if="values.picture != null"><img style="float: left; margin-left: 50px; border-radius: 50%;" src="ws.php?action=picture&employeeId={id}" width="100" height="100" /></tpl>' +
						'<div style="color: #333; margin-left: 20px; margin-top: 10px; float: left; height: 100%; font-size: 40px;"><b>{firstname}</b><br/><span style="color: #887251;">{lastname}</span></div>' +
                    '</tpl>' +
                    '</div>',
                listeners: {
                    tap: {
                        element: 'element',
                        fn: function() {
                            if (this.popover == null) {
                                this.popover = Ext.create('Ext.Panel', {
                                    left: 0,
                                    top: 0,
                                    modal: true,
                                    cls: Ext.baseCSSPrefix + 'select-overlay',
                                    layout: 'fit',
                                    hideOnMaskTap: true,
                                    width: 300,
                                    height: '22em',
                                    items: {
                                        xtype: 'list',
                                        store: Ext.create('Dishes.store.Employee'),
                                        itemTpl: '<div style="cursor: pointer; height: 50px;">' +
                                            '<tpl if="values.picture == null"><span style="float: left; width: 40px; height: 40px; font-size: 40px; line-height: 40px;" class="fa-stack">' +
                                            '<i style="color: #333;" class="fa fa-circle fa-stack-1x"></i>' +
                                            '<i style="font-size: 20px; color: #EEE;" class="fa fa-user fa-stack-1x"></i>' +
                                            '</span></tpl>' +
                                            '<tpl if="values.picture != null"><img style="float: left; border-radius: 50%;" src="ws.php?action=picture&employeeId={id}" width="40" height="40" /></tpl>' +
                                            '<div style="color: #333; margin-left: 20px; float: left; height: 100%; font-size: 20px;"><b>{firstname}</b><br/><span style="color: #887251;">{lastname}</span></div></div>',
                                        listeners: {
                                            scope: this,
                                            select: function(l, r) {
                                                this.setData(r.data);
                                                this.popover.hide();
                                            },
                                            itemtap: Ext.emptyFn,
                                            scope: this
                                        }
                                    }
                                });
                            }
                            this.popover.showBy(this, 'tc-cc');
                        }
                    }
                }
            },{
                width: 150,
                tpl: '<div style="float: right; width: 120px; margin-right: 40px; text-align: center; margin-top: 10px;">' +
                    '<div style="border-top-left-radius: 10px; border-top-right-radius: 10px; color: white; background-color: #887251; padding: 10px;">{month}</div>' +
                    '<div style="border: 3px solid #887251; border-top: 0; border-bottom-left-radius: 10px; border-bottom-right-radius: 10px; line-height: 16px; padding: 10px; padding-top: 20px; font-size: 40px; color: #333;">' +
                    '<b>{date}</b><br/><span style="font-size: 14px;">{year}</span></div>' +
                    '</div>',
                data: {
                    year: new Date().getFullYear(),
                    month: 'Janvier,Février,Mars,Avril,Mai,Juin,Juillet,Août,Septembre,Octobre,Novembre,Décembre'.split(',')[new Date().getMonth()],
                    date: new Date().getDate()
                }
            }]
        }, {
            xtype: 'panel',
            layout: {
                type: 'hbox',
                align: 'stretch'
            },
            flex: 2,
            items: [{
                xtype: 'dataview',
				id: 'absents',
                allowDeselect: true,
                mode: 'MULTI',
                selectedCls: 'selected',
                inline: true,
                store: Ext.create('Dishes.store.Employee'),
                flex: 1,
                items: [{
                    xtype: 'toolbar',
                    docked: 'top',
                    title: 'Personnes présentes',
                }],
                itemTpl: '<div class="present-item" style="margin: 5px; cursor: pointer;">' +
                    '<tpl if="values.picture != null"><img style="border-radius: 50%;" src="ws.php?action=picture&employeeId={id}" width="50" height="50" /></tpl>' +
                    '<tpl if="values.picture == null"><span style="width: 50px; height: 50px; font-size: 50px; line-height: 50px;" class="fa-stack">' +
                    '<i style="color: #333;" class="fa fa-circle fa-stack-1x"></i>' +
                    '<i style="font-size: 26px; color: #EEE;" class="fa fa-user fa-stack-1x"></i>' +
                    '</span></tpl><br/>' +
                    '{firstname}<br/>{lastname}</div>',
                listeners: {
                    initialize: function(dv) {
                        dv.getStore().on('load', function(s) {
                            var total = s.getCount();
                            dv.down('toolbar').setTitle(Ext.String.format('Personnes présentes : {0}/{1}', total, total));
                        });
                    },
                    selectionchange: function(dv, recs) {
                        var total = dv.getStore().getCount();
                        var abs = dv.getSelectionCount();
                        var pres = total - abs;
                        dv.down('toolbar').setTitle(Ext.String.format('Personnes présentes : {0}/{1}', pres, total));
                    },
                    updatedata: function(dv, data) {
                        var total = dv.getStore().getCount();
                        dv.down('toolbar').setTitle(Ext.String.format('Personnes présentes : {0}/{1}', total, total));
                    }
                }
            },{
				xtype: 'panel',
				layout: {
					type: 'vbox',
					align: 'stretch'
				},
				flex: 1,
				items: [{
					xtype: 'panel',
					flex: 1,
					layout: {
						type: 'hbox'
					},
					items: [{
						xtype: 'panel',
						layout: {
							type: 'vbox',
							align: 'center',
							pack: 'center'
						},
						flex: 1,
						items: [{
							xtype: 'button',
							text: '<i style="color: #CCC;" class="fa fa-chevron-up fa-2x" aria-hidden="true"></i>',
							height: 100,
							handler: function(b){
								var p = b.up('panel').down('panel');
								p.config.plus(p);
							}
						},{
							xtype: 'panel',
							id: 'couverts',
							tpl: '<span style="color: #333; font-size: 50px; padding-right: 10px;">{couverts}</span> <i style="color: #CCC;" class="fa fa-cutlery fa-2x" aria-hidden="true"></i>',
							data: {couverts: 0},
							plus: function(p){
								var d = p.getData();
								d.couverts++;
								p.setData(d);
							},
							minus: function(p){
								var d = p.getData();
								if ((d.couverts - 1) >= 0) {
									d.couverts--;
								}
								p.setData(d);
							},
							height: 50
						},{
							xtype: 'button',
							text: '<i style="color: #CCC;" class="fa fa-chevron-down fa-2x" aria-hidden="true"></i>',
							height: 100,
							handler: function(b){
								var p = b.up('panel').down('panel');
								p.config.minus(p);
							}
						}]
					},{
						xtype: 'panel',
						layout: {
							type: 'vbox',
							align: 'center',
							pack: 'center'
						},
						flex: 1,
						items: [{
							xtype: 'button',
							text: '<i style="color: #CCC;" class="fa fa-chevron-up fa-2x" aria-hidden="true"></i>',
							height: 100,
							handler: function(b){
								var p = b.up('panel').down('panel');
								p.config.plus(p);
							}
						},{
							xtype: 'panel',
							id: 'boites',
							tpl: '<span style="color: #333; font-size: 50px; padding-right: 10px;">{boites}</span> <i style="color: #CCC;" class="fa fa-archive fa-2x" aria-hidden="true"></i>',
							data: {boites: 0},
							plus: function(p){
								var d = p.getData();
								d.boites++;
								p.setData(d);
							},
							minus: function(p){
								var d = p.getData();
								if ((d.boites - 1) >= 0) {
									d.boites--;
								}
								p.setData(d);
							},
							height: 50
						},{
							xtype: 'button',
							text: '<i style="color: #CCC;" class="fa fa-chevron-down fa-2x" aria-hidden="true"></i>',
							height: 100,
							handler: function(b){
								var p = b.up('panel').down('panel');
								p.config.minus(p);
							}
						}]
					},{
						xtype: 'panel',
						layout: {
							type: 'vbox',
							align: 'center',
							pack: 'center'
						},
						flex: 1,
						items: [{
							xtype: 'button',
							text: '<i style="color: #CCC;" class="fa fa-chevron-up fa-2x" aria-hidden="true"></i>',
							height: 100,
							handler: function(b){
								var p = b.up('panel').down('panel');
								p.config.plus(p);
							}
						},{
							xtype: 'panel',
							id: 'cafes',
							tpl: '<span style="color: #333; font-size: 50px; padding-right: 10px;">{cafes}</span> <i style="color: #CCC;" class="fa fa-coffee fa-2x" aria-hidden="true"></i>',
							data: {cafes: 0},
							plus: function(p){
								var d = p.getData();
								d.cafes++;
								p.setData(d);
							},
							minus: function(p){
								var d = p.getData();
								if ((d.cafes - 1) >= 0) {
									d.cafes--;
								}
								p.setData(d);
							},
							height: 50
						},{
							xtype: 'button',
							text: '<i style="color: #CCC;" class="fa fa-chevron-down fa-2x" aria-hidden="true"></i>',
							height: 100,
							handler: function(b){
								var p = b.up('panel').down('panel');
								p.config.minus(p);
							}
						}]
					},{
						xtype: 'panel',
						layout: {
							type: 'vbox',
							align: 'center',
							pack: 'center'
						},
						flex: 1,
						items: [{
							xtype: 'button',
							text: '<i style="color: #CCC;" class="fa fa-chevron-up fa-2x" aria-hidden="true"></i>',
							height: 100,
							handler: function(b){
								var p = b.up('panel').down('panel');
								p.config.plus(p);
							}
						},{
							xtype: 'panel',
							id: 'verres',
							tpl: '<span style="color: #333; font-size: 50px; padding-right: 10px;">{verres}</span> <i style="color: #CCC;" class="fa fa-glass fa-2x" aria-hidden="true"></i>',
							data: {verres: 0},
							plus: function(p){
								var d = p.getData();
								d.verres++;
								p.setData(d);
							},
							minus: function(p){
								var d = p.getData();
								if ((d.verres - 1) >= 0) {
									d.verres--;
								}
								p.setData(d);
							},
							height: 50
						},{
							xtype: 'button',
							text: '<i style="color: #CCC;" class="fa fa-chevron-down fa-2x" aria-hidden="true"></i>',
							height: 100,
							handler: function(b){
								var p = b.up('panel').down('panel');
								p.config.minus(p);
							}
						}]
					}]
				},{
					xtype: 'toolbar',
					height: 80,
					items: [{
						xtype: 'spacer'
					},{
						xtype: 'button',
						height: 50,
						width: 100,
						iconCls: 'fa-chain-broken',
						style: 'background-color: #FFF; border: 1px solid #887251; color: #887251;',
						handler: function(b){
							var disher = Ext.getCmp('disher');
								
							var params = {
								action: 'broken',
								employeeId: disher.getData().id
							};
								
							if (!params.employeeId) {
								Ext.toast('Il faut renseigner la personne !');
							}
							else {
								Ext.Msg.confirm('Déclarer une casse ?', 'Ceci entrainera une perte de points aléatoire', function(btn){
									if (btn == 'yes') {
										Ext.Ajax.request({
											url: 'ws.php',
											params: params,
											success: function(response){
												var res = Ext.decode(response.responseText).result;
												
												Ext.toast({
													message: '<i class="fa fa-chain-broken" aria-hidden="true"></i>',
													cls: 'toast-error',
													isComponent: true
												});
												Ext.toast({
													message: '-'+res.lost,
													isComponent: true,
													timeout: 1500
												});
												Ext.toast({
													message: res.newNote,
													isComponent: true
												});
												
												disher.setData({});
												
												Ext.getCmp('main').down('list').getStore().load();
											}
										});
									}
								});
							}
						}
					},{
						xtype: 'button',
						height: 50,
						width: 100,
						iconCls: 'fa-check',
						style: 'background-color: #887251; color: #FFF; margin-right: 40px;',
						handler: function(b){
							var disher = Ext.getCmp('disher'),
								absList = Ext.getCmp('absents'),
								absents = [],
								couverts = Ext.getCmp('couverts'),
								boites = Ext.getCmp('boites'),
								cafes = Ext.getCmp('cafes'),
								verres = Ext.getCmp('verres');
								
							absList.getSelection().forEach(function(element){
								absents.push(element.raw.id);
							});
								
							var params = Ext.Object.merge({
								action: 'savedishes',
								absents: absents.join(),
								employe: disher.getData().id
							}, couverts.getData(),  boites.getData(), cafes.getData(), verres.getData());
														
							
							if (!params.employe) {
								Ext.toast('Certains éléments ne sont pas renseignés !');
							}
							else {
								Ext.Msg.confirm('', 'Valider la vaisselle ?', function(btn){
									if (btn == 'yes') {
										Ext.Ajax.request({
											url: 'ws.php',
											params: params,
											success: function(response){
												Ext.toast({
													message: '<i class="fa fa-thumbs-o-up" aria-hidden="true"></i>',
													cls: 'toast-success',
													isComponent: true
												});
												Ext.toast({
													message: Ext.decode(response.responseText).result.note,
													cls: 'toast-success',
													isComponent: true
												});
												
												disher.setData({});
												couverts.setData({couverts: 0});
												boites.setData({boites: 0});
												cafes.setData({cafes: 0});
												verres.setData({verres: 0});
												absList.deselectAll();
												
												Ext.getCmp('main').down('list').getStore().load();
											}
										});
									}
								});
							}
						}
					}]
				}]
			}]
        }]
    }
});