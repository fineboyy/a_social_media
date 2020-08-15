import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service'
import { UserDataService } from '../user-data.service'
import { AutoUnsubscribe } from '../unsubscribe'




@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})

@AutoUnsubscribe
export class SidebarComponent implements OnInit {

  constructor(
    public auth: AuthService,
    private centralUserData: UserDataService,
    
  ) { }

  ngOnInit(): void {

    let userDataEvent = this.centralUserData.getUserData.subscribe((user) => {
      this.userData = user
    })

    this.subscriptions.push(userDataEvent)
  }

  public userData = {}
  private subscriptions = []
}
