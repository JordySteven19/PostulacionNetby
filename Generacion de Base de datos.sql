CREATE DATABASE InventarioDB;
GO

USE InventarioDB;
GO

CREATE TABLE Productos (
    Id INT PRIMARY KEY IDENTITY(1,1),
    Nombre NVARCHAR(100) NOT NULL,
    Descripcion NVARCHAR(255),
    Categoria NVARCHAR(100),
    Imagen NVARCHAR(255),
    Precio DECIMAL(10,2) NOT NULL,
    Stock INT NOT NULL
);


USE InventarioDB;
GO
CREATE TABLE Transacciones (
    Id INT PRIMARY KEY IDENTITY(1,1),
    Fecha DATETIME NOT NULL,
    Tipo NVARCHAR(20) NOT NULL, 
    ProductoId INT NOT NULL,
    Cantidad INT NOT NULL,
    PrecioUnitario DECIMAL(10,2) NOT NULL,
    PrecioTotal DECIMAL(10,2) NOT NULL,
    Detalle NVARCHAR(255),
);
