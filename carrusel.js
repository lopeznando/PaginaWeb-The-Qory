document.addEventListener("DOMContentLoaded", function () {
    // Carrusel de imágenes
    const carrusel = document.querySelector(".carrusel");
    const totalCards = document.querySelectorAll(".card").length;
    const cardsPerSlide = 2; // Mostrar dos imágenes por vez
    let currentIndex = 0;

    // Función para mover el carrusel a la derecha
    function moveRight() {
        if (currentIndex < totalCards - cardsPerSlide) {
            currentIndex++;
        } else {
            currentIndex = 0; // Vuelve al principio al llegar al final
        }
        updateCarruselPosition();
    }

    // Función para actualizar la posición del carrusel
    function updateCarruselPosition() {
        const newTransformValue = `translateX(-${currentIndex * (100 / cardsPerSlide)}%)`;
        carrusel.style.transform = newTransformValue;
    }

    // Desplazamiento automático
    setInterval(moveRight, 3000); // Desplaza cada 3 segundos (3000 ms)

    // Modal
    const openModalBtn = document.getElementById('openModalBtn');
    const closeModalBtn = document.getElementById('closeModalBtn');
    const modal = document.getElementById('modal');
    const overlay = document.getElementById('overlay');
    const contactForm = document.getElementById('contactForm');
    const dataTable = document.getElementById('dataTable').getElementsByTagName('tbody')[0];

    // Variable para almacenar el índice de la fila seleccionada para actualizar
    let editingRow = null;

    // Abrir ventana emergente
    openModalBtn.addEventListener('click', () => {
        modal.style.display = 'block';
        overlay.style.display = 'block';
    });

    // Cerrar ventana emergente
    closeModalBtn.addEventListener('click', () => {
        modal.style.display = 'none';
        overlay.style.display = 'none';
    });

    // Cerrar al hacer clic fuera de la ventana
    overlay.addEventListener('click', () => {
        modal.style.display = 'none';
        overlay.style.display = 'none';
    });

    // Agregar datos a la tabla cuando se envía el formulario
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault(); // Evitar el envío del formulario

        // Obtener los valores del formulario
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;

        // Deshabilitar el botón de envío temporalmente para evitar múltiples envíos
        const submitButton = contactForm.querySelector('button[type="submit"]');
        submitButton.disabled = true;

        // Si estamos editando, actualizamos la fila
        if (editingRow) {
            editingRow.cells[1].textContent = name;
            editingRow.cells[2].textContent = email;
            editingRow.cells[3].textContent = phone;

            // Resetear la fila en edición
            editingRow = null;
        } else {
            // Crear una nueva fila en la tabla
            const row = dataTable.insertRow();

            // Insertar la celda del checkbox
            const checkCell = row.insertCell(0);
            const checkBox = document.createElement('input');
            checkBox.type = 'checkbox';
            checkBox.classList.add('checkbox');
            checkCell.appendChild(checkBox);

            // Insertar las celdas de datos
            const nameCell = row.insertCell(1);
            const emailCell = row.insertCell(2);
            const phoneCell = row.insertCell(3);

            nameCell.textContent = name;
            emailCell.textContent = email;
            phoneCell.textContent = phone;
        }

        // Limpiar el formulario
        contactForm.reset();

        // Habilitar el botón de envío nuevamente después de un breve retraso
        setTimeout(() => {
            submitButton.disabled = false;
        }, 500); // Ajusta el tiempo según sea necesario
    });

    // Funcionalidad para seleccionar y eliminar filas usando checkboxes
    document.getElementById('deleteSelected').addEventListener('click', () => {
        const checkboxes = document.querySelectorAll('.checkbox');
        checkboxes.forEach((checkbox) => {
            if (checkbox.checked) {
                const row = checkbox.closest('tr'); // Obtener la fila correspondiente al checkbox
                row.remove(); // Eliminar la fila
            }
        });
    });

    // Función para actualizar las filas seleccionadas
    document.getElementById('updateSelected').addEventListener('click', () => {
        const checkboxes = document.querySelectorAll('.checkbox');
        checkboxes.forEach((checkbox) => {
            if (checkbox.checked) {
                const row = checkbox.closest('tr'); // Obtener la fila correspondiente al checkbox
                const name = row.cells[1].textContent;
                const email = row.cells[2].textContent;
                const phone = row.cells[3].textContent;

                // Llenar el formulario con los datos de la fila seleccionada
                document.getElementById('name').value = name;
                document.getElementById('email').value = email;
                document.getElementById('phone').value = phone;

                // Guardar la fila actual como la fila a actualizar
                editingRow = row;
            }
        });
    });
});
