import { StrictMode, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { Toaster, toast } from 'sonner';
// import { TrafficLightWithEffect } from './02-useEffect/TrafficLightWithEffect'
// import { TrafficLightWithHook } from './02-useEffect/TrafficLightWithHook';
// import { FocusScreen } from './04-useRef/FocusScreen';
// import App from './App.tsx'

import './index.css'
import { ClientInformation } from './08-use-suspense/ClientInformation';
import { getUserAction } from './08-use-suspense/api/get-user-action';
// import { InstagromApp } from './07-useOptimistic/instagromApp'
// import { MemoCounter } from './06-memos/ui/MemoCounter'
// import { MemoHook } from './06-memos/MemoHook'
// import { ScrambleWords } from './05-useReducer/ScrambleWords'
// import { TasksApp } from './05-useReducer/TaskApp'
// import { PokemonPage } from './03-examples/PokemonPage';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Toaster />
    {/* <HooksApp /> */}
    {/* <TrafficLight /> */}
    {/* <TrafficLightWithEffect /> */}
    {/* <TrafficLightWithHook /> */}
    {/* <PokemonPage /> */}
    {/* <FocusScreen /> */}
    {/* <TasksApp /> */}
    {/* <ScrambleWords /> */}
    {/* <MemoHook /> */}
    {/* <MemoCounter /> */}
    {/* <InstagromApp /> */}

    {/* Inicio  del metodo Suspense */}
    <Suspense fallback={
      <div className='bg-gradient flex flex-col'>
        <h1 className='text-2xl'>Cargando..</h1>
      </div>
    }>
      <ClientInformation getUser={getUserAction(1000)} />
    </Suspense>
    {/* Fin del metodo Suspense */}

  </StrictMode>,
)
