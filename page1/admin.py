from django.contrib import admin
from .models import ImagePost

class PostAdmin(admin.ModelAdmin):
    pass
admin.site.register(ImagePost, PostAdmin)

