Ext.define('Dishes.store.Ranking', {
    extend: 'Ext.data.Store',
    requires: ['Dishes.model.Ranking'],

    config: {
      model: 'Dishes.model.Ranking',
      storeId: 'rankings',
      autoLoad: true,
      proxy: {
          type: "ajax",
          url : "ws.php?action=rankings",
          reader: {
              type: "json",
              rootProperty: "result"
          }
      }
    }
});
