import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DimensionComponent } from './dimension.component';
import { FormsModule } from '@angular/forms';

describe('DimensionComponent', () => {
  let component: DimensionComponent;
  let fixture: ComponentFixture<DimensionComponent>;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      imports:[ FormsModule],
      declarations: [DimensionComponent]
    }).compileComponents();
  });

  beforeEach(() =>{
    fixture = TestBed.createComponent(DimensionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  })

      // Emits the selected size through the 'size' EventEmitter.
  it('should emit the selected size through the "size" EventEmitter', function() {
    const dimensionComponent = new DimensionComponent();
    spyOn(dimensionComponent.size, 'emit');
    const size = 5;

    dimensionComponent.sizeSelected(size);

    expect(dimensionComponent.size.emit).toHaveBeenCalledWith(size);
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
