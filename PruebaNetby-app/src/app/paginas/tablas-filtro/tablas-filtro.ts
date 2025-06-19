import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-tablas-filtro',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTableModule,
    MatButtonModule
  ],
  templateUrl: './tablas-filtro.html',
  styleUrl: './tablas-filtro.scss'
})

export class TablasFiltro implements OnInit {
  filtrosTransForm!: FormGroup;
  filtrosProdForm!: FormGroup;

  transacciones: any[] = [];
  productos: any[] = [];

  transColumnas = ['fecha', 'tipo', 'detalle', 'cantidad', 'total'];
  prodColumnas = ['nombre', 'categoria', 'precio', 'stock'];

  constructor(private fb: FormBuilder, private http: HttpClient) {}

  ngOnInit(): void {
    this.filtrosTransForm = this.fb.group({
      tipo: [''],
      fechaDesde: [''],
      fechaHasta: ['']
    });

    this.filtrosProdForm = this.fb.group({
      nombre: [''],
      categoria: [''],
      precioMin: [''],
      precioMax: [''],
      stockMin: [''],
      stockMax: ['']
    });

    this.buscarTransacciones();
    this.buscarProductos();
  }

  buscarTransacciones() {
    this.http.get<any[]>('http://localhost:5287/api/transacciones').subscribe(data => {
      const { tipo, fechaDesde, fechaHasta } = this.filtrosTransForm.value;
      this.transacciones = data.filter(t => {
        const f = new Date(t.fecha);
        return (!tipo || t.tipo === tipo) &&
               (!fechaDesde || new Date(fechaDesde) <= f) &&
               (!fechaHasta || f <= new Date(fechaHasta));
      });
    });
  }

  resetearTransacciones() {
    this.filtrosTransForm.reset();
    this.buscarTransacciones();
  }

  buscarProductos() {
    this.http.get<any[]>('http://localhost:5297/api/productos').subscribe(data => {
      const { nombre, categoria, precioMin, precioMax, stockMin, stockMax } = this.filtrosProdForm.value;
      this.productos = data.filter(p =>
        (!nombre || p.nombre.toLowerCase().includes(nombre.toLowerCase())) &&
        (!categoria || p.categoria.toLowerCase().includes(categoria.toLowerCase())) &&
        (!precioMin || p.precio >= precioMin) &&
        (!precioMax || p.precio <= precioMax) &&
        (!stockMin || p.stock >= stockMin) &&
        (!stockMax || p.stock <= stockMax)
      );
    });
  }

  resetearProductos() {
    this.filtrosProdForm.reset();
    this.buscarProductos();
  }
}
