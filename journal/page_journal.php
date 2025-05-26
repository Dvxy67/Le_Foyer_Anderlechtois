<?php
// Récupérer l'ID du journal
$id = $_GET['id'];

// Requête SQL pour obtenir les informations du journal, y compris l'URL du PDF
$query = "SELECT * FROM journaux WHERE id = $id";
// Exécuter la requête et récupérer les données

// Afficher le journal avec un lecteur PDF
?>

<h1>Journal N° <?php echo $journal['numero']; ?></h1>
<div class="pdf-viewer">
    <object data="<?php echo $journal['pdf_url']; ?>" type="application/pdf" width="100%" height="800px">
        <p>Votre navigateur ne supporte pas les PDF intégrés. 
        <a href="<?php echo $journal['pdf_url']; ?>">Télécharger le PDF</a>.</p>
    </object>
</div>