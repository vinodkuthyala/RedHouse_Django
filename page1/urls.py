from django.urls import path
from .views import HomePageView, AddNewImage, ContactView

app_name = 'page1'

urlpatterns = [
    path('', HomePageView.as_view(), name='index'),
    path("new/", AddNewImage.as_view(), name='newImage'),
    path("contact/", ContactView.as_view(), name='contact')
]
