export interface SidebarContentProps {
    isMobile: boolean;
    onLinkClick: () => void;
  }
  
  export interface SidebarItemProps {
    label: string;
    icon: React.ReactElement;
    active: boolean;
    onClick: () => void;
  }
  