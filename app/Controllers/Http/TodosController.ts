import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Todo from 'App/Models/Todo'

// eslint-disable-next-line prettier/prettier
export default class TodosController {
  public async index(ctx: HttpContextContract) {
    return Todo.all()
  }

  public async store({ request }: HttpContextContract) {
    const body = request.body()
    const todo = await Todo.create(body)
    return todo
  }

  public async show({ params }: HttpContextContract) {
    return Todo.findOrFail(params.id)
  }

  public async update({ params, request }: HttpContextContract) {
    const body = request.body()
    const todo = await Todo.findOrFail(params.id)
    todo.name = body.name
    return todo.save()
  }

  public async destroy({ params }: HttpContextContract) {
    const todo = await Todo.findOrFail(params.id)
    await todo.delete()
    return {
      message: 'deleted successfully',
      todo,
    }
  }
}
