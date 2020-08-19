import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ApiService } from '../api.service'
import { LocalStorageService } from '../local-storage.service'
import { EventEmitterService } from '../event-emitter.service'


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
    private events: EventEmitterService,

  ) { }

  ngOnInit() {
    if(this.resultRequest.haveSentFriendRequest) {this.haveSentFriendRequest = true}
    if(this.resultRequest.haveReceivedFriendRequest) { this.haveReceivedFriendRequest = true }
    if(this.resultRequest.isFriend) {this.isFriend = true}
  }

  public accept() {
    this.updateRequests()
    this.api.resolveFriendRequest("accept", this.resultRequest._id).then((val) => {
    })
  }
  public decline() {
    this.updateRequests()
    this.api.resolveFriendRequest("decline", this.resultRequest._id).then((val) => {
    })
  }

  private updateRequests() {
    this.resultRequestChange.emit(this.resultRequest._id)
  }

  public updateSendMessageObject(id, name) {
    this.events.updateSendMessageObjectEvent.emit({id, name})
  }

  public haveSentFriendRequest: boolean = false
  public haveReceivedFriendRequest: boolean = false
  public isFriend: boolean = false

}
