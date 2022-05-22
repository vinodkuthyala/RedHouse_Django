from django.shortcuts import render
from django.views.generic import TemplateView
from django.conf import settings

from django.views.generic.edit import CreateView
from .models import ImagePost
from django.contrib.auth.mixins import LoginRequiredMixin
from django.core.mail import send_mail



class HomePageView(TemplateView):
    template_name ="home.html"

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['my_thing'] = "Hello World :p This is dynamic"
        context['posts'] = ImagePost.objects.all().order_by('-id')
        return context

    
    def post(self, request, *args, **kwargs):
        print ("comes here")


class AddNewImage(LoginRequiredMixin, CreateView):
    model=ImagePost
    template_name ="newimage.html"
    fields = ['image']
    success_url = "/"

    def dispatch(self, request, *args, **kwargs):
        self.request = request
        return super().dispatch(request, *args, **kwargs)


    def form_valid(self, form):
        obj = form.save(commit=False)
        obj.author = self.request.user
        obj.save()
        return super().form_valid(form)

    def post(self, request, *args, **kwargs):
        image=request.POST.get("image")
        post= ImagePost.objects.create(image=image)
        return render(request, "home.html", content_type="application.html")


class ContactView(LoginRequiredMixin, CreateView):
    model=ImagePost
    template_name ="contact.html"
    fields = ['text']
    success_url = "/"

    def dispatch(self, request, *args, **kwargs):
        self.request = request
        return super().dispatch(request, *args, **kwargs)

    def form_valid(self, form):
        obj = form.save(commit=False)
        obj.author = self.request.user
        obj.save()
        return super().form_valid(form)

    def post(self, request, *args, **kwargs):
        name = request.POST.get("name")
        fromval = request.POST.get("from")
        msg = request.POST.get("msg")
        send_mail(
        'Red House Inquiry',
        msg,
        settings.EMAIL_HOST_USER,
        [settings.EMAIL_HOST_USER],
        fail_silently=False,
        )

        # post= ImagePost.objects.create(image=image)
        return render(request, "home.html", content_type="application.html")
