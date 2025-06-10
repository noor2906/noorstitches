import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-settings-page',
  imports: [CommonModule, RouterOutlet, MatIcon, RouterLink, RouterLinkActive],
  templateUrl: './settings-page.component.html',
  styleUrl: './settings-page.component.css'
})
export class SettingsPageComponent {
}
