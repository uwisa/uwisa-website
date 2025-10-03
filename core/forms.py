from django import forms
from .models import MembershipApplication, ContactMessage


class MembershipApplicationForm(forms.ModelForm):
    class Meta:
        model = MembershipApplication
        fields = [
            "full_name",
            "email",
            "phone",
            "address",
            "sector",
            "employer",
            "job_title",
            "citizenship",
            "terms_agreed",
        ]
        widgets = {
            "full_name": forms.TextInput(attrs={"placeholder": "Enter your full name"}),
            "email": forms.EmailInput(attrs={"placeholder": "Enter your email address"}),
            "phone": forms.TextInput(attrs={"placeholder": "Enter your phone number"}),
            "address": forms.TextInput(attrs={"placeholder": "Enter your address"}),
            "employer": forms.TextInput(attrs={"placeholder": "Enter your employer's name"}),
            "job_title": forms.TextInput(attrs={"placeholder": "Enter your job title"}),
        }

class ContactForm(forms.ModelForm):
    class Meta:
        model = ContactMessage
        fields = ["name", "email", "phone", "category", "subject", "message"]
        widgets = {
            "name": forms.TextInput(attrs={"placeholder": "Enter your full name"}),
            "email": forms.EmailInput(attrs={"placeholder": "Enter your email address"}),
            "phone": forms.TextInput(attrs={"placeholder": "Enter your phone number"}),
            "subject": forms.TextInput(attrs={"placeholder": "Enter the subject of your inquiry"}),
            "message": forms.Textarea(attrs={"rows": 6, "placeholder": "Please provide details about your inquiry..."}),
        }