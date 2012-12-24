package nl.ciber.bpm;

import java.io.BufferedInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.StringWriter;
import java.io.Writer;
import java.util.Arrays;
import java.util.Enumeration;
import java.util.List;

import javax.naming.Context;
import javax.naming.InitialContext;
import javax.servlet.ServletException;
import javax.servlet.ServletInputStream;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.http.Header;
import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.client.methods.HttpPut;
import org.apache.http.client.methods.HttpRequestBase;
import org.apache.http.entity.StringEntity;
import org.apache.http.message.BasicHeader;

import com.sap.core.connectivity.api.http.HttpDestination;

/**
 * Servlet implementation class ConnectivityBPM
 */
public class ConnectivityBPM extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public ConnectivityBPM() {
        super();
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

		try {
			// access the HttpDestination for the resource "bpmdest" specified in the web.xml
			Context ctx = new InitialContext();
			HttpDestination destination = (HttpDestination) ctx.lookup("java:comp/env/bpmdest");
			HttpClient createHttpClient = destination.createHttpClient();
			
			String path = this.getBPMServicePath(request);
			
			HttpGet get = new HttpGet(path);
			get.setHeader(this.getAuthorizationHeader(request));
			this.setRequestHeaders(request,get);

			// Execute Call to NW7.3
			HttpResponse resp = createHttpClient.execute(get);
			
			// Handle Response from NW7.3
			HttpEntity entity = resp.getEntity();
			InputStream input = entity.getContent();
			BufferedInputStream bufferedInputStream = new BufferedInputStream(input);
			java.io.OutputStream outputStreamClientResponse = response.getOutputStream();
			
			int intNextByte;
			while ( ( intNextByte = bufferedInputStream.read()  ) != -1 ) {
				outputStreamClientResponse.write(intNextByte); 
			}

		//} catch (DestinationException e) {
		//	throw new RuntimeException(e);
		//} catch (NamingException e) {
		//	throw new RuntimeException(e);
		} catch (Exception e) {
			response.setStatus(500);
		}
		
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		try {
			// access the HttpDestination for the resource "bpmdest" specified in the web.xml
			Context ctx = new InitialContext();
			HttpDestination destination = (HttpDestination) ctx.lookup("java:comp/env/bpmdest");
			HttpClient createHttpClient = destination.createHttpClient();
			
			String path = this.getBPMServicePath(request);
			
			HttpPost post = new HttpPost(path);
			post.setHeader(this.getAuthorizationHeader(request));
			this.setRequestHeaders(request,post);
			
			// Put data submitted to this servlet in the HttpPut
			ServletInputStream inputStream = request.getInputStream();
			Writer writer = new StringWriter();
			int n;
			while ((n = inputStream.read()) != -1) {
                writer.write(n);
            }
			StringEntity stringEntity = new StringEntity(writer.toString());
			post.setEntity(stringEntity);
			
			System.out.println("post="+writer.toString());

			// Execute Call to NW7.3
			HttpResponse resp = createHttpClient.execute(post);
			
			// Handle Response from NW7.3
			HttpEntity entity = resp.getEntity();
			int statusCode = resp.getStatusLine().getStatusCode();
			response.setStatus(statusCode);
			
			// Put Headers in response
			Header[] headerResponse = resp.getAllHeaders();
			for (Header header : headerResponse) {
				response.setHeader(header.getName(), header.getValue());
			}
			
			// Put Content in response
			if (entity != null) {
				InputStream input = entity.getContent();
				BufferedInputStream bufferedInputStream = new BufferedInputStream(input);
				java.io.OutputStream outputStreamClientResponse = response.getOutputStream();
				int intNextByte;
				while ( ( intNextByte = bufferedInputStream.read()  ) != -1 ) {
					outputStreamClientResponse.write(intNextByte); 
				}
			} 

		//} catch (DestinationException e) {
		//	throw new RuntimeException(e);
		//} catch (NamingException e) {
		//	throw new RuntimeException(e);
		} catch (Exception e) {
			response.setStatus(500);
		}
		
	}
	
	
	/**
	 * @see HttpServlet#doPut(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPut(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		try {
			// access the HttpDestination for the resource "bpmdest" specified in the web.xml
			Context ctx = new InitialContext();
			HttpDestination destination = (HttpDestination) ctx.lookup("java:comp/env/bpmdest");
			HttpClient createHttpClient = destination.createHttpClient();
			
			String path = this.getBPMServicePath(request);
			
			HttpPut put = new HttpPut(path);
			put.setHeader(this.getAuthorizationHeader(request));
			this.setRequestHeaders(request,put);
			
			// Put data submitted to this servlet in the HttpPut
			ServletInputStream inputStream = request.getInputStream();
			Writer writer = new StringWriter();
			int n;
			while ((n = inputStream.read()) != -1) {
                writer.write(n);
            }
			StringEntity stringEntity = new StringEntity(writer.toString());
			put.setEntity(stringEntity);

			// Execute Call to NW7.3
			HttpResponse resp = createHttpClient.execute(put);
			
			// Handle Response from NW7.3
			HttpEntity entity = resp.getEntity();
			int statusCode = resp.getStatusLine().getStatusCode();
			response.setStatus(statusCode);
			
			// Put Headers in response
			Header[] headerResponse = resp.getAllHeaders();
			for (Header header : headerResponse) {
				response.setHeader(header.getName(), header.getValue());
			}
			
			// Put Content in response
			if (entity != null) {
				InputStream input = entity.getContent();
				BufferedInputStream bufferedInputStream = new BufferedInputStream(input);
				java.io.OutputStream outputStreamClientResponse = response.getOutputStream();
				int intNextByte;
				while ( ( intNextByte = bufferedInputStream.read()  ) != -1 ) {
					outputStreamClientResponse.write(intNextByte); 
				}
			} 

		//} catch (DestinationException e) {
		//	throw new RuntimeException(e);
		//} catch (NamingException e) {
		//	throw new RuntimeException(e);
		} catch (Exception e) {
			response.setStatus(500);
		}
		
	}
	
	
	private void setRequestHeaders(HttpServletRequest httpServletRequest, HttpRequestBase httpRequestBase) {
    	// Get an Enumeration of all of the header names sent by the client
		Enumeration<String> enumerationOfHeaderNames = httpServletRequest.getHeaderNames();
		while(enumerationOfHeaderNames.hasMoreElements()) {
			String stringHeaderName = (String) enumerationOfHeaderNames.nextElement();
			
		    List<String> blocked = Arrays.asList(BLOCKED);
			
			if(blocked.contains(stringHeaderName.toLowerCase()))
				continue;
			// As per the Java Servlet API 2.5 documentation:
			//		Some headers, such as Accept-Language can be sent by clients
			//		as several headers each with a different value rather than
			//		sending the header as a comma separated list.
			// Thus, we get an Enumeration of the header values sent by the client
			Enumeration<String> enumerationOfHeaderValues = httpServletRequest.getHeaders(stringHeaderName);
			while(enumerationOfHeaderValues.hasMoreElements()) {
				String stringHeaderValue = (String) enumerationOfHeaderValues.nextElement();
				// In case the proxy host is running multiple virtual servers,
				// rewrite the Host header to ensure that we get content from
				// the correct virtual server
				//if(stringHeaderName.equalsIgnoreCase("Host")){
				//	stringHeaderValue = "http://192.168.0.22:50000/";
				//}
				BasicHeader header = new BasicHeader(stringHeaderName, stringHeaderValue);
				
				//System.out.println(stringHeaderName+"="+stringHeaderValue);
				
				httpRequestBase.setHeader(header);
				// Set the same header on the proxy request
				//httpRequestBase.setHeader(stringHeaderName,stringHeaderValue);
			}
		}
    }
	
    private String getBPMServicePath(HttpServletRequest httpServletRequest) {
		// Handle the path given to the servlet
		String stringProxyURL = httpServletRequest.getPathInfo();
		// Handle the query string
		if(httpServletRequest.getQueryString() != null) {
			stringProxyURL += "?" + httpServletRequest.getQueryString();
		}
		return stringProxyURL;
    }
    
    private BasicHeader getAuthorizationHeader(HttpServletRequest request) {
    	
		String authorization = (String) request.getSession().getAttribute("Authorization");
		BasicHeader header = new BasicHeader("Authorization", authorization);
    	return header;
    }
    
    private String BLOCKED[] = { "host", "referer", "content-length","accept-encoding", "cookie" };

}
