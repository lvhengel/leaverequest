sap.ui.controller("leaverequest.login", {


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
//   },
	
	doLogin : function() {
		
    	var username = sap.ui.getCore().byId("username").getValue();
    	var password = sap.ui.getCore().byId("password").getValue();
    	
    	form = {username: username, password: password};
    	
    	$.ajax({ 
			 type: 'post', 
			 url: 'LoginProxyServlet',
			 data: form,
			 dataType: 'text',
			 success: function(data) {
				 var loginData = $.trim(data);
				 if (loginData == "NOK") {
					alert('Login failed! Please try again');
				 } else {
					var oView = sap.ui.getCore().byId("view.shell");
					var oCtrl = oView.getController();
					oCtrl.navigateToView(loginData);
				 }
			}
 	    });	
	}
});
