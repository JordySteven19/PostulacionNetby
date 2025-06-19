
export interface Transaccion {
  id?: number;
  fecha?: string;
 tipo: 'Compra' | 'Venta';
  productoId: number;
  cantidad: number;
  precioUnitario: number;
  precioTotal: number;
  detalle?: string;
  productoNombre?: string; 
}