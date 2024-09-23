Ext.define('Dishes.view.Rules', {
    extend: 'Ext.Panel',
    requires: ['Dishes.store.Dishes', 'Ext.dataview.DataView', 'Dishes.view.draw.Draw'],

    config: {
        layout: {
            type: 'hbox',
            align: 'stretch'
        },
        items: [{
			xtype: 'panel',
			cls: 'paper',
			padding: 20,
			html: '<h1>Règlement<h1>'+ 
				'<h2>1. Calcul des points de vaisselle</h2>'+
				'<p>Le calcul des points ...</p>',
			flex: 1
		},{
			xtype: 'dataview',
			mode: 'SINGLE',
			selectedCls: 'employee-selected',
			store: Ext.create('Dishes.store.Employee'),
			style: 'border-left: 1px solid #CCC;',
			width: 300,
			scrollable: {
				direction: 'vertical',
				directionLock: true
			},
			itemTpl: '<div style="cursor: pointer; margin: 5px; margin-right: 15px; height: 60px; text-align: right; border-bottom: 1px solid #EEE;">' +
						'<tpl if="values.picture == null"><span style="float: right;  width: 50px; height: 50px; font-size: 50px; line-height: 50px;" class="fa-stack">' +
						'<i style="color: #333;" class="fa fa-circle fa-stack-1x"></i>' +
						'<i style="font-size: 26px; color: #EEE;" class="fa fa-user fa-stack-1x"></i>' +
						'</span></tpl>' +
						'<tpl if="values.picture != null"><img style="float: right; margin-left: 10px; border-radius: 50%;" src="ws.php?action=picture&employeeId={id}" width="50" height="50" /></tpl>' +
						'<div style="color: #333; margin-left: 10px; float: right; font-size: 20px;"><b>{firstname}</b> <span style="color: #887251;">{lastname}</span><br/>'+
						'<tpl if="values.signature != \'\'"><span style="font-size: 14px;"><i class="fa fa-check" aria-hidden="true"></i> <i>Signé le {signature_date:date("d/m/Y")}</i></span>'+
						'<tpl else><span style="font-size: 14px; color: #F46660;"><i class="fa fa-times" aria-hidden="true"></i> <i>Règlement non signé</i></span></tpl></div>' +
					'</div>',
			listeners: {
				select: function(dv, rec) {
					var pan = Ext.create('Ext.Panel', {
						layout: 'fit',
						items: [{
							xtype: 'toolbar',
							docked: 'top',
							title: 'Signature'
						},{
							xtype: 'toolbar',
							docked: 'bottom',
							layout: {
								type: 'hbox',
								align: 'stretch'
							},
							items: [{
								text: 'Refuser', 
								flex: 1,
								handler: function(b){
									pan.destroy();
								}
							},{
								text: 'Accepter', 
								flex: 1,
								handler: function(b){
									b.disable();
									
									if (dv.canvas) {
										var signature = dv.canvas.toDataURL({format: 'png'});
										
										Ext.Ajax.request({
											url: 'ws.php',
											params: {
												action: 'signature',
												employeeId: rec.get('id'),
												signature: signature
											},
											success: function(response){
												pan.destroy();
												var res = Ext.decode(response.responseText).result;
												
												Ext.toast({
													message: '<i class="fa fa-file-o fa-2x" aria-hidden="true"></i>',
													cls: 'toast-birthday',
													isComponent: true
												});
												Ext.toast({
													message: '<img width="100%" src="'+signature+'"/>',
													isComponent: true,
													timeout: 1000
												});
												
												dv.getStore().load();
											}
										});
									}
								}
							}]
						},{
							xtype: 'panel',
							html: '<canvas width="500" height="200" id="signature"></canvas>',
							listeners: {
								painted: function(e){
									if (rec.get('signature') != null && rec.get('signature') != '') {
										this.setHtml('<img src="'+rec.get('signature')+'" width="500" height="200" />');
									} 
									else {
										var canvas = new fabric.Canvas('signature');
										canvas.isDrawingMode = true;
										canvas.freeDrawingBrush.width = 3;
										canvas.freeDrawingBrush.color = "#887251";
										dv.canvas = canvas;
									}
								}
							}
						}],
						scrollable: false,
						width: 500,
						height: 300,
						centered: true,
						modal: true
					});
					Ext.Viewport.add(pan);
					pan.show('pop');
				}
			}
		}]
    }
});