interface IconProps {
    name: string;
    className?: string;
  }
  
  const icons = import.meta.glob(
    '../../../../../assets/icons/*.svg', 
    { 
      eager: true, 
      query: '?url' 
    }
  );

  import "../../../../../assets/icons/ArrowEnter.svg"
  
  export const Icon = ({ name, className }: IconProps) => {
    const iconKey = `../../../../../assets/icons/${name}.svg`;
    const iconModule = icons[iconKey] as { default: string } | undefined;
    
    if (!iconModule?.default) {
      console.warn(`Icon "${name}" not found at path: ${iconKey}`);
      return null;
    }
  
    return (
      <img 
        src={iconModule.default} 
        alt={`${name} icon`}
        className={className}
      />
    );
  };