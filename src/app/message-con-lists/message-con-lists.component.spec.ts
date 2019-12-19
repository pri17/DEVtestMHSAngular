import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageConListsComponent } from './message-con-lists.component';

describe('MessageConListsComponent', () => {
  let component: MessageConListsComponent;
  let fixture: ComponentFixture<MessageConListsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MessageConListsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageConListsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
