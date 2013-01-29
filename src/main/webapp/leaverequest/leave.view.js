sap.ui.jsview("leaverequest.leave", {

      getControllerName : function() {
         return "leaverequest.leave";
      },

      createContent : function(oController) {
    	  
    	var aControls = [];
		
		// Matrix Layout for Form
		var oMatrix = new sap.ui.commons.layout.MatrixLayout({
			id : 'matrixLeave',
			layoutFixed : true,
			width : '350px',
			columns : 2,
			widths : ['150px', '200px'] });

		// Create a ComboBox for Leave Type
		var oLeaveType = new sap.ui.commons.ComboBox("leavetype");
		oLeaveType.setTooltip("Leave Type");
		oLeaveType.setEditable(true);
		oLeaveType.setWidth("200px");
		var oItem = new sap.ui.core.ListItem("Annual", {key: "Annual", text: "Annual Leave"});
		oLeaveType.addItem(oItem);
		oItem = new sap.ui.core.ListItem("Compensation", {key: "Compensation", text: "Compensation Leave"});
		oLeaveType.addItem(oItem);
		oItem = new sap.ui.core.ListItem("Sick", {key: "Sick", text: "Sick Leave"});
		oLeaveType.addItem(oItem);
		oItem = new sap.ui.core.ListItem("Maternity", {key: "Maternity", text: "Maternity Leave"});
		oLeaveType.addItem(oItem);
		
		var oLeaveTypeLabel = new sap.ui.commons.Label({text:"Leave Type: ", labelFor:oLeaveType});
		oMatrix.createRow(oLeaveTypeLabel, oLeaveType);

		// Create a DatePicker for Start Date	
		var oStartDate = new sap.ui.commons.DatePicker('startdate');
		oStartDate.setLocale("en-US"); 
        var oStartDateLabel = new sap.ui.commons.Label({text:"Start Date: ", labelFor:oStartDate});
        oMatrix.createRow(oStartDateLabel,oStartDate);

		// Create a DatePicker for Start Date	
		var oEndDate = new sap.ui.commons.DatePicker('enddate');
		oEndDate.setLocale("en-US");
        var oEndDateLabel = new sap.ui.commons.Label({text:"End Date: ", labelFor:oEndDate});
        oMatrix.createRow(oEndDateLabel,oEndDate);

		// Button
		var oButtonSave = new sap.ui.commons.Button({
			text : "Submit",
			style: sap.ui.commons.ButtonStyle.Accept,
			press: oController.submitForm}
		);

		oCell = new sap.ui.commons.layout.MatrixLayoutCell({ colSpan: 2 });
		oCell.setHAlign(sap.ui.commons.layout.HAlign.Right);
		oCell.addContent(oButtonSave);
		oMatrix.createRow(oCell);

		aControls.push(oMatrix);
		
		// Leave Submitted Layout 	
		var oMatrix1 = new sap.ui.commons.layout.MatrixLayout({
			id : 'matrixSubmitted',
			layoutFixed : true,
			width : '350px',
			columns : 2,
			widths : ['150px', '200px'] });
				
	 	var oCell = new sap.ui.commons.layout.MatrixLayoutCell({ colSpan: 2 });

		var oTV = new sap.ui.commons.TextView({
			id : 'messageLeave',
			text : 'Thank you.\n\nYour Leave Request is send to your manager.',
			design : sap.ui.commons.TextViewDesign.H5 });

		oCell.addContent(oTV);
		oMatrix1.createRow(oCell);

		// Button
		var oButtonSave = new sap.ui.commons.Button({
			text : "New Request",
			style: sap.ui.commons.ButtonStyle.Accept,
			press: oController.initializeView}
		);

		oCell = new sap.ui.commons.layout.MatrixLayoutCell({ colSpan: 2 });
		oCell.addContent(oButtonSave);
		oMatrix1.createRow(oCell);
		oMatrix1.setVisible(false);
			
		aControls.push(oMatrix1);

    	return aControls;
      }

});
