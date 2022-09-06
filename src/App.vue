<template>
	<nav>
		<router-link to="/">Stopwatch</router-link>
		<router-link to="/timer">Timer</router-link>
		<router-link to="/alarm">Alarm</router-link>
	</nav>
	<router-view />
</template>
<style lang="scss">
	#app {
		display: flex;
		margin-top: 3em;
	}
</style>

<style lang="scss" scoped>
	$fontStyle: Arial, Helvetica, sans-serif;
	@mixin menuBtn {
		text-decoration: none;

		color: black;
		text-align: center;
		font-size: 20px;
		font-family: $fontStyle;
		padding: 0.5em;
	}

	nav {
		align-self: flex-start;
		display: flex;
		flex-direction: column;

		align-items: flex-end;
		padding: 0.5em;
		background-color: rgb(138, 136, 136);
		padding-bottom: 5em;

		a {
			@include menuBtn();
			border-top-right-radius: 8px;
			border-bottom-right-radius: 8px;

			color: white;
			&:hover {
				border-left: 1px solid #0ff4c6;
				border-right: 1px solid #0ff4c6;
				border-width: 10%;
			}
			&.router-link-exact-active {
				border-left: 1px solid #0ff4c6;
				border-right: 1px solid #0ff4c6;
			}
		}
	}
</style>
