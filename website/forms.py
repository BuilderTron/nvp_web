from django import forms
from django.forms import ModelForm
from .models import Client

class ClientLead(ModelForm):
    class Meta:
        model = Client
        fields = ('name', 'email', 'phone')
        labels = {
            'name':'',
            'email':'',
            'phone':'',
        }
        widgets = {
            'name': forms.TextInput(attrs={'class': 'contact_form_wrapper', 'placeholder': 'Name *'}),
            'email': forms.TextInput(attrs={'class': 'contact_form_wrapper', 'placeholder': 'Email *'}),
            'phone': forms.TextInput(attrs={'class': 'contact_form_wrapper', 'placeholder': 'Phone *'}),

        }
