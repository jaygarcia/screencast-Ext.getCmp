Ext.ns('MyApp.form');

MyApp.form.FormPanel = Ext.extend(Ext.form.FormPanel, {

    
    constructor : function(cfg) {
        
        cfg = Ext.applyIf(cfg || {}, {
            defaultType      : 'textfield',
            trackResetOnLoad : true,
            buttonAlign      : 'center',
            items            : this.buildItems(),
            buttons          : this.buildButtons()
        });

        MyApp.form.FormPanel.superclass.constructor.call(this, cfg);

        // Fired by save button
        this.addEvents('savebtn');
    },
    
    buildItems : function() {
        return [
            {
                name       : 'first',
                fieldLabel : 'First Name'
            },
            {
                name       : 'last',
                fieldLabel : 'Last Name'
            },
            {
                name       : 'age',
                fieldLabel : 'Age'
            }
        ];
    },

    buildButtons : function() {
        return [
            {
                text    : 'Save',
                scope   : this,
                handler : this.onSaveBtn
            },
            {
                text    : 'Reset',
                scope   : this,
                handler : this.onResetBtn
            }
        ];
    },
    onSaveBtn : function() {
        var vals = this.getForm().getValues();
        this.fireEvent('savebtn', this, vals);
    },
    onResetBtn : function() {
        this.getForm().reset();
    }


});

Ext.reg('MyApp.form.FormPanel', MyApp.form.FormPanel);