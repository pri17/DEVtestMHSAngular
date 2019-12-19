import { Component, OnInit, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { MessageService } from '../message.service';
import { Observable } from 'rxjs';
import { GridDataResult, DataStateChangeEvent  } from '@progress/kendo-angular-grid';
import { State } from '@progress/kendo-data-query';
import { Router } from '@angular/router';
import { TooltipDirective } from '@progress/kendo-angular-tooltip';
import { offset } from '@progress/kendo-popup-common';


@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent implements OnInit {

  public offset =  { left: 500, top: 170};

  public view$: Observable<GridDataResult>;
  public gridData: any;
  public state: State = {
    skip: 1,
    take: 10
};
  public skip = 1;// current page number
  public filters;
  public sorts;
  public url = 'Message/GetLists';

  public infoMesg: any;
  public open = false;

  @ViewChild(TooltipDirective,{static: false}) public tooltipDir: TooltipDirective;


  // @Output()
  // public clickedConID; // selected row based on the ceil click event

  public item: any;
  private toggleText: string ;
  private show: boolean = false;
  private tempState: string;

  constructor(private messageService: MessageService,
              private router: Router) {
      this.view$ = messageService;
   }

  ngOnInit() {
    const state: State = this.state;

    this.messageService.query(state, this.url);
    this.view$.subscribe(res => this.gridData = res);
  }

  public dataStateChange(event: DataStateChangeEvent): void {
    this.skip = event.skip;
    this.filters = event.filter;
    this.sorts = event.sort;

    const state: State = {
      skip: this.skip, // each page needs to show correctly the page number
      take: 10,
      filter: this.filters,
      sort: this.sorts
    };
    this.state = state;

    this.messageService.query(this.state, this.url);

    this.view$.subscribe(res => this.gridData = res);

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
        console.log('code: '+ data['code']),
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
    console.log('Toogle Mesg: '+ this.toggleText);
    this.show = true;
    setTimeout(() => { // the popup message disappear in 2s
      this.show = false;
    }, 2000);
  }

  onKey(event: any){
    console.log(event.target.value);
    this.router.navigate(['message-search', event.target.value]);
  }


}

//   public showTooltip(e: MouseEvent): void {
//     const element = e.target as HTMLElement;
//     if ((element.nodeName === 'TD' || element.nodeName === 'TH')
//             ) {
//         this.tooltipDir.toggle(element);
//     } else {
//         this.tooltipDir.hide();
//     }
// }

  // onCellClick(e){
  //     this.clickedConID = e.dataItem.conversationID; // get the conversation Id of the message
  //     console.log( 'Selected row conversation ID : ', this.clickedConID);
  //     this.router.navigate(['message-con', this.clickedConID]);
  // }


