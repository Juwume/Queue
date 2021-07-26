import {makeAutoObservable} from 'mobx'

export default class CurUsersStore {            //class where to storage users in a queue 
    constructor(){
       this._users = []
        makeAutoObservable(this)
    }

    setUsers(users){
        this._users = users
    }

    
    get users(){
        return this._users
    }

}