Ext.define('Dishes.store.Dishes', {
    extend: 'Ext.data.Store',
    requires: ['Dishes.model.Dishes'],

    config: {
      model: 'Dishes.model.Dishes',
      storeId: 'dishes',
      autoLoad: true,
      proxy: {
          type: "ajax",
          url : "ws.php?action=dishes",
          reader: {
              type: "json",
              rootProperty: "result"
          }
      }
    }
});
