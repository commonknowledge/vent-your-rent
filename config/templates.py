from django.template.response import TemplateResponse

def index(request, _):
  return TemplateResponse(request, 'index.html', {})