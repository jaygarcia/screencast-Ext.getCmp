Ext.onReady(function() {
    var win = new Ext.Window({
        width  : 100,
        height : 100,
        html   : 'Hiya'
    });

    win.show();
    console.info('Window id is ' + win.id);

});
