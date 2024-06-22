document.addEventListener('DOMContentLoaded', function () {
    const leaveForm = document.getElementById('leaveForm');
    const calendar = document.getElementById('calendar');
    const today = new Date();

    // ฟังก์ชันสร้างปฏิทิน
    function createCalendar(year, month) {
        const startOfMonth = new Date(year, month, 1);
        const endOfMonth = new Date(year, month + 1, 0);
        const startDate = startOfMonth.getDay();
        const daysInMonth = endOfMonth.getDate();

        // ล้างปฏิทินเดิม
        calendar.innerHTML = '';

        // เติมช่องว่างก่อนวันที่ 1 ของเดือน
        for (let i = 0; i < startDate; i++) {
            const blankDay = document.createElement('div');
            blankDay.className = 'calendar-day';
            calendar.appendChild(blankDay);
        }

        // เติมวันที่ของเดือนปัจจุบัน
        for (let i = 1; i <= daysInMonth; i++) {
            const dayElement = document.createElement('div');
            dayElement.className = 'calendar-day';
            dayElement.dataset.date = new Date(year, month, i).toISOString().split('T')[0];
            const header = document.createElement('div');
            header.className = 'calendar-day-header';
            header.textContent = i;
            dayElement.appendChild(header);
            calendar.appendChild(dayElement);
        }
    }

    // ฟังก์ชันสุ่มสี
    function getRandomColor() {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    leaveForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const name = document.getElementById('name').value;
        const startDate = new Date(document.getElementById('startDate').value);
        const endDate = new Date(document.getElementById('endDate').value);

        if (startDate > endDate) {
            alert('End date must be after start date.');
            return;
        }

        let currentDate = new Date(startDate);
        let canBook = true;

        // ตรวจสอบการจองเกิน 3 คน
        while (currentDate <= endDate) {
            const dateStr = currentDate.toISOString().split('T')[0];
            const dayElement = document.querySelector(`[data-date="${dateStr}"]`);
            if (dayElement) {
                const leaves = dayElement.querySelectorAll('.leave-indicator').length;
                if (leaves >= 3) {
                    alert(`The date ${dateStr} is already booked by 3 people.`);
                    canBook = false;
                    break;
                }
            }
            currentDate.setDate(currentDate.getDate() + 1);
        }

        if (canBook) {
            currentDate = new Date(startDate);
            const color = getRandomColor();
            while (currentDate <= endDate) {
                const dateStr = currentDate.toISOString().split('T')[0];
                const dayElement = document.querySelector(`[data-date="${dateStr}"]`);
                if (dayElement) {
                    const leaveIndicator = document.createElement('div');
                    leaveIndicator.className = 'leave-indicator';
                    leaveIndicator.textContent = name;
                    leaveIndicator.style.backgroundColor = color; // กำหนดสี
                    dayElement.appendChild(leaveIndicator);
                }
                currentDate.setDate(currentDate.getDate() + 1);
            }
        }

        leaveForm.reset();
    });

    createCalendar(today.getFullYear(), today.getMonth());
});
