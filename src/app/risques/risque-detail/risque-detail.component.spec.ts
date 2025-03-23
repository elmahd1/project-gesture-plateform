import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RisqueDetailComponent } from './risque-detail.component';

describe('RisqueDetailComponent', () => {
  let component: RisqueDetailComponent;
  let fixture: ComponentFixture<RisqueDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RisqueDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RisqueDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
