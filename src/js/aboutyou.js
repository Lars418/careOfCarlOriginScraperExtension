const selector = '[data-testid^="productTileTracker-"]';
const products = document.querySelectorAll(selector);

products.forEach(async (p) => {
    await showOrigin(p);
});

async function showOrigin(p) {
    p.style.position = 'relative';

    const productWithId = p.getAttribute('data-testid').split('-');
    const productId = productWithId[(productWithId.length - 1)];
    const originCountry = await getOriginCountry(productId);
    const info = document.createElement('div');

    info.textContent = originCountry;
    info.classList.add('__aboutyou_country__');
    info.setAttribute('style', `
        position: absolute;
        top: 0;
        left: 0;
        background: #f2f2f2;
        color: #000;
        font-size: .9rem;
    `);

    p.appendChild(info);
}

async function getOriginCountry(productId) {
    const baseUrl = `https://api-cloud.aboutyou.de/v1/products/${productId}?with=attributes%3Akey%28countryOfOrigin%29`;
    const response = await fetch(baseUrl).then(r => r.json());

    return response.attributes?.countryOfOrigin?.values?.[0]?.label || 'Nicht definiert';
}

document.addEventListener('keypress', (e) => {
    if (e.shiftKey && e.key === 'G') {
        const innerProducts = Array.from(document.querySelectorAll(selector));
        innerProducts.filter(p => !p.querySelector('.__aboutyou_country__')).forEach(async (p) => {
            await showOrigin(p);
        });
    }
});