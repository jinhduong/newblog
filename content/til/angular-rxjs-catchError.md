---
title: "Angular HttpClient with catchError, rxjs6"
date: 2019-05-09T11:29:00+08:00
draft: false
tags:
    - angular
    - rxjs6
---

# Scenario
Assuming that we get the banks from payment gateway's third party but sometimes their services got down, but we still need to support that still show the list of banks to end user create a manually case until the service up again.

``` ts
getBanks(): Observable<CurlecBanksModel> {
    const _cacheName = "banks";
    
    // Cache
    if (this._cache.has(_cacheName)) {
      return of(this._cache.get(_cacheName));

    // Normally scenario
    } else {
      return this._http
        .post(
          `https://shit-service/get-banks`,
          null
        )
        .pipe(
          map(res => {
            this._cache.set(_cacheName, res);
            return res;
          }),
          // If server down, get from the static
          catchError(err => {
            return of(banks);
          }) as any
        );
    }
  }
```





