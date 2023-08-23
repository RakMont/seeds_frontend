export interface Table{
  rows: TableRow[];
}
export interface TableRow{
  cells: Cell[];
}
export interface Cell{
  cellHeader: CellHeader;
  cellProperty: CellProperty;
  contents: CellContent[];
}

export interface CellHeader{
  key: string;
  order: number;
  propertyType: string;
  canSort: boolean;
  toolTip: string;
}
export interface CellContent{
  contentType: string;
  iconName: string;
  color: string;
  clickable: boolean;
  clickedAction: string;
  contentTooltip: string ;
  content: string;
  params: CellParam[] ;
}
export interface CellParam{
  paramName: string ;
  paramContent: string ;
}

export interface CellProperty{
  color;
  clickable: boolean;
  clickedAction: string;
  cellTooltip: string;
}

export class ColumnModel {
  key: string;
  order: number;
  propertyType: any;
  canSort: boolean;
  toolTip: string;

  constructor(options: Partial<ColumnModel> = {}) {
    this.key = options.key;
    this.order = options.order || 0;
    this.propertyType = options.propertyType;
    this.canSort = options.canSort || false;
    this.toolTip = options.toolTip;
  }
}
export interface TableModel {
  columns: ColumnModel[];
}
