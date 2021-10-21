import { Test } from '@nestjs/testing'
import { ExecjsController } from './execjs.controller'
import { ExecjsService } from './execjs.service'

const mockExecjsService = () => ({
  execute: jest.fn(),
})

describe('ExecjsController', () => {
  let execjsController: ExecjsController
  let execjsService: ExecjsService

  beforeEach(async () => {
    const app = await Test.createTestingModule({
      controllers: [ExecjsController],
      providers: [{ provide: ExecjsService, useFactory: mockExecjsService }],
    }).compile()

    execjsController = app.get(ExecjsController)
    execjsService = app.get(ExecjsService)
  })

  describe('root', () => {
    it('should return "Hello World!"', async () => {
      jest
        .spyOn(execjsService, 'execute')
        .mockImplementation((_e) => Promise.resolve('hi') as any)

      const ret = await execjsController.execute({ code: 'console.log("hi")' })
      expect(ret).toBe('hi')
    })
  })
})
