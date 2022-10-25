/**
 * Learn more about deep linking with React Navigation
 * https://reactnavigation.org/docs/deep-linking
 * https://reactnavigation.org/docs/configuring-links
 */

import { LinkingOptions } from '@react-navigation/native';
import * as Linking from 'expo-linking';

import { RootStackParamList } from '../types';

const linking: LinkingOptions<RootStackParamList> = {
  prefixes: [Linking.createURL('/')],
  config: {
    screens: {
      Root: {
        screens: {
          TabOne: {
            screens: {
              TabOneScreen: 'one',
            },
          },
          Panier: {
            screens: {
              PanierScreen: 'panier',
            },
          },
          Calendar: {
            screens: {
              CalendarScreen: 'calendar',
            },
          },
          Message: {
            screens: {
              MessageScreen: 'message',
            },
          },
          Profile: {
            screens: {
              ProfileScreen: 'profile',
            },
          },
        },
      },
      Main: 'main',
      Article: 'article',
      ArticleDetails: 'article/details',
      Login: 'login',
      // Panier: 'panier',
      Inscription: 'inscription',
      Modal: 'modal',
      NotFound: '*',
    },
  },
};

export default linking;
