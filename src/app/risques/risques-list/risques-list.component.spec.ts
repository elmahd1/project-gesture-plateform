import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RisquesListComponent } from './risques-list.component';

describe('RisquesListComponent', () => {
  let component: RisquesListComponent;
  let fixture: ComponentFixture<RisquesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RisquesListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RisquesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
