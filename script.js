let currentPlayer = 1;
let fields = [];
const lines = {
    h1: [0, 1, 2], h2: [3, 4, 5], h3: [6, 7, 8],
    v1: [0, 3, 6], v2: [1, 4, 7], v3: [2, 5, 8],
    d1: [0, 4, 8], d2: [2, 4, 6]
};

const fillField = (index) => {
    const field = event.currentTarget;
    if (alreadyClicked(event.currentTarget)) return;
    field.style.setProperty(`--p${currentPlayer}-shown`, '1');
    field.disabled = true;
    updateFields(index);
}

const alreadyClicked = (button) => button.style.getPropertyValue('--p1-shown') == '1' || button.style.getPropertyValue('--p2-shown') == '1';

const updateFields = (index) => {
    fields[index] = currentPlayer;
    checkWin();
    switchPlayer();
}

const checkWin = () => {
    for (const [line, [one, two, three]] of Object.entries(lines)){
        if (!fields[one]) continue;
        if (fields[one] == fields[two] && fields[two] == fields[three]) {
            endScreen(line);
            return;
        };
    }
    if (allFieldsDrawn()) endScreen('', true);
}

const allFieldsDrawn = () => fields.filter(field => field !== '').length == 9

const endScreen = (line, draw = false) => {
    qs('#line-container').classList.toggle('d-none', false);
    if (line) qs(`#${line}`).classList.toggle('active', true);
    setTimeout(()=>vis(qs('.end-screen'), false), 1000);
    if (!draw) {
        qs('#winner').innerText = `Spieler ${currentPlayer} hat Gewonnen!`;
    } else {
        qs('#winner').innerText = 'Unentschieden!';
    };
}

const switchPlayer = () => {
    if (currentPlayer == 1) {
        currentPlayer = 2;
        return;
    }
    if (currentPlayer == 2) currentPlayer = 1;
}

const start = () => {
    event.currentTarget.classList.toggle('d-none');
    toggleFields();
    qs('.wrapper').classList.toggle('inactive');
}

const restart = () => {
    toggleFields(true);
    fields = [];
    currentPlayer = 1;
    qAll('button[disabled]').forEach(button => button.disabled = false);
}

const toggleFields = (fullrotation = false) => {
    qAll('.area').forEach((button, index) => {
        button.style.setProperty('--p1-shown', '0');
        button.style.setProperty('--p2-shown', '0');
        setTimeout(()=>button.classList.toggle('inactive'), 50 * index);
        if (fullrotation) setTimeout(()=>button.classList.toggle('inactive'), 50 * index + 200)
    })
    qAll('#line-container > div > div').forEach(line => line.classList.toggle('active', false));
    vis(qs('#line-container'), true);
    vis(qs('.end-screen'), true);
}

const playerHover = () => {
    const field = event.currentTarget;
    if (field.classList.contains('inactive')) return;
    field.addEventListener("mouseleave", ()=> field.style = null);
    field.style.setProperty(`--p${currentPlayer}-shown`, '0.5');
}