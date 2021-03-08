<svelte:head>
  <title>Dashboard</title>
</svelte:head>
<script context='module'>
  import { goto } from '@sapper/app'

  export async function preload(page, session) {
    let { user } = session
    if (!user) {
      return this.redirect(302, '/login')
    }
  }

  async function logout() {
    return firebase.auth().signOut().then(() => {
      goto('/login')
    })
  }
</script>
<h1>Dashboard</h1>
<button on:click={logout}>Logout</button>
<p>This will be the orders page, only visible when logged in</p>
