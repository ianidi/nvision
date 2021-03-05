import React, { useEffect, useState } from "react";

export const Icon = ({ name, ...otherProps }) => {
  /* Use state hook to store icon module value */
  const [iconModule, setIconModule] = useState(null);

  useEffect(() => {
    /* Use dynamic import to get corresponding icon as a module */
    import(`./icons/${name}.svg`)
      .then((module) => {
        /* Persist data in state */
        setIconModule(module);
      })
      .catch((error) => {
        /* Do not forget to handle errors */
        console.error(`Icon with name: ${name} not found!`);
      });
  }, [name /* update on name change */]);

  const renderIcon = () => {
    if (!iconModule) return null;

    /**
     * Equal to:
     * import { ReactComponent as Icon } from "./path/to/icon.svg";
     */
    const Component = iconModule.ReactComponent;

    return <Component {...otherProps} />;
  };

  return <React.Fragment>{renderIcon()}</React.Fragment>;
}
