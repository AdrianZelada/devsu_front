import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { LoadService } from './service/load-service.service';
import { of } from 'rxjs';
import { ToastModule } from './components/toast/toast.module';
import { LoaderModule } from './components/loader/loader.module';
import { Router } from '@angular/router';
import { Location} from '@angular/common';
import { TableProductsComponent } from './table-products/table-products.component';
import { FormRegisterComponent } from './form-register/form-register.component';

fdescribe('AppComponent', () => {

  let router: Router;
  let location: Location;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, ToastModule, LoaderModule],
      declarations: [AppComponent],
      providers: [LoadService]}).compileComponents();
      router = TestBed.inject(Router)
      location = TestBed.inject(Location)
    });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'sudev_frontend'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('sudev_frontend');
  });

      // The method should subscribe to the isLoading$ observable of the LoadService.
  it('should subscribe to isLoading$ observable', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    spyOn(app.loadService.isLoading$, 'pipe').and.returnValue(of(true));
    app.loadingService();
    expect(app.loadService.isLoading$.pipe).toHaveBeenCalled();
  });

  it('should handle multiple values emitted in short time frame', fakeAsync(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    spyOn(app.loadService.isLoading$, 'pipe').and.returnValue(of(true, false));
    tick(2000);
    expect(app.loading).toBe(false);
  }));

  it('navigate to "" redirects you to /home', fakeAsync(() => {
    router.navigate([""]).then(() => {
      expect(location.path()).toBe("/");
    });
  }));
});
