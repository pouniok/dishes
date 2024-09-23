Ext.define('Dishes.view.tablet.Rules', {
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
			scrollable: true,
			html: '<div>'+
'    <p align="center">'+
'        <h1>RÈGLEMENT D’UTILISATION DE L’APPLICATION « DISHES »</h1>'+
'    </p>'+
'</div>'+
'<p>'+
'    Le présent Règlement a pour objet de :'+
'</p>'+
'<p>'+
'    - définir l’ensemble des règles relatives à la réalisation de la vaisselle et de son suivi via l’application « Dishes »,<br/>'+
'    - rendre juste et équitable la répartition de la réalisation de la vaisselle commune.'+
'</p>'+
'<p>'+
'    Le présent Règlement s’applique à l’ensemble des salariés, apprentis et stagiaires, ayant au minimum pris un repas dans les locaux de l’entreprise, sans'+
'    restriction ni réserve.'+
'</p>'+
'<p>'+
'    <strong></strong>'+
'</p>'+
'<p>'+
'    <h2>ARTICLE 1 – DÉFINITION DES ARTICLES COMPRIS DANS LE TERME « VAISSELLE »</h2>'+
'</p>'+
'<p>'+
'    1.1 - La « vaisselle » prise en compte dans ce règlement ne concerne que celle qui est réalisée après le repas de mi-journée.'+
'</p>'+
'<p>'+
'    1.2 - La « vaisselle » comprend l’ensemble des couverts et des ustensiles utilisés par l’ensemble des salariés lors du repas ou de sa préparation, la table'+
'    sur laquelle le repas a été prise, ainsi que les appareils de chauffe.'+
'</p>'+
'<p>'+
'    1.3 - Liste non exhaustive des éléments à nettoyer à la fin du repas et constituant donc la dite vaisselle :'+
'</p>'+
'<ul>'+
'    <li>- couverts (cuillères, couteaux, fourchettes, baguettes)</li>'+
'    <li>- verres à eau, verres à vin, gobelets, cubis,</li>'+
'    <li>- carafes, pichets, bouteilles,</li>'+
'    <li>- assiettes, plateaux, boites plastiques, plats en verre, boites en verre, couvercles, containers,</li>'+
'    <li>- pots de yaourts réutilisables,</li>'+
'    <li>- table,</li>'+
'    <li>- micro-ondes, four, grill.</li>'+
'</ul>'+
'<p>'+
'    <strong></strong>'+
'</p>'+
'<p>'+
'    <h2>ARTICLE 2 – CHOIX DU RÉALISATEUR</h2>'+
'</p>'+
'<p>'+
'    <strong></strong>'+
'</p>'+
'<p>'+
'    2.1 - A chaque journée de travail, chaque salarié est libre de se proposer pour réaliser la vaisselle du jour.'+
'</p>'+
'<p>'+
'    2.2 - L’attribution est validée à partir du moment où un premier post-it a été installé sur la table de la cuisine, indiquant le nom de la personne'+
'    souhaitant faire la vaisselle.'+
'</p>'+
'<p>'+
'    2.3 - Pour éviter tout litige, cette même personne pourra prendre en photo ce post-it et ainsi justifier qu’il était le premier à l’aide de la date et'+
'    l’heure de la photo.'+
'</p>'+
'<p>'+
'    2.4 - S’il n’y a pas de post-it, la personne désirant faire la vaisselle valide son tour à partir du moment où elle informe deux personnes de son choix,'+
'    avant le repas.'+
'</p>'+
'<p>'+
'    2.5 - La mise en place du post-it ou la communication aux autres salariés doit être effectuée le jour même de la réalisation de la vaisselle, et dans les'+
'    locaux de l’entreprise.'+
'</p>'+
'<p>'+
'    2.6 - La personne inscrite sur le post-it peut refuser d’effectuer la vaisselle avant le repas, si elle estime que le score ne sera pas important, ou pour'+
'    éviter que son nom soit inscrit sur un post-it par une autre personne.'+
'</p>'+
'<p>'+
'    <strong></strong>'+
'</p>'+
'<p>'+
'    <strong></strong>'+
'</p>'+
'<p>'+
'    <h2>ARTICLE 3 – RÉALISATION DE LA VAISSELLE</h2>'+
'</p>'+
'<p>'+
'    <strong></strong>'+
'</p>'+
'<p>'+
'    3.1 – Le réalisateur ne peut pas imposer aux salariés de nettoyer leurs couverts sans leur accord. Il doit attendre la fin du repas pour réaliser le'+
'    nettoyage des couverts.'+
'</p>'+
'<p>'+
'    <strong></strong>'+
'</p>'+
'<p>'+
'    3.2 – Le réalisateur est libre dans le choix de la méthode et la durée de nettoyage. Il est simplement forcé de réaliser une opération de nettoyage suivi'+
'    d’un rinçage.<strong></strong>'+
'</p>'+
'<p>'+
'    <strong></strong>'+
'</p>'+
'<p>'+
'    3.3 – A la fin de la vaisselle, l’ensemble des éléments lavés doit être visuellement propre : les couverts ou autres éléments ne doivent pas laisser'+
'    apparaître de traces de souillures ni de résidus de produits de nettoyage.<strong></strong>'+
'</p>'+
'<p>'+
'    <strong></strong>'+
'</p>'+
'<p>'+
'    3.4 - À la fin de la vaisselle, ou au cours de sa réalisation, la saisie sur l’application peut être réalisée. Elle comprend :'+
'</p>'+
'<ul>'+
'    <li>- le nom du réalisateur,</li>'+
'    <li>- les personnes absentes,</li>'+
'    <li>- le nombre de couverts,</li>'+
'    <li>- le nombre de boîtes (plastiques, verre, etc…),</li>'+
'    <li>- le nombre de tasses à café,</li>'+
'    <li>- le nombre de verres à vin,</li>'+
'    <li>- la validation.</li>'+
'</ul>'+
'<p>'+
'    3.5 – La saisie est effectuée par le réalisateur lui-même, sous contrôle des autres salariés présents, ou par un autre salarié si le réalisateur l’accepte.'+
'</p>'+
'<p>'+
'    <strong></strong>'+
'</p>'+
'<p>'+
'    <h2>ARTICLE 4 – CALCUL DU SCORE INDIVIDUEL MENSUEL</h2>'+
'</p>'+
'<p>'+
'    4.1 - Le suivi de la réalisation de la vaisselle s’effectue sur un mois complet : du premier jour du mois au denier jours du mois (de la même année).'+
'    Exemple : du 1<sup>er</sup> mai 2016 inclus au 31 mai 2016 inclus.'+
'</p>'+
'<p>'+
'    4.2 - Le suivi intègre uniquement les jours ouvrés.'+
'</p>'+
'<p>'+
'    4.3 - Les jours où un seul salarié est présent lors du repas ne sont pas pris en compte dans le calcul.'+
'</p>'+
'<p>'+
'    4.4 - Le suivi donne lieu à un classement, reprenant le score individuel de chaque salarié.'+
'</p>'+
'<p>'+
'    4.5 - Une vaisselle donne un score journalier. Ce score est la somme des points attribués à chaque élément, définis par la grille suivante :'+
'</p>'+
'<table border="1" cellspacing="0" cellpadding="0" width="463">'+
'    <tbody>'+
'        <tr>'+
'            <td width="255">'+
'                <p align="center">'+
'                    Elément constituant la vaisselle'+
'                </p>'+
'            </td>'+
'            <td width="208">'+
'                <p align="center">'+
'                    Nombre de points par unité'+
'                </p>'+
'            </td>'+
'        </tr>'+
'        <tr>'+
'            <td width="255">'+
'                <p align="center">'+
'                    Couvert (à partir du moment ou une assiette est utilisée, comprenant l’assiette, un verre à eau et les couverts)'+
'                </p>'+
'            </td>'+
'            <td width="208">'+
'                <p align="center">'+
'                    1.0'+
'                </p>'+
'            </td>'+
'        </tr>'+
'        <tr>'+
'            <td width="255">'+
'                <p align="center">'+
'                    Boîte (couvercle compris)'+
'                </p>'+
'            </td>'+
'            <td width="208">'+
'                <p align="center">'+
'                    0.8'+
'                </p>'+
'            </td>'+
'        </tr>'+
'        <tr>'+
'            <td width="255">'+
'                <p align="center">'+
'                    Tasse à café (tasses présentes dans l’évier avant le repas et tasses utilisées pour le repas)'+
'                </p>'+
'            </td>'+
'            <td width="208">'+
'                <p align="center">'+
'                    0.3'+
'                </p>'+
'            </td>'+
'        </tr>'+
'        <tr>'+
'            <td width="255">'+
'                <p align="center">'+
'                    Verre à vin'+
'                </p>'+
'            </td>'+
'            <td width="208">'+
'                <p align="center">'+
'                    1.5'+
'                </p>'+
'            </td>'+
'        </tr>'+
'    </tbody>'+
'</table>'+
'<p>'+
'    4.6 - Tout autre élément, faisant partie de la vaisselle mais n’entrant pas en compte dans cette grille, ne sera pas pris en compte dans le calcul des'+
'    points. Le calcul de la note journalière s’effectue donc comme suit :'+
'</p>'+
'<p align="center">'+
'    <strong><em>Note_journalière</em></strong>'+
'    <em>'+
'        = (Nombre de couverts * 1.0) + (Nombre de boîtes * 0.8) +'+
'        <br/>'+
'        (Nombre de tasses à café * 0.3) + (Nombre de verres à vin * 1.5)'+
'    </em>'+
'</p>'+
'<p>'+
'    4.7 - Afin de pondérer la note mensuelle par rapport à la présence de chaque salarié, un taux de présence est défini et automatiquement calculé par'+
'    l’application. Il suit la règle de calcul suivante :'+
'</p>'+
'<p align="center">'+
'    <strong><em>Taux_présence</em></strong>'+
'    <em> = (1 – (Nombre de jours d’absence dans le mois / Nombre de jours de vaisselles dans le mois)) * 100</em>'+
'</p>'+
'<p align="center">'+
'    <em></em>'+
'</p>'+
'<p>'+
'    4.8 - Une note mensuelle est alors calculée, en fonction des notes journalières et du taux de présence de chaque salarié. Il s’agit simplement du cumul des'+
'    notes journalières du mois, rapportées au nombre de jours de présence.'+
'</p>'+
'<p align="center">'+
'    <strong>Note_mensuelle</strong>'+
'    = Somme des notes journalières du salarié /'+
'</p>'+
'<p align="center">'+
'    Nombre de jours de présence dans le mois du salarié'+
'</p>'+
'<p>'+
'    <strong>Exemple : </strong>'+
'</p>'+
'<p>'+
'    - Gérard a été présent 10 repas sur 20 effectués par l’ensemble de l ‘équipe. Son taux de présence est donc égal à 50%. Il a marqué, en tout, 20 points de'+
'    vaisselle dans le mois, soit une note mensuelle = 20 / 10 = 2.0'+
'</p>'+
'<p>'+
'    - Jean-Robert a été présent 5 repas sur 20 effectués. Son taux de présence est donc égal à 25%. Il a marqué en tout 20 points de vaisselle, soit une note'+
'    mensuelle = 20 / 5 = 4.0'+
'</p>'+
'<p>'+
'    <h2>ARTICLE 5 – CLASSEMENT ET CONSÉQUENCES</h2>'+
'</p>'+
'<p>'+
'    5.1 - Chaque premier jour du mois, tous les compteurs sont remis à zéro.'+
'</p>'+
'<p>'+
'    5.2 - Chaque dernier jour du mois, après le dernier repas, le classement mensuel est considéré comme achevé.'+
'</p>'+
'<p>'+
'    5.3 – Le salarié ayant le ratio le plus important (plus grand nombre de points par rapport au nombre de jours présents) gagne le droit de faire le malin'+
'    (et la possibilité de se faire lyncher violemment par ses collègues).'+
'</p>'+
'<p>'+
'    5.4 – Le salarié ayant un taux de présence <strong>strictement </strong>inférieur à 20 % n’est pas pris en compte dans le classement.'+
'</p>'+
'<p>'+
'    5.5 – Le salarié ayant le ratio le plus faible (plus petit nombre de points par rapport au nombre de jours présents) gagne le droit d’apporter du vin dans'+
'    le courant du mois suivant, vin à partager avec ses collègues. Le nombre de bouteilles à apporter est calculé de la manière suivante : il s’agit de l’écart'+
'    entre le ratio maximal (arrondi supérieur) et le ratio minimal (arrondi inférieur).'+
'</p>'+
'<p>'+
'    <strong>Exemple : </strong>'+
'</p>'+
'<p>'+
'    - Yves-Romuald termine le mois de mai premier du classement avec un ratio de 4.4 (et avec deux côtes cassées), alors que Jean-Basile termine dernier avec'+
'    1.6. Avec les arrondis, on arrive à 5 – 1 = 4 bouteilles à apporter dans le mois.'+
'</p>'+
'<p>'+
'    5.6 – En cas d’égalité, les perdants se partagent les offrandes à apporter.'+
'</p>'+
'<p>'+
'    5.7 – Une bouteille à apporter équivaut à un volume <strong>au moins égal</strong> à 0,75 cl, en CRD, et d’une qualité de vin jugée comme correcte. Si la'+
'    qualité n’est pas jugée correcte par l’ensemble des salariés, un lancé de dés peut être invoqué <strong>(cf. Article 6). </strong>'+
'</p>'+
'<p>'+
'    Pour les néophytes, les appellations suivantes restent à éviter : Tursan, Brulhois, Irouleguy, Madiran,'+
'    <s>'+
'        (Marcillac).'+
'    </s>'+
'</p>'+
'<p>'+
'    <h2>ARTICLE 6 – LANCÉ DE DÉS</h2>'+
'</p>'+
'<p>'+
'    6.1 – Le lancé de dés est réalisé grâce à l’application et au bouton correspondant. Il permet, dans un des cas cités au paragraphe 6.2, de sanctionner un'+
'    salarié pour une raison particulière. Le lancé de dés correspond à un tirage aléatoire d’un nombre compris entre 1 et la valeur du dernier score journalier'+
'    du salarié (nombre entier retenu). Le nombre tiré au sort sera alors le nombre de points retirés du score du salarié. Si le salarié n’a aucune vaisselle'+
'    effectuée dans le mois, c’est la dernière vaisselle du mois précédent qui est comptabilisée.'+
'</p>'+
'<p>'+
'    <strong>Exemple :</strong>'+
'    le dernier score d’Yves-Wilfried est 10,5. Le tirage au sort sera alors effectué entre 1 et 10.'+
'</p>'+
'<p>'+
'    6.2 – Le lancé de dés est automatique en cas de casse lors de la réalisation de la vaisselle. Il peut être demandé et voté à main levée dans les cas'+
'    suivants (afin d’être validé, le vote doit se faire à l’unanimité, exception faite du salarié incriminé) : tout autre casse ; blague sexiste liée à la'+
'    vaisselle ; mauvaise foi ; mauvais comportement ; très très mauvaise blague ; contrôle qualité visuel et inopiné, se révélant insatisfaisant, effectué par'+
'    un salarié sur la vaisselle qui vient d’être nettoyée.'+
'</p>',
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
						'<div style="color: #333; margin-left: 10px; float: right; font-size: 20px;"><b>{firstname:ellipsis(15)}</b> <span style="color: #887251;">{lastname:ellipsis(15)}</span><br/>'+
						'<tpl if="values.signature != \'\'"><span style="font-size: 14px;"><i class="fa fa-check" aria-hidden="true"></i> <i>Signé le {signature_date:date("d/m/Y")}</i></span>'+
						'<tpl else><span style="font-size: 14px; color: #F46660;"><i class="fa fa-times" aria-hidden="true"></i> <i>Règlement non signé</i></span></tpl></div>' +
					'</div>',
			listeners: {
				itemtap: function(dv, index, target, rec, e, eOpts) {
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
								text: (rec.get('signature') != null && rec.get('signature') != '') ? 'Fermer' : 'Refuser',
								flex: 1,
								handler: function(b){
									pan.destroy();
								}
							},{
								text: 'Accepter', 
								hidden: (rec.get('signature') != null && rec.get('signature') != ''),
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
							html: '<canvas width="500" height="200" id="signature" style="border: 1px dotted #CCC;"></canvas>',
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
						width: 520,
						height: 310,
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