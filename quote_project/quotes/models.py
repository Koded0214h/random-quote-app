from django.db import models

# Create your models here.
class Quote(models.Model):
    title = models.CharField(max_length=255)
    author = models.CharField(max_length=50)
    
    def __str__(self):
        return f'{self.title} - {self.author}'