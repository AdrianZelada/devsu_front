import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToastComponent } from './toast.component';
import { ToastService } from './toast.service';

describe('ToastComponent', () => {
  let component: ToastComponent;
  let fixture: ComponentFixture<ToastComponent>;
  let toastService: ToastService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers:[ToastService],
      declarations: [ToastComponent]
    });
    fixture = TestBed.createComponent(ToastComponent);
    component = fixture.componentInstance;
    toastService = component.toastService;
    fixture.detectChanges();
  });

      // Calls the 'toastListening' method during initialization/
      // Calls the 'toastListening' method during initialization
      it('should call the \'toastListening\' method during initialization', function() {
        const toastComponent = new ToastComponent(toastService);
        spyOn(toastComponent, 'toastListening');
        toastComponent.ngOnInit();
        expect(toastComponent.toastListening).toHaveBeenCalled();
      });
    // Subscribes to message$ observable and receives data.
  it('should subscribe to message$ observable and receive data', () => {
    // const toastComponent = new ToastComponent(new ToastService());
    spyOn(component.toastService.message$, 'subscribe').and.callThrough();
    component.toastListening();
    expect(component.toastService.message$.subscribe).toHaveBeenCalled();
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
