---
id: fast-foundation.designtokenchangerecord
title: DesignTokenChangeRecord interface
hide_title: true
---
<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[@microsoft/fast-foundation](./fast-foundation.md) &gt; [DesignTokenChangeRecord](./fast-foundation.designtokenchangerecord.md)

## DesignTokenChangeRecord interface

Change record provided to to a [DesignTokenSubscriber](./fast-foundation.designtokensubscriber.md) when a token changes for a target.

<b>Signature:</b>

```typescript
export interface DesignTokenChangeRecord<T extends DesignToken<any>> 
```

## Properties

|  Property | Type | Description |
|  --- | --- | --- |
|  [target](./fast-foundation.designtokenchangerecord.target.md) | HTMLElement | The element for which the value was changed |
|  [token](./fast-foundation.designtokenchangerecord.token.md) | T | The token that was changed |