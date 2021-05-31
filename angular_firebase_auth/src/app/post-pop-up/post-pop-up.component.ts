import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ServerRequestService } from '../services/server-request.service';

@Component({
  selector: 'app-post-pop-up',
  templateUrl: './post-pop-up.component.html',
  styleUrls: ['./post-pop-up.component.css'],
})
export class PostPopUpComponent implements OnInit {
  public success: string | undefined;
  public error: any | undefined;
  @Input() method: string | undefined;
  @Input() showPopUp: boolean = false;
  @Output() showPopUpChange: EventEmitter<boolean> = new EventEmitter();
  constructor(private serverRequestService: ServerRequestService) {}

  toggleShowPopUp() {
    this.error = undefined;
    this.success = undefined;
    this.showPopUpChange?.emit(!this.showPopUp);
  }
  ngOnInit(): void {}

  submit(form: any) {
    if (this.method == 'POST') {
      this.serverRequestService.createNewPost(form.value).subscribe(
        (data) => {
          this.success = 'Newpost created with id: ' + data.id;
          this.error = undefined;
          form.resetForm();
        },
        (error) => {
          this.error = error.error.message;
          this.success = undefined;
        }
      );
    } else {
      this.serverRequestService.updatePost(form.value.id, form.value).subscribe(
        (data) => {
          this.success = `Post id: ${data.id} updated`;
          this.error = undefined;
          form.resetForm();
        },
        (error) => {
          this.error = error.error.message;
          this.success = undefined;
        }
      );
    }
  }
}
