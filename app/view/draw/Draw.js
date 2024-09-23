Ext.define('Dishes.view.draw.Draw', {
	extend: 'Ext.draw.Component',
	config: {
		background: 'white',
		listeners: {
			element: 'element',
			'drag': function (e) {
				var me = this;
				if (me.sprite) {
					var p = e.touches[0].point,
						xy = me.element.getXY(),
						x = p.x - xy[0],
						y = p.y - xy[1],
						dx = this.lastEventX - x,
						dy = this.lastEventY - y,
						D = 40;
					if (dx * dx + dy * dy < D * D) {
						me.list.length -= 2;
						me.list.push(p.x - xy[0], p.y - xy[1]);
					} else {
						me.list.length -= 2;
						me.list.push(this.lastEventX = p.x - xy[0], this.lastEventY = p.y - xy[1]);
						me.list.push(this.lastEventX + 1, this.lastEventY + 1);
					}

					//var path = smoothenList(list);
					sprite.setAttributes({
						path: me.list
					});
					if (Ext.os.is.Android) {
						Ext.draw.Animator.schedule(function () {
							this.getSurface('overlay').renderFrame();
						}, me);
					} else {
						me.getSurface('overlay').renderFrame();
					}
				}
			},
			'touchstart': function (e) {
				var cmp = this;
				if (!cmp.sprite) {
					var p0 = cmp.element.getXY(),
						p = [e.pageX - p0[0], e.pageY - p0[1]];
					cmp.list = [p[0], p[1], p[0], p[1]];
					this.lastEventX = p[0];
					this.lastEventY = p[1];
					cmp.getSurface('overlay').element.setStyle({zIndex: 1});
					cmp.sprite = cmp.getSurface('overlay').add({
						type: 'path',
						path: ['M', cmp.list[0], cmp.list[1], 'L', cmp.list[0] + 1e-5, cmp.list[1] + 1e-5],
						lineWidth: 30 * Math.random() + 10,
						lineCap: 'round',
						lineJoin: 'round',
						strokeStyle: new Ext.draw.Color(Math.random() * 127 + 128, Math.random() * 127 + 128, Math.random() * 127 + 128)
					});
					cmp.getSurface('overlay').renderFrame();
				}
			},
			'dragend': function (e) {
				var cmp = this;
				cmp.getSurface().add({
					type: 'path',
					path: cmp.sprite.attr.path,
					lineWidth: cmp.sprite.attr.lineWidth,
					lineCap: 'round',
					lineJoin: 'round',
					strokeStyle: cmp.sprite.attr.strokeStyle
				});
				cmp.getSurface().setDirty(true);
				cmp.getSurface().renderFrame();
				cmp.sprite.destroy();
				cmp.getSurface('overlay').renderFrame();
				cmp.sprite = null;
			}
		}
	},

	onResize: function () {
		var size = this.element.getSize();
		this.getSurface().setRegion([0, 0, size.width, size.height]);
		this.getSurface('overlay').setRegion([0, 0, size.width, size.height]);
		this.renderFrame();
	}
});