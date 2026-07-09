# Documentation de l'API Équipe

## Authentification

Toutes les routes sont protégées par un middleware d'authentification.

Chaque requête doit contenir un JWT valide dans l'en-tête HTTP :

```http
Authorization: Bearer <votre_token>
```

---

# Endpoints

## GET `/api/qa`

Retourne la liste de tous les utilisateurs ayant le rôle **QA** (`role = 1`).

Les résultats sont triés par ordre alphabétique sur le nom.

### Réponse

```json
[
    {
        "id_user": 1,
        "firstname": "Jean",
        "name": "Dupont",
        "email": "jean.dupont@example.com",
        "role": 1,
        "nbannual": 25,
        "nbrestant": 18
    },
    {
        "id_user": 2,
        "firstname": "Marie",
        "name": "Martin",
        "email": "marie.martin@example.com",
        "role": 1,
        "nbannual": 30,
        "nbrestant": 22
    }
]
```

### Utilisation

Cette route permet notamment :

- d'afficher la liste des QA ;
- d'affecter des QA à un chantier ;
- de consulter les informations relatives aux membres de l'équipe.

---

## GET `/api/nbQA`

Retourne le nombre total d'utilisateurs ayant le rôle **QA**.

### Réponse

```json
[
    {
        "count": "8"
    }
]
```

> **Remarque :** PostgreSQL retourne la valeur du `COUNT(*)` sous forme de chaîne de caractères (`string`).

---

# Codes de retour

| Code HTTP | Signification |
|------------|---------------|
| 200 | Requête réussie |
| 401 | Authentification requise |
| 500 | Erreur interne du serveur |
