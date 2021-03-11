<script>
  import Nav from '../components/Nav.svelte';
  import { onMount } from 'svelte';
  import { stores } from '@sapper/app';
  import Cookies from 'js-cookie';

  export let segment;
  const { session } = stores();
  onMount(async () => {
    firebase.auth().onIdTokenChanged(async (user) => {
      try {
        if (!user) {
          console.log(`User does not exist`);
          Cookies.set('token', false);
          $session.user = false;
          return;
        }
        const token = await user.getIdToken();
        $session.user = token;
        Cookies.set('token', token);
        console.log(`User found and session set!`);
      } catch (e) {
        console.log(`Something went wrong`);
        Cookies.set('token', false);
        $session.user = false;
        return;
      }
      window.timeoutId = setTimeout(() => {
        // handles 55 minute silent refresh on session
        const user = firebase.auth().currentUser;
        if (user) {
          return firebase.auth().currentUser.getIdToken(true);
        }
      }, 1000 * 60 * 55);
    });
  });
</script>

<style>
    main {
        position: relative;
        max-width: 56em;
        background-color: white;
        padding: 2em;
        margin: 0 auto;
        box-sizing: border-box;
    }
</style>

<Nav {segment} />

<main>
  <slot></slot>
</main>