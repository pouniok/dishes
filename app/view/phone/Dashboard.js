Ext.define('Dishes.view.phone.Dashboard', {
    extend: 'Ext.Panel',
	requires: ['Ext.dataview.List', 'Dishes.store.Ranking', 'Ext.XTemplate', 'Ext.plugin.PullRefresh'],
	
    config: {
  		layout: {
  			type: 'vbox',
  			align: 'stretch'
  		},
		items: [{
			xtype: 'list',
			id: 'rankings',
			store: Ext.create('Dishes.store.Ranking', {
				sorters: [{
					property : "rank",
					direction: "ASC"
				}],
				listeners: {
					load: function(s){
						if (s.getCount() > 0) {
							var losers = s.queryBy(function(rec){
								return rec.get('presence') > 20;
							});
							
							s.each(function(rec){
								var rank = rec.get('rank');
								
								if (rank == 1) {
									rec.set('icon', ' <i class="fa fa-trophy" style="color: #ffd454;" aria-hidden="true"></i>');
								}
								else if (rank == 2) {
									rec.set('icon', ' <i class="fa fa-trophy" style="color: #BDBDBD;" aria-hidden="true"></i>');
								}
								else if (rank == 3) {
									rec.set('icon', ' <i class="fa fa-trophy" style="color: rgb(165, 145, 78);" aria-hidden="true"></i>');
								}
								else if (losers.getCount() > 0 && rank == losers.last().get('rank')) {
									rec.set('icon', ' <i class="fa fa-frown-o" style="color: #f46660;" aria-hidden="true"></i>');
								}
								else {
									rec.set('icon', '&nbsp;');
								}
							});
						}
					}
				}
			}),
			flex: 1,
			getMonth: function(num){
				var months = 'Janvier,Février,Mars,Avril,Mai,Juin,Juillet,Août,Septembre,Octobre,Novembre,Décembre';
				return months.split(',')[num];
			},
			emptyText: 'Aucune donnée',
			currentDate: new Date(),
			setCurrentDate: function(me, date){
				me.down('toolbar').setTitle('<b>'+me.config.getMonth(date.getMonth())+'</b> <span style="color: #887251">'+(date.getFullYear())+'</span>');
				me.config.currentDate = date;
				me.getStore().setParams({date: Ext.util.Format.date(date, 'Y-m-d')});
				me.getStore().load();
			},
			items: [{
				xtype: 'toolbar',
				docked: 'top',
				title: '<b>'+('Janvier,Février,Mars,Avril,Mai,Juin,Juillet,Août,Septembre,Octobre,Novembre,Décembre'.split(',')[new Date().getMonth()])+
							'</b> <span style="color: #887251">'+(new Date().getFullYear())+'</span>',
				items: [{
					xtype: 'button',
					style: 'color: #CCC;',
					iconCls: 'fa-chevron-left',
					handler: function(b){
						var l = b.up('list');
						var newDate = Ext.Date.add(l.config.currentDate, Ext.Date.MONTH, -1);
						l.config.setCurrentDate(l, newDate);
					}
				},{
					xtype: 'spacer'
				},{
					xtype: 'button',
					style: 'color: #CCC;',
					iconCls: 'fa-chevron-right',
					handler: function(b){
						var l = b.up('list');
						var newDate = Ext.Date.add(l.config.currentDate, Ext.Date.MONTH, 1);
						l.config.setCurrentDate(l, newDate);
					}
				}]
			}],
			inline: true,
			disableSelection: true,
			plugins: [{
				xclass: 'Ext.plugin.PullRefresh',
				pullText: 'Recharger',
				lastUpdatedDateFormat: 'd/m/Y H:i',
				lastUpdatedText: 'Dernière mise à jour ',
				loadedText: 'Terminé',
				loadingText: 'Chargement...',
				pullText: 'Tirez pour recharger...',
				releaseText: 'Lachez pour recharger...'
			}],
			style: 'font-size: 16px; line-height: 20px; color: #333; text-align: center;',
			itemTpl: new Ext.XTemplate('<div style="float: left; width: 20px; font-size: 20px; color: #DDD;">{rank}<br/>{icon}</div>' +
					'<div style="float: left; width: 60px;">' +
					'<tpl if="values.picture != null"><img style="border-radius: 50%;" src="ws.php?action=picture&employeeId={id}" width="40" height="40" /></tpl>' +
						'<tpl if="values.picture == null"><span style="width: 40px; height: 40px;" class="fa-stack">' +
						'<i style="color: #333; font-size: 40px;" class="fa fa-circle fa-stack-1x"></i>' +
						'<i style="font-size: 26px; color: #EEE;" class="fa fa-user fa-stack-1x"></i>' +
					'</span></tpl></div>' +
					'<div style="float: left; text-align: left;"><b>{firstname}</b> <span style="color:#887251;">{lastname}</span><br/>' +
						'<span style="padding: 0 10px 0 0;">{couverts} <i style="color: #DDD;" class="fa fa-cutlery" aria-hidden="true"></i></span>' +
						'<span style="padding: 0 10px;">{boites} <i style="color: #DDD;" class="fa fa-archive" aria-hidden="true"></i></span>' +
						'<span style="padding: 0 10px;">{cafes} <i style="color: #DDD;" class="fa fa-coffee" aria-hidden="true"></i></span><br/>' +
						'<span style="padding: 0 10px 0 0;">{verres} <i style="color: #DDD;" class="fa fa-glass" aria-hidden="true"></i></span>' +
						'<span style="padding: 0 10px;">{presence}% <i style="color: #DDD;" class="fa fa-users" aria-hidden="true"></i></span>' +
					'</div>'+
					'<div style="float: right; width: 50px; text-align: right; padding-top: 20px;">'+
						'<tpl if="values.rank == 1"><span style="width: 40px; height: 40px; position: absolute; right: 10px; top: 20px;" class="fa-stack">' +
							'<i style="color: #887251; font-size: 40px;" class="fa fa-certificate fa-stack-1x"></i>' +
							'<i style="font-size: 20px; color: #EEE;" class="fa-stack-1x">{note_pondere}</i>' +
						'</span>'+
						'<tpl else><span style="font-size: 20px; color: #887251;">{note_pondere}</span>'+
						'</tpl>'+
					'</div>')
  		}]
    }
});
