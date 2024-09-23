Ext.define('Dishes.view.Main', {
    extend: 'Ext.Panel',
	id: 'main',
    xtype: 'main',
    requires: ['Ext.Menu', 'Dishes.view.Dashboard', 'Dishes.view.NewDishes'],

    config: {
		layout: 'card',
        items: [{
			xtype: 'toolbar',
			docked: 'top',
			//title: 'Tableau de bord',
			items: [{
				xtype: 'button',
				iconCls: 'fa-bars',
				handler: function(){
					Ext.Viewport.toggleMenu('left');
				}
    		}]
		}],

		listeners: {
			initialize: function(){
				var menu = Ext.create('Ext.Menu', {
					items: [{
						text: 'Tableau de bord',
						iconCls: 'fa-tachometer',
						iconAlign: 'right',
						scope: this,
						handler: function(b){
							//this.items.get(0).setTitle(b.getText());
							this.setActiveItem(0);
							Ext.Viewport.hideMenu('left');
						}
					},{
						text: 'Nouvelle vaisselle',
						iconCls: 'fa-plus-circle',
						iconAlign: 'right',
						scope: this,
						handler: function(b){
							//this.items.get(0).setTitle(b.getText());
							this.setActiveItem(1);
							Ext.Viewport.hideMenu('left');
						}
					},{
						text: 'Employés',
						iconCls: 'fa-users',
						iconAlign: 'right',
						scope: this,
						handler: function(b){
							//this.items.get(0).setTitle(b.getText());
							this.setActiveItem(2);
							Ext.Viewport.hideMenu('left');
						}
					},{
						text: 'Règlement',
						iconCls: 'fa-file-text-o',
						iconAlign: 'right',
						scope: this,
						handler: function(b){
							//this.items.get(0).setTitle(b.getText());
							this.setActiveItem(3);
							Ext.Viewport.hideMenu('left');
						}
					}]
				});

				Ext.Viewport.setMenu(menu, {
					 side: 'left',
					 reveal: true
				});

				this.add(Ext.create('Dishes.view.Dashboard'));
				this.add(Ext.create('Dishes.view.NewDishes'));
				this.add(Ext.create('Dishes.view.Employees'));
				this.add(Ext.create('Dishes.view.Rules'));
			},
			painted: function(){
				var me = this;
				
				// Vérif des anniv
				Ext.Ajax.request({
					url: 'ws.php?action=birthday',
					success: function(response){
						var res = Ext.decode(response.responseText).result;
						
						if (res.length > 0) {
							Ext.each(res, function(emp){
								var dob = Ext.Date.parse(emp.birthday, 'Y-m-d');
								var now = new Date();
								dob.setFullYear(now.getFullYear());
								var ecart = Ext.Date.diff(now, dob, Ext.Date.DAY) + 1;
								
								if (ecart == 7 || ecart == 3 || ecart == 1 || ecart == 0) {
									if (ecart == 0) {
										me.showConfettis();
										
										Ext.toast({
											message: '<img src="resources/images/cake.png" />',
											cls: 'toast-birthday',
											timeout: 2000,
											isComponent: true
										});
										Ext.toast({
											message: '<b>'+emp.firstname+'</b><br/><span style="color: #887251;">'+emp.lastname+'</span>',
											cls: 'toast-birthday',
											timeout: 1500,
											isComponent: true
										});
										Ext.toast({
											message: '<span style="font-size: 100px; color: #887251;"><b>'+emp.age+'</b></span><br/>ans',
											cls: 'toast-birthday',
											timeout: 1500,
											isComponent: true
										});
									}
									else {
										Ext.toast({
											message: '<span style="font-size: 100px;">J-'+ecart+'</span>',
											cls: 'toast-birthday',
											timeout: 2000,
											isComponent: true
										});
										Ext.toast({
											message: '<img width="80" src="resources/images/cake.png" /><br/><b>'+emp.firstname+
														'</b><br/><span style="color: #887251;">'+emp.lastname+'</span>',
											cls: 'toast-birthday',
											timeout: 2000,
											isComponent: true
										});
									}
								}
								
							});
						}
					}
				}); 
			}
		}
    },
	
	stopConfettis: function() {
		if (this.confetti) {
			document.body.removeChild(this.confetti);
			delete this.confetti;
		}
	},
	
	showConfettis: function() {
		var me = this;
		
		if (this.confetti) {
			document.body.removeChild(this.confetti);
			delete this.confetti;
		}
		var COLORS, Confetti, NUM_CONFETTI, PI_2, canvas, confetti, context, drawCircle, i, range, resizeWindow, xpos, w, h;

		NUM_CONFETTI = 350;

		COLORS = [[85, 71, 106], [174, 61, 99], [219, 56, 83], [244, 92, 68], [248, 182, 70]];

		PI_2 = 2 * Math.PI;
		
		w = window.innerWidth;
		h = window.innerHeight;

		canvas = document.createElement("canvas");
		canvas.style.position = 'absolute';
		canvas.style.zIndex = 2;
		canvas.style.left = 0;
		canvas.style.right = 0;
		canvas.style.top = 0;
		canvas.style.bottom = 0;
		canvas.width = w;
		canvas.height = h;
		document.body.appendChild(canvas);
		this.confetti = canvas;

		context = canvas.getContext("2d");
		
		range = function(a, b) {
			return (b - a) * Math.random() + a;
		};

		drawCircle = function(x, y, r, style) {
			context.beginPath();
			context.arc(x, y, r, 0, PI_2, false);
			context.fillStyle = style;
			return context.fill();
		};

		xpos = 0.5;
		
		window.requestAnimationFrame = (function() {
			return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(callback) {
				return window.setTimeout(callback, 1000 / 60);
			};
		})();

		Confetti = (function() {
			function Confetti() {
				this.style = COLORS[~~range(0, 5)];
				this.rgb = "rgba(" + this.style[0] + "," + this.style[1] + "," + this.style[2];
				this.r = ~~range(2, 6);
				this.r2 = 2 * this.r;
				this.replace();
			}

			Confetti.prototype.replace = function() {
				this.opacity = 0;
				this.dop = 0.03 * range(1, 4);
				this.x = range(-this.r2, w - this.r2);
				this.y = range(-20, h - this.r2);
				this.xmax = w - this.r;
				this.ymax = h - this.r;
				this.vx = range(0, 2) + 8 * xpos - 5;
				return this.vy = 0.7 * this.r + range(-1, 1);
			};

			Confetti.prototype.draw = function() {
				var ref;
				this.x += this.vx;
				this.y += this.vy;
				this.opacity += this.dop;
				if (this.opacity > 1) {
					this.opacity = 1;
					this.dop *= -1;
				}
				if (this.opacity < 0 || this.y > this.ymax) {
					this.replace();
				}
				if (!((0 < (ref = this.x) && ref < this.xmax))) {
					this.x = (this.x + this.xmax) % this.xmax;
				}
				return drawCircle(~~this.x, ~~this.y, this.r, this.rgb + "," + this.opacity + ")");
			};

			return Confetti;

		})();

		confetti = (function() {
			var j, ref, results;
			results = [];
			for (i = j = 1, ref = NUM_CONFETTI; 1 <= ref ? j <= ref : j >= ref; i = 1 <= ref ? ++j : --j) {
			  results.push(new Confetti);
			}
			return results;
		})();

		window.step = function() {
			var c, j, len, results;
			requestAnimationFrame(step);
			context.clearRect(0, 0, w, h);
			results = [];
			for (j = 0, len = confetti.length; j < len; j++) {
			  c = confetti[j];
			  results.push(c.draw());
			}
			return results;
		};

		step();
		
		Ext.Function.defer(function(){
			me.stopConfettis();
		}, 6000);
	}
});
