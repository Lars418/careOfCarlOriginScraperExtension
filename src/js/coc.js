const products = document.querySelectorAll('[data-quick]');

products.forEach(async (p) => {
    chrome.storage.local.get('origins', async ({ origins }) => {
        await showOrigin(p, origins);
    });
});

async function showOrigin(p, origins) {
    const productId = p.getAttribute('data-quick');
    const originCountry = await getOriginCountry(productId);
    const info = document.createElement('div');

    if (origins?.map(x => x.toLowerCase())?.includes(originCountry.toLowerCase())) {
        p.parentElement.removeChild(p);
    }

    info.textContent = originCountry;
    info.classList.add('__coc_country__');
    info.setAttribute('style', `
        position: absolute;
        top: .25rem;
        left: 1.4rem;
        background: #f2f2f2;
        color: #000;
        font-size: .9rem;
    `);

    p.appendChild(info);
}

async function getOriginCountry(productId) {
    const baseUrl = `https://${window.location.host}/cgi-bin/ibutik/API.fcgi?funk=get_tab_properties&artnr=`;
    const html = await fetch(baseUrl + productId).then(r => r.text());
    const doc = new DOMParser().parseFromString(html, 'text/html');

    return doc.querySelector('.property_id_383 span').textContent;
}

document.addEventListener('keypress', (e) => {
    if (e.shiftKey && e.key === 'G') {
        chrome.storage.local.get('origins', ({ origins }) => {
            const innerProducts = Array.from(document.querySelectorAll('[data-quick]'));

            innerProducts.filter(p => !p.querySelector('.__coc_country__')).forEach(async (p) => {
                await showOrigin(p, origins);
            });
        });
    }
});