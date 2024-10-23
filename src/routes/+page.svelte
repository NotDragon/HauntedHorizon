<script>
	// You can add Svelte specific JavaScript logic here
</script>

<main class="background-image">
	<div>
		<h1 class="title">Haunted Horizon</h1>
		<p>Join us for a spooky experience in the misty woods!</p>
	</div>
</main>

<div class="ticket-section">
	<div class="ticket-card">
		<img src="/images/slide_1_bg_image.png" />
		<h2>Overview</h2>
		<p>Get ready for a thrilling adventure!</p>
		<button>Buy Ticket</button>
	</div>
	<div class="ticket-card">
		<img src="/images/slide_2_bg_image.png" />
		<h2>Event Detail</h2>
		<p>Get ready for a thrilling adventure!</p>
		<button>Learn More</button>
	</div>
	<div class="ticket-card-small">
		<img src="/images/location_icon.png" />
		<h2>Date & Time</h2>
		<p>Learn more about our haunted attractions.</p>
	</div>
	<div class="ticket-card-small">
		<h2>Location</h2>
		<p>Reserve your place now for the ultimate scare!</p>
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
		background: #1a1a1a;
		padding: 20px;
		border-radius: 10px;
		width: 25vw;
		text-align: center;
		color: #f39c12;
		border: 2px solid;
		border-image: linear-gradient(to right, rgb(107, 64, 41), rgb(107, 48, 41)) 1;
	}

	.ticket-section img {
		width: 20vw;
		aspect-ratio: 2;
		object-fit: cover;
	}

	.ticket-card-small {
		background: #1a1a1a;
		padding: 20px;
		border-radius: 10px;
		width: 15vw;
		text-align: center;
		color: #f39c12;
		border: 2px solid;
		border-image: linear-gradient(to right, rgb(107, 64, 41), rgb(107, 48, 41)) 1;
	}

	.ticket-card-small img {
		object-fit: contain;
	}

	.title {
		color: black;
		font-family: Creepy;
	}

	button {
		margin-top: 10px;
		background: var(--primary);
		color: #181818;
		border: none;
		padding: 10px;
		border-radius: var(--border-radius);
		cursor: pointer;
	}
</style>
