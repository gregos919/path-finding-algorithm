- Path following algorithm in ASCII Map
- Find the position of character '@'
- Follow the path, stop when character 'x' is reached

## Map 1

```
  @---A---+
          |
  x-B-+   C
      |   |
      +---+
```

Expected result: 
- Letters ```ACB```
- Path as characters ```@---A---+|C|+---+|+-B-x```

## Map 2

```
  @
  | C----+
  A |    |
  +---B--+
    |      x
    |      |
    +---D--+
```

Expected result: 
- Letters ```ABCD```
- Path as characters ```@|A+---B--+|+----C|-||+---D--+|x```

## Map 3

```
  @---+
      B
K-----|--A
|     |  |
|  +--E  |
|  |     |
+--E--Ex C
   |     |
   +--F--+
 ```

Expected result: 
- Letters ```BEEFCAKE```
- Path as characters ```@---+B||E--+|E|+--F--+|C|||A--|-----K|||+--E--Ex```
