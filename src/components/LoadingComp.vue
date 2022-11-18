<template>
	<div class="stopwatch-container">
		<div class="stopwatch-logo-container">
			<div class="logo"></div>
			<div class="signOut"></div>
		</div>

		<div class="stopwatch-wrapper">
			<div class="rectangle-container">
				<div class="rectangle"></div>
				<div class="button-container">
					<!-- <start-btn @start="startStopBtnClick" Id="startStopBtn" /> -->
					<div class="start-btn"></div>
					<div class="button-functions">
						<!-- <LapBtn @lap="lapBtn" /> -->
						<div class="lap-btn"></div>
						<!-- <EditBtn @edit="editSubmitBtnClick" /> -->
						<div class="edit-btn"></div>
						<!-- <ResetBtn @reset="resetBtn" /> -->
						<div class="reset-btn"></div>
					</div>
				</div>
			</div>
		</div>

		<div class="divider">
			<div class="lap-container">
				<!-- @click="isEditing ? bulkDelete(lap.id) : null" -->
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: "Loading",
	};
</script>

<style scoped lang="scss">
	.stopwatch {
		&-container {
			border-radius: 8px;
			width: fit-content;
			&.divider {
				top: 261px;
				left: -22px;
				width: 1129px;
				height: 433px;
				border: 1px solid grey;
				&.lap {
					&-container {
						justify-content: center;
						display: flex;
						margin: auto;
						align-content: flex-start;
						flex-direction: row;
						margin-top: 1em;
						flex-wrap: wrap;
						gap: 1em;
					}
					& div {
						border-radius: 4px;
						width: 230px;
						height: 67px;
						display: flex;
						align-items: center;
						justify-content: space-around;
						gap: 0.25em;
						background: grey;
					}
				}
			}
		}
		&-wrapper {
			border-radius: 8px;
			display: flex;
			align-items: center;
			justify-content: center;
			.rectangle {
				&-container {
					flex-direction: column;
					justify-content: center;
					align-content: center;
					display: flex;
					.button {
						&-container {
							display: flex;
							justify-content: center;
							align-items: center;
							flex-direction: column;
							row-gap: 0.5em;
							&.start-btn {
								background: grey;
								width: 209px;
								height: 61px;
								border-radius: 4px;
							}
						}
						&-functions {
							display: flex;
							column-gap: 1em;
							margin-bottom: 1em;
							&.lap-btn {
								background: grey;
								width: 155px;
								height: 43px;
								border-radius: 4px;
							}
							&.reset-btn {
								background: grey;
								width: 155px;
								height: 43px;
								border-radius: 4px;
							}
							.edit-btn {
								background: grey;
								width: 155px;
								height: 43px;
								border-radius: 4px;
							}
						}
					}
				}
				&-wrapper {
					width: fit-content;
					&.text-wrapper {
						width: 557px;
						height: 170px;
						background: grey;
					}
				}
			}
		}
		&-logo-container {
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			& .signOut {
				justify-content: center;
				margin-top: 1.5em;
				background: grey;
			}
		}
	}
</style>
