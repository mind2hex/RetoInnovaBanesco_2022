from PIL import Image


#el usuario ingresa la ruta de la imagen
ruta = input("Ingrese la ruta de la imagen: ")

#se abre la imagen
imagen = Image.open(ruta)
imagen = imagen.convert("L")

imagen.save("imagen_gris.jpg")