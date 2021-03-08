<svelte:head>
  <title>Login</title>
</svelte:head>

<h1>Login</h1>
<form on:submit={login}>
<input type='email' bind:value={email} placeholder='your email' />
<br />
<input type='password' bind:value={password} placeholder='your password' />
<br />
<button type='submit'>Login</button>
</form>

<script>
  import { goto } from '@sapper/app'
  let email = ''
  let password = ''
  async function login(e) {
    e.preventDefault()
    try {
      firebase.auth().signInWithEmailAndPassword(email, password).then((res) => {
        goto('/dashboard')
      })
    } catch (e) {
      let message = e.message || e
      console.log('Something went wrong:', message)
    }
  }
</script>


