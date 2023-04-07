export const classMultiplierMap = new Map<string, string>(Object.entries({
  // Collections / Data Structures
  Collection: "veryCommonMultiplier",
  List: "extremelyCommonMultiplier",
  Set: "commonMultiplier",
  Map: "veryCommonMultiplier",
  Queue: "rareMultiplier",
  Deque: "rareMultiplier",
  PriorityQueue: "rareMultiplier",
  ArrayList: "extremelyCommonMultiplier",
  LinkedList: "commonMultiplier",
  HashMap: "veryCommonMultiplier",
  HashSet: "commonMultiplier",
  TreeMap: "rareMultiplier",
  TreeSet: "rareMultiplier",
  LinkedHashMap: "rareMultiplier",
  LinkedHashSet: "rareMultiplier",
  ArrayDeque: "rareMultiplier",
  Stack: "rareMultiplier",
  Vector: "rareMultiplier",
  WeakHashMap: "rareMultiplier",
  IdentityHashMap: "rareMultiplier",
  Hashtable: "rareMultiplier",

  // Types
  String: "extremelyCommonMultiplier",
  Integer: "extremelyCommonMultiplier",
  Boolean: "extremelyCommonMultiplier",
  Object: "extremelyCommonMultiplier",
  Void: "extremelyCommonMultiplier",
  Double: "commonMultiplier",
  Float: "commonMultiplier",
  Long: "commonMultiplier",
  Short: "rareMultiplier",
  Byte: "rareMultiplier",
  Character: "commonMultiplier",
  BigInteger: "rareMultiplier",
  BigDecimal: "rareMultiplier",

  // Type helper classes
  Objects: "extremelyCommonMultiplier",
  Arrays: "extremelyCommonMultiplier",
  Collections: "extremelyCommonMultiplier",
  Optional: "extremelyCommonMultiplier",
  Stream: "extremelyCommonMultiplier",
  IntStream: "rarerMultiplier",
  LongStream: "rarerMultiplier",
  DoubleStream: "rarerMultiplier",
  Collectors: "extremelyCommonMultiplier",
  Iterator: "extremelyCommonMultiplier",
  Class: "commonMultiplier",
  Enum: "commonMultiplier",
  StringBuilder: "commonMultiplier",

  // Exceptions
  Throwable: "extremelyCommonMultiplier",
  Exception: "extremelyCommonMultiplier",
  RuntimeException: "extremelyCommonMultiplier",
  IllegalArgumentException: "commonMultiplier",
  IllegalStateException: "commonMultiplier",
  NullPointerException: "commonMultiplier",
  IndexOutOfBoundsException: "rareMultiplier",
  UnsupportedOperationException: "commonMultiplier",
  ClassCastException: "rareMultiplier",
  IOException: "rareMultiplier",

  // Function interfaces
  Runnable: "extremelyCommonMultiplier",
  Function: "extremelyCommonMultiplier",
  BiFunction: "rareMultiplier",
  Consumer: "extremelyCommonMultiplier",
  BiConsumer: "rareMultiplier",
  Predicate: "extremelyCommonMultiplier",
  BiPredicate: "rareMultiplier",
  Supplier: "extremelyCommonMultiplier",
  UnaryOperator: "rareMultiplier",
  BinaryOperator: "rareMultiplier",
  Comparator: "commonMultiplier",

  // Other Interfaces
  Iterable: "extremelyCommonMultiplier",
  Cloneable: "commonMultiplier",
  Serializable: "commonMultiplier",
  Comparable: "commonMultiplier",

  // Concurrency
  Thread: "commonMultiplier",
  Timer: "rareMultiplier",
  TimerTask: "rareMultiplier",

  // Annotations
  Override: "commonMultiplier",
  Deprecated: "commonMultiplier",
  FunctionalInterface: "commonMultiplier",

  // Random
  UUID: "commonMultiplier",
  Random: "commonMultiplier",

  // Date
  Date: "commonMultiplier",
  Locale: "commonMultiplier",
  TimeZone: "rareMultiplier",
  Calendar: "rareMultiplier",
  Instant: "commonMultiplier",
  ZonedDateTime: "commonMultiplier",
}));
