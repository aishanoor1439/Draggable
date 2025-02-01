document.addEventListener('DOMContentLoaded', function () {
    let items = document.querySelectorAll('.item');
    let divContainer = document.getElementById('divContainer');

    items.forEach(item => {
        item.ondragstart = function (e) {
            e.dataTransfer.setData('text', this.id);
        };
    });

    divContainer.ondragover = function (e) {
        e.preventDefault();
    };

    divContainer.ondrop = function (e) {
        e.preventDefault();
        let id = e.dataTransfer.getData('text');
        let draggedItem = document.getElementById(id);
        let dropTarget = e.target;

        if (dropTarget.classList.contains('item') || dropTarget === divContainer) {
            if (dropTarget !== draggedItem) {
                dropTarget === divContainer ? divContainer.appendChild(draggedItem) :
                    dropTarget.insertAdjacentElement('afterend', draggedItem);
                updateNavbar(draggedItem, dropTarget);
            }
        }
    };

    function updateNavbar(draggedItem, dropTarget) {
        if (!dropTarget.classList.contains('item')) return;

        let draggedNav = document.getElementById('nav-' + draggedItem.id);
        let dropNav = document.getElementById('nav-' + dropTarget.id);

        if (!draggedNav || !dropNav) return;

        let sublist = dropNav.querySelector('ul') || dropNav.appendChild(document.createElement('ul'));
        sublist.appendChild(draggedNav);
    }
});
