class DocumentModel
{
  authorID?: string;
  viewerIDs: Array<string>;
  editorIDs: Array<string>;

  constructor()
  {
    this.viewerIDs = new Array<string>();
    this.editorIDs = new Array<string>();
  }
}