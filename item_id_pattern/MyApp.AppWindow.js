

Ext.ns('MyApp');
MyApp.AppWindow  = Ext.extend(Ext.Window, {
    border : false,
    layout : {
        type  : 'hbox',
        align : 'stretch'
    },
    defaults : {
        flex  : 1,
        frame : true
    },
    initComponent : function() {

        this.items = [
            this.buildGridPanel(),
            this.buildFormPanel()
        ];

        MyApp.AppWindow.superclass.initComponent.call(this);
    },
    buildFormPanel : function(){
       return  {
            xtype     : 'MyApp.form.FormPanel',
            itemId    : 'form',
            listeners : {
                scope   : this,
                // custom event
                savebtn : this.onFormPanelSaveBtn
            }
        }
    },
    buildGridPanel : function(){
        return  {
            xtype     : 'MyApp.grid.GridPanel',
            itemId    : 'grid',
            listeners : {
                scope           : this,
                // custom relayed events from grid's selmodel
                selectionchange : this.onGridPanelSelectionChange
            }
        }
    },
    getFormPanel : function(record) {
        return this.getComponent('form');
    },
    getGridPanel : function() {
        return this.getComponent('grid');
    },
    onGridPanelSelectionChange : function(selModel) {
        var gridStore = this.getGridPanel().store,
            record    = selModel.selections.items[0]; // single select == only one record
        if (record) {
            this.getFormPanel().getForm().loadRecord(record);
        }
        
    },

    onFormPanelSaveBtn : function(formPanel, formData) {
        // simulated ajax call
        var  key, record = this.getGridPanel().selModel.getSelected();
        if ( ! record) {
            return;
        }
        this.el.mask('Saving...', 'x-mask-loading');
        (function() {
            record.beginEdit();
            for (key in formData) {
                record.set(key, formData[key]);
            }
            record.endEdit();
            record.commit();
            this.el.unmask();
        }).defer(750, this);
    }
});