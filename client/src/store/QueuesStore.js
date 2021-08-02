import {makeAutoObservable} from 'mobx'

export default class QueuesStore {
    constructor(){
       this._queues = {}
        makeAutoObservable(this)
    }

    setQueues(queues){
        this._queues = queues
    }

    
    get queues(){
        return this._queues
    }

}