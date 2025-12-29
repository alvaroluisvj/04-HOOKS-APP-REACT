import { useCallback, useState } from "react"
import { MyTitle } from "./ui/MyTitle"
import { MySubTitle } from "./ui/MySubTitle";

export const MemoHook = () => {

    const [title, setTitle] = useState('Hola');
    const [subTitle, setSubTitle] = useState('Mundo');

    // Si esta funcion se encuentra a fuera no es necesario usar Callback porque no volvera a reenderizase
    const handleCallMyAPI = useCallback(() => {
        console.log("Llamar a mi API -  ", subTitle);
    }, [subTitle]);

    //  con esta funcion se reenderiza todo.
    // const handleCallMyAPI = () => {
    //     console.log("Llamar a mi API -  ", subTitle);
    // };

    /**
     * aunque se use memo para evitar el rendirizado de componentes cuando se ejecuta uno, 
     * cuando se ejecuta una function como es el caso de handleCallMyAPI, vuelve hacer el,
     *  renderizado a pesar de tener memo, en ese casi tenemos que usar el hook useCallback.
     */


    return (
        <div className="bg-gradient flex flex-col gap-4">
            <h1 className="text-2xl font-thin text-white">MemoApp</h1>

            <MyTitle title={title} />

            <MySubTitle subtitle={subTitle} callMyAPI={handleCallMyAPI} />

            <button className="bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer"
                onClick={() => setTitle('Hello, ' + new Date().getTime())}
            >
                Cambiar titulo
            </button>

            <button className="bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer"
                onClick={() => setSubTitle('World')}
            >
                Cambiar subtitulo
            </button>
        </div>
    )
}
