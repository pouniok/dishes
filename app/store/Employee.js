Ext.define('Dishes.store.Employee', {
    extend: 'Ext.data.Store',
    requires: ['Dishes.model.Employee'],

    config: {
      model: 'Dishes.model.Employee',
      storeId: 'employees',
      autoLoad: true,
      proxy: {
          type: "ajax",
          url : "ws.php?action=employees",
          reader: {
              type: "json",
              rootProperty: "result"
          }
      }
    }
});
