<script>
	import { goto } from '$app/navigation'

	// You can add Svelte specific JavaScript logic here
</script>

<main class="background-image">
	<div>
		<h1 class="title">Haunted Horizon</h1>
		<p class="about">
			Step into a world where the ordinary fades and the extraordinary comes to life. Haunted
			Horizon is Nicosias premier Halloween event, offering an unforgettable night filled with
			music, mystery, and magic. Join us on October 28th for an experience that will haunt your
			dreams—in the best way possible!
		</p>
	</div>
</main>

<div class="ticket-section">
	<div class="ticket-card">
		<img src="/images/slide_1_bg_image.png" />
		<h4>Overview</h4>
		<ul>
			<li>Ticket Price: €15 (includes a free drink and Nachos)</li>
		</ul>
		<button on:click={() => goto('/pricing')}>Buy Ticket</button>
	</div>
	<div class="ticket-card">
		<img src="/images/slide_2_bg_image.png" />
		<h4>Event Detail</h4>
		<ul>
			<li>Chromacopia Listening Party</li>
			<li>
				Be among the first to experience Tyler, the Creator's new album in an immersive setting.
			</li>
			<li>Costume Competition. €50 prize!</li>
		</ul>
		<button on:click={() => goto('/learnmore')}>Learn More</button>
	</div>
	<div class="ticket-card-small">
		<img src="/images/calendar_icon.png" />
		<h4>When?</h4>
		<p>Date: <b style="color: var(--primary)">28th of October</b></p>
		<p>Time: <b style="color: var(--primary)">16:00 - 24:00</b></p>
	</div>
	<div class="ticket-card-small">
		<img src="/images/location_icon.png" />
		<h4>Where?</h4>
		<p>Venue: 24/7 Events Cyprus</p>
		<p>Address: Georgiou Christofidi 1A, Larnaca 6031</p>
		<button on:click={() => goto('https://maps.app.goo.gl/KcPBPdJCu1cEG2Cn9')}
			><img id="location-image" src="/images/Ei-location.png" /></button>
	</div>
</div>

<style>
	.background-image {
		background:
			linear-gradient(to top, #3e4243 1%, transparent 10%),
			url('/images/bg_image.png') fixed;
		background-size: contain; /* Ensures the image covers the entire div */
		background-position: center; /* Centers the image */
		background-repeat: no-repeat;
		background-position-y: 19%;

		height: 60vh;
		display: flex;
		justify-content: center;
		align-items: center;
		text-align: center;
	}

	.ticket-section {
		margin: 20px;
		display: flex;
		justify-content: center;
		gap: 10px;
	}

	.ticket-card {
		position: relative;
		background: #1a1a1a;
		padding: 20px;
		width: 25vw;
		text-align: center;
		color: #f39c12;
		border: 2px solid;
		border-image: linear-gradient(to right, rgb(107, 64, 41), rgb(107, 48, 41)) 1;
		border-radius: 10px;
		padding-bottom: 12vh;
		z-index: 1;
	}

	.ticket-section img {
		width: 20vw;
		aspect-ratio: 2;
		object-fit: cover;
	}

	.ticket-card-small {
		position: relative;
		background: #1a1a1a;
		padding: 20px;
		border-radius: 10px;
		width: 15vw;
		text-align: center;
		color: #f39c12;
		border: 2px solid;
		border-image: linear-gradient(to right, rgb(107, 64, 41), rgb(107, 48, 41)) 1;
		padding-bottom: 12vh;

		z-index: 1;
	}

	.ticket-card-small img {
		height: 10vw;
		object-fit: contain;
	}

	.title {
		color: black;
		font-family: Creepy;
	}

	.about {
		max-width: 60vw;
	}

	button {
		position: absolute;
		left: 5%;
		right: 5%;
		bottom: 0;
		margin-top: 10px;
		background: var(--primary);
		color: #181818;
		border: none;
		padding: 10px;
		border-radius: var(--border-radius);
		cursor: pointer;
		width: 90%;
	}

	p,
	li {
		font-size: 0.75rem;
	}

	#location-image {
		width: 1rem;
		height: 1rem;
	}

	@media screen and (max-width: 600px) {
		.ticket-card-small {
			width: 100%;
			margin-bottom: 1vh;
		}
		.ticket-card {
			width: 100%;
			margin-bottom: 1vh;
		}
		.ticket-card-small img {
			width: 50vw;
			object-fit: contain;
		}
		.ticket-card img {
			width: 50vw;
			object-fit: contain;
		}

		.ticket-section {
			display: block;
		}

		h1 {
			font-size: 2rem;
		}
	}
</style>
