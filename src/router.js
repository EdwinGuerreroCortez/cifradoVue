import { createRouter, createWebHistory } from 'vue-router';
import CaesarCipher from './components/CaesarCipher.vue';
import ScytaleCipher from './components/ScytaleCipher.vue';
import DESCipher from './components/DESCipher.vue';
import SHA1Cipher from './components/SHA1Cipher.vue';
import DSASignature from './components/DSASignature.vue';
import About from './components/About.vue';

const routes = [
  { path: '/', component: CaesarCipher },
  { path: '/caesar', component: CaesarCipher },
  { path: '/scytale', component: ScytaleCipher },
  { path: '/des', component: DESCipher },
  { path: '/sha1', component: SHA1Cipher },
  { path: '/rsa-signature', component: DSASignature },
  { path: '/about', component: About },
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
