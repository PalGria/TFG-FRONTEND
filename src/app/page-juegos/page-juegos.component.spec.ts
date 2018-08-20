import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageJuegosComponent } from './page-juegos.component';

describe('PageJuegosComponent', () => {
  let component: PageJuegosComponent;
  let fixture: ComponentFixture<PageJuegosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageJuegosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageJuegosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
