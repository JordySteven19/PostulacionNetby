import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductoService } from '../../../Utils/services/serviciosprod';
import { Producto } from '../../../Utils/Interfaces/Eproducto';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
  selector: 'app-prod1',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    MatPaginatorModule,
    MatTableModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule
  ],
  templateUrl: './prod1.component.html',
  styleUrls: ['./prod1.component.scss']
})
export class Prod1Component implements OnInit {
  productos: Producto[] = [];
  dataSourceProductos = new MatTableDataSource<Producto>();
  displayedColumnsProdCustom: string[] = ['select', 'nombre', 'descripcion', 'categoria', 'precio', 'stock', 'accion'];
  seleccionados = new Set<number>();

  @ViewChild('paginatorProd') paginatorProd!: MatPaginator;

  constructor(private productoService: ProductoService) {}

  ngOnInit(): void {
    this.productoService.getProductos().subscribe({
      next: (data) => {
        this.productos = data;
        this.dataSourceProductos.data = data;
        this.dataSourceProductos.paginator = this.paginatorProd;
      },
      error: (err) => console.error('Error al obtener productos', err)
    });
  }

  aplicarFiltroProd(event: Event) {
    const filtro = (event.target as HTMLInputElement).value;
    this.dataSourceProductos.filter = filtro.trim().toLowerCase();
  }

  toggleFila(producto: Producto) {
    if (producto.id != null) {
      if (this.seleccionados.has(producto.id)) {
        this.seleccionados.delete(producto.id);
      } else {
        this.seleccionados.add(producto.id);
      }
    }
  }

  filaSeleccionada(producto: Producto): boolean {
    return producto.id != null && this.seleccionados.has(producto.id);
  }

  toggleTodos(event: any) {
    if (event.checked) {
      this.dataSourceProductos.data.forEach(p => {
        if (p.id != null) this.seleccionados.add(p.id);
      });
    } else {
      this.seleccionados.clear();
    }
  }

  estaTodoSeleccionado(): boolean {
    const total = this.dataSourceProductos.data.length;
    const seleccionados = this.dataSourceProductos.data.filter(p => p.id != null && this.seleccionados.has(p.id)).length;
    return total > 0 && seleccionados === total;
  }

  esParcial(): boolean {
    const total = this.dataSourceProductos.data.length;
    const seleccionados = this.dataSourceProductos.data.filter(p => p.id != null && this.seleccionados.has(p.id)).length;
    return seleccionados > 0 && seleccionados < total;
  }

  eliminarProducto(id: number) {
    if (confirm('¿Estás seguro de eliminar este producto?')) {
      this.productoService.eliminarProducto(id).subscribe(() => {
        this.productos = this.productos.filter(p => p.id !== id);
        this.dataSourceProductos.data = this.productos;
        this.seleccionados.delete(id);
      });
    }
  }

  eliminarSeleccionados() {
    if (confirm('¿Deseas eliminar los productos seleccionados?')) {
      const ids = Array.from(this.seleccionados);
      ids.forEach(id => {
        if (id != null) {
          this.productoService.eliminarProducto(id).subscribe(() => {
            this.productos = this.productos.filter(p => p.id !== id);
            this.dataSourceProductos.data = this.productos;
          });
        }
      });
      this.seleccionados.clear();
    }
  }

  tieneSeleccion(): boolean {
    return this.seleccionados.size > 0;
  }
}
