from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from django.core.management.utils import get_random_secret_key  
from .models import ManageCard, ContactUs
from django.http import JsonResponse
from django.contrib.auth.hashers import make_password, check_password

# Create your views here.
def index(request):
    return render(request, 'home/index.html')

def manage_card(request):
    if request.user.is_authenticated:
        all_cards = ManageCard.objects.filter(user=request.user)
        context = {'all_cards': all_cards}
        return render(request, 'home/manage-card.html', context)
    else:
        return redirect('index')


def add_card(request):
    if request.method == 'POST':
        user = request.user
        card_type = request.POST['card_type']
        card_owner = request.POST['card_owner']
        card_number = request.POST['card_number']
        card_exp = request.POST['card_exp']
        card_cvv = request.POST['card_cvv']
        card_pin = request.POST['card_pin']
        card_amount = 5000000
        card_auth = get_random_secret_key()
        
        card_number = card_number[:4] + ' **** **** ****'
        card_cvv = make_password(card_cvv)
        card_pin = make_password(card_pin)
        
        if ManageCard.objects.filter(card_number__iexact=card_number).exists():
            return JsonResponse({'status':"Card already exist, try another..."})
        
        new_card = ManageCard.objects.create(
                                            user=user, card_type=card_type, 
                                            card_number=card_number, card_owner=card_owner,
                                            card_exp=card_exp, card_cvv=card_cvv,
                                            card_pin=card_pin, card_amount=card_amount, 
                                            card_auth=card_auth
                                            )
        new_card.save()


    return JsonResponse({'status':"Card added successfully"})


def delete_card(request):
    if request.method == 'POST':
        if request.user.is_authenticated:
            card_id = int(request.POST.get('card_id'))
            ManageCard.objects.filter(user=request.user, id=card_id).delete()
            
            return JsonResponse({'status':"Card deleted successfully"})
        else:
            return JsonResponse({'status':"An error occured"})


def contact_us(request):
    if request.method == 'POST':
        full_name = request.POST['full_name']
        email = request.POST['email']
        message = request.POST['message']
    
    new_message = ContactUs.objects.create(
        full_name=full_name, email=email, message=message
    )
    
    new_message.save()
    return JsonResponse({'status':"Thank you, we'll get back to you shortly"})


def handler404(request, exception):
    context = {}
    response = render(request, "home/error_404.html", context=context)
    response.status_code = 404
    return response

