import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ApiService } from '../api.service'
import { LocalStorageService } from '../local-storage.service'


@Component({
  selector: 'app-result-request',
  templateUrl: './result-request.component.html',
  styleUrls: ['./result-request.component.css']
})
export class ResultRequestComponent implements OnInit {

  @Input() resultRequest;
  @Output() resultRequestChange = new EventEmitter <any>();
  @Input() use;

  constructor(
    public api: ApiService,
    private storage: LocalStorageService,

  ) { }

  ngOnInit() {
    if(this.resultRequest.haveSentFriendRequest) {this.haveSentFriendRequest = true}
    if(this.resultRequest.haveReceivedFriendRequest) { this.haveReceivedFriendRequest = true }
    if(this.resultRequest.isFriend) {this.isFriend = true}
  }

  public accept() {
    this.updateRequests()
    this.api.resolveFriendRequest("accept", this.resultRequest._id).then((val) => {
      console.log(val)
    })
  }
  public decline() {
    this.updateRequests()
    console.log("Decline friend frequest from user, ", this.resultRequest._id)
    this.api.resolveFriendRequest("decline", this.resultRequest._id).then((val) => {
      console.log(val)
    })
  }

  private updateRequests() {
    this.resultRequestChange.emit(this.resultRequest._id)
  }

  public haveSentFriendRequest: boolean = false
  public haveReceivedFriendRequest: boolean = false
  public isFriend: boolean = false

}
