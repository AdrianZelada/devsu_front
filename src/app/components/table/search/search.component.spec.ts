import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchComponent } from './search.component';
import { FormsModule } from '@angular/forms';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[FormsModule],
      declarations: [SearchComponent]
    }).compileComponents();
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit the "searc" event with the provided text parameter', function() {
    const searchComponent = new SearchComponent();
    spyOn(searchComponent.search, 'emit');

    const text = 'example text';
    searchComponent.searchText(text);

    expect(searchComponent.search.emit).toHaveBeenCalledWith(text);
  });
});
