from django.shortcuts import render, redirect
from django.http import JsonResponse
from django.conf import settings
from django.core.mail import send_mail
from .forms import MembershipApplicationForm, ContactForm


def index(request):
    return render(request, "index.html")

def about(request):
    return render(request,'about.html')


def leadership(request):
    return render(request,'leadership.html')


from django.core.mail import send_mail
from django.conf import settings

def membership(request):
    if request.method == "POST":
        form = MembershipApplicationForm(request.POST)
        if form.is_valid():
            instance = form.save()

            # Admin notification
            subject_admin = "New Membership Application"
            message_admin = "A new membership application has been submitted.\n\n"
            for field, value in form.cleaned_data.items():
                message_admin += f"{field}: {value}\n"

            send_mail(
                subject_admin,
                message_admin,
                settings.DEFAULT_FROM_EMAIL,
                [settings.CONTACT_EMAIL],  # to you or your team
                fail_silently=False,
            )

            # User confirmation
            user_email = form.cleaned_data.get("email")
            if user_email:
                subject_user = "Your Membership Application Was Received"
                message_user = (
                    "Thank you for applying for membership.\n\n"
                    "We’ve received your application and will get back to you soon."
                )

                send_mail(
                    subject_user,
                    message_user,
                    settings.DEFAULT_FROM_EMAIL,
                    [user_email],
                    fail_silently=True,  # avoid crashing if user email is invalid
                )

            # AJAX response
            if request.headers.get("x-requested-with") == "XMLHttpRequest":
                return JsonResponse({"success": True, "message": "Application submitted successfully!"})
            return redirect("membership")

        else:
            if request.headers.get("x-requested-with") == "XMLHttpRequest":
                return JsonResponse({"success": False, "errors": form.errors})
    else:
        form = MembershipApplicationForm()

    return render(request, "membership.html", {"form": form})


def contact(request):
    if request.method == "POST":
        form = ContactForm(request.POST)
        if form.is_valid():
            contact_message = form.save()

            # Build email content
            subject = f"New Contact Message: {contact_message.subject}"
            message_body = f"""
New contact message submitted on UWISA website:

Name: {contact_message.name}
Email: {contact_message.email}
Phone: {contact_message.phone}
Category: {contact_message.get_category_display()}
Subject: {contact_message.subject}

Message:
{contact_message.message}
"""
            send_mail(
                subject,
                message_body,
                settings.DEFAULT_FROM_EMAIL,  # from
                [settings.CONTACT_EMAIL],     # to
                fail_silently=False,
            )

            if request.headers.get("x-requested-with") == "XMLHttpRequest":
                return JsonResponse({"success": True, "message": "Your message has been sent!"})
            return redirect("contact")
        else:
            if request.headers.get("x-requested-with") == "XMLHttpRequest":
                return JsonResponse({"success": False, "errors": form.errors})
    else:
        form = ContactForm()

    return render(request, "contact.html", {"form": form})


def custom_404_view(request, exception):
    return render(request, "404.html", status=404)
