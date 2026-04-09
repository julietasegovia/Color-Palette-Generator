class Color {
    constructor (hex, element){
        this.hex = hex;
        this.element = element;
        this.locked = false;
    }

    setHex (hex) {
        this.hex = hex;
        this.element.style.backgroundColor = hex;
        this.element.querySelector('.color-input').value = hex;
    }

    setLocked(Locked){
        this.locked = Locked;
        if(this.locked){
            this.element.classList.add('locked');
            this.element.querySelector('img').src = 'images/lock-closed.svg';
        } else {
            this.element.classList.remove('locked');
            this.element.querySelector('img').src = 'images/lock-open.svg';
        }
    }

    toggleLocked () {
        this.setLocked(!this.locked);
    }

    generateHex () {
        if(this.locked)
            return;

        const chars = '0123456789ABCDEF';

        let hex = '#';

        for(let i = 0; i < 6; i++){
            hex += chars[Math.floor(Math.random() * 16)];
        }

        this.setHex(hex);
    }

    copyToClipboard () {
        const input = this.element.querySelector('.color-input');
        input.select();
        document.execCommand('copy');
        input.blur();

        this.element.classList.add('copied');
        setTimeout(() => {
            this.element.classList.remove('copied');
        }, 1000);
    }
}

const color_elements = document.querySelectorAll('.colors .color');

const colors = [];

for (let i = 0; i < color_elements.length; i++){
    const color_element = color_elements[i];

    const input = color_element.querySelector('.color-input');
    const lock_toggle = color_element.querySelector('.lock-toggle');
    const copy_hex = color_element.querySelector('.copy-hex');

    const hex = input.value;

    const color = new Color(hex, color_element);

    input.addEventListener('input', (e) => color.setHex(e.target.value));
    lock_toggle.addEventListener('click', () => color.toggleLocked());
    copy_hex.addEventListener('click', () => color.copyToClipboard());
    
    color.generateHex();
    colors.push(color);
}

document.querySelector('.generator-button').addEventListener('click', () => {
    for(let i = 0; i < colors.length; i++){
        colors[i].generateHex();
    }
});

document.addEventListener('keypress', (e) => {
    if(e.composed.toLowerCase() === "space"){
        for (let i = 0; i < colors.length; i++){
            colors[i].generateHex();
        }
    }
})