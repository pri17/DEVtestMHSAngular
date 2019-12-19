import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageSearchedListsComponent } from './message-searched-lists.component';

describe('MessageSearchedListsComponent', () => {
  let component: MessageSearchedListsComponent;
  let fixture: ComponentFixture<MessageSearchedListsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MessageSearchedListsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageSearchedListsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
