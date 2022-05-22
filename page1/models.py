from django.db import models
from django.db.models.fields.files import ImageField


class ImagePost(models.Model):
    image= ImageField()

    def __str__(self,):
        return str(self.image)

# Create your models here.
