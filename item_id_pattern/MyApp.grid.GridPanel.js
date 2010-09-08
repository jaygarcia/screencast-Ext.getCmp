Ext.ns('MyApp.grid');

MyApp.grid.GridPanel = Ext.extend(Ext.grid.GridPanel, {

    viewConfig : {
        forceFit : true
    },
    initComponent : function() {
        this.store    = this.buildStore();
        this.columns  = this.buildColumns();
        this.selModel = new Ext.grid.RowSelectionModel({singleSelect:true});

        MyApp.grid.GridPanel.superclass.initComponent.call(this);
        this.relayEvents(this.selModel, ['selectionchange']);
    },
    buildStore : function() {
        var data = [
            [ 'Jay',   'Garcia', 31 ],
            [ 'Brian', 'Smith',  34 ],
            [ 'Sam',   'Sosa',   21 ],
            [ 'Aaron', 'Conran', 19 ],
            [ 'Vicky', 'Ortiz',  28 ]
        ];
        return {
            xtype    : 'arraystore',
            fields   : ['first','last', 'age'],
            data     : data,
            autoLoad : true
        }
    },
    buildColumns : function() {
        return [
            {
                header    : 'First Name',
                dataIndex : 'first'
            },
            {
                header    : 'Last Name',
                dataIndex : 'last'
            },
            {
                header    : 'Age',
                dataIndex : 'age'
            }
        ];
    }
});

Ext.reg('MyApp.grid.GridPanel', MyApp.grid.GridPanel);