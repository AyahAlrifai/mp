export interface MenuItem {
    displayName:string;
    route:string;
    children:Array<MenuItem>;
    displayIcon:string;
    iconName:string;
  }