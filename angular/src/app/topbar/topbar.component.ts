import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router'
import { AuthService } from '../auth.service'
import { LocalStorageService } from '../local-storage.service'
import { EventEmitterService } from '../event-emitter.service'
import { UserDataService } from '../user-data.service'
import { ApiService } from '../api.service'
import { AutoUnsubscribe } from '../unsubscribe'


@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})
@AutoUnsubscribe

export class TopbarComponent implements OnInit {

  constructor(
    public auth: AuthService,
    private router: Router,
    private storage: LocalStorageService,
    private events: EventEmitterService,
    private centralUserData: UserDataService,
    private api: ApiService,

  ) { }

  ngOnInit() { 
    this.usersName = this.storage.getParsedToken().name
    this.usersId = this.storage.getParsedToken()._id


    let alertEvent = this.events.onAlertEvent.subscribe((msg) => {
      this.alertMessage = msg;
    });
    let friendRequestEvent = this.events.updateNumOfFriendRequestsEvent.subscribe((msg) => {
      this.numOfFriendRequests--
    });

    let userDataEvent = this.centralUserData.getUserData.subscribe((data) => {
      this.userData = data
      this.numOfFriendRequests = data.friend_requests.length
      this.profilePicture = data.profile_image
    })

    let requestObject = {
      location: `users/get-user-data/${this.usersId}`,
      method: "GET",
    }
  
    this.api.makeRequest(requestObject).then((val) => {
          this.centralUserData.getUserData.emit(val.user)
    })

    this.subscriptions.push(alertEvent, friendRequestEvent, userDataEvent)
  }

  public query: string = "";
  public usersName: string = "";
  public usersId: string = "";
  public alertMessage: string = "";
  public profilePicture: string = "default-avatar";

  public userData: object = {}
  public numOfFriendRequests: number = 0;

  private subscriptions = []

  public searchForFriends(){
    this.router.navigate(['/search-results', {query: this.query}])
  }

}
