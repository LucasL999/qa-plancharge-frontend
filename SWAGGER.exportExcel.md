# Documentation de l'API Export Excel

## Authentification

Toutes les routes sont protégées par un middleware d'authentification.

Chaque requête doit contenir un JWT valide dans l'en-tête HTTP :

```http
Authorization: Bearer <votre_token>
```

---

# Endpoints

## GET `/api/exportExcel`

Génère et télécharge un fichier Excel contenant les données des chantiers ainsi que des indicateurs de capacité de l'équipe QA.

Aucun paramètre n'est requis.

### Fonctionnement

Cette route génère un classeur Excel au format **.xlsx** composé de deux feuilles :

### Feuille **Chantiers**

Contient la liste complète des chantiers avec les informations suivantes :

| Colonne | Description |
|----------|-------------|
| Titre | Nom du chantier |
| Statut | Statut actuel |
| CP | Chef de projet |
| Nature | Nature du chantier |
| Priorité | Priorité |
| Capacité | Capacité prévue |
| Début | Date de début |
| Fin | Date de fin |
| Financement | Budget |
| Prev | Charge prévisionnelle |
| Cons | Charge consommée |
| RAF | Reste À Faire (`Prev - Cons`) |

Des indicateurs sont également calculés automatiquement :

- Charge globale
- Consommation globale
- RAF global
- Delta
- Total capacitaire
- Nombre de QA
- CAF moyenne
- RQA/mois

---

### Feuille **QAs**

Contient les informations des utilisateurs ayant le rôle QA.

| Colonne | Description |
|----------|-------------|
| Prénom | Prénom du QA |
| Nom | Nom du QA |
| Nb Restant | Nombre de jours annuels disponibles |
| Capacité | Capacité calculée jusqu'à la fin de l'année |

Le fichier calcule également le **Total capacitaire** de l'ensemble des QA.

---

### Calculs réalisés

Avant de générer le fichier, le service :

- récupère tous les chantiers ;
- récupère les utilisateurs ayant le rôle QA ;
- calcule le nombre de jours ouvrés restants jusqu'à la fin de l'année (hors week-ends et jours fériés français) ;
- calcule automatiquement la capacité disponible de chaque QA ;
- génère les formules Excel permettant d'obtenir les indicateurs globaux.

---

### Réponse

La route ne renvoie pas un objet JSON.

Elle retourne directement un fichier Excel à télécharger.

### En-têtes HTTP

```http
Content-Type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet

Content-Disposition: attachment; filename=export_chantiers.xlsx
```

---

# Codes de retour

| Code HTTP | Signification |
|------------|---------------|
| 200 | Fichier Excel généré avec succès |
| 401 | Authentification requise |
| 500 | Erreur interne lors de la génération du fichier |
