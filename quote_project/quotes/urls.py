from django.urls import path
from . import views

urlpatterns = [
    path('random/', views.random_quote, name='random-quote'),
    path('quotes/', views.quotes, name='quotes'),
    path('quotes/<int:pk>/', views.quote_detail, name='quote_detail'),
]
