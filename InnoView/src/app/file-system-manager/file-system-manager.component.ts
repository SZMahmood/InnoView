import { Component, ViewEncapsulation } from '@angular/core';
import { FileManagerComponent, NavigationPaneService, ToolbarService, DetailsViewService, ContextMenuService, FileManagerModule } from '@syncfusion/ej2-angular-filemanager';

@Component({
  selector: 'app-file-system-manager',
  templateUrl: './file-system-manager.component.html',
  styleUrl: './file-system-manager.component.css',
  encapsulation: ViewEncapsulation.None,
  providers: [NavigationPaneService, ToolbarService, DetailsViewService, ContextMenuService],
  standalone: true,
  imports: [FileManagerModule]
})
export class FileSystemManagerComponent {
  public ajaxSettings!: object;
  public toolbarSettings!: object;
  public contextMenuSettings!: object;
  public hostUrl: string = 'https://ej2-nodejs-service.azurewebsites.net/';
  //public hostUrl: string = 'http://localhost:8090/';
  public ngOnInit(): void {
      this.ajaxSettings = {
          url: this.hostUrl,
          getImageUrl: this.hostUrl + 'GetImage',
          uploadUrl: this.hostUrl + 'Upload',
          downloadUrl: this.hostUrl + 'Download'
      };
      this.toolbarSettings = { items: ['NewFolder', 'Upload', 'SortBy', 'Cut', 'Copy', 'Paste', 'Delete', 'Refresh', 'Download', 'Rename', 'Selection', 'View', 'Details',] };
      this.contextMenuSettings = {
          layout: ['SortBy', 'View', 'Refresh', '|', 'Paste', '|', 'NewFolder', '|', 'Details', '|', 'SelectAll'],
          visible: true
      }
  }
}
