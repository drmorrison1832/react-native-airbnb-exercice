# Airbnb mocking mobile app (iOS)

This is my first project on React Native and the last project I made at the Bootcamp I followed at [Le Reacteur](https://www.lereacteur.io/).
This tiny iOS app is a simple Airbnb mocking interface using Le Reacteur's own Airbnb-like API.
Although it's essentially a training exercice, with limited features, I allowed me to try most of the stuff I've learned by the time.
I specially cared to making the app as smooth and ergonomic as possible.

![Airbnb React Native Exercice screenshot #01](https://res.cloudinary.com/dig08y2ym/image/upload/v1741454986/airbnb-exercice-screenshot-01_qqsnms.jpg)

## Running the app

You need a dev setup, able to run iOS React Native apps.
I worked on a Mac where I installed the following apps/modules:

- [Xcode](https://apps.apple.com/fr/app/xcode/id497799835)
- [watchman](https://formulae.brew.sh/formula/watchman)
- [cocoapods](https://formulae.brew.sh/formula/cocoapods)
- [react-native-cli](https://www.npmjs.com/package/react-native-cli)

## Modules, tools and coding strategies I applied to this project

The project was built using Expo running over Yarn, and tested directly on my iPhone 15 Pro Max over my wifi router.

For the sake of scalability, I kept JS screen files as small as possible, by creating reusable components (`components` folder).
I also used several stylesheet files (`/assets/styles`), although I think I should've included the stylesheets right in the JS files.

Both components and stylesheets have their own `index` file, which allowed me make importing simpler.

Icons are also centralized in a unique `Icons` component.

As I said above, I implemented here most of what I learned about React Native so far:

- Vite + Expo Router
- Hooks
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

## App tree and screens

```
app
├── _layout.js // Expo slot. Handles authentification context and switches between auth and main app (via useEffect).
├── index.js // Dummy screen, only renders an activity indicator if redirection fails.
├── auth
│   ├── _layout.js // Expo slot.
│   ├── login.js // Sing in. Handles errors, enter key jumps to next field.
│   └── register.js // Sing up. Same as login. Uses camera and photo library.
└── main
    ├── _layout.js // Expo tabs.
    ├── (home)
    │   ├── _layout.js // Expo stack.
    │   ├── home.js // Retrieves apartments and shows results.
    │   └── room.js // Retrieves apartment info and calls ShowRoom component.
    ├── (map)
    │   ├── _layout.js // Expo stack.
    │   ├── map.js // Retrieves apartments around user and show map pins. Database only contains apartments in Paris.
    │   └── room-from-map.js // Retrieves apartment info and calls ShowRoom component.
    └── profile.js // Connected --> update info or disconnect. Disconnected --> connect.
```

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
