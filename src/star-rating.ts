import { component, css } from '@pionjs/pion';
import { html, nothing } from 'lit-html';
import { styleMap } from 'lit-html/directives/style-map.js';

export interface Props {
	rating?: number | null;
	disabled?: boolean;
	readonly?: boolean;
	maxRating?: number;
}

const style = css`
	:host {
		display: inline-block;
		--rating-star-size: 24px;
		--rating-star-color: #ffd700;
		--rating-star-unrated-color: #d3d3d3;
		--rating-star-hover-color: #ffed4e;
		--rating-star-spacing: 2px;
	}

	.rating-container {
		display: flex;
		align-items: center;
		gap: var(--rating-star-spacing);
	}

	.star {
		width: var(--rating-star-size);
		height: var(--rating-star-size);
		cursor: pointer;
		transition: color 0.2s ease;
		position: relative;
		display: inline-block;
	}

	.star:not(.disabled):not(.readonly):hover {
		color: var(--rating-star-hover-color);
	}

	.star.disabled,
	.star.readonly {
		cursor: default;
	}

	.star svg {
		width: 100%;
		height: 100%;
		display: block;
	}
	
	.star svg path {
		fill: currentColor;
	}

	.star.filled {
		color: var(--rating-star-color);
	}

	.star.unrated {
		color: var(--rating-star-unrated-color);
	}

	.star.partial {
		color: var(--rating-star-color);
		position: relative;
	}

	/* Base star (filled) */
	.star.partial svg {
		position: relative;
		z-index: 2;
	}

	/* Unrated portion (right side) - covers the unrated part */
	.star.partial::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: var(--rating-star-unrated-color);
		clip-path: polygon(var(--partial-width, 50%) 0, 100% 0, 100% 100%, var(--partial-width, 50%) 100%);
		z-index: 3;
		pointer-events: none;
		mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z'/%3E%3C/svg%3E");
		mask-size: 100% 100%;
		mask-repeat: no-repeat;
	}

	/* Filled portion (left side) - ensures the filled part is visible */
	.star.partial::after {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: var(--rating-star-color);
		clip-path: polygon(0 0, var(--partial-width, 50%) 0, var(--partial-width, 50%) 100%, 0 100%);
		z-index: 4;
		pointer-events: none;
		mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z'/%3E%3C/svg%3E");
		mask-size: 100% 100%;
		mask-repeat: no-repeat;
	}

	.rating-display {
		margin-left: 10px;
		font-size: 14px;
		color: var(--rating-text-color, #666);
		font-weight: 500;
		transition: color 0.2s ease;
	}

	.rating-display:hover {
		color: var(--rating-text-hover-color, #333);
	}
`;

const starSvg = html`<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
	<path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="currentColor"/>
</svg>`;

const StarRating = (host: HTMLElement & Props) => {
	// Get properties from host with defaults
	const rating = host.rating;
	const disabled = host.disabled || false;
	const readonly = host.readonly || false;
	const maxRating = host.maxRating || 5;
	
	const isInteractive = !disabled && !readonly;
	const isUnrated = rating === null || rating === undefined;
	
	// State for hover preview
	let hoverRating: number | null = null;

	const getStarClass = (starIndex: number) => {
		if (!isInteractive) {
			return 'star disabled readonly';
		}
		return 'star';
	};

	const getStarFillClass = (starIndex: number) => {
		// Use hover rating for preview if available and interactive
		const currentRating = isInteractive && hoverRating !== null ? hoverRating : rating;
		
		if (currentRating === null || currentRating === undefined) {
			return 'unrated';
		}

		const starValue = starIndex + 1;
		const fullStars = Math.floor(currentRating);
		const hasPartial = currentRating % 1 !== 0;

		if (starValue <= fullStars) {
			return 'filled';
		} else if (starValue === fullStars + 1 && hasPartial) {
			return 'partial';
		} else {
			return 'unrated';
		}
	};

	const getPartialStarStyle = (starIndex: number) => {
		// Use hover rating for preview if available and interactive
		const currentRating = isInteractive && hoverRating !== null ? hoverRating : rating;
		
		if (currentRating === null || currentRating === undefined) return {};
		
		const starValue = starIndex + 1;
		const fullStars = Math.floor(currentRating);
		const hasPartial = currentRating % 1 !== 0;

		if (starValue === fullStars + 1 && hasPartial) {
			// Always show exactly 50% for any fractional rating (like the image)
			return {
				'--partial-width': '50%'
			};
		}
		return {};
	};

	const handleStarClick = (starIndex: number) => {
		if (!isInteractive) return;
		
		const newRating = starIndex + 1;
		host.dispatchEvent(new CustomEvent('rating', {
			detail: { rating: newRating },
			bubbles: true,
			composed: true
		}));
	};

	const handleStarHover = (starIndex: number) => {
		if (!isInteractive) return;
		
		// Set hover rating for preview
		hoverRating = starIndex + 1;
		
		// Force re-render to show preview
		host.requestUpdate();
	};

	const handleStarMouseLeave = () => {
		if (!isInteractive) return;
		
		// Reset hover rating
		hoverRating = null;
		
		// Force re-render to hide preview
		host.requestUpdate();
	};

	const stars = Array.from({ length: maxRating }, (_, index) => {
		const starClass = getStarClass(index);
		const fillClass = getStarFillClass(index);
		const partialStyle = getPartialStarStyle(index);
		
		return html`
			<div 
				class="${starClass} ${fillClass}"
				style="${styleMap(partialStyle)}"
				@click=${() => handleStarClick(index)}
				@mouseenter=${() => handleStarHover(index)}
				@mouseleave=${handleStarMouseLeave}
				part="star"
			>
				${starSvg}
			</div>
		`;
	});

	return html`
		<div class="rating-container" part="container">
			${stars}
			${isInteractive ? html`
				<div class="rating-display" part="rating-display">
					${hoverRating !== null ? `Preview: ${hoverRating} star${hoverRating !== 1 ? 's' : ''}` : 
					  rating !== null && rating !== undefined ? `Current: ${rating} star${rating !== 1 ? 's' : ''}` : 
					  'Click to rate'}
				</div>
			` : nothing}
		</div>
	`;
};

customElements.define(
	'star-rating',
	component<Props>(StarRating, { styleSheets: [style] }),
);

export { StarRating };
