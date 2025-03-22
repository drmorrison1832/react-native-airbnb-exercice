# Airbnb mocking mobile app (iOS)

This is my first project on React Native and the last project I made during the Bootcamp I followed at Le Reacter (https://www.lereacteur.io/).
It's a simple airbnb mocking interface using Le Reacteur's own airbnb-like API.
Although it's essentially a training exercice, with limited features, it could implement most of the stuff I learned by the time.
I cared to make the app as smooth and ergonomic as possible.

![Airbnb React Native Exercice screenshot #01](https://res.cloudinary.com/dig08y2ym/image/upload/v1741454986/airbnb-exercice-screenshot-01_qqsnms.jpg)

## Try app

You need a dev steup able to run React Native apps for iOS.
I used a Mac, with the following apps/modules intalled:

- ![Xcode](https://apps.apple.com/fr/app/xcode/id497799835)
- ![watchman](https://formulae.brew.sh/formula/watchman)
- ![cocoapods](https://formulae.brew.sh/formula/cocoapods)
- ![react-native-cli](https://www.npmjs.com/package/react-native-cli)

## Modules, tools and coding strategies I applied to this project

The project was built using Expo over Yarn, and tested directly on my iPhone 15 Pro Max.

For the sake of scalability I kept JS screen files pretty small, by creating reusable components (`components` folder).

For the sake of scalability I created several stylesheet files (`/assets/styles`). Although if I were to start over, I would rather include the stylesheets in the JS files.

Both components and styles have their own `index` file, which allows a simplier importing.

Icons are also centralized in a unique `Icons` component, with sevreral exports.

As I said a bove, I implemented most of what I learned about React Native so far:

- Vite + Expo Router
- Hooks:
  - useState
  - useEffect
  - useContext
  - useRef
  - useCallback
  - useFocusEffect
  - usePathname
  - StyleSheet
- AsyncStorage
- Axios
- FlatList
- React Native Maps + Expo Location
- Expo ImagePicker

## App's Screens

### Login

![Login screen](https://res.cloudinary.com/dig08y2ym/image/upload/t_Screenshot/v1742670473/login_cmrufm.jpg)

### Register

![Register screen](https://res.cloudinary.com/dig08y2ym/image/upload/t_Screenshot/v1742670473/user_q9tqxm.jpg)

### Home

![Home screen](https://res.cloudinary.com/dig08y2ym/image/upload/t_Screenshot/v1742670474/home_e0t7xp.jpg)

### Around Me

![Around Me Screen](https://res.cloudinary.com/dig08y2ym/image/upload/t_Screenshot/v1742670474/around-me_rwblbe.jpg)

### Room

![Room screen](https://res.cloudinary.com/dig08y2ym/image/upload/t_Screenshot/v1742670474/room_ba6jd2.jpg)

### User

![User screen](https://res.cloudinary.com/dig08y2ym/image/upload/t_Screenshot/v1742670473/user_q9tqxm.jpg)
