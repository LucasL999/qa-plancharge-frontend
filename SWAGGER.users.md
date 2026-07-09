# Documentation de l'API Utilisateurs

## Authentification

Toutes les routes sont protégées par un middleware d'authentification.

Chaque requête doit contenir un JWT valide dans l'en-tête HTTP :

```http
Authorization: Bearer <votre_token>
```

---

# Endpoints

## GET `/api/me`

Retourne les informations de l'utilisateur actuellement authentifié.

L'utilisateur est identifié grâce à l'adresse e-mail présente dans le JWT.

### Réponse

```json
{
    "id": 5,
    "email": "jean.dupont@example.com",
    "role": 1
}
```

### Erreurs possibles

**403**

```json
{
    "error": "User not found in database"
}
```

---

## GET `/api/roles`

Retourne la liste des rôles disponibles.

### Réponse

```json
[
    {
        "id_role": 1,
        "libelle": "QA"
    },
    {
        "id_role": 2,
        "libelle": "Chef de projet"
    },
    {
        "id_role": 3,
        "libelle": "Administrateur"
    }
]
```

---

## GET `/api/users`

Retourne la liste de tous les utilisateurs ainsi que leur rôle.

Les utilisateurs sont triés par ordre alphabétique sur leur nom.

### Réponse

```json
[
    {
        "id_user": 1,
        "name": "Dupont",
        "firstname": "Jean",
        "email": "jean.dupont@example.com",
        "nbrestant": 20,
        "role": 1,
        "libelle": "QA"
    }
]
```

---

## POST `/api/users`

Ajoute un nouvel utilisateur.

Le nombre de jours annuels (`nbannual`) et le nombre de jours restants (`nbrestant`) sont initialisés avec la valeur du champ `absences`.

### Corps de la requête

```json
{
    "nom": "Dupont",
    "prenom": "Jean",
    "id_role": 1,
    "absences": 25,
    "email": "jean.dupont@example.com"
}
```

### Champs

| Champ | Type | Description |
|--------|------|-------------|
| nom | String | Nom de l'utilisateur |
| prenom | String | Prénom de l'utilisateur |
| id_role | Integer | Identifiant du rôle |
| absences | Integer | Nombre annuel de jours disponibles |
| email | String | Adresse e-mail (doit être unique) |

### Réponse

```json
{
    "success": true,
    "data": {
        "id_user": 8,
        "name": "Dupont",
        "firstname": "Jean",
        "role": 1,
        "nbannual": 25,
        "nbrestant": 25,
        "email": "jean.dupont@example.com"
    }
}
```

### Erreurs possibles

**409**

```json
{
    "error": "EMAIL_ALREADY_EXITS"
}
```

Cette erreur est renvoyée lorsqu'un utilisateur possède déjà cette adresse e-mail.

---

## PUT `/api/users/:id_user`

Met à jour les informations d'un utilisateur.

### Corps de la requête

```json
{
    "id_user": 8,
    "nom": "Dupont",
    "prenom": "Jean",
    "id_role": 2,
    "absences": 18,
    "email": "jean.dupont@example.com"
}
```

### Champs

| Champ | Type | Description |
|--------|------|-------------|
| id_user | Integer | Identifiant de l'utilisateur |
| nom | String | Nom |
| prenom | String | Prénom |
| id_role | Integer | Nouveau rôle |
| absences | Integer | Nouveau nombre de jours restants |
| email | String | Adresse e-mail |

### Réponse

```json
{
    "success": true,
    "data": {
        "id_user": 8,
        "name": "Dupont",
        "firstname": "Jean",
        "role": 2,
        "nbrestant": 18,
        "email": "jean.dupont@example.com"
    }
}
```

> **Remarque :** cette route met à jour uniquement le champ `nbrestant`. Le champ `nbannual` n'est pas modifié.

---

## DELETE `/api/deleteUser/{id_user}`

Supprime un utilisateur.

### Paramètre

| Nom | Type | Description |
|------|------|-------------|
| id_user | Integer | Identifiant de l'utilisateur à supprimer |

### Exemple

```http
DELETE /api/deleteUser/8
```

### Réponse

```json
[]
```

---

# Fonctionnement métier

Le module Utilisateurs permet :

- de récupérer les informations de l'utilisateur connecté ;
- de gérer les rôles disponibles dans l'application ;
- de consulter la liste complète des utilisateurs ;
- d'ajouter un nouvel utilisateur ;
- de modifier les informations d'un utilisateur ;
- de supprimer un utilisateur.

Lors de la création d'un utilisateur, le nombre de jours annuels (`nbannual`) et le nombre de jours restants (`nbrestant`) sont initialisés avec la même valeur.

---

# Codes de retour

| Code HTTP | Signification |
|------------|---------------|
| 200 | Requête réussie |
| 201 | Utilisateur créé |
| 401 | Authentification requise |
| 403 | Utilisateur non trouvé |
| 409 | Adresse e-mail déjà utilisée |
| 500 | Erreur interne du serveur |
