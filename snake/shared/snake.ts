import { BoxGeometry, Color, Mesh, MeshStandardMaterial } from 'three'
import { LifeCycle } from '../types/helpers'
import { SceneManager } from '../scene.manager'
import { InputManager } from '../input/keyboard'

export class Snake implements LifeCycle
{
  public head: Mesh
  private geometry: BoxGeometry
  private material: MeshStandardMaterial
  public x: number = 0
  public z: number = 0
  public tail: Array<Mesh> = []
  private inputManager: InputManager
  private time: number = 0
  private cycle: number = 0.2

  constructor()
  {
    this.start()
  }

  public start(): void
  {
    this.inputManager = new InputManager()
    this.geometry = new BoxGeometry(1,1,1)
    this.material = new MeshStandardMaterial({
      color: new Color(0,0,1),
      emissive: new Color(0,0,1),
      metalness: 0.5,
      roughness: 0.55,
    })
    this.head = new Mesh(this.geometry, this.material)
    this.head.position.set(this.x, 0, this.z)
    SceneManager.scene.add(this.head)
  }

  public update(deltaTime): void
  {
    this.time += deltaTime
    if (this.cycle < this.time)
    {
      this.updatePosition()
      this.time = 0
    }
  }

  public grow(): void
  {

  }
  
  private updatePosition(): void
  {
    if (this.inputManager.input.up) this.z += 1
    if (this.inputManager.input.down) this.z -= 1
    if (this.inputManager.input.left) this.x += 1
    if (this.inputManager.input.right) this.x -= 1
    this.head.position.set(this.x, 0, this.z)
  }

  public dispose(): void
  {
    this.geometry.dispose()
    this.material.dispose()
    SceneManager.scene.remove(this.head)
    this.inputManager.dispose()
  }
}