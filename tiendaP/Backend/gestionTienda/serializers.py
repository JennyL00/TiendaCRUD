from rest_framework.serializers import ModelSerializer
from .models import Cliente, Producto

class ClienteSerializer(ModelSerializer):
    class Meta:
        model = Cliente
        fields = '__all__'

class ProductoSerializer(ModelSerializer):
    class Meta:
        model = Producto
        fields = '__all__'
