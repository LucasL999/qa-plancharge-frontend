# Documentation de l'API Calendrier

## Authentification

Toutes les routes sont protégées par un middleware d'authentification.

Chaque requête doit contenir un JWT valide dans l'en-tête HTTP :

```http
Authorization: Bearer <votre_token>
```

L'utilisateur est identifié grâce à l'adresse e-mail contenue dans le token.

---

# Endpoints

## POST `/api/addEvent`

Ajoute un nouvel événement au calendrier de l'utilisateur connecté.

Lors de la création de l'événement, le nombre de jours de congés restants (`nbrestant`) est automatiquement décrémenté en fonction de la durée de l'événement.

### Corps de la requête

```json
{
    "date_debut": "2025-07-14",
    "date_fin": "2025-07-18"
}
```

### Champs

| Champ | Type | Description |
|--------|------|-------------|
| date_debut | Date | Date de début de l'événement |
| date_fin | Date | Date de fin de l'événement |

### Réponse

```json
{
    "success": true,
    "data": {
        "id_event": 12,
        "id_user": 5,
        "date_debut": "2025-07-14",
        "date_fin": "2025-07-18"
    }
}
```

---

## GET `/api/events`

Retourne tous les événements appartenant à l'utilisateur connecté.

### Réponse

```json
{
    "success": true,
    "data": [
        {
            "id_event": 12,
            "date_debut": "2025-07-14",
            "date_fin": "2025-07-18"
        },
        {
            "id_event": 15,
            "date_debut": "2025-08-05",
            "date_fin": "2025-08-08"
        }
    ]
}
```

---

## GET `/api/eventsOther`

Retourne les événements des autres utilisateurs.

Cette route permet d'afficher les indisponibilités des autres collaborateurs sans retourner leur identifiant.

### Réponse

```json
{
    "success": true,
    "data": [
        {
            "firstname": "Jean",
            "name": "Dupont",
            "date_debut": "2025-07-10",
            "date_fin": "2025-07-18"
        }
    ]
}
```

---

## PUT `/api/updateEvent`

Modifie un événement existant.

Lors de la modification, le nombre de jours restants est automatiquement recalculé en fonction de la nouvelle durée de l'événement.

Seule la différence entre l'ancienne durée et la nouvelle est prise en compte.

### Corps de la requête

```json
{
    "id_event": 12,
    "date_debut": "2025-07-15",
    "date_fin": "2025-07-21"
}
```

### Champs

| Champ | Type | Description |
|--------|------|-------------|
| id_event | Integer | Identifiant de l'événement |
| date_debut | Date | Nouvelle date de début |
| date_fin | Date | Nouvelle date de fin |

### Réponse

```json
{
    "success": true,
    "data": {
        "id_event": 12,
        "date_debut": "2025-07-15",
        "date_fin": "2025-07-21"
    }
}
```

---

## DELETE `/api/deleteEvent`

Supprime un événement.

Lors de la suppression, le nombre de jours correspondant à l'événement est automatiquement recrédité sur le compteur de congés de l'utilisateur.

### Corps de la requête

```json
{
    "id_event": 12
}
```

### Champs

| Champ | Type | Description |
|--------|------|-------------|
| id_event | Integer | Identifiant de l'événement à supprimer |

### Réponse

```json
{
    "success": true,
    "data": [
        {
            "id_event": 12,
            "id_user": 5,
            "date_debut": "2025-07-14",
            "date_fin": "2025-07-18"
        }
    ]
}
```

---

# Fonctionnement métier

Le module Calendrier gère automatiquement le solde de jours restants (`nbrestant`) de chaque utilisateur.

- **Création d'un événement** : le nombre de jours de l'événement est déduit du solde.
- **Modification d'un événement** : seule la différence entre l'ancienne et la nouvelle durée est appliquée au solde.
- **Suppression d'un événement** : les jours correspondants sont recrédités au solde de l'utilisateur.

La durée d'un événement est calculée de manière inclusive :

```
Nombre de jours = (date_fin - date_debut) + 1
```

Ainsi, un événement du 10 juillet au 12 juillet représente **3 jours**.

---

# Codes de retour

| Code HTTP | Signification |
|------------|---------------|
| 200 | Requête réussie |
| 201 | Événement créé avec succès |
| 401 | Authentification requise |
| 500 | Erreur interne du serveur |
