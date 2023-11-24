import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmDialogComponent } from './confirm-dialog.component';
import { DialogHandlerService } from './dialog-handler.service';

describe('ConfirmDialogComponent', () => {
  let component: ConfirmDialogComponent;
  let fixture: ComponentFixture<ConfirmDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers:[DialogHandlerService],
      declarations: [ConfirmDialogComponent]
    }).compileComponents();
  });

  beforeEach(() =>{
    fixture = TestBed.createComponent(ConfirmDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set confirmation variable to DOM element with id confirmation', function() {
    const dialogHandlerService = new DialogHandlerService();
    const component = new ConfirmDialogComponent(dialogHandlerService);
    const mockElement: HTMLElement = document.createElement('dialog');
    spyOn(document, 'getElementById').and.returnValue(mockElement);
    component.ngAfterViewInit();
    expect(component.confirmation).toEqual(mockElement);
  });
});
