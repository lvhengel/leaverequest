sap.ui.jsview("leaverequest.shell", {

      getControllerName : function() {
         return "leaverequest.shell";
      },

      createContent : function(oController) {
    	  
    	  var aControls = [];
    	  
    	  var oShell = new sap.ui.ux3.Shell({
    		id : "leaverequestShell",
    		appTitle : "SAP Leave Request",
    		showSearchTool : false,
    		showInspectorTool : false,
    		showFeederTool : false,
    		showLogoutButton : false,
    		logout: oController.logout
    	  });
    	  
    	  // Login Workitem
    	  oShell.addWorksetItem(new sap.ui.ux3.NavigationItem({
    		  key : "wi_login",
    		  text : "Login"
    	  }));
    	  
    	  aControls.push(oShell);

    	  return aControls;
      }

});
