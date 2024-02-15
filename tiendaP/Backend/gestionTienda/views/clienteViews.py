from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.serializers import Serializer
from rest_framework.decorators import api_view
from rest_framework import status

from ..models import Cliente
from ..serializers import ClienteSerializer

@api_view(['GET'])
def getClientes(request):
    cliente = Cliente.objects.all()
    serializer = ClienteSerializer(cliente, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def getCliente(request, key):
    cliente = Cliente.objects.get(clienteId=key)
    serializer = ClienteSerializer(instance=cliente)
    return Response(serializer.data)

@api_view(['POST'])
def postCliente(request):
    serializer = ClienteSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT'])
def putCliente(request, key):
    data = request.data
    cliente = Cliente.objects.get(id=key)
    serializer = ClienteSerializer(instance=cliente, data=data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)

@api_view(['DELETE'])
def deleteCliente(request, key):
    cliente = Cliente.objects.get(id=key)
    cliente.delete()
    return Response('Cliente eliminado')
