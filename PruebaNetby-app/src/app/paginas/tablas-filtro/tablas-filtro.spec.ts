import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablasFiltro } from './tablas-filtro';

describe('TablasFiltro', () => {
  let component: TablasFiltro;
  let fixture: ComponentFixture<TablasFiltro>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TablasFiltro]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TablasFiltro);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
