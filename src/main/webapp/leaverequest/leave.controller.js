sap.ui.controller("leaverequest.leave", {


/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
*/
//   onInit: function() {
//
//   },

/**
* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
* (NOT before the first rendering! onInit() is used for that one!).
*/
//   onBeforeRendering: function() {
//
//   },

/**
* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
* This hook is the same one that SAPUI5 controls get after being rendered.
*/
//   onAfterRendering: function() {
//
//   },

/**
* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
*/
//   onExit: function() {
//
//   }
	
	submitForm: function() {
		
		var processdefId;
		var processstartId;
		
		var leaveType = sap.ui.getCore().byId("leavetype").getSelectedKey();
		var startDate = formatDate(sap.ui.getCore().byId("startdate").getYyyymmdd());
		var endDate = formatDate(sap.ui.getCore().byId("enddate").getYyyymmdd());
		
		// Retrieve Process Definition

		$.ajax({ 
	  		type: 'GET', 
	  	 	url: 'bpm/bpemservices/processdefinitions?vendor=ciber.nl&dcName=leaverequest~bpm&processName=LeaveRequest',
	    	dataType: 'json',
	    	contentType: 'application/json',
	     	success: function(data) {
	     		processdefId = data.ProcessDefinitions.ProcessDefinition.id;
	     		
     			// Get Process Start Event
    			$.ajax({ 
    		  		type: 'GET', 
    		  	 	url: 'bpm/bpemservices/processstartevents?processDefinitionId='+processdefId,
    		    	dataType: 'json',
    		    	contentType: 'application/json',
    		     	success: function(data) {
    		     		
    		     		processstartId = data.ProcessStartEvents.ProcessStartEvent.id;

    		     		// Process Start Data
    		     		processstartId = processstartId.substr(processstartId.lastIndexOf("/")+1);
    		     		
    		    		$.ajax({ 
    	    		  		type: 'GET', 
    	    		  	 	url: 'bpm/bpemservices/processstartevents/'+processstartId,
    	    		    	dataType: 'xml',
    	    		    	contentType: 'application/xml',
    	    		     	success: function(xml) {
    	    		     		
    	    		  	  		var properties = xml.getElementsByTagName('property');
    	    					var valueElement,valueText;

    	    					for (var i=0;i<properties.length;i++)
    	    					{
    	    						valueElement=xml.createElementNS('http://sap.com/bpm/rest','value');
    	    						name = properties[i].childNodes[0].firstChild.nodeValue;
    	    						if (name == "DateTo") {
    	    							valueText=xml.createTextNode(endDate);
    	    						} else if (name == "DateFrom") {
    	    							valueText=xml.createTextNode(startDate);
    	    						} else if (name == "Type") {
    	    							valueText=xml.createTextNode(leaveType);
    	    						} else {
    	    							valueText=xml.createTextNode("");
    	    						}
    	    						valueElement.appendChild(valueText);
    	    						properties[i].appendChild(valueElement);
    	    					} 
    	    					var xmlString = (new XMLSerializer()).serializeToString(xml);
    	    		     		
    	    		     		// Submit Process Start Event
	    		     			$.ajax({ 
	    		     				 type: 'POST', 
	    		     				 url: 'bpm/bpemservices/processstartevents/'+processstartId,
	    		     				 data: xmlString,
	    		     				 dataType: 'xml',
	    		     				 contentType: 'application/xml',
	    		     				 success: function(test) {
	    		     						sap.ui.getCore().byId("matrixLeave").setVisible(false);
	    		     						sap.ui.getCore().byId("matrixSubmitted").setVisible(true);
	    		     				 }
	    		     			});
    	    		     	}
    	    		     });
    		     	}
    			});
	     	}
		});
	},
	
	initializeView : function () {
		
		var oMatrix = sap.ui.getCore().byId("matrixLeave");
		var oMatrix1 = sap.ui.getCore().byId("matrixSubmitted");
		oMatrix.setVisible(true);
		oMatrix1.setVisible(false);
	}

});
