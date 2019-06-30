export class Foo {
    private bar = 'bar'
    getBar = () => this.bar;
    setBar = (value: string) => { this.bar = value; }
}

export const foo = new Foo();
foo.setBar('123');

export let y = {
     ...{ some: "value" }
};