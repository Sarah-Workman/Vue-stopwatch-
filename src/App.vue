<template>
	<router-view></router-view>
</template>
<script></script>

<style lang="scss">
	#app {
		margin-top: 1em;
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
		padding-bottom: 4.5em;

		a {
			@include menuBtn();
			border-top-right-radius: 8px;
			border-bottom-right-radius: 8px;

			color: white;
			&:hover {
				border-width: 10%;
			}
			&.router-link-exact-active {
			}
		}
	}
</style>
