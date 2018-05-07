---
title: Handle Angular ReactiveForm validators
author: Dinh Duong
excerpt: true
date: 2017-10-20 22:04:17
tags: 
    - angular
    - english
---

# Reason

Sometimes we need to enable or disable the validators which are already have been initialize. Something like below

<!-- more -->

<script src="https://gist.github.com/jinhduong/4eb404b4ac289c88f5937974fb261d6a.js"></script>

The problem here is after `this.form.value.type` has changed and the value is not equal 1 so the form validators will be change. We’ll be remove validation for `house` field and make the vadidation for `apartment` field.

**How can do that?** Fortunately, Angular is provided to us two functions to do that in the run-time :
- setValidators and setAsyncValidators
- updateValueAndValidity

**setValidators**: Sets the synchronous validators that are active on this control. Calling this will overwrite any existing sync validators.

**setAsyncValidators**: Same `setValidators` but it will work with async `validator`

**updateValueAndValidity**: Re-calculates the value and validation status of the control.

# Implementation

Follow by above definition, we can make the manual validators like as:
<script src="https://gist.github.com/jinhduong/0634e6e7fb387df9205769f116235e2e.js"></script>

Sometimes for better performance, we should make the debounce time when the value change.

```ts
this.form.controls['type'].valueChanges.debounceTime(100).subscribe()
```