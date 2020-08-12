import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { AuthService } from '../auth.service'
import { LocalStorageService } from '../local-storage.service'
import { EventEmitterService } from '../event-emitter.service'
import { UserDataService } from '../user-data.service'
import { ApiService } from '../api.service'


@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})
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


    this.events.onAlertEvent.subscribe((msg) => {
      this.alertMessage = msg;
    });
    this.events.updateNumOfFriendRequestsEvent.subscribe((msg) => {
      this.numOfFriendRequests--
    });

    this.centralUserData.getUserData.subscribe((data) => {
      this.userData = data
      this.numOfFriendRequests = data.friend_requests.length
    })

    let requestObject = {
      location: `users/get-user-data/${this.usersId}`,
      type: "GET",
      authorize: true
    }

    this.api.makeRequest(requestObject).then((val) => {
          this.centralUserData.getUserData.emit(val.user)
    })

  }
  public query: string = "";
  public usersName: string = "";
  public usersId: string = "";
  public alertMessage: string = "";

  public userData: object = {}
  public numOfFriendRequests: number = 0;

  public searchForFriends(){
    this.router.navigate(['/search-results', {query: this.query}])
  }

}
