
const cards = document.querySelectorAll('.card');
let draggedElement = null;

cards.forEach(card => {
    card.addEventListener('dragstart', function (e) {
        draggedElement = this;
        this.classList.add('dragging');
        e.dataTransfer.effectAllowed = 'move';
    });

    card.addEventListener('dragend', function (e) {
        this.classList.remove('dragging');
        cards.forEach(c => c.classList.remove('drag-over'));
    });

    card.addEventListener('dragover', function (e) {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';

        if (this !== draggedElement) {
            this.classList.add('drag-over');
        }
    });

    card.addEventListener('dragenter', function (e) {
        e.preventDefault();
        if (this !== draggedElement) {
            this.classList.add('drag-over');
        }
    });

    card.addEventListener('dragleave', function (e) {
        this.classList.remove('drag-over');
    });

    card.addEventListener('drop', function (e) {
        e.preventDefault();
        this.classList.remove('drag-over');

        if (this !== draggedElement && this.classList.contains('empty')) {

            const draggedContent = draggedElement.innerHTML;
            const targetContent = this.innerHTML;

            const draggedIsEmpty = draggedElement.classList.contains('empty');
            const targetIsEmpty = this.classList.contains('empty');

            this.innerHTML = draggedContent;
            draggedElement.innerHTML = targetContent;

            if (draggedIsEmpty) {
                draggedElement.classList.remove('empty');
                this.classList.add('empty');
            } else if (targetIsEmpty) {
                this.classList.remove('empty');
                draggedElement.classList.add('empty');
            }
        }
    });
});