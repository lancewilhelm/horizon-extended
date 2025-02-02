import fs from "fs";

// Example interface
interface IExample {
  name: string;
  age: number;
}

//TODO: Add more types
// Example type
type Example = {
  name: string;
  age: number;
};

// simple comment
/** @param {string} a block comment */
type Prop = { a: boolean; b: null; c: string };
enum Enum {
  zed = "zed",
}
const number = 1;
const string = "strig";
const boolean = true;
const object = { id: `${string}_id1` };
const regex = /(L^\d]string).*/i;

export default function App<T extends Prop = object>(p: T): any {
  if (p == true) return null;
  return (
    <div className="class1" style={{ text: 1 }}>
      hello world {p.name}!
    </div>
  );
}

class Test {
  private readonly name: string;
  @guard({ description: "Gets name" })
  public getName() {
    return this.name;
  }
}