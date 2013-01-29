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
import javax.naming.NamingException;
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

import com.sap.core.connectivity.api.DestinationException;
import com.sap.core.connectivity.api.http.HttpDestination;

/**
 * Servlet implementation class BPMAPIServlet
 */
public class BPMProxyServlet extends HttpServlet {
	
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public BPMProxyServlet() {
        super();
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

		try {
			HttpClient httpClient = createHttpClient();
			
			String path = this.getBPMServicePath(request);
			
			HttpGet get = new HttpGet(path);
			this.setRequestHeaders(request,get);

			// Execute Call to NW7.3
			HttpResponse resp = httpClient.execute(get);
			
			// Handle Response from NW7.3
			HttpEntity entity = resp.getEntity();
			InputStream input = entity.getContent();
			BufferedInputStream bufferedInputStream = new BufferedInputStream(input);
			java.io.OutputStream outputStreamClientResponse = response.getOutputStream();
			
			int intNextByte;
			while ( ( intNextByte = bufferedInputStream.read()  ) != -1 ) {
				outputStreamClientResponse.write(intNextByte); 
			}

		} catch (Exception e) {
			response.setStatus(500);
		}
		
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		try {
			HttpClient httpClient = createHttpClient();
			
			String path = this.getBPMServicePath(request);
			
			HttpPost post = new HttpPost(path);
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

			// Execute Call to NW7.3
			HttpResponse resp = httpClient.execute(post);
			
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

		} catch (Exception e) {
			response.setStatus(500);
		}
		
	}
	
	
	/**
	 * @see HttpServlet#doPut(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPut(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		try {
			HttpClient httpClient = createHttpClient();
			
			String path = this.getBPMServicePath(request);
			
			HttpPut put = new HttpPut(path);
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
			HttpResponse resp = httpClient.execute(put);
			
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
		} catch (Exception e) {
			response.setStatus(500);
		}
		
	}
	
	private HttpClient createHttpClient() throws NamingException, DestinationException {
		
		// access the HttpDestination for the resource "bpmdest" specified in the web.xml
		Context ctx = new InitialContext();
		HttpDestination destination = (HttpDestination) ctx.lookup("java:comp/env/bpmdest");
		HttpClient httpClient = destination.createHttpClient();
		
		return httpClient;
	}
	
	
	@SuppressWarnings("unchecked")
	private void setRequestHeaders(HttpServletRequest request, HttpRequestBase httpRequestBase) {
    	
		// Get all headers from original request
		Enumeration<String> headerNames = request.getHeaderNames();
		
		while(headerNames.hasMoreElements()) {
			String headerName = (String) headerNames.nextElement();
			
		    List<String> blocked = Arrays.asList(BLOCKEDHEADERS);
			
			if(blocked.contains(headerName.toLowerCase()))
				continue; 
			
			Enumeration<String> headerValues = request.getHeaders(headerName);
			while(headerValues.hasMoreElements()) {
				String headerValue = (String) headerValues.nextElement();
				httpRequestBase.setHeader(new BasicHeader(headerName, headerValue));
			}
		}
		
		// Set Basic Authentication Request Header
		httpRequestBase.setHeader(this.getAuthorizationHeader(request));
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
    	
    	// Retrieve Authorization from Session. 
		String authorization = (String) request.getSession().getAttribute("Authorization");
		BasicHeader header = new BasicHeader("Authorization", authorization);
    	return header;
    }
    
    private static String BLOCKEDHEADERS[] = { "host", "referer", "content-length","accept-encoding", "cookie" };

}
