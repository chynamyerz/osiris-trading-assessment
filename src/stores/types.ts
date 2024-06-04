export interface BeverageData {
  beverage: string
  price: number
}

export interface OrderedBeverageData extends BeverageData {
  quantity: number
}

export interface TabRoundData {
  orders: OrderedBeverageData[]
}

export interface ActiveTabData {
  owner: string
  rounds: TabRoundData[]
}
