sap.ui.controller("leaverequest.approve", {


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
	
	getTasks: function() {
		
		var oModel = new sap.ui.model.json.JSONModel();
		
		$.ajax({ 
			type: 'GET', 
			url: 'bpm/bpemservices/taskinstances?status=READY&status=RESERVED',
			dataType: 'json',
			contentType: 'application/json',
			success: function(data) {
				
				var obj = data['TaskAbstracts']['TaskAbstract'];
				
				if (!obj || typeof obj.length === "undefined") { // Temp fix. if only 1 object is returned the data is not displayed in Table
					data.TaskAbstracts.TaskAbstract = [obj,"dummy"];
				}
				
				oModel.setData({modelData: data});
				var oTable = sap.ui.getCore().byId("tableApprove");
		  		oTable.setModel(oModel);
		  		oTable.bindRows("/modelData/TaskAbstracts/TaskAbstract");
			}
		});
		
	},

	taskSelect: function(oEvent) {
		var selectedRowContext = oEvent.getParameter("rowContext");
		var oModel = this.getModel();
		var id = oModel.getProperty("id", selectedRowContext);
		if (!id) {
			// Skip
		} else {
			
			sap.ui.getCore().byId("matrixApprove").setVisible(true);
			sap.ui.getCore().byId("matrixTable").setVisible(false);
			
			var taskid = id.substr(id.lastIndexOf("/")+1);
		
			$.ajax({ 
		  		type: 'GET', 
		  	 	url: 'bpm/bpemservices/taskinstances/' + taskid + '/input',
		    	dataType: 'json',
		    	contentType: 'application/json',
		     	success: function(json) {
		     		
		     		var obj = json['ns2.DataObject']['ns2.containment']['ns2.containment']['ns2.property'];
		     		
		    		var leavetype = "";
		    		var startDate = "";
		    		var endDate = "";
		     		
		     		for (var key in obj) {
		     			
		     			var property = obj[key];
		     			var name = property['ns2.name'];
		     			var value = property['ns2.value'];
		     			
		     			if (name == "Type") {
		     				leavetype = value;
		     			} else if (name == "DateFrom") {
		     				startDate = value;
		     			} else if (name == "DateTo") {
		     				endDate = value;
		     			}
		     		}
		     		
		     		
	     			var oId = new sap.ui.getCore().byId("taskid"); 
	     			var oFullName = new sap.ui.getCore().byId("approveFullName");
	     			var oLeaveType = new sap.ui.getCore().byId("approveLeavetype");
	     			var oStartDate = new sap.ui.getCore().byId("approveStartdate");
	     			var oEndDate = new sap.ui.getCore().byId("approveEnddate");
	     			
	     			oId.setValue(taskid);
	     			oFullName.setText("Leo van Hengel");
	     			oLeaveType.setText(leavetype);
	     			oStartDate.setText(startDate);
	     			oEndDate.setText(endDate);
		     	}
			});
		}
	},

	approveTask: function(oEvent) {
			
		var leaveType = sap.ui.getCore().byId("approveLeavetype").getText();
		var startDate = sap.ui.getCore().byId("approveStartdate").getText();
		var endDate = sap.ui.getCore().byId("approveEnddate").getText();
		var taskid = sap.ui.getCore().byId("taskid").getValue();
		var reason = sap.ui.getCore().byId("approveReason").getValue();
		
		var approved = "True";
		
		// Get TaskOutput
		$.ajax({ 
	  		type: 'GET', 
	  	 	url: 'bpm/bpemservices/taskinstances/' + taskid + '/output?schema=true',
	    	dataType: 'xml',
	    	contentType: 'application/xml',
	     	success: function(xml) {

	  	  		var properties = xml.getElementsByTagName('property');
				var valueElement,valueText;

				for (var i=0;i<properties.length;i++)
				{
					valueElement=xml.createElementNS('http://sap.com/bpm/rest','value');
					name = properties[i].childNodes[0].firstChild.nodeValue;
					if (name == "Reason") {
						valueText=xml.createTextNode(reason);
					} else if (name == "Approved") {
						valueText=xml.createTextNode(approved);
					} else if (name == "DateTo") {
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
				
				//Claim Task
				 $.ajax({ 
					 type: 'PUT', 
					 url: 'bpm/bpemservices/taskinstances/' + taskid + '?action=CLAIM',
					 data: ' ', // Send some data, otherwise we get an 400 BAD Request error?
					 success: function() {
						 
								//Complete Task
								$.ajax({ 
									 type: 'PUT', 
									 url: 'bpm/bpemservices/taskinstances/' + taskid + '?action=COMPLETE',
									 data: xmlString,
									 dataType: 'xml',
									 contentType: 'application/xml',
									 success: function(xml) {
									 
										 	// Return to Task List
											sap.ui.getCore().byId("matrixApprove").setVisible(false);
											sap.ui.getCore().byId("matrixTable").setVisible(true);
											
											// Retrieve Tasks again
											var oView = sap.ui.getCore().byId("view.approve");
											if (!oView) {
												oView = sap.ui.view({
													type : sap.ui.core.mvc.ViewType.JS,
													id : "view.approve",
													viewName : "leaverequest.approve"
												});
											}
									  	  	var oCtrl = oView.getController();
									  	  	oCtrl.getTasks();
									 }
								});
					}
		 		 });
				
				console.log(xmlString);
	     	}
		});
	},


	rejectTask: function(oEvent) {
		
		alert('Under construction!');
		
	 	// Return to Task List
		sap.ui.getCore().byId("matrixApprove").setVisible(false);
		sap.ui.getCore().byId("matrixTable").setVisible(true);
	}

});
