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
