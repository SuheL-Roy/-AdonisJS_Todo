import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
//import Todo from 'App/Models/Todo'
import Test from 'App/Models/Test'

// eslint-disable-next-line prettier/prettier
export default class TodosController {
  public async index(ctx: HttpContextContract) {
    return Test.all()
  }

  public async store({ request }: HttpContextContract) {
    const body = request.body()
    const todo = await Test.create(body)
    return todo
  }

  public async show({ params }: HttpContextContract) {
    return Test.findOrFail(params.id)
  }

  public async update({ params, request }: HttpContextContract) {
    const body = request.body()
    const todo = await Test.findOrFail(params.id)
    todo.name = body.name
    todo.amount = body.amount
    return todo.save()
  }

  public async destroy({ params }: HttpContextContract) {
    const todo = await Test.findOrFail(params.id)
    await todo.delete()
    return {
      message: 'deleted successfully',
      todo,
    }
  }
}
