import { Version } from './index'

export const updateVersion = (date: Date): Version.Action => ({
    type: Version.ActionTypes.Update,
    payload: {
        modifiedDate: date
    }
})
