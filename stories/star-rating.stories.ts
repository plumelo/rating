import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from '@pionjs/pion';
import '../src';

const meta: Meta = {
	title: 'Star Rating',
	component: 'star-rating',
	argTypes: {
		rating: {
			control: { type: 'number', min: 0, max: 5, step: 0.1 },
			description: 'The current rating value (null/undefined for unrated)',
		},
		disabled: {
			control: { type: 'boolean' },
			description: 'Whether the rating component is disabled',
		},
		readonly: {
			control: { type: 'boolean' },
			description: 'Whether the rating component is readonly',
		},
		maxRating: {
			control: { type: 'number', min: 1, max: 10 },
			description: 'Maximum number of stars',
		},
	},
};

export default meta;

export type Story = StoryObj;

export const Default: Story = {
	args: {
		rating: 3.5,
		disabled: false,
		readonly: false,
		maxRating: 5,
	},
	render: (args) => html`
		<star-rating
			.rating=${args.rating}
			?disabled=${args.disabled}
			?readonly=${args.readonly}
			.maxRating=${args.maxRating}
			@rating=${(e: CustomEvent) =>
				console.log('Rating changed:', e.detail.rating)}
		></star-rating>
	`,
};

export const Unrated: Story = {
	args: {
		rating: null,
		disabled: false,
		readonly: false,
		maxRating: 5,
	},
	render: (args) => html`
		<star-rating
			.rating=${args.rating}
			?disabled=${args.disabled}
			?readonly=${args.readonly}
			.maxRating=${args.maxRating}
			@rating=${(e: CustomEvent) =>
				console.log('Rating changed:', e.detail.rating)}
		></star-rating>
	`,
};

export const Readonly: Story = {
	args: {
		rating: 4.2,
		disabled: false,
		readonly: true,
		maxRating: 5,
	},
	render: (args) => html`
		<star-rating
			.rating=${args.rating}
			?disabled=${args.disabled}
			?readonly=${args.readonly}
			.maxRating=${args.maxRating}
			@rating=${(e: CustomEvent) =>
				console.log('Rating changed:', e.detail.rating)}
		></star-rating>
	`,
};

export const Disabled: Story = {
	args: {
		rating: 2.7,
		disabled: true,
		readonly: false,
		maxRating: 5,
	},
	render: (args) => html`
		<star-rating
			.rating=${args.rating}
			?disabled=${args.disabled}
			?readonly=${args.readonly}
			.maxRating=${args.maxRating}
			@rating=${(e: CustomEvent) =>
				console.log('Rating changed:', e.detail.rating)}
		></star-rating>
	`,
};

