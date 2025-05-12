<?php
// Fichier: admin/edit_message.php

session_start();
if (!isset($_SESSION['admin_logged_in']) || $_SESSION['admin_logged_in'] !== true) {
    header('Location: login.php');
    exit;
}

require_once('../config/database.php');

if (!isset($_GET['id']) || empty($_GET['id'])) {
    header('Location: dashboard.php');
    exit;
}

$id = intval($_GET['id']);
// Récupération du message
$stmt = $pdo->prepare("SELECT * FROM messages WHERE id = ?");
$stmt->execute([$id]);
$message = $stmt->fetch();

if (!$message) {
    header('Location: dashboard.php');
    exit;
}

// Traitement du formulaire de mise à jour
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['update_message'])) {
    $title = htmlspecialchars($_POST['title']);
    $content = htmlspecialchars($_POST['content']);
    
    $stmt = $pdo->prepare("UPDATE messages SET title = ?, content = ? WHERE id = ?");
    if ($stmt->execute([$title, $content, $id])) {
        header("Location: dashboard.php?success=message_updated");
        exit;
    } else {
        $error_message = "Erreur lors de la mise à jour du message.";
    }
}
?>

<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Modifier un message - Administration</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.2.3/css/bootstrap.min.css">
</head>
<body>
    <div class="container">
        <header class="d-flex justify-content-between align-items-center py-3 mb-4 border-bottom">
            <h1 class="h3">Modifier un message</h1>
            <a href="dashboard.php" class="btn btn-outline-secondary">Retour au tableau de bord</a>
        </header>
        
        <?php if (isset($error_message)): ?>
            <div class="alert alert-danger"><?php echo $error_message; ?></div>
        <?php endif; ?>
        
        <div class="card">
            <div class="card-body">
                <form method="POST" action="">
                    <div class="mb-3">
                        <label for="title" class="form-label">Titre</label>
                        <input type="text" class="form-control" id="title" name="title" value="<?php echo $message['title']; ?>" required>
                    </div>
                    <div class="mb-3">
                        <label for="content" class="form-label">Contenu</label>
                        <textarea class="form-control" id="content" name="content" rows="10" required><?php echo $message['content']; ?></textarea>
                    </div>
                    <button type="submit" name="update_message" class="btn btn-primary">Mettre à jour</button>
                    <a href="dashboard.php" class="btn btn-secondary">Annuler</a>
                </form>
            </div>
        </div>
    </div>
    
    <script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.2.3/js/bootstrap.bundle.min.js"></script>
</body>
</html>