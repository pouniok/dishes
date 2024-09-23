Ext.define('Dishes.profile.Tablet', {
    extend: 'Ext.app.Profile',

    config: {
        name: 'Tablet',
        views: ['Main']
    },

    isActive: function() {
        return !Ext.os.is('Phone');
    },
	
	 launch: function() {
        // Destroy the #appLoadingIndicator element
        Ext.fly('appLoadingIndicator').destroy();

        // Initialize the main view
        Ext.Viewport.add(Ext.create('Dishes.view.tablet.Main'));
    }
});