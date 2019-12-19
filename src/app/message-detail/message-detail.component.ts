import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from '../message.service';
import { MHSMessageContentContract  } from '../mhsmessage-content-contract';
import { Observable } from 'rxjs';
import { ValidationErrorContract } from '../validation-error-contract';
import { TextHighlightPipe } from '../highlight-pipe/text-highlight.pipe';

@Component({
  selector: 'app-message-detail',
  templateUrl: './message-detail.component.html',
  styleUrls: ['./message-detail.component.css',
              '../../../node_modules/angular-text-input-highlight/text-input-highlight.css'],
  encapsulation: ViewEncapsulation.None

})
export class MessageDetailComponent implements OnInit {

  constructor(private route: ActivatedRoute, private messageService: MessageService) { }
  public sequenceId: number;
  public messageContent$: Observable<MHSMessageContentContract>;
  public validationErrors$: Observable<ValidationErrorContract[]>;
  public widthOfTextArea = 100;
  public validated = false;
  public toggleText: string;
  private show = false;
  public offset =  { left: 500, top: 170};

  public open = false;
  public item: any;
  public contentchanged = false;
  public existerrors = false;


  ngOnInit() {
    this.sequenceId = +this.route.snapshot.paramMap.get('id');
    this.messageContent$ = this.messageService.GetMessageContent(this.sequenceId);
    this.item = this.messageContent$; // initilize the content
  }

  validateBtn(newContent: string) {
    this.validationErrors$ = this.messageService.ValidateMessage(this.sequenceId, newContent);
    this.validationErrors$.subscribe( data => {
      if (data.length === 0) {
        this.onToggle('valide');
        this.existerrors = false;
      } else {
        this.onToggle('errors');
        this.existerrors = true;
      }
    },
      err => console.log(err),
      () => {
        this.widthOfTextArea = 50;
        this.validated = true;
      });

  }

  public onToggle(mesg: string) {

    if (mesg.toString() ==='valide') {
      this.toggleText = 'There\'s no error in the message.';
    } else if(mesg.toString() ==='errors'){
      this.toggleText = 'The errors are displaying on the right.';
    }

    this.show = true;
    setTimeout(() => { // the popup message disappear in 2s
      this.show = false;
    }, 2000);
  }

  public close() {
    this.open = false;
}

  public contentChange(dataItem:any){
    this.contentchanged = true; // message content changed
    this.item = dataItem;
  }

  public toUpdate(){
    if(this.existerrors && !this.open){
      this.open = true; //open the dialog
    }
  }

  public callUpdate(){
    this.open = false;
    this.messageService.UpdateMessage(this.sequenceId, this.item)
    .subscribe(data => {
      this.toggleText = data['message'],
      this.onToggle(data['message'])
    },
    err => {
      console.log(err),
      this.onToggle(err)
    },
    () => {
      this.contentchanged = false; // update button status change back to disabled
    }
    );
  }
}
