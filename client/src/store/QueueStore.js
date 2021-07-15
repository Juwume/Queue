import {makeAutoObservable} from 'mobx'

export default class QueueStore {
    constructor(){
       this._queues = [
           {id: 1, name:'test 1', description: 'desc1'},
           {id: 2, name:'test 2', description: 'desc2'},
           {id: 3, name:'test 3', description: 'desc3'},
           {id: 4, name:'test 4', description: 'desc4'}
       ]
        makeAutoObservable(this)
    }

    setQueues(queues){
        this._queues = queues
    }

    
    get queues(){
        return this._queues
    }

}