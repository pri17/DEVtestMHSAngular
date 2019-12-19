import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { GridDataResult } from '@progress/kendo-angular-grid';
import { ActivatedRoute, Params } from '@angular/router';
import { MessageService } from '../message.service';
import { State } from '@progress/kendo-data-query';

@Component({
  selector: 'app-message-searched-lists',
  templateUrl: './message-searched-lists.component.html',
  styleUrls: ['./message-searched-lists.component.css']
})
export class MessageSearchedListsComponent implements OnInit {

  public offset =  { left: 500, top: 170};

  public keyword: string;
  public url = 'Message/SearchMessage';

  public view: Observable<GridDataResult>;
  public gridData: any;

  public infoMesg: any;
  public open = false;
  public item: any;
  private toggleText: string ;
  private show: boolean = false;
  private tempState: string;

  public state: State = {
    skip: 1,
    take: 10
};

  constructor(private route: ActivatedRoute,
              private messageService: MessageService) {
    this.view = messageService;
              }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => this.keyword = params.keyword
    ); // get conversation ID

    const state: State = this.state;
    this.messageService.searchMessageContent(state, this.url, this.keyword).subscribe((data) => this.gridData = data);
  }

  public OpenDialog(dataItem:any){
    this.open = true;
    this.item = dataItem;
}

public close(status) {
console.log(`Dialog result: ${status}`);
this.open = false;
}

public changeState(){
this.open = false;

this.messageService.goChangeState(this.item.state, this.item.sequenceId)
  .subscribe(data => {
    console.log("code: "+ data['code']),
    this.toggleText = data['message'],
    this.tempState = data['currentState'],
    this.onToggle()
},
  err => console.log(err),
  () => {
    this.item.state = this.tempState;
    if (this.tempState === 'Send') {
      this.item.attempts = 0;
    }
  });

}

public onToggle(): void {
  console.log("Toogle Mesg: "+ this.toggleText);
  this.show = true;
  setTimeout(() => { // the popup message disappear in 2s
    this.show = false;
  }, 2000);
}
}
