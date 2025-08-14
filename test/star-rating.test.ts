import { expect, fixture, html } from '@open-wc/testing';
import '../src';

describe('star-rating', () => {
	it('renders with default props', async () => {
		const el = await fixture(html`<star-rating></star-rating>`);
		expect(el).to.exist;
		expect(el.rating).to.be.undefined;
		expect(el.disabled).to.be.false;
		expect(el.readonly).to.be.false;
		expect(el.maxRating).to.equal(5);
	});

	it('renders correct number of stars based on maxRating', async () => {
		const el = await fixture(html`<star-rating maxRating="3"></star-rating>`);
		const stars = el.shadowRoot?.querySelectorAll('.star');
		expect(stars).to.have.length(3);
	});

	it('shows unrated state when rating is null', async () => {
		const el = await fixture(html`<star-rating rating="null"></star-rating>`);
		const stars = el.shadowRoot?.querySelectorAll('.star.unrated');
		expect(stars).to.have.length(5);
	});

	it('shows filled stars for whole number ratings', async () => {
		const el = await fixture(html`<star-rating rating="3"></star-rating>`);
		const filledStars = el.shadowRoot?.querySelectorAll('.star.filled');
		const unratedStars = el.shadowRoot?.querySelectorAll('.star.unrated');
		expect(filledStars).to.have.length(3);
		expect(unratedStars).to.have.length(2);
	});

	it('shows partial star for fractional ratings', async () => {
		const el = await fixture(html`<star-rating rating="3.5"></star-rating>`);
		const filledStars = el.shadowRoot?.querySelectorAll('.star.filled');
		const partialStars = el.shadowRoot?.querySelectorAll('.star.partial');
		const unratedStars = el.shadowRoot?.querySelectorAll('.star.unrated');
		expect(filledStars).to.have.length(3);
		expect(partialStars).to.have.length(1);
		expect(unratedStars).to.have.length(1);
	});

	it('shows correct partial star for 3.23 rating', async () => {
		const el = await fixture(html`<star-rating rating="3.23"></star-rating>`);
		const filledStars = el.shadowRoot?.querySelectorAll('.star.filled');
		const partialStars = el.shadowRoot?.querySelectorAll('.star.partial');
		const unratedStars = el.shadowRoot?.querySelectorAll('.star.unrated');
		expect(filledStars).to.have.length(3);
		expect(partialStars).to.have.length(1);
		expect(unratedStars).to.have.length(1);
	});

	it('disables interaction when disabled attribute is set', async () => {
		const el = await fixture(html`<star-rating disabled></star-rating>`);
		const stars = el.shadowRoot?.querySelectorAll('.star.disabled');
		expect(stars).to.have.length(5);
	});

	it('disables interaction when readonly attribute is set', async () => {
		const el = await fixture(html`<star-rating readonly></star-rating>`);
		const stars = el.shadowRoot?.querySelectorAll('.star.readonly');
		expect(stars).to.have.length(5);
	});

	it('fires rating event when star is clicked', async () => {
		const el = await fixture(html`<star-rating></star-rating>`);
		let eventFired = false;
		let eventDetail = null;

		el.addEventListener('rating', (e: CustomEvent) => {
			eventFired = true;
			eventDetail = e.detail;
		});

		const firstStar = el.shadowRoot?.querySelector('.star') as HTMLElement;
		firstStar?.click();

		expect(eventFired).to.be.true;
		expect(eventDetail).to.deep.equal({ rating: 1 });
	});

	it('does not fire rating event when disabled', async () => {
		const el = await fixture(html`<star-rating disabled></star-rating>`);
		let eventFired = false;

		el.addEventListener('rating', () => {
			eventFired = true;
		});

		const firstStar = el.shadowRoot?.querySelector('.star') as HTMLElement;
		firstStar?.click();

		expect(eventFired).to.be.false;
	});

	it('does not fire rating event when readonly', async () => {
		const el = await fixture(html`<star-rating readonly></star-rating>`);
		let eventFired = false;

		el.addEventListener('rating', () => {
			eventFired = true;
		});

		const firstStar = el.shadowRoot?.querySelector('.star') as HTMLElement;
		firstStar?.click();

		expect(eventFired).to.be.false;
	});

	it('applies correct partial star styling', async () => {
		const el = await fixture(html`<star-rating rating="3.7"></star-rating>`);
		const partialStar = el.shadowRoot?.querySelector('.star.partial') as HTMLElement;
		expect(partialStar).to.exist;
		expect(partialStar.style.getPropertyValue('--partial-width')).to.equal('70%');
	});

	it('shows rating display for interactive component', async () => {
		const el = await fixture(html`<star-rating></star-rating>`);
		const ratingDisplay = el.shadowRoot?.querySelector('.rating-display');
		expect(ratingDisplay).to.exist;
		expect(ratingDisplay?.textContent?.trim()).to.equal('Click to rate');
	});

	it('shows current rating in display when rating is set', async () => {
		const el = await fixture(html`<star-rating rating="3"></star-rating>`);
		const ratingDisplay = el.shadowRoot?.querySelector('.rating-display');
		expect(ratingDisplay?.textContent?.trim()).to.equal('Current: 3 stars');
	});

	it('does not show rating display for readonly component', async () => {
		const el = await fixture(html`<star-rating readonly></star-rating>`);
		const ratingDisplay = el.shadowRoot?.querySelector('.rating-display');
		expect(ratingDisplay).to.not.exist;
	});

	it('does not show rating display for disabled component', async () => {
		const el = await fixture(html`<star-rating disabled></star-rating>`);
		const ratingDisplay = el.shadowRoot?.querySelector('.rating-display');
		expect(ratingDisplay).to.not.exist;
	});

	it('uses correct CSS variables for styling', async () => {
		const el = await fixture(html`<star-rating rating="3"></star-rating>`);
		const filledStar = el.shadowRoot?.querySelector('.star.filled') as HTMLElement;
		const unratedStar = el.shadowRoot?.querySelector('.star.unrated') as HTMLElement;
		
		expect(filledStar).to.exist;
		expect(unratedStar).to.exist;
		
		// Check that the component uses the correct CSS variables
		const computedStyle = getComputedStyle(el);
		expect(computedStyle.getPropertyValue('--rating-star-color')).to.equal('#ffd700');
		expect(computedStyle.getPropertyValue('--rating-star-unrated-color')).to.equal('#d3d3d3');
	});
});
