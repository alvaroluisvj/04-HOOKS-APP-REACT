import { RouterProvider } from "react-router"
import { Approuter } from "./router/app.router"
import { UserContextProvider } from "./context/UserContext"


export const ProfessionalApp = () => {
    return (

        <UserContextProvider>

            <div className="bg-gradient">
                <RouterProvider router={Approuter} />
            </div>
        </UserContextProvider>
    )
}

// Instalacion necesaria para este proyecto de 09-useContext
// https://reactrouter.com/