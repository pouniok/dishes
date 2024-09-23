Ext.define('Dishes.model.Ranking', {
    extend: 'Ext.data.Model',
    config: {
        fields: [
            {name: 'id',   type: 'int'},
			{name: 'rank',   type: 'int'},
            {name: 'firstname', type: 'string'},
            {name: 'lastname', type: 'string'},
            {name: 'picture', type: 'string'},
			{name: 'couverts', type: 'int'},
			{name: 'boites', type: 'int'},
			{name: 'cafes', type: 'int'},
			{name: 'verres', type: 'int'},
			{name: 'note', type: 'float'},
			{name: 'presence', type: 'int'},
			{name: 'note_pondere', type: 'float'}
        ]
    }
});
