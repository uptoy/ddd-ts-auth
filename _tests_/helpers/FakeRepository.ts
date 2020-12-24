import e from 'express'
import IUserReadOnlyRepository from '../../src/application/repositories/IUserReadOnlyRepository'
import User from '../../src/domain/User'

export default class FakeUserRepository implements IUserReadOnlyRepository{
    public users = [{
        email:'aaa@gmail.com',
        id:'12345',
        name:'aaa',
        password:'password',
        type:'email'
    },
    {
        email:'iii@gmail.com',
        id:'12345',
        name:'iii',
        password:'password',
        type:'email'
    }]

    public async fetch(user:User):Promise<User>{
        const res = await this.users.find((x)=>x.email ===user.email)
        if(!res){
            return null
        }
        if(res.password !== user.password){
            throw Error('Invalid email or password')
        }
        user.id = res.id
        user.name= res.name
        return user
    }

    public async add (user:User):Promise<User>{
        const max= 9999
        const min= 1000
        user.Id =(Math.floor(Math.random()*(+max-min))+ +min).toString

        this.users.push({
            email:user.email,
            id:user.Id,
            name:user.name,
            password:user.password,
            type:user.type
        })
        return user
    }
}