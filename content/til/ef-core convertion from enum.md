---
title: "EF-Core Convertion From Enum"
date: 2019-05-14T23:14:33+08:00
draft: false
tags:
    - efcore
---

Refer: https://docs.microsoft.com/en-us/ef/core/modeling/value-conversions

In fact, we can refer to the above docs. But shortly should be like above, because convert from enum to number was the most use case that we always faced.

``` csharp
public enum OwnerType
    {
        Individual = 0,
        Operator = 1,
        Developer = 2
    }

var ownerTypeConverter = new EnumToNumberConverter<OwnerType, int>();

// At EFCore context
modelBuilder.Entity<Owner>(entity =>
{
    //...

    entity.Property(e => e.OwnerType)
        .HasConversion(ownerTypeConverter)
        .HasDefaultValueSql("((0))");

}
```
