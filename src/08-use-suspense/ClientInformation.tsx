import { use, type Usable, } from "react"
import { getUserAction, type User } from "./api/get-user-action";

/**
 * 
 * @returns Dato importante que tener en cuenta, el proceso de la promesa se ejecunta como si nunca fuera a terminar
 * y por esta razon la pantalla no se muestra nada, aunque vea que no aparece ningun error, en este caso la solucion 
 * mas recomentada es sacar la promesa fuera de la funcion.
 */

//function que se tuvo que sacar
// const userPromise = getUserAction(1);

//! MEJOR OPCION PARA USAR LA API USE Y QUE LA APP NO SE ROMPA, 
interface Props {
    getUser: Usable<User>
}

// ! LA API USE Nos evita tener que usa el metodo async wait, tambien nos evita que tener que usarlo con UseEffect
export const ClientInformation = ({ getUser }: Props) => {

    const user = use(getUser);
    //  const user = use(userPromise);
    // export const ClientInformation = ({ id }: { id: number }) => {

    // useEffect(() => {
    //     getUserAction(id).then(console.log);
    // }, [id]);

    return (
        <>
            <div className="bg-gradient flex flex-col gap-4">
                <h2 className="text-4xl font-thin text-white">{user.name} - #{user.id}</h2>

                <p className="text-white text-2xl">{user.location}</p>
                <p className="text-white text-xl">{user.role}</p>

            </div>
        </>
    )
}
