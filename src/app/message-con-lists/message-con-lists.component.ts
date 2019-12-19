import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params  } from '@angular/router';
import { MessageType } from 'src/MessageType';
import { MessageService } from '../message.service';
import { Observable } from 'rxjs';
import { GridDataResult } from '@progress/kendo-angular-grid';
import { TooltipDirective } from '@progress/kendo-angular-tooltip';
import { State } from '@progress/kendo-data-query';


@Component({
  selector: 'app-message-con-lists',
  templateUrl: './message-con-lists.component.html',
  styleUrls: ['./message-con-lists.component.css']
})
export class MessageConListsComponent implements OnInit {

  public ConID: string; // converstaion ID

  public url = 'Message/GetWithConID';
  // public lists: MessageType[];

  public view$: Observable<GridDataResult>;
  public gridData: any;

  public offset =  { left: 500, top: 170};
  public infoMesg: any;
  public open = false;

  public state: State = {
    skip: 1,
    take: 10
};

  public skip = 1;// current page number

  @ViewChild(TooltipDirective,{static: false}) public tooltipDir: TooltipDirective;

  public item: any;
  private toggleText: string ;
  private show: boolean = false;
  private tempState: string;

  constructor(private route: ActivatedRoute,
              private messageService: MessageService) {
    this.view$ = messageService;
              }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => this.ConID = params.conID
    ); // get conversation ID

    const state: State = this.state;

    this.messageService.getConList(state, this.url, this.ConID).subscribe((data) => this.gridData = data);
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
