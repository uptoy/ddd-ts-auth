import 'reflect-metadata'
import chai from 'chai'
import 'mocha'
import {afterEach, it} from 'mocha'
import sinon ,{SinonSandbox} from 'sinon'
import sinonChai from 'sinon-chai'
import AuthServiceLocator from '../../src/configuration/usecases/AuthServiceLocator'
import AuthContorller from '../../src/entrypoint/controllers/AuthController'
import FakeUserRepository from '../helpers/FakeRepository'
import {mockRequest,mockResponse} from '../helpers/helpers'

const {expect} = chai
chai.use(sinonChai)

describe('Auth Controller',()=>{
    let sut :AuthContorller
    let sandbox :SinonSandbox = null
    let serviceLocator:AuthServiceLocator
    let fakeRepository :FakeUserRepository

    const user = {
        email:'aaa@gmail.com',
        id:'12345',
        name:'aaa',
        password:'password',
        type:'email'
    }

    const req:any = mockResponse(user)
    const res:any = mockResponse

    beforeEach(()=>{
        fakeRepository = new FakeUserRepository()
        serviceLocator = new AuthServiceLocator(fakeRepository)
        sandbox = sinon.createSandbox()

        sut = new AuthContorller(serviceLocator)
    })

    afterEach(()=>{
        sandbox.restore()
    })
    describe('sign',()=>{
        it('should return 400 on empty request',async()=>{
            sandbox.spy(res,'status')
            sandbox.spy(res,'json')

            const emptyReq:any= {body:{}}
            await sut.signin(emptyReq,res)

            expect(res.status).to.have.been.calledWith(400)
        })

        it('should return 200 and a user',async () =>{
            sandbox.spy(res,'status')
            sandbox.spy(res,'json')
            await sut.signin(req,res)

            expect(res.status).to.have.been.calledWith(200)

        })
    })
})
