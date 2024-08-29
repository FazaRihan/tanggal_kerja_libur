document.addEventListener('DOMContentLoaded', function () {
    const periodeKerja = 56;  // Hari kerja
    const periodeLibur = 14;  // Hari libur
    let currentYear = new Date().getFullYear();  // Tahun saat ini

    const startDate = new Date(currentYear, 8, 3);  // 3 September tahun saat ini
    const holidays = new Map();
    const startDates = new Map();

    // Fungsi untuk menghitung tanggal mulai kerja dan libur
    function calculateWorkAndHolidays() {
        let currentDate = new Date(startDate);  // Mulai dari 3 September

        // Lanjutkan perhitungan tanpa batas tahun
        while (true) {
            let year = currentDate.getFullYear();

            if (!startDates.has(year)) {
                startDates.set(year, []);
                holidays.set(year, []);
            }

            startDates.get(year).push(new Date(currentDate));  // Menandai tanggal mulai kerja
            currentDate.setDate(currentDate.getDate() + periodeKerja);  // Tambahkan periode kerja

            let holidayStart = new Date(currentDate);
            holidays.get(year).push(new Date(holidayStart));  // Menandai hari libur
            currentDate.setDate(currentDate.getDate() + periodeLibur);  // Tambahkan periode libur

            // Jika sudah melebihi tahun yang diperlukan, berhenti
            if (year > currentYear + 50) break;  // Batas aman untuk menghentikan loop
        }
    }

    calculateWorkAndHolidays();  // Panggil fungsi untuk menghitung tanggal kerja dan libur

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

            // Menambahkan tanggal dari bulan sebelumnya
            for (let i = 1; i < firstDay.getDay(); i++) {
                const dayCell = document.createElement('div');
                dayCell.className = 'day';
                dayCell.style.opacity = '0.5';  // Menandakan bahwa ini adalah tanggal bulan sebelumnya
                tableContainer.appendChild(dayCell);
            }

            // Menambahkan hari dalam bulan
            for (let day = 1; day <= lastDay.getDate(); day++) {
                const dayDate = new Date(year, month, day);
                const dayCell = document.createElement('div');
                dayCell.className = 'day';
                dayCell.textContent = day;

                if (holidays.get(year) && holidays.get(year).some(holiday => holiday.getMonth() === month && holiday.getDate() === day)) {
                    dayCell.classList.add('libur');
                }

                if (startDates.get(year) && startDates.get(year).some(start => start.getMonth() === month && start.getDate() === day)) {
                    dayCell.classList.add('start-date');
                }

                tableContainer.appendChild(dayCell);
            }

            // Menambahkan tanggal dari bulan berikutnya
            for (let i = lastDay.getDay(); i < 6; i++) {
                const dayCell = document.createElement('div');
                dayCell.className = 'day';
                dayCell.style.opacity = '0.5';  // Menandakan bahwa ini adalah tanggal bulan berikutnya
                tableContainer.appendChild(dayCell);
            }

            calendarContainer.appendChild(tableContainer);
            document.getElementById('calendar').appendChild(calendarContainer);
        }
        document.getElementById('year-label').textContent = year;
    }

    // Tombol navigasi
    document.getElementById('prev-year').addEventListener('click', function () {
        currentYear--;
        createCalendar(currentYear);
    });

    document.getElementById('next-year').addEventListener('click', function () {
        currentYear++;
        createCalendar(currentYear);
    });

    // Buat kalender untuk tahun awal
    createCalendar(currentYear);
});
