
import * as z from "zod";
// Libreria para agregar validacion al localStore
// https://zod.dev/ 
// Video tutoriol del curso de React de fernando herrera
// https://www.udemy.com/course/react-cero-experto/learn/lecture/51977663#questions

interface Todo {
    id: number;
    text: string;
    completed: boolean;
}

interface taskState {
    todos: Todo[];
    length: number;
    completed: number;
    pedding: number;
}

// payload seria para recibir el id que necesitamos de la tarea, igual para eliminar necesitamos el id, y esto seria como necesitar el payload
// en el caso de ADD_TODO, payload: string, aqui requerimos del texto de la tarea para poder agregarlo.

export type TaskAction =
    | { type: 'ADD_TODO', payload: string }
    | { type: 'TOGGLE_TODO', payload: number }
    | { type: 'DELETE_TODO', payload: number };

// Schema de la validacion para evitar modificaciones de la data en el localStore
const TodoSchema = z.object({
    id: z.number(),
    text: z.string(),
    completed: z.boolean(),
});

const TaskStateSchema = z.object({
    todos: z.array(TodoSchema),
    length: z.number(),
    completed: z.number(),
    pedding: z.number(),
});


export const getTasksInitialState = (): taskState => {

    // recuperar los datos guardado en el localStore para tener persistencia
    const localStoreState = localStorage.getItem('tasks-state');

    if (!localStoreState) {

        return {
            todos: [],
            completed: 0,
            pedding: 0,
            length: 0,
        };
    }

    // Validar mediante Zod
    const result = TaskStateSchema.safeParse(JSON.parse(localStoreState));

    if (result.error) {
        console.log(result.error);

        return {
            todos: [],
            completed: 0,
            pedding: 0,
            length: 0,
        };
    }

    //  ! Cuidado, porque el objeto puede haber sido manipulado
    // return JSON.parse(localStoreState);

    // Si no hay errores se retorna esto
    return result.data;

};


export const taskReducer = (state: taskState, action: TaskAction): taskState => {

    switch (action.type) {

        case 'ADD_TODO':
            const newTodo: Todo = {
                id: Date.now(),
                text: action.payload,
                completed: false,
            }
            return {
                ...state,
                todos: [...state.todos, newTodo],
                length: state.todos.length + 1,
                pedding: state.pedding + 1,
            };

        case 'TOGGLE_TODO':
            const updatedTodos = state.todos.map(todo => {
                if (todo.id === action.payload) {
                    return { ...todo, completed: !todo.completed }
                }
                return todo;
            });

            return {
                ...state,
                todos: updatedTodos,
                completed: updatedTodos.filter((todo) => todo.completed).length,
                pedding: updatedTodos.filter((todo) => !todo.completed).length,
            }

        case 'DELETE_TODO': {
            const currentTodos = state.todos.filter(
                (todo) => todo.id !== action.payload
            );
            return {
                ...state,
                todos: currentTodos,
                length: currentTodos.length,
                completed: currentTodos.filter((todo) => todo.completed).length,
                pedding: currentTodos.filter((todo) => !todo.completed).length,
            }

        }


        default:
            return state;
    }
}