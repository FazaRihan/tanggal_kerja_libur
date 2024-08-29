document.addEventListener('DOMContentLoaded', function () {
    const periodeKerja = 56;  // Hari kerja
    const periodeLibur = 14;  // Hari libur
    let currentYear = 2024;  // Tahun awal

    const startDate = new Date(currentYear, 8, 3);  // 3 September tahun awal
    const endDate = new Date(startDate);
    endDate.setFullYear(endDate.getFullYear() + 2);  // Dua tahun ke depan

    // Menghitung tanggal libur
    const holidays = [];
    const startDates = [];
    let currentDate = new Date(startDate);
    while (currentDate < endDate) {
        let holidayStart = new Date(currentDate);
        holidayStart.setDate(currentDate.getDate() + periodeKerja);
        holidays.push(holidayStart);
        startDates.push(new Date(currentDate));  // Menyimpan tanggal awal kerja
        currentDate = new Date(holidayStart);
        currentDate.setDate(holidayStart.getDate() + periodeLibur);
    }

    // Fungsi untuk membuat kalender bulan
    function createCalendar(year) {
        document.getElementById('calendar').innerHTML = '';  // Kosongkan konten kalender
        const monthNames = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
        const daysOfWeek = ["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"];

        for (let month = 0; month < 12; month++) {
            const firstDay = new Date(year, month, 1);
            const lastDay = new Date(year, month + 1, 0);
            const calendarContainer = document.createElement('div');
            calendarContainer.className = 'month';

            const header = document.createElement('h2');
            header.textContent = `${monthNames[month]} ${year}`;
            calendarContainer.appendChild(header);

            const tableContainer = document.createElement('div');
            tableContainer.className = 'table-container';

            // Menambahkan hari dalam seminggu
            daysOfWeek.forEach(day => {
                const dayCell = document.createElement('div');
                dayCell.className = 'day';
                dayCell.textContent = day;
                tableContainer.appendChild(dayCell);
            });

            // Menambahkan hari dalam bulan
            for (let i = 0; i < firstDay.getDay(); i++) {
                tableContainer.appendChild(document.createElement('div'));
            }

            for (let day = 1; day <= lastDay.getDate(); day++) {
                const dayDate = new Date(year, month, day);
                const dayCell = document.createElement('div');
                dayCell.className = 'day';
                dayCell.textContent = day;

                if (holidays.some(holiday => holiday.getFullYear() === year && holiday.getMonth() === month && holiday.getDate() === day)) {
                    dayCell.classList.add('libur');
                }

                if (startDates.some(start => start.getFullYear() === year && start.getMonth() === month && start.getDate() === day)) {
                    dayCell.classList.add('start-date');
                }

                tableContainer.appendChild(dayCell);
            }

            calendarContainer.appendChild(tableContainer);
            document.getElementById('calendar').appendChild(calendarContainer);
        }
        document.getElementById('year-label').textContent = year;
    }

    // Tombol navigasi
    document.getElementById('prev-year').addEventListener('click', function () {
        if (currentYear > 2024) {
            currentYear--;
            createCalendar(currentYear);
        }
    });

    document.getElementById('next-year').addEventListener('click', function () {
        if (currentYear < 2025) {
            currentYear++;
            createCalendar(currentYear);
        }
    });

    // Buat kalender untuk tahun awal
    createCalendar(currentYear);
});
