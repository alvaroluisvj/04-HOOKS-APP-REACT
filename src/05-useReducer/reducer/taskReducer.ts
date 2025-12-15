
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


export const getTasksInitialState = (): taskState => {
    return {
        todos: [],
        completed: 0,
        pedding: 0,
        length: 0,
    }
}


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
                (todo) => todo.id === action.payload
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