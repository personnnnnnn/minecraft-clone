export default class Vector2 {
  constructor(public x: number = 0, public y: number = x) {}

  applySingle(f: (a: number) => number): Vector2 {
    return new Vector2(f(this.x), f(this.y));
  }

  copy(): Vector2 {
    return new Vector2(this.x, this.y);
  }

  neg(): Vector2 {
    return this.applySingle((x) => -x);
  }

  abs(): Vector2 {
    return this.applySingle(Math.abs);
  }

  floor(): Vector2 {
    return this.applySingle(Math.floor);
  }

  ceil(): Vector2 {
    return this.applySingle(Math.ceil);
  }

  round(): Vector2 {
    return this.applySingle(Math.round);
  }

  sign(): Vector2 {
    return this.applySingle(Math.sign);
  }

  applyDouble(f: (a: number, b: number) => number, other: Vector2): Vector2 {
    return new Vector2(f(this.x, other.x), f(this.y, other.y));
  }

  add(other: Vector2): Vector2 {
    return this.applyDouble((a, b) => a + b, other);
  }

  sub(other: Vector2): Vector2 {
    return this.applyDouble((a, b) => a - b, other);
  }

  mul(other: Vector2): Vector2 {
    return this.applyDouble((a, b) => a * b, other);
  }

  div(other: Vector2): Vector2 {
    return this.applyDouble((a, b) => a / b, other);
  }

  mod(other: Vector2): Vector2 {
    return this.applyDouble((a, b) => a % b, other);
  }

  magSq(): number {
    return this.x * this.x + this.y * this.y;
  }

  mag(): number {
    return Math.sqrt(this.magSq());
  }

  toString(): string {
    return `<x: ${this.x}, y: ${this.y}>`;
  }
}
