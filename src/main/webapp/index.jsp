<%
	String authorization = (String) request.getSession().getAttribute("Authorization");
%>
<!DOCTYPE HTML>
<html>
       <head>
              <meta http-equiv="X-UA-Compatible" content="IE=edge">
              <title>Leave Request with SAP NetWeaver Cloud!</title>

   			   <!-- <script src="resources/sap-ui-core.js"
                      id="sap-ui-bootstrap"
                      data-sap-ui-libs="sap.ui.commons,sap.ui.table,sap.ui.ux3"
                      data-sap-ui-theme="sap_goldreflection" >
   			  </script>

   			  <script id="sap-ui-bootstrap" type="text/javascript" src="https://sapui5.netweaver.ondemand.com/resources/sap-ui-core.js"
					  data-sap-ui-theme="sap_goldreflection" data-sap-ui-xx-preload="sync" data-sap-ui-libs="sap.ui.commons,sap.ui.ux3,sap.ui.table"></script>
   			  -->
   			  <script id="sap-ui-bootstrap"
        			type="text/javascript"
        			src="https://sapui5.netweaver.ondemand.com/resources/sap-ui-core.js"
        			data-sap-ui-theme="sap_goldreflection"
        			data-sap-ui-libs="sap.ui.commons,sap.ui.ux3,sap.ui.table"></script>
   			  
              <!-- add sap.ui.table,sap.ui.ux3 and/or other libraries to 'data-sap-ui-libs' if required -->
			  <script src="scripts/utils.js"></script>
   			  <script>
                     sap.ui.localResources("leaverequest");
                     var view = sap.ui.view({id:"view.shell", viewName:"leaverequest.shell", type:sap.ui.core.mvc.ViewType.JS});
   			         view.placeAt("content");    
   			  </script>
   			  
       </head>
       <body class="sapUiBody" role="application" >
              <div id="content"></div>  
       </body>
</html>
