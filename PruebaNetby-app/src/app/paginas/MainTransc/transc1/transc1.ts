import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Serviciostransc } from '../../../Utils/services/serviciostransc';
import { Transaccion } from '../../../Utils/Interfaces/ETransaccion';

@Component({
  selector: 'app-transc1',
  standalone: true,
  templateUrl: './transc1.html',
  imports: [
    CommonModule,
    RouterModule,
    MatPaginatorModule,
    MatTableModule,
    FormsModule,
    MatCheckboxModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule
  ],
  styleUrls: ['./transc1.scss']
})
export class Transc1 implements OnInit {
  productos: any[] = [];
  transacciones: Transaccion[] = [];

  filtroProducto = '';
  filtroTransaccion = '';

  displayedColumnsProd: string[] = ['nombre', 'categoria', 'precio', 'stock', 'accion'];
  displayedColumnsTrans: string[] = ['select', 'fecha', 'productoNombre', 'tipo', 'cantidad', 'precioUnitario', 'precioTotal', 'accion'];

  dataSourceProductos = new MatTableDataSource<any>();
  dataSourceTransacciones = new MatTableDataSource<Transaccion>();

  seleccionadosTransacciones = new Set<number>();

  @ViewChild('paginatorProd') paginatorProd!: MatPaginator;
  @ViewChild('paginatorTrans') paginatorTrans!: MatPaginator;

  constructor(private servicioTrans: Serviciostransc, private router: Router) {}

  ngOnInit() {
    this.cargarProductos();
    this.cargarTransacciones();
  }

  cargarProductos() {
    fetch('http://localhost:5297/api/productos')
      .then(res => res.json())
      .then(data => {
        this.productos = data;
        this.dataSourceProductos.data = data;
        this.dataSourceProductos.paginator = this.paginatorProd;
      });
  }

  cargarTransacciones() {
    this.servicioTrans.getTransacciones().subscribe(data => {
      this.transacciones = data;
      this.dataSourceTransacciones.data = data;
      this.dataSourceTransacciones.paginator = this.paginatorTrans;
    });
  }

  aplicarFiltroProd(event: Event) {
    const filtro = (event.target as HTMLInputElement).value;
    this.dataSourceProductos.filter = filtro.trim().toLowerCase();
  }

  aplicarFiltroTrans(event: Event) {
    const filtro = (event.target as HTMLInputElement).value;
    this.dataSourceTransacciones.filter = filtro.trim().toLowerCase();
  }

  toggleFila(t: Transaccion) {
    if (t.id === undefined) return;
    if (this.seleccionadosTransacciones.has(t.id)) {
      this.seleccionadosTransacciones.delete(t.id);
    } else {
      this.seleccionadosTransacciones.add(t.id);
    }
  }

  filaSeleccionada(t: Transaccion): boolean {
    return t.id !== undefined && this.seleccionadosTransacciones.has(t.id);
  }

  toggleTodosTransacciones(event: any) {
    if (event.checked) {
      this.dataSourceTransacciones.data.forEach(t => t.id && this.seleccionadosTransacciones.add(t.id));
    } else {
      this.seleccionadosTransacciones.clear();
    }
  }

  estaTodoSeleccionado(): boolean {
    return this.dataSourceTransacciones.data.length > 0 &&
           this.seleccionadosTransacciones.size === this.dataSourceTransacciones.data.length;
  }

  esParcial(): boolean {
    const total = this.dataSourceTransacciones.data.length;
    return this.seleccionadosTransacciones.size > 0 && this.seleccionadosTransacciones.size < total;
  }

  eliminarTransaccion(id: number) {
    if (confirm('¿Estás seguro de eliminar esta transacción?')) {
      this.servicioTrans.eliminarTransaccion(id).subscribe(() => {
        this.transacciones = this.transacciones.filter(t => t.id !== id);
        this.dataSourceTransacciones.data = this.transacciones;
        this.seleccionadosTransacciones.delete(id);
      });
    }
  }

  eliminarSeleccionadasTransacciones() {
    if (confirm('¿Deseas eliminar las transacciones seleccionadas?')) {
      const ids = Array.from(this.seleccionadosTransacciones);
      ids.forEach(id => {
        this.servicioTrans.eliminarTransaccion(id).subscribe(() => {
          this.transacciones = this.transacciones.filter(t => t.id !== id);
          this.dataSourceTransacciones.data = this.transacciones;
        });
      });
      this.seleccionadosTransacciones.clear();
    }
  }

  tieneSeleccion(): boolean {
    return this.seleccionadosTransacciones.size > 0;
  }

  editarTransaccion(id: number) {
    this.router.navigate(['/transacciones/edit', id]);
  }
}
