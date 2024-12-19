const daysContainer = document.getElementById('days');
const monthYearDisplay = document.getElementById('month-year');
const colorSwitch = document.getElementById('color-switch');
let selectedColor = 'red';

const today = new Date();
let currentMonth = today.getMonth();
let currentYear = today.getFullYear();

const colors = document.querySelectorAll('.color');

colors.forEach(color => {
    color.addEventListener('click', () => {
        colors.forEach(c => c.classList.remove('selected'));
        color.classList.add('selected');
        selectedColor = color.dataset.color;
    });
});

function renderCalendar(month, year) {
    daysContainer.innerHTML = '';
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    monthYearDisplay.textContent = `${today.toLocaleString('default', { month: 'long' })} ${year}`;

    for (let i = 0; i < firstDay; i++) {
        const emptyCell = document.createElement('div');
        emptyCell.classList.add('day');
        emptyCell.style.visibility = 'hidden';
        daysContainer.appendChild(emptyCell);
    }

    for (let day = 1; day <= daysInMonth; day++) {
        const dayElement = document.createElement('div');
        dayElement.classList.add('day');
        dayElement.textContent = day;

        if (
            day === today.getDate() &&
            month === today.getMonth() &&
            year === today.getFullYear()
        ) {
            dayElement.style.background = selectedColor;
        }

        dayElement.addEventListener('click', () => {
            dayElement.style.background = selectedColor;
        });

        daysContainer.appendChild(dayElement);
    }
}

document.getElementById('prev-month').addEventListener('click', () => {
    currentMonth--;
    if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
    }
    renderCalendar(currentMonth, currentYear);
});

document.getElementById('next-month').addEventListener('click', () => {
    currentMonth++;
    if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
    }
    renderCalendar(currentMonth, currentYear);
});

renderCalendar(currentMonth, currentYear);