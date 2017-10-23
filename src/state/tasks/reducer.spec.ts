import { Tasks } from './index'
import reducer from './reducer'

describe('Tasks Reducer', () => {
  const initialValue: Tasks.State = []

  it('should use initial state as default value', () => {
    expect(reducer(undefined, { type: null })).toEqual(initialValue)
  })

  it('should return initialState with RemoveAllTasks', () => {
    expect(reducer(null, { type: Tasks.ActionTypes.RemoveAllTasks })).toEqual(initialValue)
  })

  it('should return add new task to state with AddTask', () => {
    const id = 'task'
    const payload = { id, text: 'demo' }
    const action: Tasks.Action = {
      type: Tasks.ActionTypes.AddTask,
      payload
    }
    const reducedState = reducer([], action)
    expect(reducedState.find(t => t.id === id)).toBeTruthy()
  })

  it('should return filtered list with RemoveTask', () => {
    const task = { id: 'task', text: 'demo' }
    const state = [task, { id: 'a', text: 'b' }]
    const action: Tasks.Action = {
      type: Tasks.ActionTypes.RemoveTask,
      payload: { id: 'task' }
    }
    const reducedState = reducer(state, action)
    expect(reducedState).not.toContain(task)
  })

  it('should toggle task completion with ToggleTask', () => {
    const id = 'task'
    const state: Tasks.State = [{ id, text: 'demo', completed: false }]
    const action: Tasks.Action = {
      type: Tasks.ActionTypes.ToggleTask,
      payload: { id }
    }
    const reducedState = reducer(state, action)
    expect(reducedState.find(t => t.id === id).completed).toBe(true)
  })
})
