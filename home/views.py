from django.shortcuts import render

# Create your views here.
def index(request):
    
    return render(request, 'home/index.html')



def handler404(request, exception):
    context = {}
    response = render(request, "home/error_404.html", context=context)
    response.status_code = 404
    return response