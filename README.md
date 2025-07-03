# Catedra_3_Sol_Mov  
Mini Proyecto Restaurante de Hamburguesas - CopperBites

## Descripción

Este proyecto es una aplicación frontend desarrollada en React Native para un restaurante de hamburguesas.  
Permite a los usuarios registrarse y autenticarse, comunicándose con un backend que maneja la lógica y la autenticación.

Para realizar las solicitudes HTTP al backend se utiliza **Axios**, una librería que facilita las llamadas a APIs y el manejo de respuestas.

Es importante tener el backend corriendo para que las funcionalidades de login y registro funcionen correctamente.  
Además, para que la comunicación funcione, es necesario configurar correctamente la IP del backend en el archivo `api.js`.

## Clonar el proyecto

Clona el repositorio con el siguiente comando:

```bash
git clone https://github.com/JJAroca/Catedra_3_Sol_Mov.git

```  

Luego, ingresa a la carpeta del proyecto:
 cd CopperBitesFront

Posterior a este instalar dependencias:
npm i

## Configuración de la conexión con el backend
La comunicación con el backend se realiza a través del archivo api.js, que contiene la URL base para las peticiones.

Para que la aplicación funcione correctamente, debes actualizar la IP en api.js según la IP local de tu máquina donde corre el backend.

Para obtener tu IP local, abre la terminal y ejecuta:

En Windows:

Usar: ipconfig


Usar el siguiente github para backend:
git clone https://github.com/zeosjb/CopperBitesSqlite.git

## Importante
-Tener cuidado con .env

## Uso
Para iniciar la aplicación, ejecutar:

- npx expo start
Esto abrirá Expo Developer Tools en el navegador, desde donde puedes lanzar la app en un emulador o dispositivo físico.

## Notas Importantes

-Asegúrate de que el backend esté corriendo y accesible en la IP y puerto configurados.

-Si cambias de red o equipo, recuerda actualizar la IP en api.js.


