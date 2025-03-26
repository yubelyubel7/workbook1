function toggleWindow(windowId) {
    const window = document.getElementById(windowId);
    window.classList.toggle("hidden");
}

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.window').forEach(window => {
        window.classList.remove('hidden');
    });
});