

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
        this.form = this.buildFormPanel();
        this.grid = this.buildGridPanel();

        this.items = [
            this.grid,
            this.form
        ];

        MyApp.AppWindow.superclass.initComponent.call(this);
    },
    buildFormPanel : function(){
       return new MyApp.form.FormPanel({
            listeners : {
                scope   : this,
                // custom event
                savebtn : this.onFormPanelSaveBtn
            }
        });
    },
    buildGridPanel : function(){
        return new MyApp.grid.GridPanel({
            listeners : {
                scope           : this,
                // custom relayed events from grid's selmodel
                selectionchange : this.onGridPanelSelectionChange
            }
        });
    },
    onGridPanelSelectionChange : function(selModel) {
        var record = selModel.selections.items[0]; // single select == only one record
        if (record) {
            this.form.getForm().loadRecord(record);
        }

    },

    onFormPanelSaveBtn : function(formPanel, formData) {
        // simulated ajax call
        var  key, record = this.grid.selModel.getSelected();
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