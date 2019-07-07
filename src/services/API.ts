import * as Rx from "typeless/rx";
import { BehaviorSubject } from "rxjs";
import { delay, map } from "rxjs/operators";
import Dexie from "dexie";
import { Component, Descriptions } from "types";
import { descriptions, components } from "assets/mock.json";

const behavior = new BehaviorSubject<Descriptions>({});

class ComponentDatabase extends Dexie {
  public components: Dexie.Table<Component, number>;

  constructor() {
    super("ComponentDatabase");
    this.version(1).stores({
      components: "++id, tagName, name, description, html, css, slot"
    });
    this.components = this.table("components");
  }
}

export const getDescriptions = () => {
  const text = behavior.getValue();

  if (Object.keys(text).length !== 0) {
    return behavior;
  }

  const request = Promise.resolve(JSON.stringify(descriptions));

  return Rx.fromPromise(request).pipe(
    delay(300),
    map(text => {
      const json = JSON.parse(text) as Descriptions;
      behavior.next(json);
      return json;
    })
  );
};

export const getComponentByTagName = (name: string) =>
  Rx.fromPromise(
    (async () => {
      const db = new ComponentDatabase();
      const memorized = await db.components
        .where("tagName")
        .equals(name)
        .first();

      if (memorized) {
        return memorized;
      }

      console.log([name, components]);

      const called = components.find(component => component.tagName === name)!;
      db.components.put(called);
      return called;
    })()
  );
