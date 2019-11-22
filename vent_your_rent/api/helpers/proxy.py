import urllib
from django.http import HttpResponse

excluded_headers = set([
    # Hop-by-hop headers
    # ------------------
    # Certain response headers should NOT be just tunneled through.  These
    # are they.  For more info, see:
    # http://www.w3.org/Protocols/rfc2616/rfc2616-sec13.html#sec13.5.1
    'connection', 'keep-alive', 'proxy-authenticate',
    'proxy-authorization', 'te', 'trailers', 'transfer-encoding',
    'upgrade',

    # Although content-encoding is not listed among the hop-by-hop headers,
    # it can cause trouble as well.  Just let the server set the value as
    # it should be.
    'content-encoding',

    # Since the remote server may or may not have sent the content in the
    # same encoding as Django will, let Django worry about what the length
    # should be.
    'content-length',
])


def proxy_request(url):
    res = urllib.request.urlopen(url)

    response = HttpResponse(res.read())

    headers = dict(res.info())

    for key in headers:
        if key.lower() in excluded_headers:
            continue
        try:
            response[key] = headers.get(key)
        except:
            pass

    return response
