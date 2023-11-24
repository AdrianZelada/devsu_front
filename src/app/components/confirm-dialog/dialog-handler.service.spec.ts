import { TestBed } from '@angular/core/testing';

import { DialogHandlerService } from './dialog-handler.service';

describe('DialogHandlerService', () => {
  let service: DialogHandlerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DialogHandlerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should emit true value on activeDialog observable when calling showDialog method', function() {
    const dialogHandlerService = new DialogHandlerService();
    let result: boolean | undefined;
    dialogHandlerService.activeDialog$.subscribe(value => {
      result = value;
    });
    dialogHandlerService.showDialog();
    expect(result).toBe(true);
  });

  it('should set activeDialog observable to false when closeDialog is called', function() {
    const dialogHandlerService = new DialogHandlerService();
    let result: boolean | undefined;
    dialogHandlerService.activeDialog$.subscribe(value => {
      result = value;
    });
    dialogHandlerService.closeDialog();
    expect(result).toBe(false);
  });


});
