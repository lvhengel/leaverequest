package nl.ciber.bpm;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import javax.naming.Context;
import javax.naming.InitialContext;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.NameValuePair;
import org.apache.http.client.HttpClient;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.message.BasicNameValuePair;
import org.apache.http.util.EntityUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.sap.core.connectivity.api.http.HttpDestination;
import com.sun.org.apache.xerces.internal.impl.dv.util.Base64;

/**
 * Servlet implementation class LogonServlet
 */
public class LoginProxyServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
	private final Logger logger = LoggerFactory.getLogger(LoginProxyServlet.class);

	/**
	 * @see HttpServlet#HttpServlet()
	 */
	public LoginProxyServlet() {
		super();
	}
	
	protected void doGet(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
	
		String action = request.getParameter("action");
		
		if (action != null && action.equals("logout")) {
			
			// Clean up session
			request.getSession().setAttribute("Authorization",null);
			response.getWriter().println("OK");
		}
	
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doPost(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {

		try {
			// access the HttpDestination for the resource "logindest" specified in the web.xml
			Context ctx = new InitialContext();
			HttpDestination destination = (HttpDestination) ctx.lookup("java:comp/env/logindest");
			HttpClient createHttpClient = destination.createHttpClient();
			
			HttpPost post = new HttpPost("LoginServlet");
			
			String username = request.getParameter("username");
			String password = request.getParameter("password");
			
			List<NameValuePair> nameValuePairs = new ArrayList<NameValuePair>();
	        nameValuePairs.add(new BasicNameValuePair("username", username));
	        nameValuePairs.add(new BasicNameValuePair("password", password));
	        post.setEntity(new UrlEncodedFormEntity(nameValuePairs));
	        
			// Execute Call to NW7.3
			HttpResponse resp = createHttpClient.execute(post);

			// Handle Response from NW7.3
			HttpEntity entity = resp.getEntity();
			String responseEntity = EntityUtils.toString(entity);
			
			if (responseEntity != null && !responseEntity.startsWith("NOK")) {
				// Login succesful put Authorization in Session for later use
				String userpass = username + ":" + password;
				String authorization = "Basic " + Base64.encode(userpass.getBytes());
				
				request.getSession().setAttribute("Authorization",authorization);
				
				// Return to Client
				response.getWriter().println(responseEntity);
			} else {
				// Login NOK or bad response
				response.getWriter().println("NOK");
				logger.error(responseEntity);
			}


		} catch (Exception e) {
			e.printStackTrace();
			response.setStatus(500);
			response.getWriter().println("NOK");
		}

	}

}
