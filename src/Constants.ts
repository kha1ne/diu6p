import amberLeader from './assets/img/leaders/amber_54x54.png';
import chaniLeader from './assets/img/leaders/chani_54x54.png';
import duncanLeader from './assets/img/leaders/duncan_54x54.png';
import esmarLeader from './assets/img/leaders/esmar_54x54.png';
import feydLeader from './assets/img/leaders/feyd_54x54.png';
import gurneyLeader from './assets/img/leaders/gurney_54x54.png';
import hasimirLeader from './assets/img/leaders/hasimir_54x54.png';
import irulanLeader from './assets/img/leaders/irulan_54x54.png';
import jessicaLeader from './assets/img/leaders/jessica_54x54.png';
import kotaLeader from './assets/img/leaders/kota_54x54.png';
import margotLeader from './assets/img/leaders/margot_54x54.png';
import mohiamLeader from './assets/img/leaders/mohiam_54x54.png';
import paulLeader from './assets/img/leaders/paul_54x54.png';
import piterLeader from './assets/img/leaders/piter_54x54.png';
import shaddamLeader from './assets/img/leaders/shadam_54x54.png';
import stabanLeader from './assets/img/leaders/staban_54x54.png';
import yrkoonLeader from './assets/img/leaders/yrkoon_54x54.png';
import questionMarkImage from './assets/img/questionmark.png';

export const Players = {
  list: ['Babba', 'Bata', 'Damjan', 'Gogi', 'Grubač', 'Iki', 'Krimer', 'Lučić', 'Mare', 'Miške', 'Neša', 'Peki', 'Robi', 'Šilja', 'Žana', 'Žex'],
  defaultDropdownValue: 'Select player',
};

export const Leaders = {
  unknown: {
    Questionmark: {
      image: questionMarkImage,
      tooltip: 'Leader not assigned',
    },
  },
  commanders: {
    Paul: {
      image: paulLeader,
      tooltip: "Muad'Dib",
    },
    Shaddam: {
      image: shaddamLeader,
      tooltip: 'Emperor Shaddam Corrino IV',
    },
  },
  allies: {
    Amber: {
      image: amberLeader,
      tooltip: 'Lady Amber Metulli',
      expansion: 'Main Game',
      alignment: 'Neutral',
    },
    Feyd: {
      image: feydLeader,
      tooltip: 'Feyd-Rautha Harkonnen',
      expansion: 'Main Game',
      alignment: 'Corrino',
    },
    Gurney: {
      image: gurneyLeader,
      tooltip: 'Gurney Halleck',
      expansion: 'Main Game',
      alignment: 'Atreides',
    },
    Irulan: {
      image: irulanLeader,
      tooltip: 'Princess Irulan',
      expansion: 'Main Game',
      alignment: 'Corrino',
    },
    Jessica: {
      image: jessicaLeader,
      tooltip: 'Lady Jessica',
      expansion: 'Main Game',
      alignment: 'Atreides',
    },
    Margot: {
      image: margotLeader,
      tooltip: 'Lady Margot Fenring',
      expansion: 'Main Game',
      alignment: 'Corrino',
    },
    Staban: {
      image: stabanLeader,
      tooltip: 'Staban Tuek',
      expansion: 'Main Game',
      alignment: 'Atreides',
    },
    Kota: {
      image: kotaLeader,
      tooltip: 'Kota Odax of Ix',
      expansion: 'Bloodlines',
      alignment: 'Neutral',
    },
    Piter: {
      image: piterLeader,
      tooltip: 'Piter de Vries',
      expansion: 'Bloodlines',
      alignment: 'Corrino',
    },
    Chani: {
      image: chaniLeader,
      tooltip: 'Chani Kynes',
      expansion: 'Bloodlines',
      alignment: 'Atreides',
    },
    Duncan: {
      image: duncanLeader,
      tooltip: 'Duncan Idaho',
      expansion: 'Bloodlines',
      alignment: 'Atreides',
    },
    Hasimir: {
      image: hasimirLeader,
      tooltip: 'Count Hasimir Fenring',
      expansion: 'Bloodlines',
      alignment: 'Corrino',
    },
    Yrkoon: {
      image: yrkoonLeader,
      tooltip: "Steersman Y'rkoon",
      expansion: 'Bloodlines',
      alignment: 'Neutral',
    },
    Mohiam: {
      image: mohiamLeader,
      tooltip: 'Gaius Helen Mohiam',
      expansion: 'Bloodlines',
      alignment: 'Corrino',
    },
    Esmar: {
      image: esmarLeader,
      tooltip: 'Esmar Tuek',
      expansion: 'Bloodlines',
      alignment: 'Atreides',
    },
  },
};

export const DefaultTheme = {
  typography: {
    fontFamily: ['Anta'].join(','),
  },
};
