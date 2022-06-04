const products = document.querySelectorAll('[data-quick]');
const countriesToRemove = [ 'China', 'Sri Lanka', 'Indien', 'Vietnam', 'Kambodsha', 'Albanien', 'Tunesien', 'Bangladesh' ];

products.forEach(async (p) => {
    await showOrigin(p);
});

async function showOrigin(p) {
    const productId = p.getAttribute('data-quick');
    const originCountry = await getOriginCountry(productId);
    const info = document.createElement('div');

    /*if (countriesToRemove.includes(originCountry)) {
        p.parentElement.removeChild(p);
        return;
    }*/

    info.textContent = originCountry;
    info.classList.add('__coc_country__');
    info.setAttribute('style', 'position:absolute;top:.25rem;left:1rem;background:#f2f2f2;color:#000;font-size:.9rem');

    p.appendChild(info);
}

async function getOriginCountry(productId) {
    const baseUrl = 'https://www.careofcarl.de/cgi-bin/ibutik/API.fcgi?funk=get_tab_properties&artnr=';
    const html = await fetch(baseUrl + productId).then(r => r.text());
    const doc = new DOMParser().parseFromString(html, 'text/html');

    return doc.querySelector('.property_id_383 span').textContent;
}

document.addEventListener('keypress', (e) => {
    console.log(e);
    if (e.shiftKey && e.key === 'G') {
        const innerProducts = Array.from(document.querySelectorAll('[data-quick]'));
        innerProducts.filter(p => !p.querySelector('.__coc_country__')).forEach(async (p) => {
            await showOrigin(p);
        });
    }
});