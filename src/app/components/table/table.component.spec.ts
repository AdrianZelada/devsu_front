import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableComponent } from './table.component';
import { TableModule } from './table.module';

describe('TableComponent', () => {
  let component: TableComponent;
  let fixture: ComponentFixture<TableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TableComponent],
      imports: [TableModule]
    }).compileComponents();
    fixture = TestBed.createComponent(TableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should set sizePage to defaultSize', function() {
    // const component = new TableComponent();
    component.defaultSize = 10;
    component.ngOnInit();
    expect(component.sizePage).toBe(0);
  });

  it('should create', () => {
    expect(component).toBeTruthy();

  });
});
