<script lang="ts">
	import type { PageData } from './$types'
	import { page } from '$app/stores'
	import Dialog from '$lib/components/Dialog.svelte'
	import SignIn from '$lib/components/SignIn.svelte'
	import { signInDialog as signInDialogStore } from '$lib/stores'
	import { goto } from '$app/navigation'
	import { browser } from '$app/environment'
	export let data: PageData
	let { user } = data

	const urlAction = browser ? new URL(location.href).searchParams.get('action') : null

	let signInDialog: Dialog

	$: {
		if (signInDialog) signInDialogStore.set(signInDialog)
	}
</script>

<!-- Default Title -->
<svelte:head>
	<title>Haunted Horizon</title>
</svelte:head>

<header class="navbar">
	<a href="/" id="logo">Haunted Horizon</a>
	<nav>
		<ul>
			<li>
				<a href="/">Home</a>
			</li>
			<!-- <li>
				<a href="/learnmore">Learn More</a>
			</li> -->
			<li>
				<a href="/pricing">Buy Tickets</a>
			</li>
			{#if user}
				<li>
					<a href="/user" role="button" class="outline">{user?.displayName}</a>
				</li>
			{:else}
				<li>
					<!-- <a href="/user" role="button">Login</a> -->
					<!-- svelte-ignore a11y-no-redundant-roles -->
					<button on:click={() => signInDialog.show()} role="button">Login</button>
				</li>
			{/if}
		</ul>
	</nav>
</header>

<main>
	<slot />
</main>

<footer class="container">
	<nav>
		<ul>
			<li>
				<a href="https://www.instagram.com/hauntedhorizon2024/" target="_blank" rel="noreferrer"
					>Instagram</a>
			</li>
			<li>Email: info@haunted-horizon.com</li>
		</ul>
		{#if user?.customClaims?.admin}
			<ul>
				<li>
					<a href="/admin/users">Admin</a>
				</li>
			</ul>
		{/if}
	</nav>
</footer>

<Dialog
	bind:this={signInDialog}
	open={urlAction === 'login'}
	on:close={(e) => {
		goto($page.url.pathname)
	}}>
	<SignIn />
</Dialog>

<style global>
	@import '../css/style.css';

	#logo {
		color: var(--h1-color);
		text-decoration: none;
		font-size: 1.5rem;
		font-weight: 400;
	}

	.navbar {
		position: fixed;
		background-color: #2b2626;
		right: 0;
		left: 0;
		padding-top: 2vh;
		padding-bottom: 2vh;
		width: 100vw;

		padding-right: 2rem;
		padding-left: 2rem;
		z-index: 10;
	}

	@media screen and (max-width: 600px) {
		#logo {
			display: none;
		}
	}
</style>
