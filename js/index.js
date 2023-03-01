const dropZone = document.getElementById("drop-zone");
const progressBar = document.getElementById("progressBar");
const dropFile = document.querySelector(".drop-files");
const loadFile = document.querySelector(".load-percent");
const inputFile = document.querySelector(".input");
const loadStart = document.querySelector('.load-start');
const loadFailed = document.querySelector('.load-failed');
const loadSuccessful = document.querySelector('.load-successful');
const loadProgress = document.querySelector('.load-progress');
const textLoad = document.querySelector('.change-text');
const iconLoadStartColor = document.querySelector('.start-load-icon svg path');
const loadProgressFile = document.querySelector('.load-progress__file');

const loadProgressClose = document.querySelector('.load-progress__close');
// Handle drag enter
inputFile.addEventListener("dragenter", (e) => {
    e.preventDefault();
    loadStart.classList.add("drag-over");
    textLoad.innerHTML = 'Для начала загрузки отпустите файл';
    textLoad.style.color = '#577BEC';
    iconLoadStartColor.style.fill = '#577BEC';
});
// Handle drag leave
inputFile.addEventListener("dragleave", (e) => {
    e.preventDefault();
    loadStart.classList.remove("drag-over");
    textLoad.innerHTML = 'Перетащите или выберите <span>файл для загрузки</span>';
    textLoad.style.color = '#001737';
    iconLoadStartColor.style.fill = '#001737';
});









function createFileList(file) {
    if (file.name[0] === file.name[0].toLowerCase()) {
        loadStart.style.display = 'none';
        loadProgress.style.display = 'flex';
        loadProgressFile.innerHTML = file.name;
        // Update the progress bar
        const updateProgress = (event) => {
            let fill = document.getElementById("fill");
            let nInterId = setInterval(load, 40);
            let width = 0;
            function load() {
                width += 1;
                fill.style.width = width + "%";
                loadFile.textContent = width + "%";
                if (fill.style.width == '100%') {
                    clearInterval(nInterId);
                    fill.style.width = 0 + "%";
                    loadFile.textContent = 0 + "%";
                    loadProgress.style.display = 'none';
                    loadSuccessful.style.display = 'flex';
                    setTimeout(() => {
                        loadSuccessful.style.display = 'none';
                        loadStart.style.display = 'flex';
                    }, 1000);
                    const fileD = document.createElement("div");
                    fileD.classList.add('drop');
                    const fileText = document.createElement("p");
                    const deleteButton = document.createElement("button");
                    deleteButton.innerHTML = "<img src='./img/del-button.svg' alt='icon-delete'>";
                    fileText.innerHTML = "<img src='./img/icons_document.svg' alt='icon-document'>" + file.name + `<span>${((file.size / 1024).toFixed(0))}КБ</span>`;
                    deleteButton.addEventListener("click", () => {
                        dropFile.removeChild(fileD);
                        console.log(inputFile.value);
                        inputFile.value = "";
                    });
                    fileD.appendChild(fileText);
                    fileD.appendChild(deleteButton);
                    dropFile.appendChild(fileD);
                }
                loadProgressClose.addEventListener("click", () => {
                    clearInterval(nInterId);
                    width = 0;
                    fill.style.width = width + "%";
                    loadFile.textContent = "";
                    loadProgressFile.innerHTML = '';
                    loadProgress.style.display = 'none';
                    loadStart.style.display = 'flex';
                });
            }

        };
        const reader = new FileReader();
        // reader.onload = (event) => {
        //     const xml = event.target.result;
        // };
        reader.onprogress = updateProgress;
        reader.readAsText(file);


    } else {
        loadStart.style.display = 'none';
        loadFailed.style.display = 'flex';
        setTimeout(() => {
            loadFailed.style.display = 'none';
            loadStart.style.display = 'flex';
        }, 1000);
    }
}





// Handle drop
inputFile.addEventListener("drop", (e) => {
    e.preventDefault();
    loadStart.classList.remove("drag-over");
    const files = e.dataTransfer.files;
    for (let i = 0; i < files.length; i++) {
        if (files.length > 0) {
            const file = files[i];
            createFileList(file);
        }
    }
    loadStart.classList.remove("drag-over");
    textLoad.innerHTML = 'Перетащите или выберите <span>файл для загрузки</span>';
    textLoad.style.color = '#001737';
    iconLoadStartColor.style.fill = '#001737';
});
inputFile.addEventListener("change", (e) => {
    e.preventDefault();
    const files = inputFile.files;
    for (let i = 0; i < files.length; i++) {
        if (files.length > 0) {
            const file = files[i];
            createFileList(file);
            setTimeout(() => {
                inputFile.value = "";
            }, 100);
        }
    }
});
// Prevent default drag and drop behavior
document.addEventListener("dragover", (e) => {
    e.preventDefault();
});
document.addEventListener("drop", (e) => {
    e.preventDefault();
});