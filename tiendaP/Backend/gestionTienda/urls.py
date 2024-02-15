from django.urls import path
from .views import productoViews, clienteViews
urlpatterns=[
    path('cliente/lista', clienteViews.getClientes),
    path('cliente/crear', clienteViews.postCliente),
    path('cliente/editar/<int:key>', clienteViews.putCliente),
    path('cliente/borrar/<int:key>', clienteViews.deleteCliente),
    path('cliente/<int:key>', clienteViews.getCliente),

    path('cliente/<int:key>/producto/lista', productoViews.getProductos),
    path('cliente/<int:key>/producto/crear', productoViews.postProducto),
    path('cliente/<int:key>/producto/editar/<int:keyP>', productoViews.putProducto),
    path('cliente/<int:key>/producto/borrar/<int:keyP>', productoViews.deleteProducto),
    path('producto/<int:keyP>', productoViews.getProducto),
]