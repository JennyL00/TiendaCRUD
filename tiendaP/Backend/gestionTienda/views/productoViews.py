from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.serializers import Serializer
from rest_framework.decorators import api_view
from rest_framework import status

from ..models import Producto
from ..serializers import ProductoSerializer

@api_view(['GET'])
def getProductos(request, key):
    producto = Producto.objects.filter(cliente_id=key)
    serializer = ProductoSerializer(producto, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def getProducto(request, keyP):
    producto = Producto.objects.get(codigo=keyP,)
    serializer = ProductoSerializer(instance=producto)
    return Response(serializer.data)

@api_view(['POST'])
def postProducto(request, key):
    serializer = ProductoSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT'])
def putProducto(request, key, keyP):
    data = request.data
    producto = Producto.objects.get(id=keyP, cliente_id=key)
    serializer = ProductoSerializer(instance=producto, data=data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)

@api_view(['DELETE'])
def deleteProducto(request, key, keyP):
    producto = Producto.objects.get(id=keyP, cliente_id=key)
    producto.delete()
    return Response('Cliente eliminado')
