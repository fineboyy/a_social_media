import { Component, OnInit, Inject } from '@angular/core';
import { EventEmitterService } from '../event-emitter.service'
import { ApiService } from '../api.service'
import { Title } from '@angular/platform-browser'
import { AutoUnsubscribe } from '../unsubscribe'
import { DOCUMENT } from '@angular/common'

@Component({
  selector: 'app-page-friend-requests',
  templateUrl: './page-friend-requests.component.html',
  styleUrls: ['./page-friend-requests.component.css']
})

@AutoUnsubscribe
export class PageFriendRequestsComponent implements OnInit {

  constructor(
    private events: EventEmitterService,
    private api: ApiService,
    private title: Title,
    @Inject (DOCUMENT) private document: Document,


  ) { }

  ngOnInit() {
    this.title.setTitle("Friend  Request")
    this.document.getElementById('sidebarToggleTop').classList.add("d-none")

    let userDataEvent = this.events.getUserData.subscribe((data) => {
      this.userData = data;

      let array = JSON.stringify(data.friend_requests)

      let requestObject =  {
        location: `users/get-friend-requests?friend_requests=${array}`,
        method: "GET"
      }
      this.api.makeRequest(requestObject).then((val) => {
        if(val.statusCode === 200) {
          this.friendRequests = val.users          
        }
      });
    });

    this.subscriptions.push(userDataEvent)
  }

  private subscriptions = []

  public userData: object = {};
  public friendRequests = [];

  public updateFriendRequests(id) {
    let arr = this.friendRequests
    for(let i = 0; i < arr.length; i++){
      if(arr[i]._id == id) {
        arr.splice(i, 1);
        break;
      }
    }
  }
}
