import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { routes } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { TableComponent } from "./components/table/table.component";
import { FormRegisterComponent } from "./form-register/form-register.component";
import { Router } from "@angular/router";
import {Location} from "@angular/common";
import { ToastComponent } from "./components/toast/toast.component";
import { LoaderComponent } from "./components/loader/loader.component";
import { HttpClientTestingModule } from "@angular/common/http/testing";

describe("App Routing",()=> {
  let router : Router;
  let fixture : ComponentFixture<AppComponent>;
  let location: Location;
  beforeEach(waitForAsync(() =>{
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes(routes), HttpClientTestingModule],
      declarations: [
        AppComponent,
        TableComponent,
        FormRegisterComponent,
        ToastComponent,
        LoaderComponent
      ]
    }).compileComponents()
  }))


  beforeEach(() =>{
    router = TestBed.inject(Router)
    location = TestBed.inject(Location)
    router.initialNavigation();
    fixture = TestBed.createComponent(AppComponent);
  });

  it("Should navigated to default path : '/' ", waitForAsync(()=>{
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(location.path()).toBe("/");
    });
  }))
});
