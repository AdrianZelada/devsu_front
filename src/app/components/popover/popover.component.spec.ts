import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopoverComponent } from './popover.component';

describe('PopoverComponent', () => {
  let component: PopoverComponent;
  let fixture: ComponentFixture<PopoverComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PopoverComponent]
    });
    fixture = TestBed.createComponent(PopoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set the template element to the current template', function() {
    const component = new PopoverComponent();
    const template = document.createElement('div');

    component.viewPopover(template, new Event('click'));
    expect(component.template).toBe(template);
  });
});
