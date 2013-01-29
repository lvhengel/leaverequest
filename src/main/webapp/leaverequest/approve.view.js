sap.ui.jsview("leaverequest.approve", {

      getControllerName : function() {
         return "leaverequest.approve";
      },

      createContent : function(oController) {

    	  	var aControls = [];
    	  
			var oMatrixTable = new sap.ui.commons.layout.MatrixLayout({
				id : 'matrixTable',
				layoutFixed : true,
				width : '100%'});
    	  	
	  		// Create Table
	  		var oTable = new sap.ui.table.DataTable('tableApprove');
	  		oTable.addColumn(new sap.ui.table.Column({
	  			label: new sap.ui.commons.Label({text: "Subject"}),
	  			template: new sap.ui.commons.TextView().bindProperty("text", "presentationName"),
	  			sortProperty: "presentationName"
	  		}));
	  		oTable.addColumn(new sap.ui.table.Column({
	  			label: new sap.ui.commons.Label({text: "Created Time"}),
	  			template: new sap.ui.commons.TextView().bindProperty("text", "createdTime", function(value) { if (!value) return ""; var date = new Date(value); var formatted = date.getDate() + "-" + date.getMonth() + "-" + date.getFullYear(); return formatted; }),
	  			sortProperty: "createdTime"
	  		}));
	  		oTable.addColumn(new sap.ui.table.Column({
	  			label: new sap.ui.commons.Label({text: "Priority"}),
	  			template: new sap.ui.commons.TextView().bindProperty("text", "priority"),
	  			sortProperty: "priority"
	  		}));
	  		oTable.addColumn(new sap.ui.table.Column({
	  			label: new sap.ui.commons.Label({text: "Status"}),
	  			template: new sap.ui.commons.TextView().bindProperty("text", "status"),
	  			sortProperty: "createdTime"
	  		}));
	  		
	  		oTable.setVisibleRowCount(5);
	  		
			// Attach event to Row Select
			oTable.attachRowSelect(oController.taskSelect);
	  		
			oMatrixTable.createRow(oTable);
			
	  		aControls.push(oMatrixTable);
	  		
	  		// Approval Form
	  		
			var oMatrix = new sap.ui.commons.layout.MatrixLayout({
				id : 'matrixApprove',
				layoutFixed : true,
				width : '550px',
				columns : 2,
				widths : ['150px', '200px'] });
			
			var oId = new sap.ui.commons.TextField("taskid"); 
			oId.setWidth("550px");
			oId.setVisible(false);
			
			oMatrix.createRow(oId);
			
			var oFullName = new sap.ui.commons.TextView("approveFullName");
			var oFullNameLabel = new sap.ui.commons.Label({text:"Name: ", labelFor:oFullName});
			oMatrix.createRow(oFullNameLabel, oFullName);
			
			var oLeaveType = new sap.ui.commons.TextView("approveLeavetype");
			var oLeaveTypeLabel = new sap.ui.commons.Label({text:"Leave Type: ", labelFor:oLeaveType});
			oMatrix.createRow(oLeaveTypeLabel, oLeaveType);
			
			// Create a DatePicker for Start Date	
			var oStartDate = new sap.ui.commons.TextView('approveStartdate');
	        var oStartDateLabel = new sap.ui.commons.Label({text:"Start Date: ", labelFor:oStartDate});
	        oMatrix.createRow(oStartDateLabel,oStartDate);

			// Create a DatePicker for Start Date	
			var oEndDate = new sap.ui.commons.TextView('approveEnddate');
	        var oEndDateLabel = new sap.ui.commons.Label({text:"End Date: ", labelFor:oEndDate});
	        oMatrix.createRow(oEndDateLabel,oEndDate);
	        
	        var oReason = new sap.ui.commons.TextArea('approveReason');
	        oReason.setWidth('350px');
			var oReasonLabel = new sap.ui.commons.Label({text:"Reason: ", labelFor:oReason});
			oMatrix.createRow(oReasonLabel, oReason);

			// Buttons
			var oButtonApprove = new sap.ui.commons.Button({
				text : "Approve",
				style: sap.ui.commons.ButtonStyle.Accept,
				press: oController.approveTask}
			);
			var oButtonReject = new sap.ui.commons.Button({
				text : "Reject",
				style: sap.ui.commons.ButtonStyle.Reject,
				press: oController.rejectTask}
			);

			oCell = new sap.ui.commons.layout.MatrixLayoutCell({ colSpan: 2 });
			oCell.setHAlign(sap.ui.commons.layout.HAlign.Right);
			oCell.addContent(oButtonApprove);
			oCell.addContent(oButtonReject);
			oMatrix.createRow(oCell);
			oMatrix.setVisible(false);
			
			aControls.push(oMatrix);
	  		
	  		return aControls;
      }

});
