import React from "react";

interface Props {
    title: string,
}

export const MyTitle = React.memo(({ title }: Props) => {

    console.log('My Title re-render');
    return <h1 className="text-3xl">{title}</h1>;

});

/**
 * memo resuelve el problema de renderizado de componente, segun el profesor
 * este problema react lo resolvio en versiones posteriores a la 19,
 * pero en mi caso aun no la tengo.
 */