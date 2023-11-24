import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginationComponent } from './pagination.component';

describe('PaginationComponent', () => {
  let component: PaginationComponent;
  let fixture: ComponentFixture<PaginationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PaginationComponent]
    });
    fixture = TestBed.createComponent(PaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should decrease pageSelected by 1 when it is greater than 1', function() {
    const paginationComponent = new PaginationComponent();
    paginationComponent.pageSelected = 2;
    paginationComponent.prev();
    expect(paginationComponent.pageSelected).toBe(1);
    expect(paginationComponent.pageFn.emit).toHaveBeenCalledWith(1);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
