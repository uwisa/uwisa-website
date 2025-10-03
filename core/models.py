from django.db import models


class MembershipApplication(models.Model):
    # Personal Information
    full_name = models.CharField(max_length=255)
    email = models.EmailField()
    phone = models.CharField(max_length=20)
    address = models.TextField(blank=True, null=True)

    # Employment Info
    SECTOR_CHOICES = [
        ("security", "Security"),
        ("retail", "Retail"),
    ]
    sector = models.CharField(max_length=50, choices=SECTOR_CHOICES)
    employer = models.CharField(max_length=255, blank=True, null=True)
    job_title = models.CharField(max_length=255, blank=True, null=True)

    # Confirmations
    citizenship = models.BooleanField(default=False)
    terms_agreed = models.BooleanField(default=False)

    submitted_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.full_name} ({self.sector})"


class ContactMessage(models.Model):
    CATEGORY_CHOICES = [
        ("membership", "Membership Inquiries"),
        ("legal", "Legal Support"),
        ("general", "General Information"),
        ("feedback", "Feedback & Suggestions"),
    ]

    name = models.CharField(max_length=255)
    email = models.EmailField()
    phone = models.CharField(max_length=20, blank=True, null=True)
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES, blank=True, null=True)
    subject = models.CharField(max_length=255)
    message = models.TextField()

    submitted_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.subject} from {self.name}"