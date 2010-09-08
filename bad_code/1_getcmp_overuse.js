Ext.ns("MyApp");

MyApp.FormPanel = Ext.extend(Ext.Panel, {
	setDefaults: function(){
		Ext.getCmp('x-timefield').setValue('6:00 AM');
		Ext.getCmp('x-run-combo').setValue('Weekly');
		Ext.getCmp('run-panel').layout.setActiveItem(4);
		
		Ext.getCmp('once-date').setValue(new Date().format('m/d/Y'));
		
		Ext.getCmp('hourly').setValue(1);
		Ext.getCmp('minute').setValue(15);
		
		Ext.getCmp('daily_type').setValue(true);
		Ext.getCmp('daily_type2').setValue(false);
		Ext.getCmp('daily_type3').setValue(false);
		Ext.getCmp('daily').setValue(2);
		
		Ext.getCmp('weekly').setValue(1);
		Ext.getCmp('dow0').setValue(false);
		Ext.getCmp('dow1').setValue(true);
		Ext.getCmp('dow2').setValue(false);
		Ext.getCmp('dow3').setValue(false);
		Ext.getCmp('dow4').setValue(false);
		Ext.getCmp('dow5').setValue(false);
		Ext.getCmp('dow6').setValue(false);
		
		Ext.getCmp('day').setValue(1);
		Ext.getCmp('monthly').setValue(1);
	},
	
	setValues: function(initialVals) {
		this.setDefaults();
		var scheduleForm = this.getBaseForm();
		var currYear = new Date().format('Y');

		if( typeof initialVals.hour !== 'undefined' && typeof initialVals.minute !== 'undefined'){
			Ext.getCmp('x-timefield').setValue(this.getAmPmHour(initialVals.hour, initialVals.minute));
		}
		if (typeof initialVals.daily !== 'undefined') { 
			Ext.getCmp('x-run-combo').setValue('Daily');
		}
		else if (typeof initialVals.weekly !== 'undefined') { 
			Ext.getCmp('x-run-combo').setValue('Weekly');
		}
		else if (typeof initialVals.monthly !== 'undefined') { 
			Ext.getCmp('x-run-combo').setValue('Monthly');
		}
        else if (typeof initialVals.day !== 'undefined') {
			Ext.getCmp('x-run-combo').setValue('Once');
			Ext.getCmp('once-date').setValue(this.getDate(parseInt(initialVals.month), parseInt(initialVals.day), parseInt(currYear)));
		}
        else {
			Ext.getCmp('x-run-combo').setValue('Hourly'); 
		}
                this.run_select();
		if (typeof initialVals.hourly !== 'undefined') { Ext.getCmp('hourly').setValue(initialVals.hourly); }
		if (typeof initialVals.minute !== 'undefined') {  Ext.getCmp('minute').setValue(initialVals.minute); }
		if (initialVals.daily_type !== '') {
			switch(initialVals.daily_type){
				case 'day':
					Ext.getCmp('daily_type').setValue(true);
					Ext.getCmp('daily_type2').setValue(false);
					Ext.getCmp('daily_type3').setValue(false);
					Ext.getCmp('daily').value = initialVals.daily;
					break;
				case 'week':
					Ext.getCmp('daily_type').setValue(false);
					Ext.getCmp('daily_type2').setValue(true);
					Ext.getCmp('daily_type3').setValue(false);
					break;
				case 'weekday': 
					Ext.getCmp('daily_type').setValue(false);
					Ext.getCmp('daily_type2').setValue(false);
					Ext.getCmp('daily_type3').setValue(true);
					break;
				default:
					break;
			}
		}
		if (typeof initialVals.weekly !== 'undefined') { Ext.getCmp('weekly').setValue(initialVals.weekly); } 
		if (typeof initialVals.monthly !== 'undefined') {  Ext.getCmp('monthly').setValue(initialVals.monthly); }
		if (typeof initialVals.day !== 'undefined') { Ext.getCmp('day').setValue(initialVals.day); }
		if (typeof initialVals.dow !== 'undefined') { 
//			var d = initialVals.dow[0].split(',');
			var d = initialVals.dow;
			if (typeof d !== 'udefined') {
				for (var i = 0; i < 6; i++) {
					Ext.getCmp('dow' + i.toString()).setValue(false);
				}
				for (var i = 0, arrLen = d.length; i < arrLen; i++) {
					Ext.getCmp('dow' + d[i]).setValue(true);
				}
			}
		}
	}
});
