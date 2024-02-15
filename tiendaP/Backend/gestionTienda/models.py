from django.db import models

# Create your models here.
class Cliente(models.Model):
    clienteId = models.CharField(max_length=11)
    nombre = models.CharField(max_length=50)
    direccion = models.CharField(max_length=50)
    email = models.EmailField(max_length=50)


class Producto(models.Model):
    codigo = models.CharField(max_length=50)
    nombreProducto = models.CharField(max_length=50)
    precio = models.CharField(max_length=10)
    unidadDeMedida = models.CharField(max_length=20)
    cliente = models.ForeignKey(Cliente, on_delete=models.CASCADE)
    cantidad = models.IntegerField

