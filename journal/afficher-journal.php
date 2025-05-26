<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Journal - Visualisation</title>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.min.js"></script>
    <style>
        body { margin: 0; font-family: Arial, sans-serif; }
        #pdf-container {
            width: 100%;
            height: 100vh;
            overflow: auto;
            background-color: #525659;
            text-align: center;
        }
        #pdf-viewer {
            display: inline-block;
            margin: 20px auto;
            box-shadow: 0 0 10px rgba(0,0,0,0.3);
        }
        .controls {
            position: fixed;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
            background: white;
            padding: 10px;
            border-radius: 5px;
            box-shadow: 0 0 5px rgba(0,0,0,0.3);
        }
        button {
            padding: 5px 15px;
            margin: 0 5px;
            cursor: pointer;
        }
        #page-num {
            width: 40px;
            text-align: center;
        }
    </style>
</head>
<body>
    <div id="pdf-container">
        <canvas id="pdf-viewer"></canvas>
    </div>
    
    <div class="controls">
        <button id="prev">Précédent</button>
        <span>Page <input id="page-num" type="number" min="1" value="1"> / <span id="page-count">0</span></span>
        <button id="next">Suivant</button>
        <button id="zoom-in">Zoom +</button>
        <button id="zoom-out">Zoom -</button>
    </div>

    <script>
        // Configuration initiale
        let pdfDoc = null,
            pageNum = 1,
            pageRendering = false,
            pageNumPending = null,
            scale = 1.5,
            canvas = document.getElementById('pdf-viewer'),
            ctx = canvas.getContext('2d');

        // Récupérer l'URL du PDF depuis l'URL
        const urlParams = new URLSearchParams(window.location.search);
        const pdfURL = urlParams.get('pdf');

        // Fonction pour charger et rendre le PDF
        pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.worker.min.js';

        // Chargement du document PDF
        pdfjsLib.getDocument(pdfURL).promise.then(function(pdfDoc_) {
            pdfDoc = pdfDoc_;
            document.getElementById('page-count').textContent = pdfDoc.numPages;
            renderPage(pageNum);
        }).catch(function(error) {
            console.error('Erreur lors du chargement du PDF:', error);
            document.getElementById('pdf-container').innerHTML = '<p style="color: white; padding: 20px;">Erreur lors du chargement du PDF. Veuillez réessayer plus tard.</p>';
        });

        // Fonction pour rendre une page
        function renderPage(num) {
            pageRendering = true;
            pdfDoc.getPage(num).then(function(page) {
                const viewport = page.getViewport({scale: scale});
                canvas.height = viewport.height;
                canvas.width = viewport.width;

                const renderContext = {
                    canvasContext: ctx,
                    viewport: viewport
                };
                
                const renderTask = page.render(renderContext);

                renderTask.promise.then(function() {
                    pageRendering = false;
                    if (pageNumPending !== null) {
                        renderPage(pageNumPending);
                        pageNumPending = null;
                    }
                });
            });

            document.getElementById('page-num').value = num;
        }

        // Fonction pour aller à la page précédente/suivante
        function queueRenderPage(num) {
            if (pageRendering) {
                pageNumPending = num;
            } else {
                renderPage(num);
            }
        }

        function onPrevPage() {
            if (pageNum <= 1) {
                return;
            }
            pageNum--;
            queueRenderPage(pageNum);
        }

        function onNextPage() {
            if (pageNum >= pdfDoc.numPages) {
                return;
            }
            pageNum++;
            queueRenderPage(pageNum);
        }

        document.getElementById('prev').addEventListener('click', onPrevPage);
        document.getElementById('next').addEventListener('click', onNextPage);

        // Gestion du zoom
        document.getElementById('zoom-in').addEventListener('click', function() {
            scale += 0.25;
            renderPage(pageNum);
        });

        document.getElementById('zoom-out').addEventListener('click', function() {
            if (scale <= 0.5) return;
            scale -= 0.25;
            renderPage(pageNum);
        });

        // Gestion de la saisie de numéro de page
        document.getElementById('page-num').addEventListener('change', function() {
            const newPageNum = parseInt(this.value);
            if (newPageNum > 0 && newPageNum <= pdfDoc.numPages) {
                pageNum = newPageNum;
                renderPage(pageNum);
            } else {
                this.value = pageNum;
            }
        });
    </script>
</body>
</html>