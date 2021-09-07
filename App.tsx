/**
 from this post: https://www.robinwieruch.de/react-usecontext-hook
 */

import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { CurrencyContext, useCurrency } from "./src/currency-context";

interface BookModel {
  id: string;
  title: string;
  price: number;
}

const DATA: BookModel[] = [
  {
    id: '1',
    title: 'The Road to React',
    price: 19.99,
  },
  {
    id: '2',
    title: 'The Road to GraphQL',
    price: 29.99,
  },
];

interface CurrencyModel {
  symbol: string;
  code: string;
  label: string;
  conversionRate: number;
}

const CURRENCIES = {
  Euro: {
    symbol: '€',
    code: 'EUR',
    label: 'Euro',
    conversionRate: 1
  },
  Usd: {
    symbol: '$',
    code: 'USD',
    label: 'US Dollar',
    conversionRate: 1.19
  },
};

const App = () => {
  const [currency, setCurrency] = React.useState(CURRENCIES.Euro);

  return (
    <CurrencyContext.Provider value={currency}>
      <View style={{ flex: 1, justifyContent: 'center', alignContent: 'center' }}>
        <Books list={DATA} />
        {Object.values(CURRENCIES).map(item => (
          <Pressable
            onPress={() => setCurrency(item)}
            key={item.label}
          >
            <Text>{item.label}</Text>
          </Pressable>
        ))}
      </View>
    </CurrencyContext.Provider>
  );
};

interface BooksProps {
  list: BookModel[]
}

const Books = (props: BooksProps) => {
  const { list } = props;
  return (
    <View style={{ flexDirection: 'column' }}>
      {list.map((item, ix) => (
        ix % 2 === 0 ?
          <Book key={item.id} item={item} />
          :
          <BookTwo key={item.id} item={item} />
      ))}
    </View>
  );
};

const getPrice = (currency: CurrencyModel, price: number) => {
  const { code, conversionRate } = currency
  const newPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: code,
  }).format(price * conversionRate);
  return newPrice;
};

const Book = ({ item }) => {
  return (
    <CurrencyContext.Consumer>
      {(currency: CurrencyModel) =>
        <Text>
          {item.title} - {getPrice(currency, item.price)}
        </Text>
      }
    </CurrencyContext.Consumer>
  );
};

const BookTwo = ({ item }) => {
  const currency: CurrencyModel = useCurrency();
  const price = getPrice(currency, item.price)

  return (
    <Text style={{ fontSize: 22 }}>
      {item.title} - {price}
    </Text>
  );
};

export default App;
