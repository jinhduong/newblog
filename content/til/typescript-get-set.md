---
title: "Typescript Get Set"
date: 2018-05-28T16:26:07+08:00
tags:
-   typescript
---

``` ts
export class Animal {
    private _name;
    get name() {
        return `It's name is ${this._name}`;
    }
    set name(name: string) {
        // DOSIME THING
        if (this.preSetName())
            this._name = name;
        throw new Error('You cannot set this property, ok mén')
    }

    private preSetName(): boolean {
        const isCallToApiandHaveAccessToSet = http.get(...) // Call from api
        return isCallToApiandHaveAccessToSet
    }
}
```

