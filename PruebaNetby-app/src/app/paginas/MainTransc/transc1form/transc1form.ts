import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Producto } from '../../../Utils/Interfaces/Eproducto';
import { Transaccion } from '../../../Utils/Interfaces/ETransaccion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-transc1form',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatOptionModule,
    MatButtonModule,
    MatCardModule
  ],
  templateUrl: './transc1form.html',
  styleUrls: ['./transc1form.scss']
})
export class Transc1form implements OnInit {
  form!: FormGroup;
  productoId!: number;
  producto!: Producto;
  mostrarModal: boolean = false;
  mensajeModal: string = '';

  modoEdicion = false;
  idTransaccion?: number;
  transaccionExistente?: Transaccion;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private http: HttpClient,
    public router: Router
  ) {}

  ngOnInit() {
    this.crearFormulario();

    const paramId = this.route.snapshot.paramMap.get('id');
    if (paramId) {
      const id = +paramId;

      if (this.router.url.includes('/transacciones/edit/')) {
        this.modoEdicion = true;
        this.idTransaccion = id;

        this.http.get<Transaccion>(`http://localhost:5287/api/transacciones/${id}`).subscribe(trans => {
          this.transaccionExistente = trans;
          this.productoId = trans.productoId;
          this.form.patchValue(trans);
          this.form.patchValue({ cantidad: trans.cantidad });

          this.http.get<Producto>(`http://localhost:5297/api/productos/${this.productoId}`).subscribe(p => {
            this.producto = p;
            this.calcularTotal();
            this.form.updateValueAndValidity();
          });
        });
      } else {
        this.productoId = id;
        this.http.get<Producto>(`http://localhost:5297/api/productos/${this.productoId}`)
          .subscribe(prod => {
            this.producto = prod;
            this.calcularTotal();
            this.form.updateValueAndValidity();
          });
      }
    }
  }

  crearFormulario() {
  this.form = this.fb.group({
    tipo: ['Compra', Validators.required],
    cantidad: [1, [Validators.required, Validators.min(1)]],
    detalle: [''],
    precioUnitario: [0],
    precioTotal: [0]
  }, {
    validators: (group) => {
      const tipo = group.get('tipo')?.value;
      const cantidad = group.get('cantidad')?.value;
      const stock = this.producto?.stock;

      if (tipo === 'Venta' && stock !== undefined && cantidad > stock) {
        return { stockInsuficiente: true };
      }
      return null;
    }
  });

  this.form.statusChanges.subscribe(() => {
    if (this.form.errors?.['stockInsuficiente']) {
      this.mensajeModal = '❌ No hay suficiente stock disponible para esta venta.';
      this.mostrarModal = true;
    } else {
      this.mostrarModal = false;
    }
  });

  this.form.get('cantidad')?.valueChanges.subscribe(() => {
    this.calcularTotal();
    this.form.updateValueAndValidity();
  });

  this.form.get('tipo')?.valueChanges.subscribe(() => {
    this.form.updateValueAndValidity();
  });
}


  calcularTotal() {
    const cantidad = this.form.value.cantidad || 0;
    const precioUnitario = this.producto?.precio || 0;
    this.form.patchValue({
      precioUnitario: precioUnitario,
      precioTotal: precioUnitario * cantidad
    }, { emitEvent: false });
  }

  guardar() {
    if (!this.producto) return;

    const tipo = this.form.value.tipo;
    const cantidad = this.form.value.cantidad;
    const stock = this.producto?.stock;

    if (tipo === 'Venta' && stock !== undefined && cantidad > stock) {
      this.mensajeModal = '❌ No hay suficiente stock disponible para esta venta.';
      this.mostrarModal = true;
      return;
    }

    if (this.form.invalid) return;

    const transaccion: Transaccion = {
      id: this.idTransaccion ?? 0,
      tipo: this.form.value.tipo,
      cantidad: this.form.value.cantidad,
      productoId: this.productoId,
      detalle: this.producto.descripcion,
      precioUnitario: this.form.value.precioUnitario,
      precioTotal: this.form.value.precioTotal,
      fecha: this.modoEdicion && this.transaccionExistente?.fecha
        ? new Date(this.transaccionExistente.fecha).toISOString()
        : new Date().toISOString()
    };

    const request$ = this.modoEdicion && this.idTransaccion
      ? this.http.put(`http://localhost:5287/api/transacciones/${this.idTransaccion}`, transaccion)
      : this.http.post('http://localhost:5287/api/transacciones', transaccion);

    request$.subscribe({
      next: () => {
        this.mensajeModal = this.modoEdicion
          ? '✅ Transacción actualizada exitosamente.'
          : '✅ Transacción registrada exitosamente.';
        this.mostrarModal = true;
        setTimeout(() => {
          this.mostrarModal = false;
          this.router.navigate(['/transacciones']);
        }, 2500);
      },
      error: err => {
        console.error('❌ Error en transacción:', err);
        this.mensajeModal = '❌ Error: ' + (err.error?.message || 'Error desconocido.');
        this.mostrarModal = true;
      }
    });
  }
}
