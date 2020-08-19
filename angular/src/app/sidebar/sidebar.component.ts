import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service'
import { AutoUnsubscribe } from '../unsubscribe'
import { LocalStorageService } from '../local-storage.service'
import { EventEmitterService } from '../event-emitter.service'





@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})

@AutoUnsubscribe
export class SidebarComponent implements OnInit {

  constructor(
    public auth: AuthService,
    private events: EventEmitterService
    
  ) { }

  ngOnInit(): void {
    let userDataEvent = this.events.getUserData.subscribe((user: any) => {
      this.usersId = user._id
      this.besties = user.besties
      this.enemies = user.enemies
    })

    this.subscriptions.push(userDataEvent)
  }

  public besties = []
  public enemies = []
  public usersId: string = ""

  private subscriptions = []

}
