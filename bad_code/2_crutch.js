var obj = {
      text: 'Save',
      id: 'my_widget_save_button',
      handler: function(){
        Ext.getCmp('my_widget_short_name').on('invalid', function(){
          Ext.getCmp('my_widget_save_button').disable();
        });
        Ext.getCmp('my_widget_short_name').on('valid', function(){
          Ext.getCmp('my_widget_save_button').enable();
        });
        Ext.getCmp('my_widget_save_button').disable();

        Ext.getCmp('propertyEditor').getForm().submit({
          success: function(form, action){
            properties.hide();
            if(!properties.find('name','id')[0].getValue()){
              //new node
              var obj = Ext.util.JSON.decode(action.response.responseText);
              MyApp.evt_mgr.fireEvent('customEvent', obj.id);
            }else{
              //refresh tree and reselect
              MyApp.evt_mgr.fireEvent('customEvent');
            }
          },
          failure: function(form, action){
            var editor = Ext.getCmp('propertyEditor');
            var name = editor.find('name','name')[0].getValue();
            processFormFailure(editor,'Failed to save "'+ name +'"',action);
          }
        });
      }
    };