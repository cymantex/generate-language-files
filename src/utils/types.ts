export interface Class {
  name: string,
  path: string,
  public: boolean
}

export interface PathToClassNames {
  [path: string]: string[]
}