export const FractionalRatings: Story = {
	render: () => html`
		<div
			style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px;"
		>
			<div
				style="text-align: center; padding: 15px; border: 1px solid #ddd; border-radius: 8px;"
			>
				<strong>5.0 stars:</strong><br />
				<star-rating
					.rating=${5}
					@rating=${(e: CustomEvent) =>
						console.log('Rating changed:', e.detail.rating)}
				></star-rating>
			</div>
			<div
				style="text-align: center; padding: 15px; border: 1px solid #ddd; border-radius: 8px;"
			>
				<strong>4.5 stars (half):</strong><br />
				<star-rating
					.rating=${4.5}
					@rating=${(e: CustomEvent) =>
						console.log('Rating changed:', e.detail.rating)}
				></star-rating>
			</div>
			<div
				style="text-align: center; padding: 15px; border: 1px solid #ddd; border-radius: 8px;"
			>
				<strong>4.0 stars:</strong><br />
				<star-rating
					.rating=${4}
					@rating=${(e: CustomEvent) =>
						console.log('Rating changed:', e.detail.rating)}
				></star-rating>
			</div>
			<div
				style="text-align: center; padding: 15px; border: 1px solid #ddd; border-radius: 8px;"
			>
				<strong>3.5 stars (half):</strong><br />
				<star-rating
					.rating=${3.5}
					@rating=${(e: CustomEvent) =>
						console.log('Rating changed:', e.detail.rating)}
				></star-rating>
			</div>
			<div
				style="text-align: center; padding: 15px; border: 1px solid #ddd; border-radius: 8px;"
			>
				<strong>3.23 stars (as requested):</strong><br />
				<star-rating
					.rating=${3.23}
					@rating=${(e: CustomEvent) =>
						console.log('Rating changed:', e.detail.rating)}
				></star-rating>
			</div>
			<div
				style="text-align: center; padding: 15px; border: 1px solid #ddd; border-radius: 8px;"
			>
				<strong>3.0 stars:</strong><br />
				<star-rating
					.rating=${3}
					@rating=${(e: CustomEvent) =>
						console.log('Rating changed:', e.detail.rating)}
				></star-rating>
			</div>
			<div
				style="text-align: center; padding: 15px; border: 1px solid #ddd; border-radius: 8px;"
			>
				<strong>2.5 stars (half):</strong><br />
				<star-rating
					.rating=${2.5}
					@rating=${(e: CustomEvent) =>
						console.log('Rating changed:', e.detail.rating)}
				></star-rating>
			</div>
			<div
				style="text-align: center; padding: 15px; border: 1px solid #ddd; border-radius: 8px;"
			>
				<strong>2.0 stars:</strong><br />
				<star-rating
					.rating=${2}
					@rating=${(e: CustomEvent) =>
						console.log('Rating changed:', e.detail.rating)}
				></star-rating>
			</div>
			<div
				style="text-align: center; padding: 15px; border: 1px solid #ddd; border-radius: 8px;"
			>
				<strong>1.5 stars (half):</strong><br />
				<star-rating
					.rating=${1.5}
					@rating=${(e: CustomEvent) =>
						console.log('Rating changed:', e.detail.rating)}
				></star-rating>
			</div>
			<div
				style="text-align: center; padding: 15px; border: 1px solid #ddd; border-radius: 8px;"
			>
				<strong>1.0 stars:</strong><br />
				<star-rating
					.rating=${1}
					@rating=${(e: CustomEvent) =>
						console.log('Rating changed:', e.detail.rating)}
				></star-rating>
			</div>
		</div>
	`,
};

export const DifferentSizes: Story = {
	render: () => html`
		<style>
			.size-demo {
				display: flex;
				flex-direction: column;
				gap: 20px;
			}
			.size-demo star-rating {
				--rating-star-size: var(--size);
			}
		</style>
		<div class="size-demo">
			<div>
				<strong>Small (16px):</strong>
				<star-rating
					.rating=${3.5}
					style="--size: 16px;"
					@rating=${(e: CustomEvent) =>
						console.log('Rating changed:', e.detail.rating)}
				></star-rating>
			</div>
			<div>
				<strong>Medium (24px - default):</strong>
				<star-rating
					.rating=${3.5}
					style="--size: 24px;"
					@rating=${(e: CustomEvent) =>
						console.log('Rating changed:', e.detail.rating)}
				></star-rating>
			</div>
			<div>
				<strong>Large (32px):</strong>
				<star-rating
					.rating=${3.5}
					style="--size: 32px;"
					@rating=${(e: CustomEvent) =>
						console.log('Rating changed:', e.detail.rating)}
				></star-rating>
			</div>
			<div>
				<strong>Extra Large (48px):</strong>
				<star-rating
					.rating=${3.5}
					style="--size: 48px;"
					@rating=${(e: CustomEvent) =>
						console.log('Rating changed:', e.detail.rating)}
				></star-rating>
			</div>
		</div>
	`,
};

