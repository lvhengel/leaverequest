sap.ui.controller("leaverequest.shell", {


/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
*/
   onInit: function() {
	   var oShell = sap.ui.getCore().byId("leaverequestShell");
	   oShell.setContent(this.getLoginView());
   },

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
	
	getLoginView : function() {
		
		var oView = sap.ui.getCore().byId("view.login");
		if (!oView) {
			oView = sap.ui.view({
				type : sap.ui.core.mvc.ViewType.JS,
				id : "view.login",
				viewName : "leaverequest.login"
			});
		}
		return oView;
	},
	
	getLeaveView : function() {
		
		var oView = sap.ui.getCore().byId("view.leave");
		if (!oView) {
			oView = sap.ui.view({
				type : sap.ui.core.mvc.ViewType.JS,
				id : "view.leave",
				viewName : "leaverequest.leave"
			});
		}
		return oView;
	},

	getApproveView : function() {
		
		var oView = sap.ui.getCore().byId("view.approve");
		if (!oView) {
			oView = sap.ui.view({
				type : sap.ui.core.mvc.ViewType.JS,
				id : "view.approve",
				viewName : "leaverequest.approve"
			});
		}
		return oView;
	},
	
	navigateToView : function(loginData) {
		
		var split = loginData.split("|");
		var fullname = split[0];
		var role = split[1];
		
		var oShell = sap.ui.getCore().byId("leaverequestShell");
		
    	oShell.addHeaderItem(new sap.ui.commons.TextView({text: "Welcome " + fullname, tooltip: fullname}));
		oShell.setShowLogoutButton(true);
		
		// Remove Login Workitem
		oShell.destroyWorksetItems();
		
		var oView;
		
		if (role == "manager") {
			// Approve View
			oView = this.getApproveView();

	  	  	// Approve Workitem
	  	  	oShell.addWorksetItem(new sap.ui.ux3.NavigationItem({
	  		  key : "wi_approve",
	  		  text : "Approve Leave"
	  	  	}));
	  	  	
	  	  	// Get Tasks
	  	  	var oCtrl = oView.getController();
	  	  	oCtrl.getTasks();
	  	  	
		} else  {
			// Leave View
			oView = this.getLeaveView();

	  	  	// Leave Workitem
	  	  	oShell.addWorksetItem(new sap.ui.ux3.NavigationItem({
	  		  key : "wi_leave",
	  		  text : "Enter Leave Request"
	  	  	}));
		} 
		
		oShell.setContent(oView);
		
	},
	
	
	navigateToLogin : function() {
		
		var oShell = sap.ui.getCore().byId("leaverequestShell");
		
    	oShell.destroyHeaderItems();
		oShell.setShowLogoutButton(false);
		
		var oView = this.getLoginView();
		
		oShell.setContent(oView);
		oShell.destroyWorksetItems();
  	  	oShell.addWorksetItem(new sap.ui.ux3.NavigationItem({
  	  		key : "wi_login",
  	  		text : "Login"
  	  	}));

	},
	
	logout : function() {
		
    	$.ajax({ 
			 type: 'get', 
			 url: 'LoginProxyServlet?action=logout',
			 dataType: 'text',
			 success: function(data) {
				 var logoutData = $.trim(data);
				 if (logoutData == "OK") {
						var oView = sap.ui.getCore().byId("view.shell");
						var oCtrl = oView.getController();
						
						var oUserNameTextField = sap.ui.getCore().byId('username');
						oUserNameTextField.setValue("");
						var oPasswordTextField = sap.ui.getCore().byId('password');
						oPasswordTextField.setValue("");
						
						oCtrl.navigateToLogin();
				 } else {
					 alert('Logout failed! Please try again');
				 }
			}
 	    });	
	},
	

});
