Ext.ComponentMgr = function(){
    var all = new Ext.util.MixedCollection();
    var types = {};
    var ptypes = {};

    return {
        register : function(c){
            all.add(c);
        },

        unregister : function(c){
            all.remove(c);
        },

        get : function(id){
            return all.get(id);
        },

        onAvailable : function(id, fn, scope){
            all.on("add", function(index, o){
                if(o.id == id){
                    fn.call(scope || o, o);
                    all.un("add", fn, scope);
                }
            });
        },
        all : all,
        
        types : types,
        
        ptypes: ptypes,
        
        isRegistered : function(xtype){
            return types[xtype] !== undefined;    
        },
        
        isPluginRegistered : function(ptype){
            return ptypes[ptype] !== undefined;    
        },        

        registerType : function(xtype, cls){
            types[xtype] = cls;
            cls.xtype = xtype;
        },

        create : function(config, defaultType){
            return config.render ? config : new types[config.xtype || defaultType](config);
        },

        registerPlugin : function(ptype, cls){
            ptypes[ptype] = cls;
            cls.ptype = ptype;
        },
        createPlugin : function(config, defaultType){
            var PluginCls = ptypes[config.ptype || defaultType];
            if (PluginCls.init) {
                return PluginCls;                
            } else {
                return new PluginCls(config);
            }            
        }
    };
}();

Ext.reg = Ext.ComponentMgr.registerType; // this will be called a lot internally, shorthand to keep the bytes down

Ext.preg = Ext.ComponentMgr.registerPlugin;

Ext.create = Ext.ComponentMgr.create;
