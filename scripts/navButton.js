const menuItems = document.querySelectorAll('#menu a');
    menuItems.forEach(item => {
    item.addEventListener('click', () => {
        menuItems.forEach(link => link.classList.remove('text-blue-500','underline'));
        item.classList.add('text-blue-500' ,'underline');
        });
    });