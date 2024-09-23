Ext.define('Dishes.model.Employee', {
    extend: 'Ext.data.Model',
    config: {
        fields: [
            {name: 'id',   type: 'int'},
            {name: 'firstname', type: 'string'},
            {name: 'lastname', type: 'string'},
            {name: 'picture', type: 'string'},
			{name: 'birthday', type: 'date', dateFormat: 'Y-m-d'},
			{name: 'signature', type: 'string'},
			{name: 'signature_date', type: 'date', dateFormat: 'Y-m-d'}
        ]
    }
});
