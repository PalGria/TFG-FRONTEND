import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageMetricasComponent } from './page-metricas.component';

describe('PageMetricasComponent', () => {
  let component: PageMetricasComponent;
  let fixture: ComponentFixture<PageMetricasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageMetricasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageMetricasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
