def csrf_header_middleware(get_response):
    def middleware(request):
        csrf_token = ""
        if "HTTP_COOKIE" in request.META:
            http_cookies = request.META['HTTP_COOKIE'].split("; ")
            for http_cookie in http_cookies:
                if http_cookie.startswith("csrftoken="):
                    csrf_token = http_cookie.split("=")[1]
        response = get_response(request)
        if 'CSRF_COOKIE' in request.META:
            csrf_token = request.META['CSRF_COOKIE']
        response.__setitem__("X-CSRFToken", csrf_token)
        return response
    return middleware