export const CustomColors: Story = {
	render: () => html`
		<style>
			.color-demo {
				display: flex;
				flex-direction: column;
				gap: 20px;
			}
			.color-demo star-rating {
				--rating-star-color: var(--star-color);
				--rating-star-hover-color: var(--hover-color);
			}
		</style>
		<div class="color-demo">
			<div>
				<strong>Gold (default):</strong>
				<star-rating
					.rating=${3.5}
					style="--star-color: #ffd700; --hover-color: #ffed4e;"
					@rating=${(e: CustomEvent) =>
						console.log('Rating changed:', e.detail.rating)}
				></star-rating>
			</div>
			<div>
				<strong>Red:</strong>
				<star-rating
					.rating=${3.5}
					style="--star-color: #ff4444; --hover-color: #ff6666;"
					@rating=${(e: CustomEvent) =>
						console.log('Rating changed:', e.detail.rating)}
				></star-rating>
			</div>
			<div>
				<strong>Blue:</strong>
				<star-rating
					.rating=${3.5}
					style="--star-color: #4444ff; --hover-color: #6666ff;"
					@rating=${(e: CustomEvent) =>
						console.log('Rating changed:', e.detail.rating)}
				></star-rating>
			</div>
			<div>
				<strong>Green:</strong>
				<star-rating
					.rating=${3.5}
					style="--star-color: #44ff44; --hover-color: #66ff66;"
					@rating=${(e: CustomEvent) =>
						console.log('Rating changed:', e.detail.rating)}
				></star-rating>
			</div>
		</div>
	`,
};

export const InteractiveDemo: Story = {
	render: () => html`
		<div style="display: flex; flex-direction: column; gap: 20px;">
			<div>
				<strong>Interactive Rating with Hover Preview:</strong>
				<p style="color: #666; font-size: 14px; margin-bottom: 10px;">
					Hover over stars to see preview, click to set rating. The component
					shows current rating and preview text.
				</p>
				<star-rating
					id="interactive-rating"
					.rating=${0}
					@rating=${(e: CustomEvent) => {
						const rating = e.detail.rating;
						console.log('Rating changed to:', rating);
						// Update the readonly display
						const readonlyDisplay = document.getElementById('readonly-display');
						if (readonlyDisplay) {
							readonlyDisplay.rating = rating;
						}
					}}
				></star-rating>
			</div>

			<div>
				<strong>Readonly Display (updates automatically):</strong>
				<star-rating id="readonly-display" .rating=${0} readonly></star-rating>
			</div>
		</div>
	`,
};

export const MaxRatingVariations: Story = {
	render: () => html`
		<div style="display: flex; flex-direction: column; gap: 20px;">
			<div>
				<strong>3 stars max:</strong>
				<star-rating
					.rating=${2.5}
					.maxRating=${3}
					@rating=${(e: CustomEvent) =>
						console.log('Rating changed:', e.detail.rating)}
				></star-rating>
			</div>
			<div>
				<strong>5 stars max (default):</strong>
				<star-rating
					.rating=${3.5}
					.maxRating=${5}
					@rating=${(e: CustomEvent) =>
						console.log('Rating changed:', e.detail.rating)}
				></star-rating>
			</div>
			<div>
				<strong>10 stars max:</strong>
				<star-rating
					.rating=${7.3}
					.maxRating=${10}
					@rating=${(e: CustomEvent) =>
						console.log('Rating changed:', e.detail.rating)}
				></star-rating>
			</div>
		</div>
	`,
};

export const HoverFeedbackDemo: Story = {
	render: () => html`
		<div style="display: flex; flex-direction: column; gap: 20px;">
			<div>
				<strong>Hover Feedback Demo:</strong>
				<p style="color: #666; font-size: 14px; margin-bottom: 10px;">
					Hover over the stars below to see the preview functionality in action.
					The text will show "Preview: X stars" as you hover, and "Current: X
					stars" when not hovering.
				</p>
				<star-rating
					.rating=${2.5}
					@rating=${(e: CustomEvent) =>
						console.log('Rating changed:', e.detail.rating)}
				></star-rating>
			</div>

			<div>
				<strong>Unrated with Hover Preview:</strong>
				<star-rating
					@rating=${(e: CustomEvent) =>
						console.log('Rating changed:', e.detail.rating)}
				></star-rating>
			</div>
		</div>
	`,
};
