graph TB
    %% Version simplifiée pour présentation
    subgraph PRESENTATION["🎤 SLIDE 1: Architecture générale"]
        USER[👤 Utilisateur] --> URL[🌐 URL saisie]
        URL --> ROUTER[🚪 Routeur<br/>index.php]
        ROUTER --> LOGIC[🎮 Logique métier<br/>Contrôleurs]
        LOGIC --> DATA[🗄️ Données<br/>Base MySQL]
        LOGIC --> VIEW[👁️ Interface<br/>Templates HTML]
        VIEW --> FINAL[📱 Page web finale]
        FINAL --> USER
    end
    
    %% Exemples concrets pour slide 2
    subgraph EXAMPLES["🎤 SLIDE 2: Exemples concrets"]
        EX1["/catalogue<br/>→ Galerie d'œuvres"]
        EX2["/admin/item/create<br/>→ Ajouter une œuvre"]
        EX3["/contact<br/>→ Formulaire de contact"]
    end
    
    %% Technologies pour slide 3
    subgraph TECH["🎤 SLIDE 3: Stack technique"]
        FRONTEND[🎨 Frontend<br/>HTML5, CSS3, JS]
        BACKEND[⚙️ Backend<br/>PHP 8, MVC Pattern]
        DATABASE[🗃️ Base de données<br/>MySQL]
        FEATURES[✨ Fonctionnalités<br/>Admin, Galerie, Contact]
    end
    
    classDef userStyle fill:#e3f2fd,stroke:#1976d2,stroke-width:2px
    classDef systemStyle fill:#f3e5f5,stroke:#7b1fa2,stroke-width:2px
    classDef techStyle fill:#e8f5e8,stroke:#388e3c,stroke-width:2px
    
    class USER,FINAL userStyle
    class ROUTER,LOGIC,DATA,VIEW systemStyle
    class FRONTEND,BACKEND,DATABASE,FEATURES techStyle