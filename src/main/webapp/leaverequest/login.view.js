sap.ui.jsview("leaverequest.login", {

      getControllerName : function() {
         return "leaverequest.login";
      },

      createContent : function(oController) {

    	var aControls = [];
    	  
    	// Login Form
		var oMatrix = new sap.ui.commons.layout.MatrixLayout({
			id : 'loginMatrix',
			layoutFixed : true,
			width : '300px',
			columns : 2,
			widths : ['150px', '150px'] });
		
		var oUserNameTextField = new sap.ui.commons.TextField('username');
		oUserNameTextField.setValue("");
		oUserNameTextField.setWidth('150px');
		var oUserNameLabel = new sap.ui.commons.Label({text:"User: ", labelFor:oUserNameTextField});
		oMatrix.createRow(oUserNameLabel, oUserNameTextField);

		var oPasswordTextField = new sap.ui.commons.PasswordField('password');
		oPasswordTextField.setWidth('150px');
		oPasswordTextField.setValue("");
		var oPasswordLabel = new sap.ui.commons.Label({text:"Password: ", labelFor:oPasswordTextField});
		oMatrix.createRow(oPasswordLabel, oPasswordTextField);
		
		aControls.push(oMatrix);
		
		var oButton = new sap.ui.commons.Button({text: "Log On"});
		oButton.attachPress(oController.doLogin);
		
		aControls.push(oButton);

    	return aControls;
      }

});
