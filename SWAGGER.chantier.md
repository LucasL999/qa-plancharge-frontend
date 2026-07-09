# Documentation de l'API Chantier

## Authentification

Toutes les routes sont protégées par un middleware d'authentification.

Chaque requête doit contenir un JWT valide dans l'en-tête HTTP :

```http
Authorization: Bearer <votre_token>
```

---

# Endpoints

## GET `/api/statuts`

Retourne la liste des statuts disponibles.

### Réponse

```json
[
  {
    "id_statut": 1,
    "libelle": "Clos"
  },
  {
    "id_statut": 2,
    "libelle": "En cours"
  }
]
```

---

## GET `/api/priorites`

Retourne la liste des priorités.

### Réponse

```json
[
  {
    "id_priorite": 1,
    "libelle": "Haute"
  }
]
```

---

## GET `/api/newChantierQA`

Retourne les utilisateurs pouvant être affectés en tant que QA.

### Réponse

```json
[
  {
    "id_user": 5,
    "firstname": "Jean",
    "name": "Dupont"
  }
]
```

---

## POST `/api/chantier`

Crée un nouveau chantier.

### Corps de la requête

```json
{
    "chantier": "Migration ERP",
    "priorite": 2,
    "statut": 2,
    "qa": [3,5],
    "cp": "Martin",
    "financement": 350000,
    "nature": "Migration",
    "capacite": 80,
    "prev": 120,
    "cons": 0,
    "debut": "2025-01-15",
    "fin": "2025-09-30"
}
```

### Champs

| Champ | Type | Description |
|--------|------|-------------|
| chantier | String | Nom du chantier |
| priorite | Integer | Identifiant de la priorité |
| statut | Integer | Identifiant du statut |
| qa | Integer[] | Liste des identifiants QA |
| cp | String | Chef de projet |
| financement | Number | Budget |
| nature | String | Nature du chantier |
| capacite | Integer | Capacité |
| prev | Number | Charge prévisionnelle |
| cons | Number | Charge consommée |
| debut | Date | Date de début |
| fin | Date | Date de fin |

### Réponse

```json
{
    "success": true,
    "data": 15
}
```

---

## GET `/api/getChantier`

Retourne la liste complète des chantiers.

Chaque chantier contient :

- Informations générales
- Statut
- Priorité
- Chef de projet
- QA affectés
- Budget
- Prévisionnel
- Consommé

### Exemple

```json
[
  {
    "id_chantier": 1,
    "titre": "Migration ERP",
    "stat": "En cours",
    "prio": "Haute",
    "cp": "Martin",
    "finance": 300000,
    "prev": 120,
    "cons": 60,
    "qas": [
      {
        "id": 3,
        "firstname": "Jean",
        "name": "Dupont"
      }
    ]
  }
]
```

---

## PUT `/api/updateChantier`

Met à jour un chantier existant.

Le corps de la requête est identique à celui utilisé pour la création avec un champ supplémentaire :

```json
{
    "id": 15,
    "priorite": 2,
    "statut": 2,
    "qa": [3],
    "cp": "Martin",
    "financement": 400000,
    "nature": "Migration",
    "capacite": 90,
    "prev": 120,
    "cons": 130,
    "debut": "2025-01-15",
    "fin": "2025-12-31"
}
```

### Fonctionnement

Cette opération :

- met à jour le chantier ;
- remplace les QA affectés ;
- génère automatiquement une alerte si `cons > prev` ;
- supprime les alertes lorsque le chantier est clôturé.

---

## DELETE `/api/deleteChantier/{id}`

Supprime un chantier.

### Paramètre

| Nom | Type | Description |
|------|------|-------------|
| id | Integer | Identifiant du chantier |

### Exemple

```
DELETE /api/deleteChantier/12
```

---

## POST `/api/import`

Crée un chantier minimal à partir de son titre.

Cette route est utilisée lors de l'import de données.

### Corps

```json
{
    "titre": "Nouveau chantier"
}
```

### Réponses

**201**

```json
{
    "success": true,
    "data": {
        "id_chantier": 18,
        "titre": "Nouveau chantier"
    }
}
```

**409**

```json
{
    "error": "Un chantier avec ce titre existe déjà."
}
```

---

# Statistiques

## GET `/api/prev`

Retourne le total des jours/homme prévisionnels.

### Réponse

```json
[
    {
        "sum": 3250
    }
]
```

---

## GET `/api/cons`

Retourne le total des jours/homme consommés.

### Réponse

```json
[
    {
        "sum": 2810
    }
]
```

---

## GET `/api/NbChantierEncours`

Retourne le nombre de chantiers ayant le statut **En cours**.

### Réponse

```json
[
    {
        "count": 14
    }
]
```

---

# Alertes

Les alertes sont générées automatiquement lorsqu'un chantier dépasse son prévisionnel (`cons > prev`).

---

## GET `/api/alertes`

Retourne toutes les alertes actives.

### Réponse

```json
[
    {
        "id_alerte": 5,
        "message": "Dépassement JH sur le chantier Migration ERP (150/120)",
        "datecreation": "2025-06-18"
    }
]
```

---

## GET `/api/historique`

Retourne les alertes désactivées des trois derniers mois.

---

## GET `/api/Nbalertes`

Retourne le nombre d'alertes actives.

### Réponse

```json
[
    {
        "count": 3
    }
]
```

---

# Codes de retour

| Code HTTP | Signification |
|------------|---------------|
| 200 | Requête réussie |
| 201 | Ressource créée |
| 401 | Authentification requise |
| 409 | Conflit (chantier déjà existant) |
| 500 | Erreur interne du serveur |
