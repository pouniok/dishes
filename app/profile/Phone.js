Ext.define('Dishes.profile.Phone', {
    extend: 'Ext.app.Profile',

    config: {
        name: 'Phone',
        views: ['Main']
    },

    isActive: function() {
        return Ext.os.is('Phone');
    },
	
	 launch: function() {
        // Destroy the #appLoadingIndicator element
        Ext.fly('appLoadingIndicator').destroy();

        // Initialize the main view
        Ext.Viewport.add(Ext.create('Dishes.view.phone.Main'));
    }
});