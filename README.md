Proyecto Técnico - Evaluación Netby

Este repositorio contiene una aplicación compuesta por un frontend desarrollado en Angular 20 y dos microservicios desarrollados con .NET Core.

Estructura del Proyecto

- **/frontend/**: Aplicación Angular con formularios, filtros avanzados y consumo de APIs REST.
- **/backend/**:
  - **ProductosPrueba.API**: Microservicio para la gestión de productos.
  - **Transacciones.API**: Microservicio para la gestión de transacciones de compra/venta.

Requisitos
Frontend
- Node.js 18+
- Angular CLI 20+
- npm
Backend
- .NET SDK 7.0+
- SQL Server o SQL Express

Configuración
SQL 
1. Ejecutar el archivo Generacion de Base de datos.sql adjunto en la raíz del proyecto

Frontend
1. Ejecutar npm install
2. Levantar ng serve
3. 
Backend
1. Abrir cada microservicio en Visual Studio o VS Code.
2. Configurar la cadena de conexión en `appsettings.json`.
3. Levantar ambos servicios:

```bash
cd backend/ProductosPrueba.API
dotnet run

cd ../Transacciones.API
dotnet run
```
Listado dinamico con paginacion
Productos
![image](https://github.com/user-attachments/assets/3bb67ffd-1c3d-44a7-b5e1-2b12ae31ad70)
Transacciones 
![image](https://github.com/user-attachments/assets/ec0862c0-418c-4870-b528-07ecf4a3b158)
Pantalla de creacion Productos
![image](https://github.com/user-attachments/assets/e67d74fa-4926-48e0-81b9-23fc1f1c6229)
Pantalla de edicion de Productos
![image](https://github.com/user-attachments/assets/2969d3af-5d64-4bc9-9744-0c0cb878887f)
Pantalla para creacion de transacciones
![image](https://github.com/user-attachments/assets/90cbbc41-8467-4bf2-9c8f-5a255627074b)
Pantalla de edicion de transacciones
![image](https://github.com/user-attachments/assets/c19bd034-6cf8-49e0-9cda-a27d2ea27c22)
Pantalla Filtros dinamicos
![image](https://github.com/user-attachments/assets/4da2b9fd-f014-427d-a72d-fde7cab12fad)
