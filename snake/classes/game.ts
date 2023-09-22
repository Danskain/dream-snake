import { Clock } from 'three'
import { SceneManager } from '../scene.manager'
import { LifeCycle } from '../types/helpers'
import { Food } from './food'
import { Snake } from './snake'
import { Ground } from './ground'
import { State } from '../states/state'
import { States } from '../states/states'

export class Game implements LifeCycle
{
  private snake: Snake
  private food: Food
  private ground: Ground
  private stop: boolean = false
  private clock: Clock = new Clock()

  public start(): void
  {
    this.stop = false
    this.snake = new Snake()
    this.food = new Food()
    this.ground = new Ground()
    SceneManager.camera.position.set(0,26,-8)
    SceneManager.camera.lookAt(0,0,0)
    this.update()
  }

  public update(): void
  {
    if (this.stop) return
    requestAnimationFrame(this.update.bind(this))
    const delta = this.clock.getDelta()
    this.checkDefeat()
    this.snake.update(delta)
  }

  private checkDefeat(): void
  {
    if (this.snake.x >= this.ground.size / 2) this.defeat()
    if (this.snake.x <= -this.ground.size / 2) this.defeat()
    if (this.snake.z >= this.ground.size / 2) this.defeat()
    if (this.snake.z <= -this.ground.size / 2) this.defeat()
  }

  private defeat(): void
  {
    this.stop = true
    State.setCurrent(States.defeat)
  }

  public dispose(): void
  {
    this.snake.dispose()
    this.food.dispose()
    this.ground.dispose()
  }
}