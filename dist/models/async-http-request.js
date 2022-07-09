const HEADERS = "headers";
const METHOD = "method";
const IP = "ip";
const TIMEOUT = "timeout";
const SESSION = "session";
const PARAMETERS = "parameters";
const HTTP_PROTOCOL = "http://";
const HTTPS_PROTOCOL = "https://";
const HTTPS = "https";
const QUERY = "query";
const PATH = "path";
const COOKIES = "cookies";
const URL_LABEL = "url";
const BODY = "body";
const UPLOAD = "upload";
const STREAM = "stream";
const FILE_NAME = "filename";
const CONTENT_LENGTH = "size";
const TRUST_ALL_CERT = "trust_all_cert";
const TARGET_HOST = "host";
function setLowerCase(source) {
    const result = {};
    for (const key of Object.keys(source)) {
        result[key.toLowerCase()] = source[key];
    }
    return result;
}
export class AsyncHttpRequest {
    constructor(map) {
        this.headers = {};
        this.queryParams = {};
        this.pathParams = {};
        this.cookies = {};
        this.session = {};
        this.body = null;
        this.trustAllCert = false;
        this.https = false;
        this.contentLength = -1;
        this.timeoutSeconds = -1;
        if (map && map.constructor == Object) {
            this.fromMap(map);
        }
    }
    /**
     * Retrieve the request's HTTP method name
     * (GET, POST, PUT, HEAD, PATCH, DELETE)
     *
     * @returns HTTP method
     */
    getMethod() {
        return this.method;
    }
    /**
     * Set the HTTP method if this is an outgoing HTTP request
     *
     * @param method (GET, POST, PUT, HEAD, PATCH, DELETE)
     * @returns this
     */
    setMethod(method) {
        this.method = method;
        return this;
    }
    /**
     * Retrieve the URI
     *
     * @returns HTTP URI
     */
    getUrl() {
        return this.url;
    }
    /**
     * Set the URI if this is an outgoing HTTP request
     *
     * @param url - the URI portion of the url
     * @returns this
     */
    setUrl(url) {
        this.url = url;
        return this;
    }
    /**
     * Retrieve the IP address of the caller
     *
     * @returns ip address
     */
    getRemoteIp() {
        return this.ip;
    }
    /**
     * Set the caller's IP address if this is an outgoing HTTP request
     *
     * @param ip address
     * @returns this
     */
    setRemoteIp(ip) {
        this.ip = ip;
        return this;
    }
    /**
     * Retrieve all HTTP headers
     *
     * @returns headers(key-values)
     */
    getHeaders() {
        return this.headers;
    }
    /**
     * Retrieve a header value
     *
     * @param key of a header
     * @returns value of the header
     */
    getHeader(key) {
        return this.headers[key];
    }
    /**
     * Set a key-value for a HTTP header
     *
     * @param key of the header
     * @param value of the header
     * @returns
     */
    setHeader(key, value) {
        if (key) {
            this.headers[key.toLowerCase()] = value ? value : "";
        }
        return this;
    }
    /**
     * Retrieve the HTTP request body
     *
     * Note that payload applies to PUT and POST only
     *
     * @returns optional payload
     */
    getBody() {
        return this.body;
    }
    /**
     * Set the HTTP request payload if this is an outgoing HTTP request
     *
     * @param body (aka payload)
     * @returns this
     */
    setBody(body) {
        this.body = body ? body : null;
        return this;
    }
    /**
     * The system will perform HTML/XML/JSON data format conversion.
     * i.e. HTML would become string, XML and JSON becomes a JSON object.
     *
     * For other binary format, the HTTP request payload will be rendered
     * as a stream input object.
     *
     * @returns optional route name of a streaming object
     */
    getStreamRoute() {
        return this.streamRoute;
    }
    /**
     * If you are sending a HTTP request, you can create a stream to render
     * the HTTP request payload.
     *
     * @param streamRoute of the binary payload
     * @returns
     */
    setStreamRoute(streamRoute) {
        if (streamRoute) {
            this.streamRoute = streamRoute;
        }
        return this;
    }
    /**
     * Check if this HTTP request contains a streaming object
     *
     * @returns true or false
     */
    isStream() {
        return this.streamRoute != null;
    }
    /**
     * Retrieve the filename of the input stream
     *
     * @returns filename of the input stream if this is a multi-part message
     */
    getFileName() {
        return this.filename;
    }
    /**
     * Set the filename if this is an outgoing HTTP request object
     *
     * @param filename of the streaming object
     * @returns this
     */
    setFileName(filename) {
        if (filename) {
            this.filename = filename;
        }
        return this;
    }
    /**
     * Check if the input stream is a file object
     *
     * @returns true or false
     */
    isFile() {
        return this.filename != null;
    }
    /**
     * Retreive the request expiry timer in seconds
     *
     * @returns timeout value
     */
    getTimeoutSeconds() {
        return Math.max(0, this.timeoutSeconds ? this.timeoutSeconds : -1);
    }
    /**
     * Set request timeout value
     *
     * @param timeoutSeconds for the request expiry timer
     * @returns this
     */
    setTimeoutSeconds(timeoutSeconds) {
        if (timeoutSeconds) {
            this.timeoutSeconds = Math.max(0, timeoutSeconds);
        }
        return this;
    }
    /**
     * Retrieve the content length of a request payload if any
     *
     * @returns content length
     */
    getContentLength() {
        return Math.max(0, this.contentLength ? this.contentLength : -1);
    }
    /**
     * Since HTTP may use compression algorithm.
     * Normally you do not need to set content length unless you know exactly what you are doing.
     *
     * @param contentLength of the request paylod
     * @returns this
     */
    setContentLength(contentLength) {
        if (contentLength) {
            this.contentLength = Math.max(0, contentLength);
        }
        return this;
    }
    /**
     * Optional session information may be inserted by an externalized API authentication service.
     * e.g. OAuth2.0 authenticator and RBAC validator.
     *
     * Examples for session object are user-ID, user-name and roles.
     *
     * @returns key-values
     */
    getSession() {
        return this.session;
    }
    /**
     * Retrieve a session parameter
     *
     * @param key of a session parameter
     * @returns value of the session parameter
     */
    getSessionInfo(key) {
        return this.session[key.toLowerCase()];
    }
    /**
     * When you implement a custom API authentication service. You can use this method
     * to send session or user profile information to the BFF or user function.
     *
     * @param key of the session parameter
     * @param value of the session parameter
     * @returns this
     */
    setSessionInfo(key, value) {
        if (key) {
            this.session[key.toLowerCase()] = value ? value : "";
        }
        return this;
    }
    /**
     * Remove a session parameter
     *
     * @param key of the session parameter
     * @returns this
     */
    removeSessionInfo(key) {
        if (key) {
            delete this.session[key.toLowerCase()];
        }
        return this;
    }
    /**
     * Retrieve all cookies if any
     *
     * @returns cookies in key-values
     */
    getCookies() {
        return this.cookies;
    }
    /**
     * Retrieve a cookie
     *
     * @param key of a cookie
     * @returns this
     */
    getCookie(key) {
        return this.cookies[key.toLowerCase()];
    }
    /**
     * This is used if your service wants to set a browser cookie
     *
     * @param key of a cookie
     * @param value of a cookie
     * @returns this
     */
    setCookie(key, value) {
        if (key) {
            this.cookies[key.toLowerCase()] = value ? value : "";
        }
        return this;
    }
    /**
     * Remove a cookie from this request dataset
     *
     * This does not clear the cookie in the browser. To clear browser cookie, you use the SetCookie method.
     *
     * @param key of the cookie
     * @returns this
     */
    removeCookie(key) {
        if (key) {
            delete this.cookies[key.toLowerCase()];
        }
        return this;
    }
    /**
     * Retrieve all path parameters
     *
     * @returns key-values
     */
    getPathParameters() {
        return this.pathParams;
    }
    /**
     * Retrieve a path parameter from the URI
     *
     * @param key of a path parameter
     * @returns value
     */
    getPathParameter(key) {
        return key != null ? this.pathParams[key.toLowerCase()] : null;
    }
    /**
     * Set a path parameter if this is an outgoing HTTP request
     *
     * @param key of a path parameter
     * @param value of a path parameter
     * @returns this
     */
    setPathParameter(key, value) {
        if (key) {
            this.pathParams[key.toLowerCase()] = value ? value : "";
        }
        return this;
    }
    /**
     * Remove a path parameter from the HTTP request dataset
     *
     * @param key of a path parameter
     * @returns this
     */
    removePathParameter(key) {
        if (key) {
            delete this.pathParams[key.toLowerCase()];
        }
        return this;
    }
    /**
     * Retrieve the query string from the URI
     *
     * @returns the complete query string
     */
    getQueryString() {
        return this.queryString;
    }
    /**
     * Check if the HTTP request uses HTTPS
     *
     * @returns true or false
     */
    isSecure() {
        return this.https ? true : false;
    }
    /**
     * Use HTTPS if this is an outgoing HTTP request
     *
     * @param https true or false
     * @returns this
     */
    setSecure(https) {
        this.https = https ? true : false;
        return this;
    }
    /**
     * Retrieve the upload tag name in a multi-part file upload request
     *
     * @returns upload tag name
     */
    getUploadTag() {
        return this.upload;
    }
    /**
     * Set the upload tag name if this is an outgoing HTTP request with multi-part file upload
     *
     * @param tag name
     * @returns this
     */
    setUploadTag(tag) {
        if (tag) {
            this.upload = tag;
        }
        return this;
    }
    /**
     * Retrieve the target host name if this is an outgoing HTTP request
     *
     * @returns target host name
     */
    getTargetHost() {
        return this.targetHost;
    }
    /**
     * Set the target host name if this is an outgoing HTTP request
     *
     * @param host name
     * @returns this
     */
    setTargetHost(host) {
        if (host != null && (host.startsWith(HTTP_PROTOCOL) || host.startsWith(HTTPS_PROTOCOL))) {
            this.targetHost = host;
            return this;
        }
        else {
            throw new Error("Invalid host - must starts with " + HTTP_PROTOCOL + " or " + HTTPS_PROTOCOL);
        }
    }
    /**
     * Check if this HTTP request skips certificate verification
     *
     * @returns true or false
     */
    isTrustAllCert() {
        return this.trustAllCert ? true : false;
    }
    /**
     * Decide if this outgoing HTTP request skips certification verification
     *
     * (DO NOT disable certification verification unless this is a trusted zone with self-signed cert)
     *
     * @param trustAllCert true or false
     * @returns this
     */
    setTrustAllCert(trustAllCert) {
        this.trustAllCert = trustAllCert ? true : false;
        return this;
    }
    /**
     * Retrieve a query parameter
     *
     * @param key of a query parameter
     * @returns value
     */
    getQueryParameter(key) {
        if (key) {
            const value = this.queryParams[key.toLowerCase()];
            if (value) {
                if (value.constructor == String) {
                    return value;
                }
                else if (value.constructor == Array) {
                    return String(value[0]);
                }
            }
        }
        return null;
    }
    /**
     * Retrieve a multi-value query parameter
     *
     * @param key of a multi-value parameter
     * @returns a list of strings
     */
    getQueryParameters(key) {
        if (key) {
            const values = this.queryParams[key.toLowerCase()];
            if (values.constructor == String) {
                const result = [];
                result.push(values);
                return result;
            }
            else if (values.constructor == Array) {
                return values;
            }
        }
        else {
            return this.queryParams;
        }
        return null;
    }
    /**
     * Set the value of a query parameter
     *
     * @param key of a query parameter
     * @param value of a query parameter
     * @returns this
     */
    setQueryParameter(key, value) {
        if (key) {
            if (value) {
                if (value.constructor == String) {
                    this.queryParams[key.toLowerCase()] = value;
                }
                else if (value.constructor == Array) {
                    const valueArray = value;
                    const params = [];
                    for (const v of valueArray) {
                        params.push(String(v));
                    }
                    this.queryParams[key.toLowerCase()] = params;
                }
            }
            else {
                this.queryParams[key.toLowerCase()] = '';
            }
        }
        return this;
    }
    /**
     * Convert this HTTP request object to a JSON object
     *
     * @returns a JSON object
     */
    toMap() {
        const result = {};
        if (this.headers && Object.keys(this.headers).length > 0) {
            result[HEADERS] = setLowerCase(this.headers);
        }
        if (this.cookies && Object.keys(this.cookies).length > 0) {
            result[COOKIES] = setLowerCase(this.cookies);
        }
        if (this.session && Object.keys(this.session).length > 0) {
            result[SESSION] = setLowerCase(this.session);
        }
        if (this.method) {
            result[METHOD] = this.method;
        }
        if (this.ip) {
            result[IP] = this.ip;
        }
        if (this.url) {
            result[URL_LABEL] = this.url;
        }
        if (this.timeoutSeconds != -1) {
            result[TIMEOUT] = this.timeoutSeconds;
        }
        if (this.filename) {
            result[FILE_NAME] = this.filename;
        }
        if (this.contentLength != -1) {
            result[CONTENT_LENGTH] = this.contentLength;
        }
        if (this.streamRoute) {
            result[STREAM] = this.streamRoute;
        }
        if (this.body) {
            result[BODY] = this.body;
        }
        if (this.queryString) {
            result[QUERY] = this.queryString;
        }
        if (this.upload) {
            result[UPLOAD] = this.upload;
        }
        const hasPathParams = Object.keys(this.pathParams).length > 0;
        const hasQueryParams = Object.keys(this.queryParams).length > 0;
        if (hasPathParams || hasQueryParams) {
            const parameters = {};
            result[PARAMETERS] = parameters;
            if (hasPathParams) {
                parameters[PATH] = setLowerCase(this.pathParams);
            }
            if (hasQueryParams) {
                parameters[QUERY] = setLowerCase(this.queryParams);
            }
        }
        result[HTTPS] = this.https;
        /*
         * Optional HTTP host name in the "relay" field
         *
         * This is used by the rest-automation "async.http.request" service
         * when forwarding HTTP request to a target HTTP endpoint.
         */
        if (this.targetHost) {
            result[TARGET_HOST] = this.targetHost;
            result[TRUST_ALL_CERT] = this.trustAllCert;
        }
        return result;
    }
    /**
     * Convert a JSON object into a HTTP request object
     *
     * Normally you should use the constructor to do this conversion.
     *
     * Assuming the function is a BFF service that listens to HTTP request event from the REST automation,
     * you can do this:
     *
     * const request = new AsyncHttpRequest(event.getBody());
     *
     * @param map input JSON object
     */
    fromMap(map) {
        if (map && map.constructor == Object) {
            if (HEADERS in map) {
                this.headers = setLowerCase(map[HEADERS]);
            }
            if (COOKIES in map) {
                this.cookies = setLowerCase(map[COOKIES]);
            }
            if (SESSION in map) {
                this.session = setLowerCase(map[SESSION]);
            }
            if (METHOD in map) {
                this.method = map[METHOD];
            }
            if (IP in map) {
                this.ip = map[IP];
            }
            if (URL_LABEL in map) {
                this.url = map[URL_LABEL];
            }
            if (TIMEOUT in map) {
                this.timeoutSeconds = map[TIMEOUT];
            }
            if (FILE_NAME in map) {
                this.filename = map[FILE_NAME];
            }
            if (CONTENT_LENGTH in map) {
                this.contentLength = map[CONTENT_LENGTH];
            }
            if (STREAM in map) {
                this.streamRoute = map[STREAM];
            }
            if (BODY in map) {
                this.body = map[BODY];
            }
            if (QUERY in map) {
                this.queryString = map[QUERY];
            }
            if (HTTPS in map) {
                this.https = map[HTTPS];
            }
            if (TARGET_HOST in map) {
                this.targetHost = map[TARGET_HOST];
            }
            if (TRUST_ALL_CERT in map) {
                this.trustAllCert = map[TRUST_ALL_CERT];
            }
            if (UPLOAD in map) {
                this.upload = map[UPLOAD];
            }
            if (PARAMETERS in map) {
                const parameters = map[PARAMETERS];
                if (PATH in parameters) {
                    this.pathParams = setLowerCase(parameters[PATH]);
                }
                if (QUERY in parameters) {
                    this.queryParams = setLowerCase(parameters[QUERY]);
                }
            }
        }
    }
}
//# sourceMappingURL=async-http-request.js.map