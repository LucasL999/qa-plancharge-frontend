# Documentation de l'API Dashboard

## Authentification

Toutes les routes sont protégées par un middleware d'authentification.

Chaque requête doit contenir un JWT valide dans l'en-tête HTTP :

```http
Authorization: Bearer <votre_token>
```

---

# Endpoints

## GET `/api/TotalCap`

Retourne les jours restants (`nbrestant`) de tous les utilisateurs ayant le rôle **QA** (`role = 1`).

Ces données sont utilisées par le tableau de bord afin de calculer la capacité totale disponible de l'équipe.

### Réponse

```json
[
    {
        "nbrestant": 120
    },
    {
        "nbrestant": 95
    },
    {
        "nbrestant": 87
    }
]
```

### Utilisation

Le frontend peut additionner les valeurs retournées afin d'obtenir la capacité totale disponible des QA.

Exemple :

```
120 + 95 + 87 = 302 jours disponibles
```

---

# Codes de retour

| Code HTTP | Signification |
|------------|---------------|
| 200 | Requête réussie |
| 401 | Authentification requise |
| 500 | Erreur interne du serveur |
